import type { AiUseTask } from '../domain/schemas'
import type { ValueJudgments } from '../services/mockDiagnosisService'

export interface EnterpriseOption {
  id: string
  name: string
}

export interface EnterpriseRuleTrigger {
  condition: (task: AiUseTask, judgments: ValueJudgments) => boolean
  message: string
  severity: 'warning' | 'error' | 'info'
}

export interface HarmonizedKiStandard {
  id: string
  name: string
  url: string
  description: string
  checklist: string[]
  rules: EnterpriseRuleTrigger[]
}

// Enterprise dropdown choices to declare which organization is being evaluated
export const enterpriseOptions: EnterpriseOption[] = [
  { id: 'generell', name: 'Ingen / Generell standard' },
  { id: 'oslo', name: 'Oslo kommune' },
  { id: 'nav', name: 'NAV' },
  { id: 'trondheim', name: 'Trondheim kommune' },
  { id: 'digdir', name: 'Digitaliseringsdirektoratet (Digdir)' },
  { id: 'annen', name: 'Annen offentlig virksomhet' }
]

// Single unified master standard - "The best of all worlds"
export const offentligKiStandard: HarmonizedKiStandard = {
  id: 'offentlig_standard',
  name: 'Offentlig KI-standard (Best Practice)',
  url: 'https://www.digdir.no',
  description: 'Harmonisert standard utarbeidet fra de beste retningslinjene hos Digdir, NAV, Oslo kommune og Trondheim kommune. Sikrer etisk, sikker og transparent KI-bruk med reell menneskelig kontroll.',
  checklist: [
    'Lokal ROS-analyse: Er det gjennomført en risiko- og sårbarhetsanalyse som vurderer informasjonssikkerhet, etikk og personvern for denne oppgaven?',
    'Lukket løsning og databehandleravtale: Kjøres oppgaven i en lukket løsning uten leverandørtrening på dataene, og finnes det en gyldig databehandleravtale?',
    'Menneskelig kontroll: Er saksbehandlere lært opp i kildekritikk og verifisering av KI-svar, og beholder et menneske det fulle ansvaret?',
    'Transparens og partsmedvirkning: Er tillitsvalgte og berørte parter involvert, og informeres ansatte eller innbyggere tydelig om KI-utdata?'
  ],
  rules: [
    {
      condition: (task, judgments) =>
        !!(task.expectedRiskFlags?.personalOrSensitiveData || judgments.sensitiveOrPersonalDataRisk),
      message: 'Særlig krav: Behandling av sensitive personopplysninger, for eksempel helsedata, sykefravær eller personlige forhold, krever personvernkonsekvensvurdering og databehandleravtale.',
      severity: 'error'
    },
    {
      condition: (task, judgments) => {
        const isHighRisk = !!(
          judgments.rightsOrWorkImpact ||
          task.expectedRiskFlags?.rightsOrSignificantImpact ||
          task.expectedRiskFlags?.personalOrSensitiveData ||
          task.expectedRiskFlags?.healthSafetyEnvironment ||
          task.expectedStopRules?.length > 0
        );
        return isHighRisk;
      },
      message: 'Særlig krav: Denne oppgaven har høy risikoprofil for rettigheter, stillingsvern eller arbeidsvilkår. Det krever grunnrettighetsvurdering, sporbar logging og løpende oppfølging av skjevheter over tid.',
      severity: 'warning'
    }
  ]
}
