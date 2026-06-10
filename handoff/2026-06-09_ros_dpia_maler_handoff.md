---
title: "Handoff: ROS- og DPIA-maler ferdigstilt for HR Strategiradar"
date: 2026-06-09
status: ready-for-review
tags: [handoff, ros, dpia, personvern, hr-strategiradar, kvalitetssikring]
category: handoff
---

# Handoff: ROS- og DPIA-maler ferdigstilt for HR Strategiradar

Dette dokumentet oppsummerer arbeidet med å utarbeide og kvalitetssikre risiko- og sårbarhetsmaler (ROS) og personvernkonsekvensmaler (DPIA) for HR Strategiradar, klare for neste agent (f.eks. Claude).

---

## 1. Bakgrunn og Målsetting

Oppdraget var å utvikle realistiske og konkrete maler og eksempler som prosjektgrupper kan bruke i workshops for å vurdere risiko og personvern ved bruk av KI i HR-mikroprosjekter.

Det har vært et ufravikelig krav at malene **ikke fremstår som en juridisk fasit**, men som en veiledende øvingsarena og et beslutningsverktøy. Videre har det vært et krav om konsekvent bruk av domenebegrepene i [CONTEXT.md](file:///C:/Users/larse/Documents/ki-beslutningsradar/CONTEXT.md), særskilt:
* **KI-bruksoppgave** skal være den konkrete vurderingsenheten.
* Det må presiseres at appen gir en **foreløpig KI-diagnose**, ikke et endelig resultat.
* **Personvernombudets (PVO) rolle** må defineres som rådgivende, og ikke som en automatisk app-konklusjon eller godkjenning.
* **Forbudte ord** (`fasit`, `godkjent`, `sertifikat`) skal ikke forekomme i de nye filene.

---

## 2. Leverte Filer

Følgende 6 filer er opprettet og kvalitetssikret:

1. **ROS-mal:** [templates/ros/hr_strategiradar_ros_mal.md](file:///C:/Users/larse/Documents/ki-beslutningsradar/templates/ros/hr_strategiradar_ros_mal.md)
   * Strukturert mal for risikoanalyse av en KI-bruksoppgave med egne seksjoner for HR-randsoner, sannsynlighet/konsekvens (1-5), stoppregler (SR-01 til SR-08) og menneskelig ansvar.
2. **DPIA-mal:** [templates/dpia/hr_strategiradar_dpia_mal.md](file:///C:/Users/larse/Documents/ki-beslutningsradar/templates/dpia/hr_strategiradar_dpia_mal.md)
   * Strukturert mal for personvernkonsekvensvurdering (GDPR art. 35) med fokus på rettslig grunnlag (art. 6 og 9), dataflyt, dataminimering og de registrertes rettigheter.
3. **Lavrisiko ROS-eksempel:** [examples/ros/ros_eksempel_seniorbevaring_anonymisert_innsikt.md](file:///C:/Users/larse/Documents/ki-beslutningsradar/examples/ros/ros_eksempel_seniorbevaring_anonymisert_innsikt.md)
   * Eksempel på en ROS-analyse for strukturering av anonyme ansatt-innspill. Konkluderer med aksept under rollen *Utforskende støtte* med tiltak for anonymiseringskontroll.
4. **Høyrisiko ROS-eksempel (STOPP):** [examples/ros/ros_eksempel_individuell_prioritering_tiltak_stopp.md](file:///C:/Users/larse/Documents/ki-beslutningsradar/examples/ros/ros_eksempel_individuell_prioritering_tiltak_stopp.md)
   * Eksempel på en ROS-analyse som stopper individuell risikoskåring av ansatte på grunn av bias, tap av skjønn, svekket tillit og EU AI Act-regler.
5. **DPIA-eksempel:** [examples/dpia/dpia_eksempel_sykefravaer_tilrettelegging_ki_stotte.md](file:///C:/Users/larse/Documents/ki-beslutningsradar/examples/dpia/dpia_eksempel_sykefravaer_tilrettelegging_ki_stotte.md)
   * Realistisk eksempel på en DPIA for strukturering av møtenotater ved sykefraværsoppfølging. Konkluderer med "Igangsettes med vilkår" (lukket instans, ingen DPA-brudd, opt-out for ansatte).
6. **Veiledning:** [docs/guides/ros_dpia_veiledning.md](file:///C:/Users/larse/Documents/ki-beslutningsradar/docs/guides/ros_dpia_veiledning.md)
   * Enkel veiledning for workshop-fasilitatorer om når en lokal ROS er nok, når en DPIA må utredes, og når PVO og jurister må kobles på.

---

## 3. Utført Kvalitetssikring og Brukerjusteringer

### 3.1 Ordkontroll og Integritet
Nye filer har blitt grundig skannet. Det er bekreftet at ordene **"fasit"**, **"godkjent"** (i beslutningssammenheng) og **"sertifikat"** er fjernet og erstattet med tillatte begreper som:
* *Fasit* -> *Endelig juridisk vurdering / Compliance-referanse / Udiskutabelt svar*
* *Godkjent* -> *Akseptert / Igangsettes / Kvalitetssikret*
* *Sertifikat* -> *Sertifisering (der det refereres til sikkerhet) / Referanse*

### 3.2 Brukerens Manuelle Rettelser
Brukeren har manuelt gått igjennom filene og lagt inn viktige korrigeringer for å styrke domenekonsistensen ytterligere:
* Lagt inn setningen: `"Appen gir en foreløpig KI-diagnose, ikke et endelig resultat."` i innledningsboksene på alle maler, eksempler og veiledningen.
* Endret begreper som `"foreløpig diagnose"` til `"foreløpig KI-diagnose"`.
* Byttet ut resterende forekomster av ordet `"godkjenne"` eller `"godkjent"` med henholdsvis `"akseptere"`, `"gjennomlesning og akseptere"`, `"kvalitetssikre"`, eller `"verifikasjon"`.

### 3.3 Teamwork-preview status
Kvalitetssikrings-teamet (underagent `c7b6ad2b-0c5e...`) ble startet opp og nådde Milestone 2. Underveis oppdaget orkestratoren inaktivitet hos arbeider-agenten og iverksatte automatisk nudge/omstart-protokollen. Teamet ble deretter terminert av brukeren for å avslutte økten og fullføre denne handoff-rapporten.

---

## 4. Anbefalte Neste Steg for Claude / Neste Agent

Når arbeidet med HR Strategiradar fortsetter, anbefales det å:
1. **Verifisere mot systemkoden:** Sjekke om tekstene i rapportgenereringstjenesten ([reportService.ts](file:///C:/Users/larse/Documents/ki-beslutningsradar/apps/hr-strategiradar/src/services/reportService.ts)) eller andre steder i frontend/backend bruker de korrekte begrepene som nå er etablert i malene (f.eks. sikre at grensesnittet ikke viser "Godkjent" eller "Fasit", men "Igangsettes" og "Foreløpig KI-diagnose").
2. **JSON Fixtures:** Vurdere om disse malene og eksemplene skal struktureres som JSON-data eller Markdown-filer som kan importeres direkte inn i appens steg 3 for beslutningsnotat og rapporteksport.
3. **PVO-integrasjon:** Sikre at brukerreisen i appen tvinger fram dialog med PVO når det oppdages at en KI-bruksoppgave behandler helse- eller fraværsdata.
