---
title: "Domenespråk for KI-beslutningsradar"
date: 2026-05-23
status: canonical-understanding
tags: [context, domain-language, hr-strategiradar]
category: agent-context
---

# KI-beslutningsradar

Dette er domenespråket for KI-beslutningsradaren og HR Strategiradar. Begrepene skal hjelpe agenter å holde arbeidsverktøy, øvingsarena, kompass, ROS og menneskelig ansvar fra hverandre.

## Language

**KI-beslutningsradar**:
Et beslutningsrammeverk som hjelper en rådgiver, leder eller prosjektgruppe å vurdere hvilken rolle KI kan ha i en konkret beslutningsprosess.
_Avoid_: compliance-motor, automatisk beslutningsapp, AI-readiness-test

**HR Strategiradar**:
En lokal arbeidsflate for å teste KI-beslutningsradaren på strategiske HR-mikroprosjekter og reelle arbeidsoppgaver.
_Avoid_: HR-scoreapp, juridisk godkjenningsverktøy

**Arbeidsverktøy og øvingsarena**:
En fasilitert flate der en prosjektgruppe kan øve på og dokumentere ansvarlig KI-vurdering mens de arbeider med en reell sak.
_Avoid_: selvbetjent fasit, revisjonssertifikat

**Prosjektgruppeflate**:
Brukssituasjonen der en rådgiver eller prosjekteier leder en gruppe gjennom kart, KI-bruksoppgave, kompass, stoppregler, ROS-punkter og beslutningsnotat.
_Avoid_: individuell app, chatbot som bestemmer

**HR-mikroprosjekt**:
Den faktiske HR-saken som gir kontekst, mål, berørte parter og lokale forhold.
_Avoid_: vurderingsenhet, scoreobjekt

**KI-bruksoppgave**:
Det konkrete KI skal gjøre i HR-mikroprosjektet. Dette er vurderingsenheten for kompasset.
_Avoid_: hele prosjektet, generell KI-bruk

**Kart**:
Virksomhets- og HR-konteksten rundt saken: mål, målgruppe, berørte parter, beslutningseier, sikre fakta og usikkerhet.
_Avoid_: score, kompassakse

**Kompass**:
Diagnosen av KI-egnethet basert på målklarhet og separabilitet.
_Avoid_: tillatelse, fasit, compliance-score

**Målklarhet**:
Hvor tydelig det er hva godt output betyr for KI-bruksoppgaven.
_Avoid_: forklarbarhet, kvalitet generelt

**Separabilitet**:
Hvor trygt KI-output kan skilles ut fra helhetsvurdering, relasjon, lokal kontekst og menneskelig skjønn.
_Avoid_: målklarhet, teknisk automatiserbarhet

**Kontrollkrav**:
Krav til forklarbarhet, human oversight og anti-overreliance som avgjør om KI-output kan forstås, kontrolleres og verifiseres.
_Avoid_: kompassakse, pynt, etterpå-advarsel

**Stoppregel**:
Et rødt flagg som begrenser eller stopper en rolle uavhengig av score.
_Avoid_: anbefaling, varsel etter score

**Foreløpig KI-diagnose**:
Appens midlertidige vurdering etter kart, kompass og stoppregler, før menneskelig verifikasjon og beslutningsnotat er fullført.
_Avoid_: resultat, fasit, godkjenning

**ROS-punkt**:
Et risikopunkt prosjektgruppen må vurdere, verifisere eller lukke før KI-output kan brukes forsvarlig.
_Avoid_: automatisk compliance-krav, scoreindikator

**Human-in-the-loop**:
En faktisk arbeidsmåte der mennesket vurderer før aksept, formulerer motargument, verifiserer lokalt, dokumenterer usikkerhet og eier beslutningen.
_Avoid_: signatur, lås, checkbox

**Beslutningsnotat**:
Arbeidsleveransen fra vurderingen. Notatet samler kart, KI-bruksoppgave, kompass, stoppregler, ROS-punkter, menneskelig vurdering og ansvar.
_Avoid_: automatisk vedtak, sertifikat

## Flagged Ambiguities

**Compliance-score**:
Skal ikke brukes som kanonisk produktbegrep. Bruk heller samsvarsgrad eller varselindikator, og presiser at den ikke er juridisk fasit.

**Internkontrollverktøy**:
Kan brukes om dokumentasjon og etterspor, men må ikke bety fullverdig revisjons- eller compliance-system i MVP.

**Makkersjekk**:
Er støtte for etterspor og fire øyne, men erstatter ikke human-in-the-loop. Den kommer etter menneskelig vurdering, ikke i stedet for den.

## Example Dialogue

Prosjekteier: Vi vurderer seniorbevaring i hjemmetjenesten.

Rådgiver: Det er HR-mikroprosjektet. Hva er den konkrete KI-bruksoppgaven?

Prosjekteier: KI kan strukturere anonymiserte innspill og lage tiltakshypoteser.

Rådgiver: Da vurderer kompasset den bruksoppgaven, ikke hele livsfasepolitikken. Før vi lager beslutningsnotat må prosjektgruppen også gå gjennom stoppregler, ROS-punkter, lokal verifikasjon og hvem som faktisk eier beslutningen.
