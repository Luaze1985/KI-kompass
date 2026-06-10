import { useState } from 'react'
import { useAppStore } from '../../store/store'
import { generateLensPrompt } from '../../services/lensPromptService'
import { STOP_RULES_MAP } from '../../services/mockDiagnosisService'

const VALUE_JUDGMENT_LABELS: Record<string, string> = {
  rightsOrWorkImpact: 'Påvirker rettigheter eller arbeidsforhold',
  sensitiveOrPersonalDataRisk: 'Sensitiv eller personlig datarisiko',
  localExceptionsMatter: 'Lokale unntak er viktige',
  errorReversible: 'Feil er reverserbare',
}

export default function LensPanel() {
  const project = useAppStore((s) => s.activeProject)
  const task = useAppStore((s) => s.activeTask)
  const caseId = useAppStore((s) => s.selectedCaseId)
  const allScenarios = useAppStore((s) => s.scenarios)
  const userBlindTestAnswer = useAppStore((s) => s.userBlindTestAnswer)
  const lensFeedback = useAppStore((s) => s.lensFeedback)
  const setLensFeedback = useAppStore((s) => s.setLensFeedback)
  const isMakerChecked = useAppStore((s) => s.isMakerChecked)
  const stopRuleDiscussed = useAppStore((s) => s.stopRuleDiscussed)
  const valueJudgments = useAppStore((s) => s.valueJudgments)
  const checkpointAnswers = useAppStore((s) => s.checkpointAnswers)

  const [copied, setCopied] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)
  const [showSummary, setShowSummary] = useState(false)

  if (!project || !task) return null

  const scenarios = caseId ? allScenarios[caseId] || [] : []
  const prompt = generateLensPrompt(project, task, scenarios, userBlindTestAnswer)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setShowPrompt(true)
    }
  }

  const stopRules = task.expectedStopRules || []
  const discussedRules = stopRules.filter((sr) => stopRuleDiscussed[sr])
  const answeredCheckpoints = Object.values(checkpointAnswers).filter((v) => v !== null).length
  const answeredJudgments = (Object.keys(VALUE_JUDGMENT_LABELS) as (keyof typeof valueJudgments)[]).filter(
    (k) => valueJudgments[k] !== null && valueJudgments[k] !== undefined
  )

  return (
    <div className="card" style={{ padding: '24px', border: '1px solid var(--border)' }}>
      <h3 style={{ margin: '0 0 6px 0', fontSize: '1rem', color: 'var(--text-primary)' }}>
        Hent innspill fra linsene
      </h3>
      <p className="small" style={{ color: 'var(--text-secondary)', margin: '0 0 16px 0', maxWidth: '70ch' }}>
        Kopier prompten under, lim den inn i din linse-LLM, og lim svaret tilbake i feltet nederst.
        Innspillene blir med i beslutningsnotatet.
      </p>

      {/* Collapsible summary of answered items */}
      <div style={{ marginBottom: '16px', border: '1px solid var(--border-light)', borderRadius: '8px', overflow: 'hidden' }}>
        <button
          onClick={() => setShowSummary((v) => !v)}
          style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#f8fafc', border: 'none', cursor: 'pointer', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}
        >
          <span>Hva dere har svart til nå</span>
          <span style={{ fontSize: '0.7rem' }}>{showSummary ? '▲' : '▼'}</span>
        </button>
        {showSummary && (
          <div style={{ padding: '12px 14px', background: '#ffffff', fontSize: '0.8125rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {stopRules.length > 0 && (
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Avklarte forhold ({discussedRules.length}/{stopRules.length}):
                </div>
                <ul style={{ margin: 0, paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {stopRules.map((sr) => (
                    <li key={sr} style={{ color: stopRuleDiscussed[sr] ? '#10b981' : 'var(--text-secondary)' }}>
                      {stopRuleDiscussed[sr] ? '✓ ' : '○ '}{STOP_RULES_MAP[sr] || sr}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {answeredJudgments.length > 0 && (
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Felles vurdering ({answeredJudgments.length}/{Object.keys(VALUE_JUDGMENT_LABELS).length}):
                </div>
                <ul style={{ margin: 0, paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {answeredJudgments.map((k) => (
                    <li key={k} style={{ color: 'var(--text-primary)' }}>
                      {VALUE_JUDGMENT_LABELS[k]}: <strong>{valueJudgments[k] ? 'Ja' : 'Nei'}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {answeredCheckpoints > 0 && (
              <div style={{ color: 'var(--text-secondary)' }}>
                Sjekkpunktsvar: <strong>{answeredCheckpoints}</strong> besvart
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
        <button
          className="btn btn-primary"
          onClick={handleCopy}
          disabled={isMakerChecked}
          style={{ padding: '8px 16px', fontSize: '0.875rem', fontWeight: 700 }}
        >
          {copied ? '✓ Kopiert' : 'Kopier prompt'}
        </button>
        <button
          className="btn btn-outline"
          onClick={() => setShowPrompt((v) => !v)}
          style={{ padding: '8px 16px', fontSize: '0.875rem' }}
        >
          {showPrompt ? 'Skjul prompt' : 'Vis prompt'}
        </button>
      </div>

      {showPrompt && (
        <pre
          style={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            background: 'var(--bg-panel, #f8fafc)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '14px',
            fontSize: '0.8125rem',
            lineHeight: 1.5,
            color: 'var(--text-primary)',
            maxHeight: '320px',
            overflowY: 'auto',
            marginBottom: '16px',
            fontFamily: "'Segoe UI', system-ui, sans-serif",
          }}
        >
          {prompt}
        </pre>
      )}

      <label
        htmlFor="lens-feedback"
        style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}
      >
        Tilbakemelding fra linsene
      </label>
      <textarea
        id="lens-feedback"
        value={lensFeedback}
        onChange={(e) => setLensFeedback(e.target.value)}
        disabled={isMakerChecked}
        rows={6}
        placeholder="Lim inn svaret fra linse-LLM-en her..."
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '0.875rem',
          borderRadius: '8px',
          background: 'var(--bg-input)',
          border: '1px solid var(--border)',
          color: 'var(--text-primary)',
          resize: 'vertical',
          lineHeight: 1.5,
        }}
      />
    </div>
  )
}
