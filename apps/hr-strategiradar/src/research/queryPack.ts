import type { ResearchIndicator, ResearchSourceType } from '../domain/researchSchemas'

export type ResearchQuery = {
  queryId: string
  topic: string
  query: string
  preferredSourceTypes: ResearchSourceType[]
  relevantCaseField: string[]
  affectedIndicators: ResearchIndicator[]
}

export const langvakterQueryPack: ResearchQuery[] = [
  {
    queryId: 'LV-Q01',
    topic: 'Arbeidstid og forsvarlighet',
    query:
      'Norske primarkilder om langvakter over 12,5 timer i helse og omsorg, forsvarlig arbeidstid, hviletid, pauser, HMS og arbeidsgivers plikter.',
    preferredSourceTypes: ['official', 'agreement'],
    relevantCaseField: ['HRR-07', 'arbeidstid', 'HMS', 'forsvarlighet'],
    affectedIndicators: ['kontrollkrav', 'risiko', 'lokal_forankring'],
  },
  {
    queryId: 'LV-Q02',
    topic: 'Avtaleverk og partssamarbeid',
    query:
      'KS SFS 2310 langvakter helse omsorg arbeidstid tillitsvalgte verneombud lokale avtaler og partssamarbeid primarkilder.',
    preferredSourceTypes: ['agreement', 'official'],
    relevantCaseField: ['HRR-07', 'avtaleverk', 'partssamarbeid'],
    affectedIndicators: ['kontrollkrav', 'lokal_forankring', 'separabilitet'],
  },
  {
    queryId: 'LV-Q03',
    topic: 'Forskning pa lange vakter',
    query:
      'Forskning Norge lange vakter helsepersonell sovn restitusjon arbeidsmiljo pasientsikkerhet systematisk oversikt.',
    preferredSourceTypes: ['research', 'review'],
    relevantCaseField: ['HRR-07', 'forskning', 'restitusjon', 'pasientsikkerhet'],
    affectedIndicators: ['risiko', 'kontrollkrav'],
  },
  {
    queryId: 'LV-Q04',
    topic: 'Organisatoriske vilkar',
    query:
      'Langvakter helse omsorg bemanning kompetanse kontinuitet frivillighet lokal belastning organisatoriske forutsetninger Norge.',
    preferredSourceTypes: ['official', 'research', 'secondary'],
    relevantCaseField: ['HRR-07', 'bemanning', 'kontinuitet', 'kompetanse'],
    affectedIndicators: ['malklarhet', 'separabilitet', 'lokal_forankring'],
  },
  {
    queryId: 'LV-Q05',
    topic: 'Lokale kontrollpunkter',
    query:
      'Hva ma kontrolleres lokalt for langvakter i helse og omsorg risikovurdering verneombud tillitsvalgte pausepraksis forsvarlighet.',
    preferredSourceTypes: ['official', 'agreement', 'local_required'],
    relevantCaseField: ['HRR-07', 'lokal_verifikasjon', 'stoppregler'],
    affectedIndicators: ['kontrollkrav', 'lokal_forankring', 'risiko'],
  },
]
