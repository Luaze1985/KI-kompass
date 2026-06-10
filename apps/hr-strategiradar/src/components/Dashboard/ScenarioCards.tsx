import { useState } from 'react'
import { useAppStore } from '../../store/store'

export default function ScenarioCards() {
  const { selectedCaseId, scenarios, updateScenarioField, isMakerChecked } = useAppStore()
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  if (!selectedCaseId) return null

  const activeScenarios = scenarios[selectedCaseId] || []

  if (activeScenarios.length === 0) return null

  const toggleExpand = (temaKey: string) => {
    setExpandedCard(expandedCard === temaKey ? null : temaKey)
  }

  const concernColors = {
    lav: { text: '#10b981', bg: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 0.2)' },
    middels: { text: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.2)' },
    høy: { text: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.2)' },
  }

  return (
    <div className="card" style={{ padding: '24px' }}>
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '1rem' }}>Tenk gjennom risiko</h3>
        <p className="small" style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
          Tenk gjennom hva som kan gå galt. Skriv ned hva dere er bekymret for under hvert tema.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {activeScenarios.map((sc) => {
          const isExpanded = expandedCard === sc.temaKey

          return (
            <div
              key={sc.temaKey}
              className="scenario-card"
              style={{
                border: '1px solid var(--border-light)',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.01)',
                padding: '16px',
                transition: 'all 0.3s ease',
              }}
            >
              {/* Card Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
                onClick={() => toggleExpand(sc.temaKey)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <strong style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                    {sc.temaTittel}
                  </strong>
                </div>

                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                  onClick={(e) => e.stopPropagation()} // Prevent toggling expand when clicking selectors
                >
                  {/* Concern Level Badge Selector */}
                  <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.03)', padding: '3px', borderRadius: '8px' }}>
                    {(['lav', 'middels', 'høy'] as const).map((level) => {
                      const isSelected = sc.bekymringsniva === level
                      const activeColors = concernColors[level]
                      return (
                        <button
                          key={level}
                          disabled={isMakerChecked}
                          onClick={() => updateScenarioField(selectedCaseId, sc.temaKey, 'bekymringsniva', level)}
                          style={{
                            padding: '3px 8px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            borderRadius: '6px',
                            border: '1px solid transparent',
                            background: isSelected ? activeColors.bg : 'transparent',
                            color: isSelected ? activeColors.text : 'var(--text-muted)',
                            cursor: isMakerChecked ? 'not-allowed' : 'pointer',
                            textTransform: 'capitalize',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {level}
                        </button>
                      )
                    })}
                  </div>

                  <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
                    ▼
                  </span>
                </div>
              </div>

              {/* Primary simulated event (always visible) */}
              <div style={{ marginTop: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor={`hendelse-${sc.temaKey}`} style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    Hva kan gå galt?
                  </label>
                  <textarea
                    id={`hendelse-${sc.temaKey}`}
                    value={sc.simulertHendelse}
                    onChange={(e) => updateScenarioField(selectedCaseId, sc.temaKey, 'simulertHendelse', e.target.value)}
                    disabled={isMakerChecked}
                    rows={2}
                    style={{
                      width: '100%',
                      padding: '10px',
                      fontSize: '0.875rem',
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-primary)',
                      resize: 'vertical',
                      lineHeight: '1.4',
                    }}
                    placeholder="Beskriv hva som kan skje..."
                  />
                </div>
              </div>

              {/* Expandable ROS Details */}
              {isExpanded && (
                <div
                  className="fade-in"
                  style={{
                    marginTop: '16px',
                    paddingTop: '16px',
                    borderTop: '1px dashed var(--border-light)',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <ScenarioField
                      label="Hva må være sant for at dette skal skje?"
                      id={`antakelse-${sc.temaKey}`}
                      value={sc.utløsendeAntakelse}
                      onChange={(val) => updateScenarioField(selectedCaseId, sc.temaKey, 'utløsendeAntakelse', val)}
                      disabled={isMakerChecked}
                      placeholder="Hva må være sant for at dette skal skje..."
                    />
                    <ScenarioField
                      label="Hvem rammes?"
                      id={`parter-${sc.temaKey}`}
                      value={sc.berørteParter}
                      onChange={(val) => updateScenarioField(selectedCaseId, sc.temaKey, 'berørteParter', val)}
                      disabled={isMakerChecked}
                      placeholder="Hvem merker konsekvensene først..."
                    />
                    <ScenarioField
                      label="Varseltegn"
                      id={`signaler-${sc.temaKey}`}
                      value={sc.tidligeSignaler}
                      onChange={(val) => updateScenarioField(selectedCaseId, sc.temaKey, 'tidligeSignaler', val)}
                      disabled={isMakerChecked}
                      placeholder="Hva bør vi holde øye med..."
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <ScenarioField
                      label="Hva skjer hvis vi ikke gjør noe?"
                      id={`konsekvens-${sc.temaKey}`}
                      value={sc.konsekvensHvisIkkeHåndtert}
                      onChange={(val) => updateScenarioField(selectedCaseId, sc.temaKey, 'konsekvensHvisIkkeHåndtert', val)}
                      disabled={isMakerChecked}
                      placeholder="Hva skjer hvis temaet overses..."
                    />
                    <ScenarioField
                      label="Hva må sjekkes lokalt?"
                      id={`verifikasjon-${sc.temaKey}`}
                      value={sc.lokalVerifikasjon}
                      onChange={(val) => updateScenarioField(selectedCaseId, sc.temaKey, 'lokalVerifikasjon', val)}
                      disabled={isMakerChecked}
                      placeholder="Hva må sjekkes lokalt før bruk..."
                    />
                    <ScenarioField
                      label="Ansvarlig eier"
                      id={`eier-${sc.temaKey}`}
                      value={sc.ansvarligEier}
                      onChange={(val) => updateScenarioField(selectedCaseId, sc.temaKey, 'ansvarligEier', val)}
                      disabled={isMakerChecked}
                      placeholder="Hvem skal følge opp dette..."
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                    <div>
                      <span className="small" style={{ color: 'var(--text-secondary)', display: 'block', fontWeight: 600 }}>Type konsekvens:</span>
                      <span style={{ fontSize: '0.875rem', textTransform: 'capitalize' }}>{sc.utfallstype}</span>
                    </div>
                    <div>
                      <span className="small" style={{ color: 'var(--text-secondary)', display: 'block', fontWeight: 600 }}>Tidshorisont:</span>
                      <span style={{ fontSize: '0.875rem' }}>{sc.tidshorisont}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ScenarioField({
  label,
  id,
  value,
  onChange,
  disabled,
  placeholder,
}: {
  label: string
  id: string
  value: string
  onChange: (v: string) => void
  disabled: boolean
  placeholder: string
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <label htmlFor={id} style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '8px 10px',
          fontSize: '0.875rem',
          borderRadius: '6px',
          background: 'rgba(255,255,255,0.01)',
          border: '1px solid var(--border-light)',
          color: 'var(--text-primary)',
        }}
      />
    </div>
  )
}
