---
title: MVP dimensjonering og vurdering
date: 2026-05-12
status: post-grill-draft
tags: [mvp, app-spec, dimensjonering, vurdering]
category: app-spec
---

# MVP dimensjonering og vurdering

## Formål

MVP-en skal gjøre vurderingsflyten i KI-beslutningsradaren praktisk testbar.

Den skal hjelpe prosjekteier eller rådgiver, i rollen som fasilitator for en prosjektgruppe, å beskrive et strategisk HR-mikroprosjekt, avgrense en konkret KI-bruksoppgave, få AI-støttet dimensjonering, gjøre menneskelige verdivurderinger, se stoppregler, arbeide gjennom ROS-punkter, få en foreløpig tillatt KI-rolle og dokumentere ansvar.

MVP-en er både arbeidsverktøy og øvingsarena: den skal brukes på reelle arbeidsoppgaver, men samtidig lære prosjektgruppen å holde kart, kompass, kontrollkrav, ROS og menneskelig ansvar fra hverandre.

## Første bruker

Første reelle bruker er:

> Prosjekteier eller rådgiver i konsulentrollen, som fasiliterer en prosjektgruppe.

MVP-en er ikke laget for saksbehandler, ledergruppe eller selvbetjent kunde i første runde. Den er heller ikke en individuell score-app; den skal støtte en strukturert arbeidsøkt der flere kan teste en konkret KI-bruksoppgave mot radaren og fullføre nødvendig ROS-/beslutningsgrunnlag.

## Første beslutningstype

Første harde test er:

> Strategisk HR: mikroprosjekter innenfor livsfasepolitikk.

Flyten kjøres én gang per mikroprosjekt. Sammenligning på tvers av mikroprosjekter er ikke MVP-scope.

## MVP-type

MVP-en er en passiv, sekvensiell wizard med tilbake-knapp.

Den er ikke:

- sokratisk motpart
- stateful graph
- agentisk dialogsystem
- linsesystem
- automatisk beslutningsmotor

Tilbake-navigering skal rekalkulere alle nedstrøms vurderinger.

## Kjerneflyt

```text
1. Kart
2. Kompass
3. Stoppregler
4. Kontrollkrav
5. Rolle-tak og foreløpig KI-rolle
6. Beslutningslogg
7. Rapportutkast
```

## MVP-moduler

| Modul | Hva bruker gjør | Hva systemet gjør |
|---|---|---|
| Kart | Beskriver beslutning, berørte parter, risiko og ansvar. | Avleder risikonivå og mulige stoppregler. |
| Kompass | Beskriver beslutningen og gjør utvalgte verdivurderinger. | AI foreslår målklarhet- og separabilitet-score basert på indikatorer. |
| Stoppregler | Bekrefter eller avviser røde flagg. | Setter rolle-tak før score tolkes. |
| Kontrollkrav | Vurderer forklarbarhet, human oversight og anti-overreliance. | Beregner kontroll-score og påkrevde kontroller. |
| KI-rolle | Setter stempel på retningsvalg, ikke enkelttall. | Skiller `beregnet_rolle` fra `forelopig_tillatt_rolle` og sier hva AI ikke kan vurdere godt. |
| Beslutningslogg | Dokumenterer menneskelig vurdering, motargument, verifikasjon, ROS-punkter og ansvar. | Krever lavrisiko- eller høy-risiko-logg etter kontrakt og gjør tydelig hva prosjektgruppen må lukke før videre bruk. |
| Rapport | Leser kort oppsummering. | Viser hva KI kan gjøre, hva mennesket må eie, og hva som ikke skal automatiseres. |

## Minimumsoutput

MVP-en må kunne produsere:

- beslutningsbeskrivelse
- risikonivå
- målklarhet-score
- separabilitet-score
- stoppregler utløst
- rolle-tak
- kontroll-score
- beregnet rolle
- foreløpig tillatt rolle
- påkrevde kontroller
- beslutningsloggkrav
- rapportutkast

## Scoring og verdivurdering

AI-en skal foreslå score basert på kriterier i `concepts/dimensjoner.md` og `decision_model/scoremodell_runde_1.md`.

Brukeren skal ikke måtte sette alle enkelttall manuelt. Brukeren skal gjøre verdivurderinger på utvalgte punkter, for eksempel:

- hva som teller mest i denne beslutningen
- om relasjonell tillit er viktig
- om lokale unntak betyr mye
- om menneskelig nærvær er del av verdien
- om konsekvensen ved feil er akseptabel

AI-en må eksplisitt vise:

- hvilke indikatorer som trigget scoren
- hva AI-en ikke kan vurdere godt
- hvilke menneskelige faktorer som krever brukerens vurdering

## Visuelt nivå

Kompasset bør være synlig og oppdateres underveis.

Visualiseringen skal støtte forståelse, men høy grafisk standard er ikke MVP-prioritet. Beslutningslogikken valideres først.

## Ikke i første MVP

- innlogging
- database
- flerbrukerflyt
- automatisk lagring
- sammenligning på tvers av mikroprosjekter
- sokratisk motpart
- linsesystem
- stateful graph
- full AI Act-vurdering
- fullverdig compliance- eller revisjonssystem
- generisk AI-readiness-test
- juridisk godkjenningsmotor
- automatisert beslutningsmotor
- produksjonsklar scoringmotor

## Før appkode

Før bygging må dette avklares:

1. Hvilke verdivurderingspunkter brukeren skal svare på.
2. Om `typescript_app` er riktig første prototypeform, eller om en enklere lokal prototype er bedre.
3. Om utvidet indikator-mapping i `testcases/runde_1_testcaser.md` er tilstrekkelig kalibreringsgrunnlag.
