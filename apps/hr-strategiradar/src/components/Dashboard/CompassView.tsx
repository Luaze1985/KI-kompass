import { useAppStore } from '../../store/store'
import { ROLE_LABELS } from '../../services/mockDiagnosisService'

export default function CompassView() {
  const { activeTask, compassPosition } = useAppStore()

  if (!activeTask) return null

  // Retrieve scores
  const malklarhetScore = activeTask.expectedModuleScores.målklarhet.score
  const separabilitetScore = activeTask.expectedModuleScores.separabilitet.score

  // SVG settings
  const W = 300
  const H = 300
  const padding = 30
  const gW = W - 2 * padding // 240
  const gH = H - 2 * padding // 240

  // Coordinate mapping
  let cx = padding + 0.5 * gW
  let cy = padding + 0.5 * gH
  if (compassPosition) {
    cx = padding + compassPosition.x * gW
    cy = H - padding - compassPosition.y * gH
  }

  const role = activeTask.expectedAllowedRole || 'utforskende_støtte'
  const roleLabel = ROLE_LABELS[role] || role
  const roleColor = role === 'utforskende_støtte' ? 'var(--text-secondary)' : 'var(--accent)'

  const isHighMal = malklarhetScore >= 3.0
  const isHighSep = separabilitetScore >= 3.0
  const positionExplanation =
    isHighMal && isHighSep
      ? 'Oppgaven har relativt klare mål og kan skilles ut som en selvstendig prosess.'
      : isHighMal && !isHighSep
      ? 'Oppgaven har relativt klare mål, men krever lokalt skjønn og menneskelig vurdering.'
      : !isHighMal && isHighSep
      ? 'Oppgaven kan delvis standardiseres, men målene er ennå ikke tilstrekkelig klarlagt.'
      : 'Oppgaven krever både lokalkunnskap og skjønn. Målene må avklares før KI kan brukes.'

  const trafficLight = activeTask.expectedTrafficLight || 'yellow'

  const borderColors = {
    green: '#10b981',
    yellow: '#f59e0b',
    red: '#ef4444',
  }
  const statusLabels = {
    green: 'Kan jobbes videre med',
    yellow: 'Kreve manuelle avklaringer',
    red: 'Kritiske stoppregler utløst',
  }

  const activeColor = borderColors[trafficLight]

  return (
    <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', border: '1px solid var(--border)' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>KI-Kompass</h3>
        <span style={{
          color: activeColor,
          fontWeight: 700,
          fontSize: '0.75rem',
          border: `1px solid ${activeColor}`,
          padding: '2px 8px',
          borderRadius: '4px',
          background: `${activeColor}10`
        }}>
          {statusLabels[trafficLight]}
        </span>
      </div>

      {/* 4-Quadrant Clean SVG */}
      <div
        style={{
          width: `${W}px`,
          height: `${H}px`,
          position: 'relative',
          background: '#ffffff',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          overflow: 'hidden',
          marginBottom: '20px',
          userSelect: 'none',
        }}
      >
        <svg width={W} height={H} style={{ display: 'block' }}>
          {/* Quadrant Background Colors */}
          <rect x={padding} y={padding} width={gW / 2} height={gH / 2} fill="rgba(249, 115, 22, 0.08)" />
          <rect x={padding + gW / 2} y={padding} width={gW / 2} height={gH / 2} fill="rgba(16, 185, 129, 0.08)" />
          <rect x={padding} y={padding + gH / 2} width={gW / 2} height={gH / 2} fill="rgba(239, 68, 68, 0.08)" />
          <rect x={padding + gW / 2} y={padding + gH / 2} width={gW / 2} height={gH / 2} fill="rgba(245, 158, 11, 0.08)" />

          {/* Quadrant labels */}
          <text x={padding + gW / 4} y={padding + 14} textAnchor="middle" fontSize="8px" fill="rgba(249,115,22,0.7)" fontWeight="600">Skjønn</text>
          <text x={padding + gW / 4} y={padding + 24} textAnchor="middle" fontSize="8px" fill="rgba(249,115,22,0.7)" fontWeight="600">Klare mål</text>
          <text x={padding + 3 * gW / 4} y={padding + 14} textAnchor="middle" fontSize="8px" fill="rgba(16,185,129,0.8)" fontWeight="600">Standardisert</text>
          <text x={padding + 3 * gW / 4} y={padding + 24} textAnchor="middle" fontSize="8px" fill="rgba(16,185,129,0.8)" fontWeight="600">Klare mål</text>
          <text x={padding + gW / 4} y={H - padding - 14} textAnchor="middle" fontSize="8px" fill="rgba(239,68,68,0.7)" fontWeight="600">Skjønn</text>
          <text x={padding + gW / 4} y={H - padding - 4} textAnchor="middle" fontSize="8px" fill="rgba(239,68,68,0.7)" fontWeight="600">Vage mål</text>
          <text x={padding + 3 * gW / 4} y={H - padding - 14} textAnchor="middle" fontSize="8px" fill="rgba(245,158,11,0.8)" fontWeight="600">Standardisert</text>
          <text x={padding + 3 * gW / 4} y={H - padding - 4} textAnchor="middle" fontSize="8px" fill="rgba(245,158,11,0.8)" fontWeight="600">Vage mål</text>

          {/* Solid Axis lines in the middle (score = 3.0) */}
          <line
            x1={padding}
            y1={padding + gH / 2}
            x2={W - padding}
            y2={padding + gH / 2}
            stroke="#94a3b8"
            strokeWidth="1.5"
          />
          <line
            x1={padding + gW / 2}
            y1={padding}
            x2={padding + gW / 2}
            y2={H - padding}
            stroke="#94a3b8"
            strokeWidth="1.5"
          />

          {/* Axis Labels */}
          {/* Y-axis: Målklarhet */}
          <text
            x={-W / 2}
            y={12}
            transform="rotate(-90)"
            textAnchor="middle"
            fontSize="9px"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            Målklarhet (Vage ➔ Klare mål)
          </text>

          {/* X-axis: Separabilitet */}
          <text
            x={W / 2}
            y={H - 8}
            textAnchor="middle"
            fontSize="9px"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            Separabilitet (Skjønn ➔ Standardisert)
          </text>

          {/* Center Intersection Circle marker */}
          <circle
            cx={padding + gW / 2}
            cy={padding + gH / 2}
            r="3"
            fill="#94a3b8"
          />

          {/* Dynamic Compass Placement Dot */}
          <circle
            cx={cx}
            cy={cy}
            r="8"
            fill="#0284c7"
            stroke="#ffffff"
            strokeWidth="2.5"
            style={{ transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)' }}
          />

          {/* Outline target circle around the dot */}
          <circle
            cx={cx}
            cy={cy}
            r="14"
            fill="none"
            stroke="#0284c7"
            strokeWidth="1.2"
            strokeDasharray="2 2"
            style={{ transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)' }}
          />
        </svg>
      </div>

      {/* Position explanation */}
      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textAlign: 'center', margin: '0 0 16px 0', lineHeight: '1.4', padding: '0 4px' }}>
        {positionExplanation}
      </p>

      {/* Premium Traffic Light Display */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        background: '#f8fafc',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        padding: '12px 16px',
        width: '100%',
        marginBottom: '20px'
      }}>
        {/* The Traffic Light Bracket */}
        <div style={{
          background: '#1e293b',
          borderRadius: '24px',
          padding: '6px 5px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          width: '28px',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)',
          alignItems: 'center'
        }}>
          {/* Red Light */}
          <div style={{
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: trafficLight === 'red' ? '#ef4444' : '#450a0a',
            boxShadow: trafficLight === 'red' ? '0 0 10px #ef4444' : 'none',
            transition: 'all 0.2s ease'
          }} />
          {/* Yellow Light */}
          <div style={{
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: trafficLight === 'yellow' ? '#f59e0b' : '#451a03',
            boxShadow: trafficLight === 'yellow' ? '0 0 10px #f59e0b' : 'none',
            transition: 'all 0.2s ease'
          }} />
          {/* Green Light */}
          <div style={{
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: trafficLight === 'green' ? '#10b981' : '#064e3b',
            boxShadow: trafficLight === 'green' ? '0 0 10px #10b981' : 'none',
            transition: 'all 0.2s ease'
          }} />
        </div>

        {/* Traffic Light Explanation */}
        <div style={{ flex: 1 }}>
          <span className="small" style={{ color: 'var(--text-secondary)', display: 'block', fontWeight: 600 }}>Trafikklys-status:</span>
          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {trafficLight === 'red' ? 'Stopp og gjør grundig ROS-analyse' :
             trafficLight === 'yellow' ? 'Gjennomfør manuelle kontrolltiltak' :
             'OK for videre arbeid under normale rammer'}
          </span>
        </div>
      </div>

      {/* Text Coordinator Summary */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', background: '#f8fafc', border: '1px solid var(--border-light)', padding: '6px 12px', borderRadius: '4px', fontSize: '0.875rem', width: '100%', justifyContent: 'center' }}>
        <div>Separabilitet: <strong>{separabilitetScore.toFixed(2)} / 5.0</strong></div>
        <div style={{ borderLeft: '1px solid var(--border-light)', paddingLeft: '16px' }}>Målklarhet: <strong>{malklarhetScore.toFixed(2)} / 5.0</strong></div>
      </div>

      {/* Role Cap Notice */}
      <div style={{ textAlign: 'center', width: '100%', borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
        <span className="small" style={{ color: 'var(--text-secondary)' }}>Foreløpig tillatt KI-bruk etter avklaringer:</span>
        <strong style={{ display: 'block', fontSize: '1rem', color: roleColor, marginTop: '4px', fontWeight: 700 }}>
          {roleLabel}
        </strong>
      </div>
    </div>
  )
}
