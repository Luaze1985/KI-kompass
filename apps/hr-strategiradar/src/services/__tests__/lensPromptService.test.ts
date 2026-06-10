import { describe, it, expect } from 'vitest'
import { generateLensPrompt } from '../lensPromptService'
import { getDiagnosisData, runCalculationEngine, INITIAL_VALUE_JUDGMENTS } from '../mockDiagnosisService'

describe('generateLensPrompt', () => {
  it('bygger en prompt med sak, anbefalt rolle og forhold i klartekst — uten SR-koder', () => {
    const data = getDiagnosisData('HRR-07')!
    const task = runCalculationEngine(data.task, { ...INITIAL_VALUE_JUDGMENTS }, false)
    const prompt = generateLensPrompt(data.project, task, [], 'automatisert_beslutning')

    expect(prompt).toContain('HRR-07')
    expect(prompt).toContain(data.project.title)
    expect(prompt).toContain('Anbefalt KI-rolle')
    expect(prompt).toContain('Forhold som må avklares')
    // Ingen SR-koder skal lekke ut til brukeren
    expect(/SR-\d/.test(prompt)).toBe(false)
    // Avsluttende instruks til linsene
    expect(prompt).toContain('Hva vi ønsker fra dere')
  })

  it('tar med gruppens blindtest-svar og overconfidence-merknad', () => {
    const data = getDiagnosisData('HRR-07')!
    const task = runCalculationEngine(data.task, { ...INITIAL_VALUE_JUDGMENTS }, false)
    // HRR-07-A anbefaler utforskende_støtte; automatisert er mer tillatende -> overconfident
    const prompt = generateLensPrompt(data.project, task, [], 'automatisert_beslutning')
    expect(prompt).toContain('Gruppens egen vurdering')
    expect(prompt.toLowerCase()).toContain('større rolle enn systemet')
  })

  it('tar med beskrevne risikoer fra steg 3', () => {
    const data = getDiagnosisData('HRR-07')!
    const task = runCalculationEngine(data.task, { ...INITIAL_VALUE_JUDGMENTS }, false)
    const scenarios = [
      {
        temaKey: 'hms',
        temaTittel: 'HMS',
        simulertHendelse: 'Langvakter gir ekstrem slitasje på slutten av vakten.',
        utfallstype: 'hms',
        tidshorisont: '3-6 måneder',
        berørteParter: 'Ansatte',
        utløsendeAntakelse: 'Ingen hvilekontroll',
        tidligeSignaler: 'Økt fravær',
        konsekvensHvisIkkeHåndtert: 'Sykefravær',
        lokalVerifikasjon: 'Verneombud',
        ansvarligEier: 'Leder',
        bekymringsniva: 'høy' as const,
      },
    ]
    const prompt = generateLensPrompt(data.project, task, scenarios, null)
    expect(prompt).toContain('Risikoer gruppen har beskrevet')
    expect(prompt).toContain('Langvakter gir ekstrem slitasje')
  })
})
