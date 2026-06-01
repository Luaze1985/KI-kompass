import { useAppStore } from '../../store/store'
import { getDiagnosisDataForTask, calculateCompassPosition } from '../../services/mockDiagnosisService'
import { allCases } from '../../fixtures/all-cases'

const CASES = [
  { id: 'HRR-01', label: 'Seniorbevaring i hjemmetjenesten' },
  { id: 'HRR-02', label: 'Gradert sykefravær og tilrettelegging' },
  { id: 'HRR-04', label: 'Rekruttering av helsefagkompetanse' },
  { id: 'HRR-07', label: 'Langvakter i helsesektoren' },
]

export default function SidebarSelector() {
  const {
    selectedCaseId,
    setSelectedCaseId,
    activeTask,
    setActiveData,
    isMakerChecked,
    calculationModel,
  } = useAppStore()

  const project = allCases.find((c) => c.caseId === selectedCaseId)
  const tasks = project ? project.aiUseTasks : []

  const handleCaseSelect = (caseId: string) => {
    if (isMakerChecked) return
    setSelectedCaseId(caseId)
    const proj = allCases.find((c) => c.caseId === caseId)
    if (proj && proj.aiUseTasks.length > 0) {
      const defaultTask = proj.aiUseTasks[0]
      const compass = calculateCompassPosition(defaultTask, calculationModel)
      setActiveData(proj, defaultTask, compass)
    }
  }

  const handleTaskSelect = (taskId: string) => {
    if (isMakerChecked) return
    if (!selectedCaseId || !project) return
    const data = getDiagnosisDataForTask(selectedCaseId, taskId)
    if (data) {
      const compass = calculateCompassPosition(data.task, calculationModel)
      setActiveData(data.project, data.task, compass)
    }
  }

  return (
    <div className="sidebar-content" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <label htmlFor="case-select" style={{ fontWeight: 600, fontSize: '0.875rem', display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>
          Fagfelt vi har grunnlag for å vurdere
        </label>
        <select
          id="case-select"
          value={selectedCaseId || ''}
          onChange={(e) => handleCaseSelect(e.target.value)}
          disabled={isMakerChecked}
          style={{
            padding: '10px',
            fontSize: '0.875rem',
            border: '1px solid var(--border)',
            background: 'var(--bg-input)',
            color: 'var(--text-primary)',
            width: '100%',
            cursor: isMakerChecked ? 'not-allowed' : 'pointer',
          }}
        >
          <option value="" disabled>Velg fagfelt</option>
          {CASES.map((c) => (
            <option key={c.id} value={c.id}>{c.label}</option>
          ))}
        </select>
      </div>

      {project && tasks.length > 0 && (
        <div>
          <label style={{ fontWeight: 600, fontSize: '0.875rem', display: 'block', marginBottom: '12px', color: 'var(--text-muted)' }}>
            KI-bruksoppgave
          </label>
          <p className="small" style={{ margin: '-6px 0 12px 0', color: 'var(--text-secondary)' }}>
            Velg deloppgaven som skal vurderes. Dette er ikke hele HR-saken.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {tasks.map((task) => {
              const isSelected = activeTask?.taskId === task.taskId
              const isAggregated = task.taskId.endsWith('-A')
              return (
                <div
                  key={task.taskId}
                  onClick={() => handleTaskSelect(task.taskId)}
                  role="button"
                  aria-disabled={isMakerChecked}
                  tabIndex={isMakerChecked ? -1 : 0}
                  style={{
                    padding: '12px',
                    cursor: isMakerChecked ? 'not-allowed' : 'pointer',
                    border: isSelected ? '1px solid var(--accent)' : '1px solid transparent',
                    background: isSelected ? 'rgba(99,102,241,0.1)' : 'transparent',
                    borderRadius: 'var(--radius)',
                    transition: 'all 0.2s ease',
                    opacity: isMakerChecked && !isSelected ? 0.55 : 1,
                  }}
                >
                  <strong style={{ display: 'block', fontSize: '0.875rem', color: isSelected ? 'var(--accent)' : 'var(--text-primary)' }}>
                    {isAggregated ? 'Strukturere grunnlag' : 'Kan påvirke enkeltpersoner'}
                  </strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginTop: '4px' }}>
                    {task.title}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
