import { useAppStore } from '../../store/store'
import { getContextualQuestions } from '../../services/mockDiagnosisService'

export default function CheckpointsAndReflections() {
  const {
    activeTask,
    selectedCaseId,
    checkpointAnswers,
    setCheckpointAnswer,
    valueJudgments,
    setSimplifiedQuestionAnswer,
    isMakerChecked
  } = useAppStore()

  if (!activeTask || !selectedCaseId) return null

  const contextualQuestions = getContextualQuestions(selectedCaseId)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Contextual Checkpoints */}
      {contextualQuestions.length > 0 && (
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '1rem' }}>Dette må dere avklare</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {contextualQuestions.map((q, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.875rem' }}>{q}</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    aria-label={`${q} Ja`}
                    className={`btn ${checkpointAnswers[i] === 'yes' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setCheckpointAnswer(i, 'yes')}
                    disabled={isMakerChecked}
                    style={{ padding: '6px 12px', fontSize: '0.875rem', cursor: isMakerChecked ? 'not-allowed' : 'pointer' }}
                  >
                    Ja
                  </button>
                  <button
                    aria-label={`${q} Nei`}
                    className={`btn ${checkpointAnswers[i] === 'no' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setCheckpointAnswer(i, 'no')}
                    disabled={isMakerChecked}
                    style={{ padding: '6px 12px', fontSize: '0.875rem', cursor: isMakerChecked ? 'not-allowed' : 'pointer' }}
                  >
                    Nei
                  </button>
                  <button
                    aria-label={`${q} Uklart`}
                    className={`btn ${checkpointAnswers[i] === 'info' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setCheckpointAnswer(i, 'info')}
                    disabled={isMakerChecked}
                    style={{ padding: '6px 12px', fontSize: '0.875rem', cursor: isMakerChecked ? 'not-allowed' : 'pointer' }}
                  >
                    Uklart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Simplified Toggles */}
      <div className="card" style={{ padding: '24px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '1rem' }}>Felles vurdering</h3>
        <p className="small" style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
          Svarene påvirker vurderingen og viser hva som må sjekkes nærmere.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <Toggle
            label="Påvirker ansattes rettigheter?"
            value={valueJudgments.rightsOrWorkImpact}
            onChange={(val) => setSimplifiedQuestionAnswer('rights', val)}
            disabled={isMakerChecked}
          />
          <Toggle
            label="Brukes personlige eller sensitive opplysninger?"
            value={valueJudgments.sensitiveOrPersonalDataRisk}
            onChange={(val) => setSimplifiedQuestionAnswer('sensitive', val)}
            disabled={isMakerChecked}
          />
          <Toggle
            label="Må du kjenne lokale forhold?"
            value={valueJudgments.localExceptionsMatter}
            onChange={(val) => setSimplifiedQuestionAnswer('context', val)}
            disabled={isMakerChecked}
          />
          <Toggle
            label="Kan feil rettes opp?"
            value={valueJudgments.errorReversible}
            onChange={(val) => setSimplifiedQuestionAnswer('reversible', val)}
            disabled={isMakerChecked}
          />
        </div>
      </div>
    </div>
  )
}

function Toggle({ label, value, onChange, disabled = false }: { label: string, value: boolean | null, onChange: (v: boolean | null) => void, disabled?: boolean }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-light)', opacity: disabled ? 0.75 : 1 }}>
      <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '16px', color: 'var(--text-primary)' }}>{label}</div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          aria-label={`${label} Ja`}
          className={`btn ${value === true ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => onChange(true)}
          disabled={disabled}
          style={{ flex: 1, padding: '6px 8px', fontSize: '0.875rem', cursor: disabled ? 'not-allowed' : 'pointer' }}
        >
          Ja
        </button>
        <button
          aria-label={`${label} Nei`}
          className={`btn ${value === false ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => onChange(false)}
          disabled={disabled}
          style={{ flex: 1, padding: '6px 8px', fontSize: '0.875rem', cursor: disabled ? 'not-allowed' : 'pointer' }}
        >
          Nei
        </button>
        <button
          aria-label={`${label} Uklart`}
          className={`btn ${value === null ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => onChange(null)}
          disabled={disabled}
          style={{ flex: 1, padding: '6px 8px', fontSize: '0.875rem', cursor: disabled ? 'not-allowed' : 'pointer' }}
        >
          Uklart
        </button>
      </div>
    </div>
  )
}
