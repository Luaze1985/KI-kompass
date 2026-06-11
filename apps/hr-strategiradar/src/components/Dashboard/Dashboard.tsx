import { useState } from 'react'
import { useAppStore } from '../../store/store'
import type { AiUseTask } from '../../domain/schemas'
import { allCases } from '../../fixtures/all-cases'
import { getSystemProposal, getContextualQuestions, compareBlindTestRole, STOP_RULE_QUESTIONS, STOP_RULES_MAP } from '../../services/mockDiagnosisService'
import CompassView from './CompassView'
import CheckpointsAndReflections from './CheckpointsAndReflections'
import DecisionLog from './DecisionLog'
import ScenarioCards from './ScenarioCards'
import ExportPanel from './ExportPanel'
import LensPanel from './LensPanel'

const CASES = [
  { id: 'HRR-01', label: 'Seniorbevaring i hjemmetjenesten' },
  { id: 'HRR-02', label: 'Gradert sykefravær og tilrettelegging' },
  { id: 'HRR-03', label: 'Heltidskultur og helgebemanning' },
  { id: 'HRR-04', label: 'Rekruttering av helsefagkompetanse' },
  { id: 'HRR-05', label: 'Kompetanseutvikling og intern mobilitet' },
  { id: 'HRR-06', label: 'Lærling med fare for frafall' },
  { id: 'HRR-07', label: 'Langvakter i helsesektoren' },
  { id: 'HRR-08', label: 'Omstilling og naturlig avgang' },
]

function IntroCard() {
  return (
    <div
      className="card fade-in"
      style={{
        padding: '20px 24px',
        marginBottom: '24px',
        background: 'linear-gradient(135deg, rgba(2,132,199,0.06), rgba(16,185,129,0.05))',
        border: '1px solid var(--border)',
      }}
    >
      <h2 style={{ margin: '0 0 6px 0', fontSize: '1.1rem', color: 'var(--accent-hover)' }}>
        Slik fungerer KI-Radaren
      </h2>
      <p className="small" style={{ color: 'var(--text-secondary)', margin: '0 0 14px 0', maxWidth: '70ch' }}>
        Verktøyet hjelper prosjektgruppen å vurdere om det er forsvarlig å bruke KI i en konkret HR-oppgave.
        Dere svarer på noen spørsmål, og systemet viser en foreløpig vurdering. <strong>Svarene deres styrer
        vurderingen</strong> — kompasset, trafikklyset og den anbefalte KI-rollen endrer seg når dere svarer.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
        <div style={{ padding: '12px', background: '#ffffff', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
          <strong style={{ fontSize: '0.8125rem', display: 'block', marginBottom: '4px' }}>🧭 Kompasset</strong>
          <span className="small" style={{ color: 'var(--text-secondary)' }}>
            To akser: hvor <em>tydelige målene</em> er, og om oppgaven <em>kan løses med faste regler</em>.
            Prikken viser hvor oppgaven havner.
          </span>
        </div>
        <div style={{ padding: '12px', background: '#ffffff', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
          <strong style={{ fontSize: '0.8125rem', display: 'block', marginBottom: '4px' }}>🚦 Trafikklyset</strong>
          <span className="small" style={{ color: 'var(--text-secondary)' }}>
            Grønt = greit å jobbe videre. Gult = noe må avklares. Rødt = stopp og gjør en grundig vurdering først.
          </span>
        </div>
        <div style={{ padding: '12px', background: '#ffffff', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
          <strong style={{ fontSize: '0.8125rem', display: 'block', marginBottom: '4px' }}>🗣️ Deres svar teller</strong>
          <span className="small" style={{ color: 'var(--text-secondary)' }}>
            Spørsmålene i steg 1, blindtesten og avklaringene i steg 2, og risikoene i steg 3 former den
            endelige anbefalingen.
          </span>
        </div>
      </div>
    </div>
  )
}

function RegulationsModule({ compact = false }: { compact?: boolean }) {
  const [activeTab, setActiveTab] = useState<'eu' | 'national' | 'ethics' | 'internal' | null>(null)

  const toggleTab = (tab: 'eu' | 'national' | 'ethics' | 'internal') => {
    setActiveTab(activeTab === tab ? null : tab)
  }

  return (
    <div className="card" style={{ padding: compact ? '16px' : '24px', border: '1px solid var(--border)', background: '#ffffff' }}>
      <h3 style={{ margin: '0 0 8px 0', fontSize: compact ? '0.9375rem' : '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>🚦</span> Lover og regler som gjelder
      </h3>
      <p className="small" style={{ color: 'var(--text-secondary)', margin: '0 0 16px 0' }}>
        Dette er lover og regler som gjelder når du bruker KI i HR- og HMS-arbeid. Klikk for å lese mer.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* EU AI Act */}
        <div style={{ border: '1px solid var(--border-light)', borderRadius: '6px', overflow: 'hidden' }}>
          <button
            onClick={() => toggleTab('eu')}
            style={{
              width: '100%',
              padding: '12px',
              background: activeTab === 'eu' ? 'var(--zone-red)' : 'var(--bg-panel)',
              border: 'none',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontWeight: 600,
              fontSize: '0.875rem',
              color: 'var(--text-primary)',
              transition: 'background 0.2s',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🇪🇺</span> EUs KI-lov (Høyrisiko)
            </span>
            <span style={{
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#b91c1c',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 700,
            }}>
              Lovpålagt krav
            </span>
          </button>
          {activeTab === 'eu' && (
            <div style={{ padding: '12px', background: '#ffffff', fontSize: '0.8125rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-light)', lineHeight: '1.6' }}>
              <p style={{ margin: '0 0 8px 0' }}>
                <strong>Vedlegg III, punkt 4:</strong> Bruk av KI til rekruttering, utvelgelse, turnusplanlegging, forfremmelse, oppsigelse eller evaluering av ansatte er regnet som høyrisiko etter EUs KI-lov.
              </p>
              <p style={{ margin: '0 0 8px 0' }}>
                Det betyr at det må finnes sikkerhetstiltak for:
              </p>
              <ul style={{ margin: '0', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li><strong>Menneskelig kontroll:</strong> KI kan aldri ta avgjørelser på egen hånd uten at et menneske har sjekket og godkjent.</li>
                <li><strong>Åpenhet:</strong> Ansatte og søkere har rett til å vite at KI er brukt i vurderingen av dem.</li>
                <li><strong>Sikkerhet:</strong> Systemet må beskyttes mot feil og misbruk.</li>
                <li><strong>Registrering:</strong> Høyrisikosystemer må registreres i en felles EU-database.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Nasjonale Retningslinjer */}
        <div style={{ border: '1px solid var(--border-light)', borderRadius: '6px', overflow: 'hidden' }}>
          <button
            onClick={() => toggleTab('national')}
            style={{
              width: '100%',
              padding: '12px',
              background: activeTab === 'national' ? 'var(--zone-yellow)' : 'var(--bg-panel)',
              border: 'none',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontWeight: 600,
              fontSize: '0.875rem',
              color: 'var(--text-primary)',
              transition: 'background 0.2s',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🇳🇴</span> Nasjonale etiske retningslinjer
            </span>
            <span style={{
              background: 'rgba(217, 119, 6, 0.1)',
              color: '#9a3412',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 700,
            }}>
              Etiske råd
            </span>
          </button>
          {activeTab === 'national' && (
            <div style={{ padding: '12px', background: '#ffffff', fontSize: '0.8125rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-light)', lineHeight: '1.6' }}>
              <p style={{ margin: '0 0 8px 0' }}>
                Regjeringens prinsipper for ansvarlig bruk av kunstig intelligens krever:
              </p>
              <ul style={{ margin: '0', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li><strong>Mennesket bestemmer:</strong> Du må ha reell valgfrihet og ikke føle deg presset til å følge det KI foreslår.</li>
                <li><strong>Rettferdighet og mangfold:</strong> Algoritmer må testes for å sikre at den ikke forskjellsbehandler basert på kjønn, alder eller etnisk bakgrunn.</li>
                <li><strong>Forståelig begrunnelse:</strong> Den ansatte må kunne få en forklaring på hvorfor KI kom frem til akkurat dette resultatet.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Virksomhetens etiske retningslinjer */}
        <div style={{ border: '1px solid var(--border-light)', borderRadius: '6px', overflow: 'hidden' }}>
          <button
            onClick={() => toggleTab('ethics')}
            style={{
              width: '100%',
              padding: '12px',
              background: activeTab === 'ethics' ? 'var(--zone-green)' : 'var(--bg-panel)',
              border: 'none',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontWeight: 600,
              fontSize: '0.875rem',
              color: 'var(--text-primary)',
              transition: 'background 0.2s',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🧭</span> Virksomhetens etiske retningslinjer
            </span>
            <span style={{
              background: 'rgba(16, 185, 129, 0.1)',
              color: '#065f46',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 700,
            }}>
              Avhenger av din virksomhet
            </span>
          </button>
          {activeTab === 'ethics' && (
            <div style={{ padding: '12px', background: '#ffffff', fontSize: '0.8125rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-light)', lineHeight: '1.6' }}>
              <p style={{ margin: '0 0 8px 0' }}>
                Mange virksomheter har egne etiske kjøreregler for KI-bruk. Bruk disse som
                en sjekkliste og tilpass dem til det dere faktisk har vedtatt lokalt:
              </p>
              <ul style={{ margin: '0', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li><strong>Åpenhet internt:</strong> Ansatte skal vite når og hvordan KI brukes i saker som angår dem.</li>
                <li><strong>Ansvar for output:</strong> Et navngitt menneske er alltid ansvarlig for det KI-en produserer — ansvaret kan ikke delegeres til verktøyet.</li>
                <li><strong>Ingen skjult profilering:</strong> KI skal ikke brukes til å rangere eller profilere ansatte uten at det er åpent kjent og saklig begrunnet.</li>
                <li><strong>Varsling ved tvil:</strong> Det skal finnes en kjent rutine for å si fra hvis noen er i tvil om KI-bruken er forsvarlig.</li>
              </ul>
              <p style={{ margin: '8px 0 0 0', fontStyle: 'italic' }}>
                Har dere ikke vedtatt egne etiske retningslinjer ennå? Da bør dette avklares
                før KI tas i bruk i reelle saker.
              </p>
            </div>
          )}
        </div>

        {/* Virksomhetens egne retningslinjer */}
        <div style={{ border: '1px solid var(--border-light)', borderRadius: '6px', overflow: 'hidden' }}>
          <button
            onClick={() => toggleTab('internal')}
            style={{
              width: '100%',
              padding: '12px',
              background: activeTab === 'internal' ? 'var(--zone-green)' : 'var(--bg-panel)',
              border: 'none',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontWeight: 600,
              fontSize: '0.875rem',
              color: 'var(--text-primary)',
              transition: 'background 0.2s',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🏢</span> Virksomhetens retningslinjer & HMS
            </span>
            <span style={{
              background: 'rgba(16, 185, 129, 0.1)',
              color: '#065f46',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 700,
            }}>
              Avhenger av din virksomhet
            </span>
          </button>
          {activeTab === 'internal' && (
            <div style={{ padding: '12px', background: '#ffffff', fontSize: '0.8125rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-light)', lineHeight: '1.6' }}>
              <p style={{ margin: '0 0 8px 0' }}>
                Regler som gjelder i din virksomhet:
              </p>
              <ul style={{ margin: '0', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li><strong>Medbestemmelse (Hovedavtalen § 9-3):</strong> Innføring av KI-verktøy som påvirker ansattes arbeidshverdag <strong>skal</strong> drøftes med tillitsvalgte på forhånd.</li>
                <li><strong>HMS-prosedyrer:</strong> Bruk av KI til turnus eller saksbehandling skal ikke øke det psykososiale eller fysiske arbeidspresset, og verneombudet skal involveres dersom det påvirker det fysiske eller psykososiale arbeidsmiljøet.</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function AssessmentStatusBar({ task }: { task: AiUseTask }) {
  const trafficLight = task.expectedTrafficLight ?? 'yellow'
  const assessmentComplete = task.assessmentComplete ?? false
  const { decisionLogText, setStep } = useAppStore()
  const [showMissing, setShowMissing] = useState(false)

  const focusField = (label: string) => {
    setStep(4)
    const id = label.toLowerCase().replace(/\s+/g, '-')
    const el = document.getElementById(id) as HTMLElement | null
    el?.focus()
    el?.scrollIntoView?.({ behavior: 'smooth', block: 'center' })
  }

  const lightConfig = {
    green:  { emoji: '🟢', label: 'Grønt lys',  color: '#10b981', bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.25)'  },
    yellow: { emoji: '🟡', label: 'Gult lys',   color: '#b45309', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)'  },
    red:    { emoji: '🔴', label: 'Rødt lys',   color: '#b91c1c', bg: 'rgba(239,68,68,0.08)',  border: 'rgba(239,68,68,0.25)'   },
  }
  const lc = lightConfig[trafficLight]

  const fieldLabels: Record<string, string> = {
    risikovurdering: 'Risikovurdering',
    menneskeligKontroll: 'Menneskelig kontroll',
    endeligBeslutning: 'Foreløpig vurdering og ansvar',
    internkontrollTiltak: 'Risikoreduserende tiltak',
  }
  const missingFields = (Object.keys(fieldLabels) as (keyof typeof decisionLogText)[]).filter(
    (k) => !decisionLogText[k]?.trim()
  )

  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: lc.bg, border: `1px solid ${lc.border}`, borderRadius: '20px', fontSize: '0.8125rem', fontWeight: 600, color: lc.color }}>
          <span>{lc.emoji}</span>
          <span>Risikonivå: {lc.label}</span>
        </div>
        {assessmentComplete ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '20px', fontSize: '0.8125rem', fontWeight: 600, color: '#10b981' }}>
            <span>✅</span>
            <span>Vurderingen er ferdig</span>
          </div>
        ) : (
          <button
            onClick={() => setShowMissing((v) => !v)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: 'rgba(148,163,184,0.1)', border: '1px solid rgba(148,163,184,0.3)', borderRadius: '20px', fontSize: '0.8125rem', fontWeight: 600, color: '#64748b', cursor: 'pointer' }}
          >
            <span>⏳</span>
            <span>Notatet er ikke ferdig utfylt</span>
            <span style={{ fontSize: '0.7rem' }}>{showMissing ? '▲' : '▼'}</span>
          </button>
        )}
      </div>
      {!assessmentComplete && showMissing && missingFields.length > 0 && (
        <div style={{ marginTop: '8px', padding: '10px 14px', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
          <div style={{ fontWeight: 600, marginBottom: '6px', color: 'var(--text-primary)' }}>Mangler utfylling:</div>
          <ul style={{ margin: 0, paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {missingFields.map((k) => (
              <li key={k}>
                <button
                  onClick={() => focusField(fieldLabels[k])}
                  style={{ background: 'none', border: 'none', padding: 0, color: 'var(--accent)', fontSize: '0.8125rem', textAlign: 'left', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  {fieldLabels[k]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default function Dashboard() {
  const {
    currentStep,
    setStep,
    selectedCaseId,
    setSelectedCaseId,
    activeTask,
    setActiveData,
    isAssumptionsConfirmed,
    confirmAssumptions,
    checkpointAnswers,
    setCheckpointAnswer,
    isMakerChecked,
    scenarios,
    userBlindTestAnswer,
    setUserBlindTestAnswer,
    stopRuleDiscussed,
    setStopRuleDiscussed,
    calculationModel,
  } = useAppStore()

  const [isExplainingFormula, setIsExplainingFormula] = useState(false)

  const project = allCases.find((c) => c.caseId === selectedCaseId)
  const systemProposal = selectedCaseId ? getSystemProposal(selectedCaseId) : null

  const handleCaseSelect = (caseId: string) => {
    if (isMakerChecked) return
    setSelectedCaseId(caseId)
    confirmAssumptions(false) // Reset confirmation on case change
    const proj = allCases.find((c) => c.caseId === caseId)
    if (proj && proj.aiUseTasks.length > 0) {
      const defaultTask = proj.aiUseTasks[0]
      setActiveData(proj, defaultTask)
    }
  }

  const handleConfirmAssumptions = () => {
    confirmAssumptions(true)
    setStep(2)
  }

  const steps = [
    { num: 1, label: '1. Beskriv saken', disabled: isMakerChecked },
    { num: 2, label: '2. Foreløpig KI-diagnose', disabled: !selectedCaseId || !isAssumptionsConfirmed },
    { num: 3, label: '3. Risikovurdering', disabled: !selectedCaseId || !isAssumptionsConfirmed },
    { num: 4, label: '4. Beslutningsnotat', disabled: !selectedCaseId || !isAssumptionsConfirmed },
  ]

  const contextualQuestions = selectedCaseId ? getContextualQuestions(selectedCaseId) : []

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column' }}>

      {/* Header with Step Progress Bar */}
      <header className="dashboard-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 700, color: 'var(--accent-hover)' }}>KI-Radar</h1>
            <p className="small" style={{ color: 'var(--text-secondary)', margin: 0 }}>Arbeidsflate for prosjektgruppen</p>
          </div>
        </div>

        {/* Step Navigation Bar */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f1f5f9', padding: '4px', borderRadius: '4px', border: '1px solid var(--border)' }}>
          {steps.map((st) => {
            const isActive = currentStep === st.num
            const isCompleted = currentStep > st.num && !st.disabled
            const isSelectable = !st.disabled
            return (
              <button
                key={st.num}
                disabled={st.disabled}
                onClick={() => setStep(st.num)}
                style={{
                  padding: '6px 16px',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 600 : 400,
                  borderRadius: '3px',
                  border: isActive ? '1px solid var(--accent-hover)' : isCompleted ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid transparent',
                  background: isActive ? 'var(--accent-hover)' : isCompleted ? 'rgba(16, 185, 129, 0.08)' : 'transparent',
                  color: isActive ? '#fff' : isCompleted ? '#10b981' : isSelectable ? 'var(--text-primary)' : 'var(--text-muted)',
                  cursor: isSelectable ? 'pointer' : 'not-allowed',
                  transition: 'all 0.1s ease',
                }}
              >
                {isCompleted ? '\u2713 ' : ''}{st.label}
              </button>
            )
          })}
        </nav>

        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', background: '#ffffff', padding: '6px 12px', borderRadius: '4px', border: '1px solid var(--border)' }}>
          Status: <strong>{isMakerChecked ? 'Låst' : 'Under arbeid'}</strong>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ padding: '32px', flex: 1, display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '1200px' }}>

          {/* Oppstarts-veiledning (kun steg 1) */}
          {currentStep === 1 && <IntroCard />}

          {/* STEP 1: BESKRIV SAKEN */}
          {currentStep === 1 && (
            <div className="fade-up dashboard-grid">
                  {/* Left Column: Low-friction intake input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div className="card" style={{ padding: '24px' }}>
                  <h2 style={{ fontSize: '1.25rem', marginTop: 0, marginBottom: '8px', color: 'var(--text-primary)' }}>Steg 1: Beskriv din sak</h2>
                  <p className="small" style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                    Velg et fagområde og fortell kort hva saken handler om.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Case Selector Dropdown */}
                    <div>
                      <label htmlFor="case-select-dashboard" style={{ fontWeight: 600, fontSize: '0.875rem', display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                        Velg fagområde:
                      </label>
                      <select
                        id="case-select-dashboard"
                        value={selectedCaseId || ''}
                        onChange={(e) => handleCaseSelect(e.target.value)}
                        disabled={isMakerChecked}
                        style={{
                          padding: '12px',
                          fontSize: '0.875rem',
                          border: '1px solid var(--border)',
                          background: 'var(--bg-input)',
                          color: 'var(--text-primary)',
                          borderRadius: '8px',
                          width: '100%',
                          cursor: isMakerChecked ? 'not-allowed' : 'pointer',
                        }}
                      >
                        <option value="" disabled>-- Velg fagområde --</option>
                        {CASES.map((c) => (
                          <option key={c.id} value={c.id}>{c.label}</option>
                        ))}
                      </select>
                    </div>

                    {selectedCaseId && contextualQuestions.length > 0 && (
                      <div className="fade-in" style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                        <h4 style={{ margin: '0 0 12px 0', fontSize: '0.875rem' }}>Noen spørsmål om saken:</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          {contextualQuestions.map((q, i) => (
                            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{q}</span>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                  className={`btn ${checkpointAnswers[i] === 'yes' ? 'btn-primary' : 'btn-outline'}`}
                                  onClick={() => setCheckpointAnswer(i, 'yes')}
                                  disabled={isMakerChecked}
                                  style={{ padding: '6px 12px', fontSize: '0.875rem', flex: 1 }}
                                >
                                  Ja
                                </button>
                                <button
                                  className={`btn ${checkpointAnswers[i] === 'no' ? 'btn-primary' : 'btn-outline'}`}
                                  onClick={() => setCheckpointAnswer(i, 'no')}
                                  disabled={isMakerChecked}
                                  style={{ padding: '6px 12px', fontSize: '0.875rem', flex: 1 }}
                                >
                                  Nei
                                </button>
                                <button
                                  className={`btn ${checkpointAnswers[i] === 'info' ? 'btn-primary' : 'btn-outline'}`}
                                  onClick={() => setCheckpointAnswer(i, 'info')}
                                  disabled={isMakerChecked}
                                  style={{ padding: '6px 12px', fontSize: '0.875rem', flex: 1 }}
                                >
                                  Uklart
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </div>

              {/* Right Column: AI-Assisted Assumptions and proposals */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {!selectedCaseId ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div className="card" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--border)', background: '#ffffff' }}>
                      <h3 style={{ margin: '0 0 8px 0', color: 'var(--text-primary)' }}>Ingen sak valgt</h3>
                      <p className="small" style={{ margin: 0 }}>Velg et fagområde til venstre for å komme i gang.</p>
                    </div>
                    <RegulationsModule />
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div className="card" style={{ padding: '24px', border: '1px solid var(--border)', background: '#ffffff' }}>
                      <h3 style={{ margin: '0 0 16px 0', fontSize: '1rem', color: 'var(--text-primary)' }}>
                        Slik forstår vi saken
                      </h3>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* Proposed Case File */}
                        <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                          <span className="small" style={{ color: 'var(--text-secondary)', display: 'block', fontWeight: 600 }}>Valgt sak:</span>
                          <strong style={{ fontSize: '0.875rem' }}>{project?.title}</strong>
                        </div>

                        {/* Proposed Task / Unit of evaluation */}
                        <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderLeft: '3px solid var(--accent)' }}>
                          <span className="small" style={{ color: 'var(--text-secondary)', display: 'block', fontWeight: 600 }}>Hva KI skal hjelpe med:</span>
                          <strong style={{ fontSize: '0.875rem', color: 'var(--accent)' }}>{activeTask?.title}</strong>
                          <p className="small" style={{ margin: '6px 0 0 0', color: 'var(--text-secondary)' }}>
                            Vi vurderer bare denne ene oppgaven, ikke hele HR-prosjektet.
                          </p>
                        </div>

                        {/* Randsoner / HR-områder som berøres */}
                        {activeTask && (() => {
                          const badges: { label: string; color: string }[] = []
                          if (activeTask.directEffectOnPeople) badges.push({ label: 'Ansattes rettigheter', color: '#ef4444' })
                          if (activeTask.usesPersonalOrSensitiveData) badges.push({ label: 'Personvern', color: '#8b5cf6' })
                          if (activeTask.expectedRiskFlags?.healthSafetyEnvironment) badges.push({ label: 'HMS', color: '#f59e0b' })
                          if (activeTask.expectedRiskFlags?.workConditionsImpact) badges.push({ label: 'Arbeidsvilkår', color: '#0284c7' })
                          if (activeTask.expectedRiskFlags?.irreversibleConsequences) badges.push({ label: 'Vanskelig å angre', color: '#dc2626' })
                          return badges.length > 0 ? (
                            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                              <span className="small" style={{ color: 'var(--text-secondary)', display: 'block', fontWeight: 600 }}>Områder denne oppgaven berører:</span>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                                {badges.map(b => (
                                  <span key={b.label} style={{ background: `${b.color}15`, color: b.color, padding: '3px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600, border: `1px solid ${b.color}30` }}>
                                    {b.label}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ) : null
                        })()}

                        {/* AI-Assumed active themes / randsoner */}
                        {systemProposal && (
                          <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                            <span className="small" style={{ color: 'var(--text-secondary)', display: 'block', fontWeight: 600 }}>Temaer som kan berøres:</span>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '6px' }}>
                              {(scenarios[selectedCaseId] || []).map(sc => (
                                <span key={sc.temaKey} style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--accent)', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>
                                  {sc.temaTittel}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Spørsmål som må avklares lokalt */}
                        <div style={{ padding: '12px', background: 'var(--bg-panel)', borderRadius: '4px', border: '1px solid var(--border)' }}>
                          <span className="small" style={{ color: 'var(--text-secondary)', display: 'block', fontWeight: 600 }}>Dette må dere avklare selv:</span>
                          <ul style={{ margin: '6px 0 0 0', paddingLeft: '16px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            {project?.uncertainties.map((u, index) => (
                              <li key={index}>{u}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Active Confirmation Button */}
                        <div style={{ marginTop: '12px', borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
                          <p className="small" style={{ color: 'var(--text-secondary)', margin: '0 0 12px 0', textAlign: 'center' }}>
                            Bekreft at dette stemmer før vi går videre.
                          </p>
                          <button
                            className="btn btn-primary"
                            onClick={handleConfirmAssumptions}
                            style={{ width: '100%', padding: '12px', fontSize: '1rem', fontWeight: 700 }}
                          >
                            Stemmer — gå videre →
                          </button>
                        </div>
                      </div>
                    </div>
                    <RegulationsModule compact={true} />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: SE FORELØPIG KI-DIAGNOSE */}
          {currentStep === 2 && activeTask && (
            <div className="fade-up dashboard-grid-sidebar">

              {/* Left Column: Blindtest OR full Diagnosis */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                {!userBlindTestAnswer ? (
                  <div className="card" style={{ padding: '32px', border: '1px solid var(--border)' }}>
                    <h2 style={{ fontSize: '1.25rem', marginTop: 0, marginBottom: '8px', color: 'var(--text-primary)' }}>
                      Hva tror dere selv?
                    </h2>
                    <p className="small" style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                      Før dere ser hva systemet mener, vil vi vite hva dere selv tenker. Hvilken rolle bør KI ha i denne oppgaven?
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {[
                        {
                          key: 'utforskende_støtte',
                          title: 'KI som idégiver (Lav risiko)',
                          desc: 'KI brukes bare til å hente ideer og lage utkast. Ingen avgjørelser.',
                        },
                        {
                          key: 'forsterket_skjønn',
                          title: 'KI hjelper, dere bestemmer (Middels risiko)',
                          desc: 'KI foreslår oppbygging og viktige punkter, men dere gjør alle vurderinger selv.',
                        },
                        {
                          key: 'strategisk_autonomi',
                          title: 'KI handler på egen hånd innenfor rammer (Høy risiko)',
                          desc: 'KI tar valg på egen hånd innenfor regler dere setter. Ledelsen må bestemme grensene på forhånd.',
                        },
                        {
                          key: 'automatisert_beslutning',
                          title: 'KI avgjør alene (Svært høy risiko)',
                          desc: 'KI tar avgjørelser uten at noen sjekker. Dette frarådes for HR-oppgaver og krever egen godkjenning.',
                        },
                      ].map((opt) => (
                        <button
                          key={opt.key}
                          onClick={() => setUserBlindTestAnswer(opt.key)}
                          style={{
                            textAlign: 'left',
                            padding: '16px',
                            background: '#ffffff',
                            border: '1px solid var(--border)',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'all 0.1s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--accent)';
                            e.currentTarget.style.background = '#f8fafc';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border)';
                            e.currentTarget.style.background = '#ffffff';
                          }}
                        >
                          <strong style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                            {opt.title}
                          </strong>
                          <span className="small" style={{ color: 'var(--text-secondary)' }}>{opt.desc}</span>
                        </button>
                      ))}
                    </div>

                    <div style={{ marginTop: '24px', borderTop: '1px solid var(--border-light)', paddingTop: '16px', textAlign: 'left' }}>
                      <button className="btn btn-outline" style={{ fontSize: '0.875rem', padding: '6px 12px' }} onClick={() => setStep(1)}>
                        ← Tilbake til Steg 1
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="card" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                      <div>
                        <h2 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--text-primary)' }}>Steg 2: Foreløpig vurdering</h2>
                        <p className="small" style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
                          Her ser dere hva systemet mener sammenlignet med det dere selv svarte.
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn btn-outline" style={{ fontSize: '0.875rem', padding: '6px 12px' }} onClick={() => setUserBlindTestAnswer(null)}>
                          Svar på nytt
                        </button>
                        <button className="btn btn-outline" style={{ fontSize: '0.875rem', padding: '6px 12px' }} onClick={() => setStep(1)}>
                          ← Endre antakelser
                        </button>
                      </div>
                    </div>

                    {/* Menneskelig vs. Maskin Sammenligning */}
                    <div style={{ padding: '16px', background: 'var(--bg-input)', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '24px' }}>
                      <h4 style={{ margin: '0 0 12px 0', fontSize: '0.875rem', color: 'var(--text-primary)' }}>Sammenligning: Deres vurdering mot systemets</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div style={{ padding: '12px', background: '#ffffff', borderRadius: '6px', border: '1px solid var(--border)' }}>
                          <span className="small" style={{ color: 'var(--text-secondary)', display: 'block' }}>Dere svarte:</span>
                          <strong style={{ color: 'var(--accent)' }}>
                            {userBlindTestAnswer === 'utforskende_støtte' ? 'KI som idégiver' :
                             userBlindTestAnswer === 'forsterket_skjønn' ? 'KI hjelper, gruppen bestemmer' :
                             userBlindTestAnswer === 'strategisk_autonomi' ? 'KI handler innen gitte rammer' : 'Automatisert beslutning'}
                          </strong>
                        </div>
                        <div style={{ padding: '12px', background: '#ffffff', borderRadius: '6px', border: '1px solid var(--border)' }}>
                          <span className="small" style={{ color: 'var(--text-secondary)', display: 'block' }}>Systemet mener:</span>
                          <strong style={{ color: 'var(--accent)' }}>
                            {activeTask.expectedAllowedRole === 'utforskende_støtte' ? 'KI som idégiver' :
                             activeTask.expectedAllowedRole === 'forsterket_skjønn' ? 'KI hjelper, gruppen bestemmer' :
                             activeTask.expectedAllowedRole === 'strategisk_autonomi' ? 'KI handler innen gitte rammer' : 'Automatisert beslutning'}
                          </strong>
                        </div>
                      </div>

                      <div style={{ marginTop: '12px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        {(() => {
                          const cmp = compareBlindTestRole(userBlindTestAnswer, activeTask.expectedAllowedRole)
                          if (cmp === 'agree') {
                            return (
                              <p style={{ margin: 0, color: '#10b981' }}>
                                ✓ <strong>Enig!</strong> Dere og systemet kom frem til det samme.
                              </p>
                            )
                          }
                          if (cmp === 'overconfident') {
                            return (
                              <p style={{ margin: 0, color: '#b45309', background: 'rgba(245, 158, 11, 0.1)', padding: '10px 12px', borderRadius: '6px', border: '1px solid rgba(245, 158, 11, 0.25)' }}>
                                ⚠️ <strong>Dere vurderer KI til en større rolle enn systemet anbefaler.</strong> Dobbeltsjekk risikoen før dere går videre — det er lettere å undervurdere enn å overvurdere faren.
                              </p>
                            )
                          }
                          if (cmp === 'cautious') {
                            return (
                              <p style={{ margin: 0, color: 'var(--accent)' }}>
                                <strong>Dere er strengere enn systemet.</strong> Det er trygt, men diskuter gjerne om dere kan bruke KI litt mer aktivt enn dere først tenkte.
                              </p>
                            )
                          }
                          return null
                        })()}
                      </div>
                    </div>

                    <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-light)', marginBottom: '24px' }}>
                      <label htmlFor="task-select-dashboard-step2" className="small" style={{ color: 'var(--text-secondary)', display: 'block', fontWeight: 600, marginBottom: '6px' }}>
                        Oppgaven vi vurderer:
                      </label>
                      <select
                        id="task-select-dashboard-step2"
                        value={activeTask.taskId}
                        onChange={(e) => {
                          if (isMakerChecked) return
                          const selectedTask = project?.aiUseTasks.find(t => t.taskId === e.target.value)
                          if (selectedTask && project) {
                            setActiveData(project, selectedTask)
                          }
                        }}
                        disabled={isMakerChecked}
                        style={{
                          display: 'block',
                          width: '100%',
                          padding: '8px 12px',
                          fontSize: '0.875rem',
                          fontFamily: "'Segoe UI', 'Inter', system-ui, sans-serif",
                          fontWeight: 600,
                          border: '1px solid var(--border)',
                          borderRadius: 'var(--radius)',
                          background: 'var(--bg-input)',
                          color: 'var(--text-primary)',
                          cursor: isMakerChecked ? 'not-allowed' : 'pointer',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                        }}
                      >
                        {project?.aiUseTasks.map((t) => (
                          <option key={t.taskId} value={t.taskId}>
                            {t.title}
                          </option>
                        ))}
                      </select>
                      <p style={{ margin: '8px 0 0 0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        Datagrunnlag: <strong>{activeTask.inputDataType}</strong> | Mennesket bestemmer: <strong>{activeTask.humanDecisionPoint}</strong>
                      </p>
                    </div>

                    {/* Avklaringsspørsmål til gruppen */}
                    {(() => {
                      const stopRules = activeTask.expectedStopRules || []
                      const discussedCount = stopRules.filter((sr) => stopRuleDiscussed[sr]).length
                      const allDiscussed = stopRules.length > 0 && discussedCount === stopRules.length
                      return (
                    <div style={{ marginBottom: '24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
                          Spørsmål dere må diskutere
                        </h3>
                        {stopRules.length > 0 && (
                          <span style={{
                            fontSize: '0.8125rem',
                            fontWeight: 700,
                            color: allDiscussed ? '#10b981' : '#b45309',
                            background: allDiscussed ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                            border: `1px solid ${allDiscussed ? 'rgba(16,185,129,0.25)' : 'rgba(245,158,11,0.25)'}`,
                            padding: '2px 10px',
                            borderRadius: '12px',
                          }}>
                            {allDiscussed ? '✓ Alle forhold avklart' : `${discussedCount}/${stopRules.length} forhold avklart`}
                          </span>
                        )}
                      </div>
                      <p className="small" style={{ color: 'var(--text-secondary)', margin: '0 0 12px 0' }}>
                        {allDiscussed
                          ? 'Dere har gått gjennom alle forholdene. Anbefalingen under er ikke lenger foreløpig.'
                          : 'Hak av når dere har diskutert og blitt enige. Anbefalingen er foreløpig til alle forhold er avklart.'}
                      </p>

                      {stopRules.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {activeTask.expectedStopRules.map((sr) => {
                            const question = STOP_RULE_QUESTIONS[sr]
                            if (!question) return null
                            const isDiscussed = stopRuleDiscussed[sr] || false
                            return (
                              <label
                                key={sr}
                                style={{
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                  gap: '10px',
                                  cursor: isMakerChecked ? 'not-allowed' : 'pointer',
                                  padding: '12px',
                                  background: isDiscussed ? 'rgba(16, 185, 129, 0.04)' : '#ffffff',
                                  borderRadius: '4px',
                                  border: `1px solid ${isDiscussed ? 'rgba(16, 185, 129, 0.25)' : 'var(--border)'}`,
                                  transition: 'all 0.15s ease',
                                }}
                              >
                                <input
                                  type="checkbox"
                                  checked={isDiscussed}
                                  disabled={isMakerChecked}
                                  onChange={(e) => setStopRuleDiscussed(sr, e.target.checked)}
                                  style={{ marginTop: '2px', width: '16px', height: '16px', flexShrink: 0, cursor: isMakerChecked ? 'not-allowed' : 'pointer' }}
                                />
                                <span style={{ fontSize: '0.875rem', color: isDiscussed ? 'var(--text-muted)' : 'var(--text-primary)', lineHeight: '1.4' }}>
                                  {question}
                                </span>
                              </label>
                            )
                          })}
                        </div>
                      ) : (
                        <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '4px', padding: '14px', color: '#10b981', fontSize: '0.875rem' }}>
                          Ingen ekstra avklaringer trengs. Saken har lav risiko ut fra det vi vet.
                        </div>
                      )}
                    </div>
                      )
                    })()}

                    <AssessmentStatusBar task={activeTask} />

                    {/* Allowed Role Cap */}
                    <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                      <div>
                        <span className="small" style={{ color: 'var(--text-secondary)' }}>Foreløpig anbefalt KI-rolle:</span>
                        <strong style={{ display: 'block', fontSize: '1.25rem', color: activeTask.expectedAllowedRole === 'utforskende_støtte' ? 'var(--text-secondary)' : 'var(--accent)', marginTop: '4px' }}>
                          {activeTask.expectedAllowedRole === 'utforskende_støtte' ? 'KI som idégiver' :
                           activeTask.expectedAllowedRole === 'forsterket_skjønn' ? 'KI hjelper, du bestemmer' :
                           activeTask.expectedAllowedRole === 'strategisk_autonomi' ? 'KI handler innen gitte rammer' : 'Automatisert beslutning'}
                        </strong>
                        {(() => {
                          const stopRules = activeTask.expectedStopRules || []
                          if (stopRules.length === 0) return null
                          const allDiscussed = stopRules.every((sr) => stopRuleDiscussed[sr])
                          return (
                            <span style={{ display: 'inline-block', marginTop: '6px', fontSize: '0.75rem', fontWeight: 700, color: allDiscussed ? '#10b981' : '#b45309' }}>
                              {allDiscussed ? '✓ Avklart av gruppen' : 'Foreløpig — avklar forholdene over'}
                            </span>
                          )
                        })()}
                      </div>
                      {activeTask.expectedStopRules && activeTask.expectedStopRules.filter(sr => sr !== 'SR-05').length > 0 && (
                        <div style={{ textRendering: 'optimizeLegibility' }}>
                          <span className="small" style={{ color: 'var(--text-secondary)', display: 'block' }}>Begrenset fordi:</span>
                          <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px', fontSize: '0.8rem', color: 'var(--text-primary)' }}>
                            {activeTask.expectedStopRules.filter(sr => sr !== 'SR-05').map(sr => (
                              <li key={sr} style={{ marginBottom: '2px' }}>{STOP_RULES_MAP[sr] || sr}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Next Step Button */}
                    {(() => {
                      const stopRules = activeTask.expectedStopRules || []
                      const allDiscussed = stopRules.length === 0 || stopRules.every((sr) => stopRuleDiscussed[sr])
                      return (
                        <div style={{ marginTop: '24px', textAlign: 'right' }}>
                          {!allDiscussed && (
                            <p className="small" style={{ margin: '0 0 8px 0', color: '#b45309' }}>
                              Diskuter alle forhold over før du går videre.
                            </p>
                          )}
                          <button
                            className="btn btn-primary"
                            onClick={() => setStep(3)}
                            disabled={!allDiscussed}
                            style={{ padding: '10px 24px', fontWeight: 700, cursor: allDiscussed ? 'pointer' : 'not-allowed', opacity: allDiscussed ? 1 : 0.6 }}
                          >
                            Gå til risikovurdering →
                          </button>
                        </div>
                      )
                    })()}
                  </div>
                )}
              </div>

              {/* Right Column: Sticky Compass Visualizer or Blindtest Placeholder */}
              <div style={{ position: 'sticky', top: '100px' }}>
                {userBlindTestAnswer ? (
                  <>
                    <CompassView />
                    <div style={{ marginTop: '16px' }}>
                      <button
                        onClick={() => setIsExplainingFormula(!isExplainingFormula)}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          background: 'var(--bg-card)',
                          border: '1px solid var(--border)',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          color: 'var(--accent)',
                          transition: 'all 0.2s',
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span>💡</span> Slik virker vurderingen
                        </span>
                        <span>{isExplainingFormula ? '▲ Lukk' : '▼ Åpne'}</span>
                      </button>

                      {isExplainingFormula && (
                        <div className="fade-in" style={{
                          padding: '16px',
                          background: 'var(--bg-panel)',
                          border: '1px solid var(--border)',
                          borderTop: 'none',
                          borderBottomLeftRadius: '8px',
                          borderBottomRightRadius: '8px',
                          fontSize: '0.8125rem',
                          color: 'var(--text-secondary)',
                          lineHeight: '1.6',
                          textAlign: 'left',
                        }}>
                          <h4 style={{ margin: '0 0 8px 0', fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                            Slik virker den foreløpige vurderingen:
                          </h4>
                          <p style={{ margin: '0 0 12px 0' }}>
                            Her ser du hvordan poengene henger sammen med vurderingen. Vi viser dette slik at du alltid forstår hva som ligger bak.
                          </p>
                          <p style={{ margin: '0 0 10px 0' }}>
                            <strong>Poengene i saken:</strong>
                            <br />
                            • <strong>Hvor tydelige er målene:</strong> {activeTask.expectedModuleScores.målklarhet.score.toFixed(1)} av 5.0 (Er det klart hva et godt resultat betyr?)
                            <br />
                            • <strong>Kan det løses med faste regler:</strong> {activeTask.expectedModuleScores.separabilitet.score.toFixed(1)} av 5.0 (Kan oppgaven løses med faste regler, eller trengs det menneskelig vurdering?)
                          </p>
                          <p style={{ margin: '0 0 12px 0' }}>
                            <strong>Hvordan krysset plasseres i diagrammet:</strong>
                            <br />
                            {calculationModel === 'linear' && (
                              <span>
                                Prikken vises rett ut fra poengene. Ingen justeringer i bakgrunnen.
                              </span>
                            )}
                            {calculationModel === 'gmm' && (
                              <span>
                                Hvis det er stort sprik mellom de to poengene, trekkes prikken mot midten. Det viser at usikkerheten øker når svarene er svært ulike.
                              </span>
                            )}
                            {calculationModel === 'conservative' && (
                              <span>
                                Prikken styres av det laveste poenget ditt. Det betyr at vi ikke overvurderer — vi går ut fra det svakeste punktet.
                              </span>
                            )}
                          </p>
                          <div style={{ padding: '12px', background: 'rgba(2, 132, 199, 0.05)', borderRadius: '6px', borderLeft: '3px solid var(--accent)', margin: '12px 0 0 0' }}>
                            <strong style={{ display: 'block', marginBottom: '6px', color: 'var(--text-primary)' }}>
                              Foreløpig anbefaling:
                            </strong>
                            {activeTask.expectedModuleScores.målklarhet.score >= 3.0 ? (
                              activeTask.expectedModuleScores.separabilitet.score >= 3.0 ? (
                                <span>
                                  Begge poengene er 3.0 eller høyere. Det tyder på at oppgaven har tydelige mål og kan løses med faste regler.
                                  Foreløpig anbefaling: <strong>KI kan avgjøre alene</strong> (krever egen godkjenning).
                                  Dette er bare et utgangspunkt. Den endelige bruken avhenger av lokale risikovurderinger og at et menneske alltid tar den endelige avgjørelsen.
                                </span>
                              ) : (
                                <span>
                                  Målene er tydelige, men oppgaven krever menneskelig vurdering. Anbefaling: <strong>KI hjelper, dere bestemmer</strong>.
                                  KI gjør forarbeidet, men du gjør vurderingen og står ansvarlig.
                                </span>
                              )
                            ) : (
                              activeTask.expectedModuleScores.separabilitet.score >= 3.0 ? (
                                <span>
                                  Oppgaven kan følge faste regler, men målene er uklare. Anbefaling: <strong>KI kan handle innenfor tydelige rammer</strong>.
                                  Ledelsen må sette tydelige regler før KI tas i bruk, ellers risikerer man at KI jobber mot feil mål.
                                </span>
                              ) : (
                                <span>
                                  Begge poengene er under 3.0. Oppgaven har verken tydelige mål eller faste regler. Anbefaling: <strong>KI brukes bare som idégiver</strong>.
                                  KI bør bare brukes til å hente ideer, aldri til å ta avgjørelser.
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="card" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--border)' }}>
                    <h3 style={{ fontSize: '1.05rem', margin: '0 0 8px 0' }}>Kompasset er sperret</h3>
                    <p className="small" style={{ margin: 0 }}>Svar på spørsmålet til venstre først, så åpner kompasset seg og du ser hele vurderingen.</p>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* STEP 3: SCENARIOTENKING */}
          {currentStep === 3 && activeTask && (
            <div className="fade-up dashboard-grid-sidebar">

              {/* Left Column: Checkpoints and Scenarios */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <ScenarioCards />
                <CheckpointsAndReflections />
                <LensPanel />

                {/* Next Step Button */}
                {(() => {
                  const caseScenarios = (selectedCaseId && scenarios[selectedCaseId]) || []
                  const hasAnyScenarioContent = caseScenarios.some((s) => s.simulertHendelse.trim().length > 0)
                  return (
                    <div style={{ marginTop: '24px', textAlign: 'right' }}>
                      {!hasAnyScenarioContent && (
                        <p className="small" style={{ margin: '0 0 8px 0', color: '#b45309' }}>
                          Beskriv minst ett risikoscenario før du går videre.
                        </p>
                      )}
                      <button
                        className="btn btn-primary"
                        onClick={() => setStep(4)}
                        disabled={!hasAnyScenarioContent}
                        style={{ padding: '10px 24px', fontWeight: 700, cursor: hasAnyScenarioContent ? 'pointer' : 'not-allowed', opacity: hasAnyScenarioContent ? 1 : 0.6 }}
                      >
                        Gå til beslutningsnotat →
                      </button>
                    </div>
                  )
                })()}
              </div>

              {/* Right Column: Compass */}
              <div style={{ position: 'sticky', top: '100px' }}>
                <CompassView />
              </div>

            </div>
          )}

          {/* STEP 4: BESLUTNINGSNOTAT */}
          {currentStep === 4 && activeTask && (
            <div className="fade-up dashboard-grid-sidebar">

              {/* Left Column: The Full Decision Log report + Export */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <AssessmentStatusBar task={activeTask} />
                <LensPanel />
                <DecisionLog />
                <ExportPanel />
              </div>

              {/* Right Column: Compass */}
              <div style={{ position: 'sticky', top: '100px' }}>
                <CompassView />
              </div>

            </div>
          )}

        </div>
      </main>
    </div>
  )
}
