---
title: "Handoff: reelle ROS- og DPIA-eksempler som malgrunnlag"
date: 2026-06-01
status: ready-for-next-agent
tags: [handoff, ros, dpia, personvern, hr-strategiradar, maler]
category: handoff
---

# Handoff: reelle ROS- og DPIA-eksempler som malgrunnlag

## Mål

Lag et lite, kvalitetssikret sett med realistiske risikovurderinger og DPIA-eksempler som kan brukes som maler i HR Strategiradar.

Arbeidet skal gi prosjektgruppen praktiske dokumenter de kan lære av og tilpasse, ikke juridiske fasitsvar. Eksemplene må være så konkrete at de viser faktisk vurderingslogikk, men ikke inneholde reelle personopplysninger eller late som de er ferdig godkjente vurderinger.

## Kontekst

HR Strategiradar er et arbeidsverktøy og en øvingsarena for reelle prosjektvurderinger. Appen skal hjelpe en prosjekteier eller rådgiver å fasilitere en prosjektgruppe gjennom:

- kart og HR-kontekst
- konkret KI-bruksoppgave
- kompass for målklarhet og separabilitet
- stoppregler
- ROS-punkter
- lokal verifikasjon
- human-in-the-loop
- beslutningsnotat

Viktig avgrensning: Appen skal ikke fremstå som compliance-fasit, juridisk godkjenningsmotor eller revisjonssertifikat. Trafikklys, samsvarsgrad, signering og makkersjekk er støtte for prioritering og etterspor, ikke erstatning for personvernombud, jurist, sikkerhetsansvarlig eller ansvarlig leder.

## Les først

1. `CONTEXT.md`
2. `CLAUDE.md`
3. `state/context/current_context.md`
4. `docs/agents/domain.md`
5. `app_spec/brukerreise_hr_strategiradar.md`
6. `app_spec/arbeidsflyt_og_beregningsmodell.md`
7. `prd/hr_strategiradar_mvp_prd.md`
8. `sources/kildeoversikt.md`
9. `data/virksomhetskrav/offentlig_ki_standard.md`

Bruk `handoff/antigravity_sprint_2_handoff.md` kun som teknisk historikk. Den overvekter compliance-score og revisjonslåsing sammenlignet med dagens kanoniske retning.

## Oppdrag

Neste agent skal lage en malpakke med:

1. ROS-mal for KI-bruksoppgaver i HR.
2. Ferdig utfylt ROS-eksempel for en lavere risiko analyse-/strukturstøtte.
3. Ferdig utfylt ROS-eksempel for en høyere risiko HR-bruksoppgave som må bremses.
4. DPIA-mal for KI-bruksoppgaver som kan behandle personopplysninger.
5. Ferdig utfylt DPIA-eksempel for en realistisk, men syntetisk HR-case.
6. Kort veiledning: når er ROS nok, når bør DPIA vurderes, når må personvernombud/jurist inn.

## Foreslått plassering

Opprett nye filer under:

- `templates/ros/`
- `templates/dpia/`
- `examples/ros/`
- `examples/dpia/`
- eventuelt `docs/guides/`

Alle nye Markdown-filer skal ha YAML-frontmatter med `title`, `date`, `status`, `tags` og `category`.

## Foreslåtte artefakter

### 1. ROS-mal

Filforslag: `templates/ros/hr_strategiradar_ros_mal.md`

Malen bør ha seksjoner for:

- HR-mikroprosjekt
- konkret KI-bruksoppgave
- beslutningseier
- berørte parter
- data- og informasjonsgrunnlag
- aktiverte HR-randsoner
- risikoscenarioer
- sannsynlighet, konsekvens og usikkerhet
- stoppregler
- lokale verifikasjonspunkter
- tiltak og ansvarlig eier
- rest-risiko
- beslutning: aksepter, avgrens, eskaler eller stopp

### 2. ROS-eksempel: seniorbevaring

Filforslag: `examples/ros/ros_eksempel_seniorbevaring_anonymisert_innsikt.md`

Case:

- HR-mikroprosjekt: Seniorbevaring i hjemmetjenesten gjennom livsfasepolitikk.
- KI-bruksoppgave: Strukturere anonymiserte innspill og lage tiltakshypoteser til intern drøfting.
- Forventet rolle: utforskende støtte eller forsiktig forsterket skjønn.
- Hovedrisiko: feil diagnose av årsaker til avgang, tillit, lokal praksis, opplevd rettferdighet, personvern dersom anonymisering ikke er reell.

Dette eksempelet skal vise en praktisk ROS der KI kan brukes, men bare som støtte etter lokal verifikasjon.

### 3. ROS-eksempel: høy risiko som må bremses

Filforslag: `examples/ros/ros_eksempel_individuell_prioritering_tiltak_stopp.md`

Case:

- HR-mikroprosjekt: Seniorbevaring eller sykefraværsoppfølging.
- KI-bruksoppgave: Prioritere enkeltansatte for tiltak, oppfølging eller tilrettelegging.
- Forventet rolle: ikke automatisering; maks utforskende støtte i anonymisert/aggregertert form.
- Hovedrisiko: arbeid/rettigheter, helseopplysninger, diskriminering, feilaktig kategorisering, urealistisk human-in-the-loop, manglende reversibilitet.

Dette eksempelet skal vise hvordan en risikovurdering kan konkludere med stopp, avgrensning eller eskalering.

### 4. DPIA-mal

Filforslag: `templates/dpia/hr_strategiradar_dpia_mal.md`

Malen bør dekke:

- behandlingsansvarlig og kontaktpunkt
- formål og konkret KI-bruksoppgave
- behandlingsgrunnlag som må avklares av virksomheten
- kategorier av registrerte
- kategorier av personopplysninger
- datakilder og dataminimering
- system/leverandør og databehandleravtale
- modellbruk og eventuell automatisert behandling
- nødvendighet og forholdsmessighet
- risiko for de registrertes rettigheter og friheter
- tiltak før bruk
- human-in-the-loop som faktisk arbeidsmåte
- informasjon til ansatte/berørte
- vurdering av rest-risiko
- behov for forhåndsdrøfting/eskalering
- beslutning og signaturfelt for ansvarlig rolle

Ikke fyll inn juridiske konklusjoner som om de er universelle. Bruk formuleringer som "må vurderes av behandlingsansvarlig/personvernombud".

### 5. DPIA-eksempel

Filforslag: `examples/dpia/dpia_eksempel_sykefravaer_tilrettelegging_ki_stotte.md`

Case:

- HR-mikroprosjekt: Gradert sykefravær og tilrettelegging.
- KI-bruksoppgave: Strukturere møtenotater og foreslå temaer til oppfølgingsmøte.
- Data: syntetiske og anonymiserte beskrivelser i eksempelet, men vurderingen skal vise hva som skjer dersom reelle helse-/fraværsopplysninger behandles.
- Forventet konklusjon: DPIA må vurderes/utløses dersom personopplysninger eller helseopplysninger inngår; åpent eksternt KI-verktøy skal ikke brukes; personvernombud og sikkerhetsansvarlig må involveres.

Eksempelet skal være realistisk nok til å vise felt-for-felt hvordan en DPIA kan se ut, men tydelig merket som illustrasjon.

## Kildekrav

Bruk primært offisielle eller sterke kilder. Minst disse må sjekkes mot nyeste versjon før malene ferdigstilles:

- Datatilsynet om DPIA/personvernkonsekvensvurdering.
- Datatilsynet om kunstig intelligens og personvern.
- Datatilsynet om automatiserte avgjørelser og reell menneskelig innvirkning.
- EDPB/EDPS-veiledning der relevant.
- EU AI Act, særlig human oversight og høyrisiko i arbeidsliv/rekruttering.
- NIST AI RMF for risikostyringsstruktur.
- Relevante interne prosjektkilder i `sources/kildeoversikt.md`.

Siden personvern- og KI-regelverk kan endre seg, skal neste agent bruke nettlesing eller offisielle kilder før juridiske formuleringer låses.

## Kvalitetskrav

Maler og eksempler skal:

- bruke norsk bokmål
- være konkrete nok til å kunne brukes i workshop
- skille mellom ROS, DPIA, FRIA og beslutningsnotat
- ikke gjøre DPIA til en checkbox
- ikke late som appen kan godkjenne behandlingen
- ikke anbefale automatisert beslutning i HR-høyrisiko-caser
- vise hvem som må eie oppfølgingen
- kreve lokal verifikasjon der risiko er kontekstavhengig
- vise rest-risiko og beslutningsalternativer
- ha tydelige "ikke bruk reelle personopplysninger i eksempelet"-markeringer

## Test og validering

Før arbeidet regnes som ferdig:

1. Les gjennom mot `CONTEXT.md` og fjern alt som gjør appen til compliance-fasit.
2. Sjekk at alle nye Markdown-filer har påkrevd frontmatter.
3. Kjør `rg -n "fasit|godkjent|sertifikat|juridisk godkjenning|compliance-score"` på nye filer og vurder treff manuelt.
4. Kryssjekk at eksemplene bruker `KI-bruksoppgave` som vurderingsenhet, ikke hele HR-prosjektet.
5. Be gjerne en juridisk/personvern-subagent eller menneskelig fagperson om review før innholdet tas inn i appen.

## Foreslåtte skills for neste agent

- `grill-with-docs`: før tekstene ferdigstilles, stress-test malene mot prosjektets domene og avgrensninger.
- `llm-workflow-lens`: for å skille verifiserte fakta, antakelser, risiko, workflow og minste test.
- `tdd` eller `tdd-loop`: hvis malene også skal kobles inn i appen eller eksportlogikk.
- `triage`: hvis arbeidet skal brytes ned til lokale issues.

## Ikke gjør

- Ikke skriv produktkode som del av første dokumentrunde.
- Ikke gjør dette til "full AI Act-compliance".
- Ikke bruk reelle ansattopplysninger, helseopplysninger eller kundedata.
- Ikke skriv at DPIA alltid eller aldri er påkrevd uten konkret vurdering og kilde.
- Ikke slå sammen ROS, DPIA, FRIA og beslutningslogg til ett skjema.
- Ikke gjør personvernombudets vurdering til en automatisk appkonklusjon.

## Åpne spørsmål

1. Skal eksempelpakkene være rene Markdown-dokumenter først, eller også struktureres som JSON-fixtures for appen?
2. Skal DPIA-eksempelet ligge i repoet som "syntetisk eksempel", eller holdes i `docs/guides/` som veiledning for fasilitator?
3. Skal første reelle malpakke dekke bare HR Strategiradar, eller også generell KI-beslutningsradar uten HR-kontekst?
4. Hvem skal være menneskelig reviewer: personvernombud, HR-jurist, sikkerhetsansvarlig eller prosjektleder?

## Anbefalt første arbeidsøkt

Start med én smal leveranse:

1. Lag `templates/ros/hr_strategiradar_ros_mal.md`.
2. Lag `examples/ros/ros_eksempel_seniorbevaring_anonymisert_innsikt.md`.
3. Review mot `CONTEXT.md`, `CLAUDE.md` og `app_spec/brukerreise_hr_strategiradar.md`.
4. Deretter lag DPIA-mal og ett DPIA-eksempel.

Dette reduserer risikoen for at arbeidet blir for juridisk bredt før ROS-formatet er praktisk og riktig for workshopflyten.
