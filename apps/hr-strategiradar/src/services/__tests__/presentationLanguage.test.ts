import { describe, it, expect } from 'vitest'
import {
  presentRole,
  presentStopRule,
  presentStopRuleQuestion,
  presentDimension,
  presentDimensionQuestion,
  presentRiskFlag,
} from '../presentationLanguage'

describe('presentationLanguage — brukerspråk uten teknisk sjargong', () => {

  describe('presentRole', () => {
    it('oversetter alle fire roller til klart norsk', () => {
      expect(presentRole('utforskende_støtte')).toMatch(/sparringspartner/i)
      expect(presentRole('forsterket_skjønn')).toMatch(/forbereder grunnlag/i)
      expect(presentRole('automatisert_beslutning')).toMatch(/tar beslutningen/i)
      expect(presentRole('strategisk_autonomi')).toMatch(/handler innen.*rammer/i)
    })

    it('gir kort forklaring for hver rolle', () => {
      const us = presentRole('utforskende_støtte')
      expect(us).toMatch(/du eier vurderingen/i)

      const fs = presentRole('forsterket_skjønn')
      expect(fs).toMatch(/du tar beslutningen/i)

      const ab = presentRole('automatisert_beslutning')
      expect(ab).toMatch(/ikke anbefalt.*personlig påvirkning/i)
    })

    it('inneholder ingen tekniske termer', () => {
      const roles = [
        'utforskende_støtte',
        'forsterket_skjønn',
        'automatisert_beslutning',
        'strategisk_autonomi',
      ]
      for (const r of roles) {
        const text = presentRole(r)
        expect(text).not.toMatch(/utforskende_støtte|forsterket_skjønn|automatisert_beslutning|strategisk_autonomi/)
        expect(text.toLowerCase()).not.toContain('separabilitet')
        expect(text.toLowerCase()).not.toContain('rolle_tak')
      }
    })

    it('returnerer fallback for ukjent rolle', () => {
      expect(presentRole('ukjent')).toBeTruthy()
    })
  })

  describe('presentStopRule', () => {
    it('gir klartekst for alle 8 stoppregler', () => {
      for (let i = 1; i <= 8; i++) {
        const id = `SR-0${i}`
        const text = presentStopRule(id)
        expect(text.length).toBeGreaterThan(20)
        // Ingen SR-koder i brukervendt tekst
        expect(text).not.toMatch(/SR-\d+/)
      }
    })

    it('SR-01 nevner arbeid eller rettigheter', () => {
      expect(presentStopRule('SR-01')).toMatch(/arbeid|rettigheter/i)
    })

    it('SR-02 nevner lokale forhold eller helhetsvurdering', () => {
      expect(presentStopRule('SR-02')).toMatch(/lokal|helhet|skjønn/i)
    })

    it('SR-05 nevner vurdering eller logg som mangler', () => {
      expect(presentStopRule('SR-05')).toMatch(/mangler|dokumentert|logg/i)
    })

    it('returnerer fallback for ukjent regel', () => {
      expect(presentStopRule('SR-99')).toBeTruthy()
    })
  })

  describe('presentStopRuleQuestion', () => {
    it('gir fasiliterings-spørsmål for alle 8 regler', () => {
      for (let i = 1; i <= 8; i++) {
        const id = `SR-0${i}`
        const q = presentStopRuleQuestion(id)
        expect(q).toMatch(/\?/)
        expect(q).not.toMatch(/SR-\d+/)
      }
    })
  })

  describe('presentDimension', () => {
    it('oversetter kompassdimensjoner til klart norsk', () => {
      expect(presentDimension('målklarhet')).toBeTruthy()
      expect(presentDimension('separabilitet')).toBeTruthy()
      expect(presentDimension('forklarbarhet')).toBeTruthy()
      expect(presentDimension('antiOverreliance')).toBeTruthy()
    })

    it('bruker ikke tekniske termer som tittel', () => {
      expect(presentDimension('separabilitet').toLowerCase()).not.toContain('separabilitet')
      expect(presentDimension('antiOverreliance').toLowerCase()).not.toContain('overreliance')
    })
  })

  describe('presentDimensionQuestion', () => {
    it('gir arbeidsspørsmål for hver dimensjon', () => {
      expect(presentDimensionQuestion('målklarhet')).toMatch(/\?/)
      expect(presentDimensionQuestion('separabilitet')).toMatch(/\?/)
      expect(presentDimensionQuestion('forklarbarhet')).toMatch(/\?/)
      expect(presentDimensionQuestion('antiOverreliance')).toMatch(/\?/)
    })

    it('separabilitet-spørsmålet handler om helhetsvurdering', () => {
      expect(presentDimensionQuestion('separabilitet')).toMatch(/helhet|vurdere|menneske/i)
    })
  })

  describe('presentRiskFlag', () => {
    it('oversetter alle 8 risikoflagg', () => {
      const flags = [
        'rightsOrSignificantImpact',
        'vulnerableParty',
        'personalOrSensitiveData',
        'healthSafetyEnvironment',
        'irreversibleConsequences',
        'workConditionsImpact',
        'discriminationRisk',
        'surveillanceOrControl',
      ]
      for (const f of flags) {
        const text = presentRiskFlag(f)
        expect(text.length).toBeGreaterThan(10)
      }
    })

    it('bruker klart norsk uten camelCase', () => {
      const flags = [
        'rightsOrSignificantImpact',
        'vulnerableParty',
        'personalOrSensitiveData',
      ]
      for (const f of flags) {
        const text = presentRiskFlag(f)
        expect(text).not.toMatch(/[a-z][A-Z]/) // ingen camelCase
      }
    })
  })
})
