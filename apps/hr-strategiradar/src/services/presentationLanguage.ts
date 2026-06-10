/**
 * Presentasjonsspråk for HR Strategiradar.
 *
 * Mapper interne tekniske begreper til klart norsk for UI og rapport.
 * Ingen SR-koder, ingen camelCase, ingen fagsjargong i output.
 */

const ROLE_PRESENTATION: Record<string, string> = {
  'utforskende_støtte':
    'KI som sparringspartner — KI hjelper deg å tenke, men du eier vurderingen.',
  'forsterket_skjønn':
    'KI forbereder grunnlag — KI lager utkast og fakta, men du tar beslutningen.',
  'strategisk_autonomi':
    'KI handler innen gitte rammer — ledelsen definerer grensene, KI opererer innenfor dem.',
  'automatisert_beslutning':
    'KI tar beslutningen — bare for regelstyrte lavrisiko-saker med full kontroll. Ikke anbefalt for saker med personlig påvirkning.',
}

const STOP_RULE_PRESENTATION: Record<string, string> = {
  'SR-01':
    'Denne saken kan påvirke noens arbeid eller rettigheter, og kontrollen er ikke sterk nok til å anbefale mer enn sparringspartner-bruk.',
  'SR-02':
    'Lokale forhold, tillit eller menneskelig skjønn betyr mye her. KI-output kan ikke brukes uten at noen som kjenner helheten sjekker.',
  'SR-03':
    'Det er uklart om ansvarlig person kan forstå, forklare og overstyre det KI foreslår.',
  'SR-04':
    'Det mangler rutiner som hindrer at KI-forslag aksepteres uten egen vurdering.',
  'SR-05':
    'Saken har høy risiko, men menneskelig vurdering og ansvar er ikke dokumentert ennå.',
  'SR-06':
    'Det finnes en verdikonflikt eller et etisk dilemma som krever menneskelig avveining.',
  'SR-07':
    'Feil kan være vanskelige å oppdage eller rette opp i etterkant.',
  'SR-08':
    'KI-forslaget kan ikke sjekkes godt nok mot kilder, regler eller lokal fagvurdering.',
}

const STOP_RULE_QUESTION_PRESENTATION: Record<string, string> = {
  'SR-01':
    'Hvem i teamet tar direkte kontakt med de berørte, og har dere sikret reell medvirkning?',
  'SR-02':
    'Hvem lokalt kjenner konteksten og unntakene godt nok til å kvalitetssikre KI-forslaget?',
  'SR-03':
    'Kan teamet forklare for berørte parter hvorfor KI ga akkurat dette svaret?',
  'SR-04':
    'Har dere lagt inn en konkret rutine for å ettersjekke KI-forslag uavhengig av systemet selv?',
  'SR-05':
    'Er beslutningsnotatet fylt ut med tydelig vurdering, ansvar og verifikasjon?',
  'SR-06':
    'Hvilken verdikonflikt er til stede, og hvem har myndighet til å gjøre den endelige avveiingen?',
  'SR-07':
    'Hva er planen hvis KI-resultatet viser seg å være feil etter at det er tatt i bruk?',
  'SR-08':
    'Mot hvilke lokale fagvurderinger, regler eller kilder skal teamet etterkontrollere KI-forslaget?',
}

const DIMENSION_PRESENTATION: Record<string, string> = {
  'målklarhet': 'Klarhet i hva godt resultat betyr',
  'separabilitet': 'Kan KI gjøre dette uten helhetsvurdering',
  'forklarbarhet': 'Kan ansvarlig person forstå og overstyre',
  'antiOverreliance': 'Hindrer arbeidsflyten blind tillit til KI',
}

const DIMENSION_QUESTION_PRESENTATION: Record<string, string> = {
  'målklarhet': 'Vet dere tydelig hva godt resultat betyr for denne oppgaven?',
  'separabilitet': 'Kan KI gjøre dette uten at et menneske må vurdere helheten?',
  'forklarbarhet': 'Kan ansvarlig person forstå, forklare og overstyre det KI foreslår?',
  'antiOverreliance': 'Har dere rutiner som hindrer at KI-forslag aksepteres uten egen vurdering?',
}

const RISK_FLAG_PRESENTATION: Record<string, string> = {
  'rightsOrSignificantImpact': 'Kan påvirke noens rettigheter eller vesentlige interesser',
  'vulnerableParty': 'Berører personer i en sårbar situasjon',
  'personalOrSensitiveData': 'Involverer personopplysninger eller sensitive data',
  'healthSafetyEnvironment': 'Kan påvirke helse, sikkerhet eller arbeidsmiljø',
  'irreversibleConsequences': 'Feil kan være vanskelige å oppdage eller rette opp',
  'workConditionsImpact': 'Kan påvirke arbeidsforhold eller arbeidsvilkår',
  'discriminationRisk': 'Risiko for forskjellsbehandling eller diskriminering',
  'surveillanceOrControl': 'Kan oppleves som overvåking eller kontroll av ansatte',
}

export function presentRole(role: string): string {
  return ROLE_PRESENTATION[role] || `Ukjent rolle: ${role}`
}

export function presentStopRule(ruleId: string): string {
  return STOP_RULE_PRESENTATION[ruleId] || `Noe begrenser KI-bruken i denne saken.`
}

export function presentStopRuleQuestion(ruleId: string): string {
  return STOP_RULE_QUESTION_PRESENTATION[ruleId] || `Hva må avklares før dere går videre?`
}

export function presentDimension(dim: string): string {
  return DIMENSION_PRESENTATION[dim] || dim
}

export function presentDimensionQuestion(dim: string): string {
  return DIMENSION_QUESTION_PRESENTATION[dim] || `Hvordan vurderer dere dette?`
}

export function presentRiskFlag(flag: string): string {
  return RISK_FLAG_PRESENTATION[flag] || flag
}
