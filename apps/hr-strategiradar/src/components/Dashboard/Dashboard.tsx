import { useState } from 'react'
import { useAppStore } from '../../store/store'
import { allCases } from '../../fixtures/all-cases'
import { calculateCompassPosition, getSystemProposal, STOP_RULE_QUESTIONS } from '../../services/mockDiagnosisService'
import CompassView from './CompassView'
import CheckpointsAndReflections from './CheckpointsAndReflections'
import DecisionLog from './DecisionLog'
import ScenarioCards from './ScenarioCards'

const CASES = [
  { id: 'HRR-01', label: 'Seniorbevaring i hjemmetjenesten' },
  { id: 'HRR-02', label: 'Gradert sykefravær og tilrettelegging' },
  { id: 'HRR-04', label: 'Rekruttering av helsefagkompetanse' },
  { id: 'HRR-07', label: 'Langvakter i helsesektoren' },
]

function RegulationsModule({ compact = false }: { compact?: boolean }) {
  const [activeTab, setActiveTab] = useState<'eu' | 'national' | 'internal' | null>(null)

  const toggleTab = (tab: 'eu' | 'national' | 'internal') => {
    setActiveTab(activeTab === tab ? null : tab)
  }

  return (
    <div className="card" style={{ padding: compact ? '16px' : '24px', border: '1px solid var(--border)', background: '#ffffff' }}>
      <h3 style={{ margin: '0 0 8px 0', fontSize: compact ? '0.9375rem' : '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>🚦</span> Innebygd Lovverk & Retningslinjer
      </h3>
      <p className="small" style={{ color: 'var(--text-secondary)', margin: '0 0 16px 0' }}>
        Ferdig integrerte og lovpålagte krav for bruk av kunstig intelligens i HR- og HMS-arbeid. Klikk på hvert punkt for å lese detaljer og krav.
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
              <span>🇪🇺</span> EU AI Act (Høyrisiko-status)
            </span>
            <span style={{
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#dc2626',
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
                <strong>Vedlegg III, punkt 4:</strong> Bruk av KI til rekruttering, utvelgelse, turnusplanlegging, forfremmelse, oppsigelse eller evaluering av ansatte er klassifisert som <strong>Høyrisiko</strong>.
              </p>
              <p style={{ margin: '0 0 8px 0' }}>
                Dette betyr at systemet <strong>må</strong> ha innebygde barrierer for:
              </p>
              <ul style={{ margin: '0', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li><strong>Menneskelig overvåking (Human Oversight):</strong> KI-systemet kan aldri ta automatiske beslutninger uten reell menneskelig overprøving.</li>
                <li><strong>Gjennomsiktighet:</strong> Berørte ansatte eller søkere har rett til å vite at de evalueres av eller med bistand fra en algoritme.</li>
                <li><strong>Cybersikkerhet og robusthet:</strong> Systemet må sikres mot feil og manipulering.</li>
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
              color: '#d97706',
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
                <li><strong>Respekt for menneskelig autonomi:</strong> Brukeren må beholde fullt handlingsrom og ikke presses til å følge KI-anbefalinger blindt.</li>
                <li><strong>Rettferdighet og mangfold:</strong> Algoritmer must testes for skjevheter (bias) og hindre diskriminering basert på kjønn, alder eller etnisk bakgrunn.</li>
                <li><strong>Forklarbarhet:</strong> Logikken bak en beslutning må kunne forklares på en enkel og forståelig måte for den ansatte.</li>
              </ul>
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
              color: '#059669',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 700,
            }}>
              Kontekstavhengig
            </span>
          </button>
          {activeTab === 'internal' && (
            <div style={{ padding: '12px', background: '#ffffff', fontSize: '0.8125rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-light)', lineHeight: '1.6' }}>
              <p style={{ margin: '0 0 8px 0' }}>
                Lokale kjøreregler for verifisering og medbestemmelse:
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
    freeText,
    setFreeText,
    isMakerChecked,
    scenarios,
    userBlindTestAnswer,
    setUserBlindTestAnswer,
    stopRuleDiscussed,
    setStopRuleDiscussed,
  } = useAppStore()

  const project = allCases.find((c) => c.caseId === selectedCaseId)
  const systemProposal = selectedCaseId ? getSystemProposal(selectedCaseId) : null

  const handleCaseSelect = (caseId: string) => {
    if (isMakerChecked) return
    setSelectedCaseId(caseId)
    confirmAssumptions(false) // Reset confirmation on case change
    const proj = allCases.find((c) => c.caseId === caseId)
    if (proj && proj.aiUseTasks.length > 0) {
      const defaultTask = proj.aiUseTasks[0]
      const compass = calculateCompassPosition(defaultTask)
      setActiveData(proj, defaultTask, compass)
    }
  }

  const handleConfirmAssumptions = () => {
    confirmAssumptions(true)
    setStep(2)
  }

  const steps = [
    { num: 1, label: '1. Beskriv saken', disabled: isMakerChecked },
    { num: 2, label: '2. Foreløpig KI-diagnose', disabled: !selectedCaseId || !isAssumptionsConfirmed },
    { num: 3, label: '3. Scenariotenking', disabled: !selectedCaseId || !isAssumptionsConfirmed },
    { num: 4, label: '4. Beslutningsnotat', disabled: !selectedCaseId || !isAssumptionsConfirmed },
  ]

  const contextualQuestions = selectedCaseId ? (selectedCaseId === 'HRR-01' ? [
    'Gjelder saken konkrete senioransatte eller policy på gruppenivå?',
    'Er formålet å beholde folk lenger, eller å forstå hvorfor de slutter?',
  ] : selectedCaseId === 'HRR-02' ? [
    'Skal KI hjelpe med møtestruktur, eller med selve tilretteleggingen?',
    'Involverer saken helseopplysninger?',
  ] : selectedCaseId === 'HRR-04' ? [
    'Skal KI hjelpe med kravprofil/utlysning, eller med å vurdere kandidater?',
    'Er det fare for diskriminering i utvelgelsen?',
  ] : selectedCaseId === 'HRR-07' ? [
    'Gjelder det vakter over 12,5 timer?',
    'Er tillitsvalgte og verneombud involvert?',
  ] : []) : []

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column' }}>

      {/* Header with Step Progress Bar */}
      <header
        style={{
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg-sidebar)',
          backdropFilter: 'blur(20px)',
          padding: '16px 32px',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
        }}
      >
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
                  border: isActive ? '1px solid var(--accent-hover)' : '1px solid transparent',
                  background: isActive ? 'var(--accent)' : 'transparent',
                  color: isActive ? '#fff' : isSelectable ? 'var(--text-primary)' : 'var(--text-muted)',
                  cursor: isSelectable ? 'pointer' : 'not-allowed',
                  transition: 'all 0.1s ease',
                }}
              >
                {st.label}
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

          {/* STEP 1: BESKRIV SAKEN */}
          {currentStep === 1 && (
            <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }}>
                  {/* Left Column: Low-friction intake input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div className="card" style={{ padding: '24px' }}>
                  <h2 style={{ fontSize: '1.25rem', marginTop: 0, marginBottom: '8px', color: 'var(--text-primary)' }}>Steg 1: Beskriv din sak</h2>
                  <p className="small" style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                    Start med et lavt inntaksnivå. Velg et fagfelt vi har kildedekning for, og fortell oss kort hva saken gjelder.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Case Selector Dropdown */}
                    <div>
                      <label htmlFor="case-select-dashboard" style={{ fontWeight: 600, fontSize: '0.875rem', display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                        Fagfelt vi har grunnlag for å vurdere:
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
                        <h4 style={{ margin: '0 0 12px 0', fontSize: '0.875rem' }}>Fokusspørsmål for saken:</h4>
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

                    {/* Free Text Input */}
                    <div>
                      <label htmlFor="case-free-text" style={{ fontWeight: 600, fontSize: '0.875rem', display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                        Beskrivelse med egne ord (fritekst):
                      </label>
                      <textarea
                        id="case-free-text"
                        value={freeText}
                        onChange={(e) => setFreeText(e.target.value)}
                        disabled={isMakerChecked || !selectedCaseId}
                        rows={4}
                        style={{
                          width: '100%',
                          padding: '12px',
                          fontSize: '0.875rem',
                          borderRadius: '8px',
                          border: '1px solid var(--border)',
                          background: selectedCaseId ? 'var(--bg-input)' : 'rgba(0,0,0,0.1)',
                          color: 'var(--text-primary)',
                          cursor: !selectedCaseId ? 'not-allowed' : 'text',
                        }}
                        placeholder={selectedCaseId ? "Beskriv saken din her med 1-2 setninger..." : "Velg et fagfelt ovenfor først..."}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: AI-Assisted Assumptions and proposals */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {!selectedCaseId ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div className="card" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--border)', background: '#ffffff' }}>
                      <h3 style={{ margin: '0 0 8px 0', color: 'var(--text-primary)' }}>Ingen sak valgt</h3>
                      <p className="small" style={{ margin: 0 }}>Velg din yrkesrolle og et fagområde til venstre for å starte diagnosen og hente systemets antakelser.</p>
                    </div>
                    <RegulationsModule />
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div className="card" style={{ padding: '24px', border: '1px solid var(--border)', background: '#ffffff' }}>
                      <h3 style={{ margin: '0 0 16px 0', fontSize: '1rem', color: 'var(--text-primary)' }}>
                        Systemets oppstartsantakelser for saken
                      </h3>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* Proposed Case File */}
                        <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                          <span className="small" style={{ color: 'var(--text-secondary)', display: 'block', fontWeight: 600 }}>Foreslått saksmappe:</span>
                          <strong style={{ fontSize: '0.875rem' }}>{selectedCaseId}: {project?.title}</strong>
                        </div>

                        {/* Proposed Task / Unit of evaluation */}
                        <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderLeft: '3px solid var(--accent)' }}>
                          <span className="small" style={{ color: 'var(--text-secondary)', display: 'block', fontWeight: 600 }}>Foreslått konkret KI-bruksoppgave (Vurderingsenhet):</span>
                          <strong style={{ fontSize: '0.875rem', color: 'var(--accent)' }}>{activeTask?.title}</strong>
                          <p className="small" style={{ margin: '6px 0 0 0', color: 'var(--text-secondary)' }}>
                            Merk: Vi vurderer denne deloppgaven, ikke hele HR-prosjektet under ett.
                          </p>
                        </div>

                        {/* AI-Assumed active themes / randsoner */}
                        {systemProposal && (
                          <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                            <span className="small" style={{ color: 'var(--text-secondary)', display: 'block', fontWeight: 600 }}>Foreslåtte aktive fagfelt / randsoner:</span>
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
                          <span className="small" style={{ color: 'var(--text-secondary)', display: 'block', fontWeight: 600 }}>Må avklares lokalt av gruppen:</span>
                          <ul style={{ margin: '6px 0 0 0', paddingLeft: '16px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            {project?.uncertainties.map((u, index) => (
                              <li key={index}>{u}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Active Confirmation Button */}
                        <div style={{ marginTop: '12px', borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
                          <p className="small" style={{ color: 'var(--text-secondary)', margin: '0 0 12px 0', textAlign: 'center' }}>
                            Prosjektgruppen må bekrefte disse antakelsene før vi kan generere en foreløvig KI-diagnose.
                          </p>
                          <button
                            className="btn btn-primary"
                            onClick={handleConfirmAssumptions}
                            style={{ width: '100%', padding: '12px', fontSize: '1rem', fontWeight: 700 }}
                          >
                            Bekreft antakelser og gå til diagnose →
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
            <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px', alignItems: 'start' }}>

              {/* Left Column: Blindtest OR full Diagnosis */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                {!userBlindTestAnswer ? (
                  <div className="card" style={{ padding: '32px', border: '1px solid var(--border)' }}>
                    <h2 style={{ fontSize: '1.25rem', marginTop: 0, marginBottom: '8px', color: 'var(--text-primary)' }}>
                      Menneskelig avsjekk (Blindtest)
                    </h2>
                    <p className="small" style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                      For å sikre uavhengig dømmekraft og motvirke blind tillit til maskinen (overreliance), ber vi prosjektgruppen om å vurdere risikoen først.
                      Hvilken tillatt KI-rolle mener dere er mest forsvarlig for denne oppgaven basert på beskrivelsen?
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {[
                        {
                          key: 'utforskende_støtte',
                          title: 'KI som sparringspartner (Lavest risiko)',
                          desc: 'KI brukes kun til idémyldring, utkast eller språkvask. Ingen direkte beslutningsstøtte.',
                        },
                        {
                          key: 'forsterket_skjønn',
                          title: 'KI hjelper, gruppen bestemmer (Moderat risiko)',
                          desc: 'KI foreslår struktur og momenter, men gruppen utfører alt reelt skjønnsarbeid.',
                        },
                        {
                          key: 'strategisk_autonomi',
                          title: 'Strategisk autonomi (Ekstrem/strategisk risiko)',
                          desc: 'KI handler selvstendig innenfor gitte rammer. Ledelsen må definere strategiske og etiske grenser.',
                        },
                        {
                          key: 'automatisert_beslutning',
                          title: 'Automatisert beslutning (Ekstrem risiko)',
                          desc: 'KI tar avgjørelser på egen hånd. Dette krever særskilt godkjenning og frarådes for HR-oppgaver.',
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
                        <h2 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--text-primary)' }}>Steg 2: Foreløpig KI-diagnose</h2>
                        <p className="small" style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
                          Her er systemets beregnede risikoprofil sammenlignet med gruppens vurdering.
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn btn-outline" style={{ fontSize: '0.875rem', padding: '6px 12px' }} onClick={() => setUserBlindTestAnswer(null)}>
                          Resett blindtest
                        </button>
                        <button className="btn btn-outline" style={{ fontSize: '0.875rem', padding: '6px 12px' }} onClick={() => setStep(1)}>
                          ← Endre antakelser
                        </button>
                      </div>
                    </div>

                    {/* Menneskelig vs. Maskin Sammenligning */}
                    <div style={{ padding: '16px', background: 'var(--bg-input)', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '24px' }}>
                      <h4 style={{ margin: '0 0 12px 0', fontSize: '0.875rem', color: 'var(--text-primary)' }}>Refleksjonsavsjekk (Human-in-the-loop)</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div style={{ padding: '12px', background: '#ffffff', borderRadius: '6px', border: '1px solid var(--border)' }}>
                          <span className="small" style={{ color: 'var(--text-secondary)', display: 'block' }}>Gruppens anslag:</span>
                          <strong style={{ color: 'var(--accent)' }}>
                            {userBlindTestAnswer === 'utforskende_støtte' ? 'KI som sparringspartner' :
                             userBlindTestAnswer === 'forsterket_skjønn' ? 'KI hjelper, gruppen bestemmer' :
                             userBlindTestAnswer === 'strategisk_autonomi' ? 'KI handler innen gitte rammer' : 'Automatisert beslutning'}
                          </strong>
                        </div>
                        <div style={{ padding: '12px', background: '#ffffff', borderRadius: '6px', border: '1px solid var(--border)' }}>
                          <span className="small" style={{ color: 'var(--text-secondary)', display: 'block' }}>Systemets beregning:</span>
                          <strong style={{ color: 'var(--accent)' }}>
                            {activeTask.expectedAllowedRole === 'utforskende_støtte' ? 'KI som sparringspartner' :
                             activeTask.expectedAllowedRole === 'forsterket_skjønn' ? 'KI hjelper, gruppen bestemmer' :
                             activeTask.expectedAllowedRole === 'strategisk_autonomi' ? 'KI handler innen gitte rammer' : 'Automatisert beslutning'}
                          </strong>
                        </div>
                      </div>

                      <div style={{ marginTop: '12px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        {userBlindTestAnswer === activeTask.expectedAllowedRole ? (
                          <p style={{ margin: 0, color: '#10b981' }}>
                            ✓ <strong>Samsvar!</strong> Gruppen og systemet kom frem til samme tillatte rolle.
                          </p>
                        ) : (
                          <p style={{ margin: 0, color: 'var(--accent)' }}>
                            <strong>Avvik:</strong> Gruppens vurdering avviker fra systemets diagnose. Diskuter om dere har overvurdert eller undervurdert risikoen.
                          </p>
                        )}
                      </div>
                    </div>

                    <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-light)', marginBottom: '24px' }}>
                      <span className="small" style={{ color: 'var(--text-secondary)', display: 'block', fontWeight: 600 }}>Vurderingsenhet (Deloppgave):</span>
                      <strong style={{ fontSize: '1rem' }}>{activeTask.title}</strong>
                      <p style={{ margin: '6px 0 0 0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        Inndata: <strong>{activeTask.inputDataType}</strong> | Menneskelig beslutningspunkt: <strong>{activeTask.humanDecisionPoint}</strong>
                      </p>
                    </div>

                    {/* Avklaringsspørsmål til gruppen */}
                    <div style={{ marginBottom: '24px' }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
                        Spørsmål gruppen må avklare
                      </h3>
                      <p className="small" style={{ color: 'var(--text-secondary)', margin: '0 0 12px 0' }}>
                        Hak av etter hvert som gruppen diskuterer og er enig om svaret.
                      </p>

                      {activeTask.expectedStopRules && activeTask.expectedStopRules.length > 0 ? (
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
                          Ingen lokale avklaringer nødvendig. Saken har lav risiko under de gitte antakelsene.
                        </div>
                      )}
                    </div>

                    {/* Allowed Role Cap */}
                    <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                      <div>
                        <span className="small" style={{ color: 'var(--text-secondary)' }}>Foreløpig tillatt KI-rolle (Etter avklaringer):</span>
                        <strong style={{ display: 'block', fontSize: '1.25rem', color: activeTask.expectedAllowedRole === 'utforskende_støtte' ? 'var(--text-secondary)' : 'var(--accent)', marginTop: '4px' }}>
                          {activeTask.expectedAllowedRole === 'utforskende_støtte' ? 'KI som sparringspartner' :
                           activeTask.expectedAllowedRole === 'forsterket_skjønn' ? 'KI hjelper, du bestemmer' :
                           activeTask.expectedAllowedRole === 'strategisk_autonomi' ? 'KI handler innen gitte rammer' : 'Automatisert beslutning'}
                        </strong>
                      </div>
                      <div style={{ textRendering: 'optimizeLegibility' }}>
                        <span className="small" style={{ color: 'var(--text-secondary)', display: 'block' }}>Rolle-tak pålagt:</span>
                        <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                          {activeTask.expectedAllowedRole !== activeTask.expectedCalculatedRole ? 'Ja (pga. stoppregler)' : 'Nei'}
                        </span>
                      </div>
                    </div>

                    {/* Next Step Button */}
                    <div style={{ marginTop: '24px', textAlign: 'right' }}>
                      <button
                        className="btn btn-primary"
                        onClick={() => setStep(3)}
                        style={{ padding: '10px 24px', fontWeight: 700 }}
                      >
                        Gå til scenariotenking →
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Sticky Compass Visualizer or Blindtest Placeholder */}
              <div style={{ position: 'sticky', top: '100px' }}>
                {userBlindTestAnswer ? (
                  <CompassView />
                ) : (
                  <div className="card" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--border)' }}>
                    <h3 style={{ fontSize: '1.05rem', margin: '0 0 8px 0' }}>KI-kompasset er låst</h3>
                    <p className="small" style={{ margin: 0 }}>Gjør din menneskelige blindtest-vurdering til venstre for å låse opp det visuelle kompasset og den fullstendige diagnosen.</p>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* STEP 3: SCENARIOTENKING */}
          {currentStep === 3 && activeTask && (
            <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px', alignItems: 'start' }}>

              {/* Left Column: Checkpoints and Scenarios */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <CheckpointsAndReflections />
                <ScenarioCards />

                {/* Next Step Button */}
                <div style={{ marginTop: '24px', textAlign: 'right' }}>
                  <button
                    className="btn btn-primary"
                    onClick={() => setStep(4)}
                    style={{ padding: '10px 24px', fontWeight: 700 }}
                  >
                    Gå til beslutningsnotat →
                  </button>
                </div>
              </div>

              {/* Right Column: Compass */}
              <div style={{ position: 'sticky', top: '100px' }}>
                <CompassView />
              </div>

            </div>
          )}

          {/* STEP 4: BESLUTNINGSNOTAT */}
          {currentStep === 4 && activeTask && (
            <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px', alignItems: 'start' }}>

              {/* Left Column: The Full Decision Log report */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <DecisionLog />
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
