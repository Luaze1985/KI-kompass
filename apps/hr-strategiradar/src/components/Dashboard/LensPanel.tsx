import { useState } from 'react'
import { useAppStore } from '../../store/store'
import { generateLensPrompt } from '../../services/lensPromptService'

export default function LensPanel() {
  const project = useAppStore((s) => s.activeProject)
  const task = useAppStore((s) => s.activeTask)
  const caseId = useAppStore((s) => s.selectedCaseId)
  const allScenarios = useAppStore((s) => s.scenarios)
  const userBlindTestAnswer = useAppStore((s) => s.userBlindTestAnswer)
  const lensFeedback = useAppStore((s) => s.lensFeedback)
  const setLensFeedback = useAppStore((s) => s.setLensFeedback)
  const isMakerChecked = useAppStore((s) => s.isMakerChecked)

  const [copied, setCopied] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)

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

  return (
    <div className="card" style={{ padding: '24px', border: '1px solid var(--border)' }}>
      <h3 style={{ margin: '0 0 6px 0', fontSize: '1rem', color: 'var(--text-primary)' }}>
        Hent innspill fra linsene
      </h3>
      <p className="small" style={{ color: 'var(--text-secondary)', margin: '0 0 16px 0', maxWidth: '70ch' }}>
        Kopier prompten under, lim den inn i din linse-LLM, og lim svaret tilbake i feltet nederst.
        Innspillene blir med i beslutningsnotatet.
      </p>

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
