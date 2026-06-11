import { useState } from 'react'
import { useAppStore } from '../../store/store'
import type { HrMicroproject, AiUseTask, Scenario } from '../../domain/schemas'
import type { DecisionLogText } from '../../store/store'

function generateItComplianceReport(
  project: HrMicroproject,
  task: AiUseTask,
  log: DecisionLogText,
  scenariosList: Scenario[],
  makerName: string,
  isSigned: boolean
): string {
  const dateStr = new Date().toLocaleDateString('no-NO')
  const allowedRoleLabel = task.expectedAllowedRole === 'utforskende_støtte' ? 'KI som idégiver (Lav risiko)' :
                           task.expectedAllowedRole === 'forsterket_skjønn' ? 'KI hjelper, dere bestemmer (Middels risiko)' :
                           task.expectedAllowedRole === 'strategisk_autonomi' ? 'KI handler innenfor rammer (Høy risiko)' : 'KI avgjør alene (Krever egen godkjenning)';
  const calculatedRoleLabel = task.expectedCalculatedRole === 'utforskende_støtte' ? 'KI som idégiver' :
                             task.expectedCalculatedRole === 'forsterket_skjønn' ? 'KI hjelper, dere bestemmer' :
                             task.expectedCalculatedRole === 'strategisk_autonomi' ? 'KI handler innenfor rammer' : 'KI avgjør alene';

  const stopRulesSection = task.expectedStopRules && task.expectedStopRules.length > 0
    ? task.expectedStopRules.map((sr: string) => {
        const desc = {
          'SR-01': 'Påvirker ansatte direkte (de må få si sin mening)',
          'SR-02': 'Krever kjennskap til lokale forhold (kan ikke løses bare med faste regler)',
          'SR-03': 'Systemet kan ikke forklare hvorfor det kom frem til dette (noen må sjekke manuelt)',
          'SR-04': 'Fare for at man stoler for mye på KI (det må finnes rutiner for å sjekke på egen hånd)',
          'SR-05': 'Notatet er ikke ferdig utfylt',
          'SR-06': 'Her står verdier mot hverandre (et menneske må ta den endelige avgjørelsen)',
          'SR-07': 'Feil er vanskelige å rette opp i etterhånd (må sikres ekstra godt)',
          'SR-08': 'Det er vanskelig å sjekke om KI-resultatet stemmer mot regler og lokale fagvurderinger'
        }[sr] || sr
        return `- **${sr}**: ${desc}`
      }).join('\n')
    : '* Ingen forhold som krever avklaring.'

  const scenariosSection = scenariosList && scenariosList.length > 0
    ? scenariosList.map(sc => `
### Tema: ${sc.temaTittel}
- **Bekymringsnivå:** ${sc.bekymringsniva.toUpperCase()}
- **Simulert hendelse:** ${sc.simulertHendelse}
- **Utløsende antakelse:** ${sc.utløsendeAntakelse || 'Ikke spesifisert'}
- **Berørte parter:** ${sc.berørteParter || 'Ikke spesifisert'}
- **Tidlige signaler:** ${sc.tidligeSignaler || 'Ikke spesifisert'}
- **Konsekvens hvis ikke håndtert:** ${sc.konsekvensHvisIkkeHåndtert || 'Ikke spesifisert'}
- **Lokal verifikasjon (tiltak):** ${sc.lokalVerifikasjon || 'Ikke spesifisert'}
- **Ansvarlig eier:** ${sc.ansvarligEier || 'Ikke spesifisert'}
    `).join('\n')
    : '* Ingen spesifikke scenarier definert.'

  return `# DOKUMENTASJON AV KI-VURDERING (Etter EUs KI-lov)
**Generert dato:** ${dateStr}
**System / HR-mikroprosjekt:** ${project.caseId} - ${project.title}
**Beslutningseier:** ${project.decisionOwner || 'Lederenhet'}
**Gjennomført av:** ${makerName || 'Prosjektgruppe'} (Signert: ${isSigned ? 'JA' : 'NEI'})

---

## 1. Systembeskrivelse og inndata
- **Hva KI skal hjelpe med:** ${task.title}
- **Hvilke data brukes:** ${task.inputDataType}
- **Når bestemmer mennesket:** ${task.humanDecisionPoint}

## 2. Lovkrav og risikonivå
- **Systemets anbefaling (før begrensninger):** ${calculatedRoleLabel}
- **Anbefalt KI-rolle (etter risikovurdering):** ${allowedRoleLabel}
- **Er rollen begrenset:** ${task.expectedAllowedRole !== task.expectedCalculatedRole ? 'JA' : 'NEI'}
- **Hvor mye er dokumentert:** ${task.expectedComplianceScore}%
- **Overordnet status:** ${(task.expectedTrafficLight || 'GREY').toUpperCase()}

### Forhold som må avklares:
${stopRulesSection}

---

## 3. Risikovurdering (Tenkte scenarier)
${scenariosSection}

---

## 4. Vurdering og menneskelig ansvar

### Risikovurdering:
${log.risikovurdering || 'Ikke utfylt'}

### Menneskelig kontroll:
${log.menneskeligKontroll || 'Ikke utfylt'}

### Tiltak for å redusere risiko:
${log.internkontrollTiltak || 'Ikke utfylt'}

### Endelig beslutning:
${log.endeligBeslutning || 'Ikke utfylt'}

---
**Merk:** Dokumentet er laget som del av kommunens rutiner for kontroll av KI-bruk, i tråd med EUs KI-lov.`
}

export default function DecisionLog() {
  const {
    activeProject,
    activeTask,
    decisionLogText,
    updateDecisionLogField,
    simplifyDecisionLog,
    isDecisionLogComplete,
    isSigned,
    signDocument,
    makerName,
    setMakerName,
    isMakerChecked,
    setMakerChecked,
    scenarios
  } = useAppStore()

  const [showItDoc, setShowItDoc] = useState(false)

  if (!activeTask || !activeProject) return null
  const complianceScore = activeTask.expectedComplianceScore ?? 0
  const trafficLight = activeTask.expectedTrafficLight || 'yellow'
  const trafficLightLabels = {
    green: 'Kan jobbes videre med',
    yellow: 'Trenger avklaringer',
    red: 'Stopp og avklar',
  }
  const trafficLightExplanations = {
    green: 'Grunnlaget er dokumentert, men prosjektgruppen må fortsatt gjøre egen vurdering.',
    yellow: 'Noen forhold må avklares før KI-output kan brukes.',
    red: 'Avklar forholdene i listen over før KI-output brukes. Ta en pause, diskuter i gruppen.',
  }
  const trafficLightColors = {
    green: '#065f46',
    yellow: '#b45309',
    red: '#b91c1c',
  }
  const canMakerCheck = isSigned && makerName.trim().length > 0 && !isMakerChecked

  return (
    <div className="card" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600 }}>Foreløpig beslutningsnotat</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="btn btn-outline"
            onClick={simplifyDecisionLog}
            disabled={isMakerChecked}
            style={{ fontSize: '0.875rem', padding: '5px 10px' }}
          >
            Fyll inn automatisk
          </button>
          <button
            className="btn btn-outline"
            onClick={() => setShowItDoc(true)}
            style={{ fontSize: '0.875rem', padding: '5px 10px', borderColor: 'var(--accent)', color: 'var(--accent)' }}
          >
            Teknisk rapport
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '20px', padding: '16px', background: '#f8fafc', borderRadius: '4px', border: '1px solid var(--border)' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '0.875rem', fontWeight: 600 }}>Status</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
          <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '4px', background: '#ffffff' }}>
            <div className="small" style={{ color: 'var(--text-secondary)' }}>Hvor mye er fylt ut</div>
            <strong>{complianceScore}% utfylt</strong>
          </div>
          <div style={{ padding: '12px', border: `1px solid ${trafficLightColors[trafficLight]}`, borderRadius: '4px', background: '#ffffff' }}>
            <div className="small" style={{ color: 'var(--text-secondary)' }}>Status</div>
            <strong style={{ color: trafficLightColors[trafficLight] }}>{trafficLightLabels[trafficLight]}</strong>
            <p className="small" style={{ margin: '6px 0 0 0' }}>{trafficLightExplanations[trafficLight]}</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        <LogField
          label="Risikovurdering"
          value={decisionLogText.risikovurdering}
          onChange={(v) => updateDecisionLogField('risikovurdering', v)}
          disabled={isMakerChecked}
        />
        <LogField
          label="Menneskelig kontroll"
          value={decisionLogText.menneskeligKontroll}
          onChange={(v) => updateDecisionLogField('menneskeligKontroll', v)}
          disabled={isMakerChecked}
        />
        <LogField
          label="Foreløpig vurdering og ansvar"
          value={decisionLogText.endeligBeslutning}
          onChange={(v) => updateDecisionLogField('endeligBeslutning', v)}
          disabled={isMakerChecked}
        />
      </div>

      <div style={{ marginTop: '24px', padding: '16px', background: '#f8fafc', borderRadius: '4px', border: '1px solid var(--border)' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '0.875rem', fontWeight: 600 }}>Risikoreduserende tiltak</h4>
        <LogField
          label="Risikoreduserende tiltak"
          value={decisionLogText.internkontrollTiltak}
          onChange={(v) => updateDecisionLogField('internkontrollTiltak', v)}
          disabled={isMakerChecked}
          rows={5}
        />
      </div>

      <div style={{ marginTop: '24px', padding: '16px', background: '#f8fafc', borderRadius: '4px', border: '1px solid var(--border)' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={isSigned}
            onChange={(e) => signDocument(e.target.checked)}
            disabled={!isDecisionLogComplete || isMakerChecked}
            style={{ width: '18px', height: '18px' }}
          />
          <span style={{ fontSize: '0.875rem', color: isDecisionLogComplete ? 'var(--text-primary)' : 'var(--text-muted)' }}>
            Signer at notatet er gjennomgått
          </span>
        </label>

        {isSigned && (
          <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#065f46', borderRadius: '4px', fontWeight: 600, textAlign: 'center' }}>
            Notatet er signert
          </div>
        )}

        <div style={{ marginTop: '20px', display: 'grid', gap: '12px' }}>
          <div>
            <label htmlFor="maker-name" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px' }}>
              Kollega som har lest notatet
            </label>
            <input
              id="maker-name"
              type="text"
              value={makerName}
              onChange={(e) => setMakerName(e.target.value)}
              disabled={!isSigned || isMakerChecked}
              style={{
                width: '100%',
                padding: '10px 12px',
                fontSize: '0.875rem',
              }}
              placeholder="Skriv inn navn på makker..."
            />
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: canMakerCheck ? 'pointer' : 'not-allowed' }}>
            <input
              type="checkbox"
              checked={isMakerChecked}
              onChange={(e) => setMakerChecked(e.target.checked)}
              disabled={!canMakerCheck}
              style={{ width: '18px', height: '18px' }}
            />
            <span style={{ fontSize: '0.875rem', color: canMakerCheck || isMakerChecked ? 'var(--text-primary)' : 'var(--text-muted)' }}>
              Lås vurderingen
            </span>
          </label>

          {isMakerChecked && (
            <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#065f46', borderRadius: '4px', fontWeight: 600, textAlign: 'center' }}>
              Vurderingen er låst
            </div>
          )}
        </div>
      </div>

      {/* IT Documentation Export Modal Overlay (Flat Segoe UI/Fluent style) */}
      {showItDoc && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            background: '#ffffff',
            border: '1px solid #94a3b8',
            borderRadius: '4px',
            width: '600px',
            maxWidth: '95%',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
          }}>
            {/* Monospaced blue title bar like Windows classic setups */}
            <div style={{
              background: 'var(--accent)',
              color: '#ffffff',
              padding: '10px 14px',
              fontWeight: 600,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span style={{ fontSize: '0.875rem' }}>Teknisk rapport (etter EUs KI-lov)</span>
              <button
                onClick={() => setShowItDoc(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                }}
              >
                ✕
              </button>
            </div>
            <div style={{ padding: '20px' }}>
              <p className="small" style={{ color: 'var(--text-secondary)', marginBottom: '12px', lineHeight: '1.4' }}>
                Her er en rapport du kan lagre eller sende videre. Kopier teksten eller last den ned.
              </p>
              <textarea
                readOnly
                value={generateItComplianceReport(
                  activeProject,
                  activeTask,
                  decisionLogText,
                  scenarios[activeProject.caseId] || [],
                  makerName,
                  isSigned
                )}
                style={{
                  width: '100%',
                  height: '300px',
                  fontFamily: 'Consolas, Courier New, monospace',
                  fontSize: '0.75rem',
                  padding: '12px',
                  border: '1px solid var(--border)',
                  borderRadius: '2px',
                  background: '#f8fafc',
                  color: '#0f172a',
                  resize: 'none',
                  marginBottom: '16px',
                  lineHeight: '1.4',
                }}
                onClick={(e) => (e.target as HTMLTextAreaElement).select()}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    const text = generateItComplianceReport(
                      activeProject,
                      activeTask,
                      decisionLogText,
                      scenarios[activeProject.caseId] || [],
                      makerName,
                      isSigned
                    );
                    navigator.clipboard.writeText(text);
                    alert('Kopiert!');
                  }}
                >
                  Kopier tekst
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    const text = generateItComplianceReport(
                      activeProject,
                      activeTask,
                      decisionLogText,
                      scenarios[activeProject.caseId] || [],
                      makerName,
                      isSigned
                    );
                    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8;' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `IT_Vurdering_${activeProject.caseId}_${activeTask.taskId}.md`);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  Last ned (.md)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function LogField({
  label,
  value,
  onChange,
  disabled = false,
  rows = 4,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  disabled?: boolean
  rows?: number
}) {
  const id = label.toLowerCase().replace(/\s+/g, '-')
  return (
    <div>
      <label htmlFor={id} style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px' }}>
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        disabled={disabled}
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '0.875rem',
          opacity: disabled ? 0.75 : 1,
          cursor: disabled ? 'not-allowed' : 'text',
        }}
        placeholder={`Skriv inn ${label.toLowerCase()}...`}
      />
    </div>
  )
}
