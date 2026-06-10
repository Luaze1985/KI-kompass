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

export const seniorbevaringQueryPack: ResearchQuery[] = [
  {
    queryId: 'SB-Q01',
    topic: 'Seniorpolitikk og livsfasepolitikk',
    query:
      'Norske primarkilder om seniorpolitikk og livsfasepolitikk i kommunal sektor, tiltak for at eldre ansatte star lenger i arbeid, KS og Senter for seniorpolitikk.',
    preferredSourceTypes: ['official', 'research'],
    relevantCaseField: ['HRR-01', 'seniorpolitikk', 'livsfasepolitikk'],
    affectedIndicators: ['malklarhet', 'lokal_forankring'],
  },
  {
    queryId: 'SB-Q02',
    topic: 'Avgangsarsaker og arbeidsmiljo',
    query:
      'Forskning Norge arsaker til at senioransatte slutter i helse og omsorg, arbeidsbelastning, opplevd rettferdighet, medvirkning og tillit.',
    preferredSourceTypes: ['research', 'review', 'secondary'],
    relevantCaseField: ['HRR-01', 'avgangsarsaker', 'arbeidsmiljo'],
    affectedIndicators: ['risiko', 'separabilitet', 'lokal_forankring'],
  },
  {
    queryId: 'SB-Q03',
    topic: 'Medvirkning og personvern',
    query:
      'Partsmedvirkning og personvern ved bruk av ansattdata til seniortiltak i kommune, anonymisering, drofting med tillitsvalgte primarkilder.',
    preferredSourceTypes: ['official', 'agreement', 'local_required'],
    relevantCaseField: ['HRR-01', 'medvirkning', 'personvern', 'stoppregler'],
    affectedIndicators: ['kontrollkrav', 'lokal_forankring'],
  },
]

export const sykefravaerQueryPack: ResearchQuery[] = [
  {
    queryId: 'SF-Q01',
    topic: 'Oppfolging av sykmeldte',
    query:
      'Norske primarkilder om oppfolging av sykmeldte og gradert sykefravar, IA-avtale, NAV og Arbeidstilsynet, dialogmote og tilrettelegging.',
    preferredSourceTypes: ['official', 'agreement'],
    relevantCaseField: ['HRR-02', 'sykefravar', 'tilrettelegging', 'IA'],
    affectedIndicators: ['kontrollkrav', 'lokal_forankring'],
  },
  {
    queryId: 'SF-Q02',
    topic: 'Helseopplysninger og personvern',
    query:
      'Behandling av helseopplysninger ved sykefravarsoppfolging, sarlige kategorier personopplysninger GDPR, Datatilsynet primarkilder.',
    preferredSourceTypes: ['official', 'local_required'],
    relevantCaseField: ['HRR-02', 'helseopplysninger', 'personvern', 'stoppregler'],
    affectedIndicators: ['risiko', 'kontrollkrav'],
  },
  {
    queryId: 'SF-Q03',
    topic: 'Belastning pa kolleger',
    query:
      'Forskning tilrettelegging og graderte ordninger pavirkning pa kolleger og arbeidsmiljo i helse og omsorg, verneombudets rolle.',
    preferredSourceTypes: ['research', 'review', 'official'],
    relevantCaseField: ['HRR-02', 'arbeidsmiljo', 'kolleger'],
    affectedIndicators: ['risiko', 'lokal_forankring', 'separabilitet'],
  },
]

export const heltidskulturQueryPack: ResearchQuery[] = [
  {
    queryId: 'HK-Q01',
    topic: 'Heltidskultur og uonsket deltid',
    query:
      'Norske primarkilder om heltidskultur og uonsket deltid i kommunal helse og omsorg, KS heltidserklaring og partssamarbeid.',
    preferredSourceTypes: ['official', 'agreement'],
    relevantCaseField: ['HRR-03', 'heltidskultur', 'deltid'],
    affectedIndicators: ['malklarhet', 'lokal_forankring'],
  },
  {
    queryId: 'HK-Q02',
    topic: 'Helgebemanning og turnus',
    query:
      'Helgebemanning, turnusordninger og arbeidstidsbestemmelser i helse og omsorg, forsvarlighet og hviletid, Arbeidstilsynet og KS.',
    preferredSourceTypes: ['official', 'agreement'],
    relevantCaseField: ['HRR-03', 'helgebemanning', 'turnus', 'arbeidstid'],
    affectedIndicators: ['kontrollkrav', 'risiko', 'lokal_forankring'],
  },
  {
    queryId: 'HK-Q03',
    topic: 'Medbestemmelse ved turnusendring',
    query:
      'Medbestemmelse og drofting ved endring av turnus og bemanning, hovedavtalen og tillitsvalgtes rolle primarkilder.',
    preferredSourceTypes: ['agreement', 'local_required'],
    relevantCaseField: ['HRR-03', 'medbestemmelse', 'stoppregler'],
    affectedIndicators: ['kontrollkrav', 'lokal_forankring'],
  },
]

export const rekrutteringQueryPack: ResearchQuery[] = [
  {
    queryId: 'RK-Q01',
    topic: 'KI i rekruttering og hoyrisiko',
    query:
      'EU AI Act hoyrisiko bruk av KI i rekruttering og utvelgelse av ansatte, krav til menneskelig kontroll og apenhet, primarkilder.',
    preferredSourceTypes: ['official', 'review'],
    relevantCaseField: ['HRR-04', 'rekruttering', 'EU_AI_Act', 'hoyrisiko'],
    affectedIndicators: ['kontrollkrav', 'risiko'],
  },
  {
    queryId: 'RK-Q02',
    topic: 'Diskriminering og bias',
    query:
      'Diskrimineringsrisiko og bias i automatisert kandidatutvelgelse, likestillings- og diskrimineringsloven, kvalifikasjonsprinsippet i offentlig sektor.',
    preferredSourceTypes: ['official', 'research'],
    relevantCaseField: ['HRR-04', 'diskriminering', 'bias', 'stoppregler'],
    affectedIndicators: ['risiko', 'kontrollkrav'],
  },
  {
    queryId: 'RK-Q03',
    topic: 'Personvern i rekruttering',
    query:
      'Personvern ved behandling av sokerdata og CV i rekruttering, GDPR og Datatilsynet, automatiserte avgjorelser primarkilder.',
    preferredSourceTypes: ['official', 'local_required'],
    relevantCaseField: ['HRR-04', 'personvern', 'sokerdata'],
    affectedIndicators: ['kontrollkrav', 'lokal_forankring'],
  },
]

export const kompetanseQueryPack: ResearchQuery[] = [
  {
    queryId: 'KP-Q01',
    topic: 'Strategisk kompetanseplanlegging',
    query:
      'Norske primarkilder om strategisk kompetanseplanlegging og kompetansekartlegging i kommunal helse og omsorg, KS og Helsedirektoratet.',
    preferredSourceTypes: ['official', 'research'],
    relevantCaseField: ['HRR-05', 'kompetanse', 'kompetanseplanlegging'],
    affectedIndicators: ['malklarhet', 'lokal_forankring'],
  },
  {
    queryId: 'KP-Q02',
    topic: 'Intern mobilitet og rettferdighet',
    query:
      'Intern mobilitet og forfremmelse i offentlig sektor, rettferdig utvelgelse, kvalifikasjonsprinsippet og medvirkning primarkilder.',
    preferredSourceTypes: ['official', 'agreement'],
    relevantCaseField: ['HRR-05', 'mobilitet', 'rettferdighet', 'stoppregler'],
    affectedIndicators: ['separabilitet', 'kontrollkrav'],
  },
  {
    queryId: 'KP-Q03',
    topic: 'Scoring av ansatte og bias',
    query:
      'Risiko ved algoritmisk scoring av ansatte for kompetanse og karriere, bias og personvern, partsmedvirkning forskning og offentlige kilder.',
    preferredSourceTypes: ['research', 'official'],
    relevantCaseField: ['HRR-05', 'scoring', 'bias', 'personvern'],
    affectedIndicators: ['risiko', 'kontrollkrav'],
  },
]

export const laerlingQueryPack: ResearchQuery[] = [
  {
    queryId: 'LL-Q01',
    topic: 'Larlinger og frafall',
    query:
      'Norske primarkilder om larlinger i fagopplaring og frafall, oppfolging av sarbare unge, fylkeskommune og Utdanningsdirektoratet.',
    preferredSourceTypes: ['official', 'research'],
    relevantCaseField: ['HRR-06', 'larling', 'frafall', 'fagopplaring'],
    affectedIndicators: ['malklarhet', 'risiko', 'lokal_forankring'],
  },
  {
    queryId: 'LL-Q02',
    topic: 'Sarbare unge og personvern',
    query:
      'Oppfolging av sarbare unge arbeidstakere, personvern og barns/unges rettigheter, risikoscoring og stigmatisering primarkilder.',
    preferredSourceTypes: ['official', 'local_required'],
    relevantCaseField: ['HRR-06', 'sarbar', 'personvern', 'stoppregler'],
    affectedIndicators: ['risiko', 'kontrollkrav'],
  },
  {
    queryId: 'LL-Q03',
    topic: 'Relasjonell oppfolging',
    query:
      'Forskning relasjonell oppfolging og tillit som virkemiddel mot frafall i fagopplaring og arbeidsliv Norge.',
    preferredSourceTypes: ['research', 'review'],
    relevantCaseField: ['HRR-06', 'relasjon', 'oppfolging'],
    affectedIndicators: ['separabilitet', 'lokal_forankring'],
  },
]

export const omstillingQueryPack: ResearchQuery[] = [
  {
    queryId: 'OM-Q01',
    topic: 'Omstilling og nedbemanning i kommune',
    query:
      'Norske primarkilder om omstilling og nedbemanning i kommunal sektor, naturlig avgang, arbeidsmiljoloven og saklighetskrav.',
    preferredSourceTypes: ['official', 'agreement'],
    relevantCaseField: ['HRR-08', 'omstilling', 'nedbemanning'],
    affectedIndicators: ['risiko', 'kontrollkrav'],
  },
  {
    queryId: 'OM-Q02',
    topic: 'Medbestemmelse og partssamarbeid',
    query:
      'Medbestemmelse, drofting og partssamarbeid ved omstilling i offentlig sektor, hovedavtalen og tillitsvalgtes rolle primarkilder.',
    preferredSourceTypes: ['agreement', 'official', 'local_required'],
    relevantCaseField: ['HRR-08', 'medbestemmelse', 'stoppregler'],
    affectedIndicators: ['kontrollkrav', 'lokal_forankring'],
  },
  {
    queryId: 'OM-Q03',
    topic: 'Arbeidsmiljo under omstilling',
    query:
      'Forskning psykososialt arbeidsmiljo og tjenestekvalitet under omstilling og nedbemanning i helse og omsorg Norge.',
    preferredSourceTypes: ['research', 'review'],
    relevantCaseField: ['HRR-08', 'arbeidsmiljo', 'tjenestekvalitet'],
    affectedIndicators: ['risiko', 'lokal_forankring', 'separabilitet'],
  },
]

// Register: caseId -> query pack. Dekker alle 8 saker i dashboardet.
export const RESEARCH_QUERY_PACKS: Record<string, ResearchQuery[]> = {
  'HRR-01': seniorbevaringQueryPack,
  'HRR-02': sykefravaerQueryPack,
  'HRR-03': heltidskulturQueryPack,
  'HRR-04': rekrutteringQueryPack,
  'HRR-05': kompetanseQueryPack,
  'HRR-06': laerlingQueryPack,
  'HRR-07': langvakterQueryPack,
  'HRR-08': omstillingQueryPack,
}

export function getQueryPack(caseId: string): ResearchQuery[] | undefined {
  return RESEARCH_QUERY_PACKS[caseId]
}
