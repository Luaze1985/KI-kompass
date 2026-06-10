import { useAppStore } from '../../store/store'
import { generateReport, generateJsonExport } from '../../services/reportService'
import { compareBlindTestRole } from '../../services/mockDiagnosisService'

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

export default function ExportPanel() {
  const project = useAppStore(s => s.activeProject)
  const task = useAppStore(s => s.activeTask)
  const judgments = useAppStore(s => s.valueJudgments)
  const decisionLog = useAppStore(s => s.decisionLogText)
  const caseId = useAppStore(s => s.selectedCaseId)
  const allScenarios = useAppStore(s => s.scenarios)
  const userBlindTestAnswer = useAppStore(s => s.userBlindTestAnswer)
  const stopRuleDiscussed = useAppStore(s => s.stopRuleDiscussed)
  const scenarios = caseId ? (allScenarios[caseId] || []) : []

  if (!project || !task || !judgments) {
    return null
  }

  const stopRules = task.expectedStopRules || []
  const reportMeta = {
    blindTestComparison: compareBlindTestRole(userBlindTestAnswer, task.expectedAllowedRole),
    stopRulesDiscussed: stopRules.filter(sr => stopRuleDiscussed[sr]).length,
    totalStopRules: stopRules.length,
  }

  const hasAnyScenarioContent = scenarios.some(s => s.simulertHendelse.trim().length > 0)
  const safeFilename = project.caseId.toLowerCase().replace(/[^a-z0-9-]/g, '_')

  function handleMarkdownExport() {
    if (!project || !task || !judgments) return
    const md = generateReport(project, task, judgments, decisionLog, scenarios, reportMeta)
    downloadFile(md, `beslutningsnotat_${safeFilename}.md`, 'text/markdown;charset=utf-8')
  }

  function handleJsonExport() {
    if (!project || !task || !judgments) return
    const json = generateJsonExport(project, task, judgments, decisionLog, scenarios)
    downloadFile(json, `vurdering_${safeFilename}.json`, 'application/json;charset=utf-8')
  }

  return (
    <div style={{ padding: '16px', borderTop: '1px solid var(--border, #e0e0e0)' }}>
      {!hasAnyScenarioContent && (
        <p style={{ fontSize: '0.85rem', color: '#b45309', background: 'rgba(245, 158, 11, 0.1)', padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(245, 158, 11, 0.2)', marginBottom: 12 }}>
          Ingen risikoer er beskrevet ennå. Gå tilbake til steg 3 og fyll inn minst ett risikopunkt.
        </p>
      )}
      <p style={{ fontSize: '0.85rem', color: '#92400e', background: 'rgba(245, 158, 11, 0.08)', padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(245, 158, 11, 0.15)', marginBottom: 12 }}>
        Dette er et utkast fra workshopen. Må gjennomgås av ansvarlig før bruk.
      </p>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={handleMarkdownExport} aria-label="Last ned som tekstfil">
          Last ned som tekstfil
        </button>
        <button onClick={handleJsonExport} aria-label="Last ned som datafil">
          Last ned som datafil
        </button>
      </div>
    </div>
  )
}
