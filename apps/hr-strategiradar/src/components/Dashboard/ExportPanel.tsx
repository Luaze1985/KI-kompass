import { useAppStore } from '../../store/store'
import { generateReport, generateJsonExport } from '../../services/reportService'

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
  const scenarios = caseId ? (allScenarios[caseId] || []) : []

  if (!project || !task || !judgments) {
    return null
  }

  const safeFilename = project.caseId.toLowerCase().replace(/[^a-z0-9-]/g, '_')

  function handleMarkdownExport() {
    if (!project || !task || !judgments) return
    const md = generateReport(project, task, judgments, decisionLog, scenarios)
    downloadFile(md, `beslutningsnotat_${safeFilename}.md`, 'text/markdown;charset=utf-8')
  }

  function handleJsonExport() {
    if (!project || !task || !judgments) return
    const json = generateJsonExport(project, task, judgments, decisionLog, scenarios)
    downloadFile(json, `vurdering_${safeFilename}.json`, 'application/json;charset=utf-8')
  }

  return (
    <div style={{ padding: '16px', borderTop: '1px solid var(--border, #e0e0e0)' }}>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted, #666)', marginBottom: 12 }}>
        Dette er et utkast fra workshopen. Må gjennomgås av ansvarlig før bruk.
      </p>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={handleMarkdownExport} aria-label="Last ned Markdown">
          Last ned Markdown
        </button>
        <button onClick={handleJsonExport} aria-label="Last ned JSON">
          Last ned JSON
        </button>
      </div>
    </div>
  )
}
