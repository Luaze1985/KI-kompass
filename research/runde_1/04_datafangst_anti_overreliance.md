---
title: Datafangst: Anti-overreliance
date: 2026-05-12
status: ready
tags: [ki-beslutningsradar, runde-1]
category: ki-beslutningsradar
---


# Datafangst: Anti-overreliance og dømmekraft

## 1. Kort sammendrag

Anti-overreliance handler om å hindre at mennesker ukritisk følger KI-output. Risikoen øker når systemet fremstår sikkert, når brukeren har lav fagkompetanse eller lav KI-kompetanse, når feil er vanskelige å oppdage, og når arbeidsflyten gjør verifikasjon tungvint. Kontrollkravet er ikke bare å advare brukeren, men å bygge verifikasjon, motargumenter, usikkerhet og aktiv menneskelig vurdering inn i arbeidsflyten.

## 2. Operative definisjoner

| Begrep | Operativ definisjon |
|---|---|
| automation bias | tendens til å følge automatiserte anbefalinger selv når de er feil |
| overreliance | at brukeren aksepterer feil eller ufullstendig KI-output uten tilstrekkelig kontroll |
| cognitive offloading | at brukeren flytter tenkning og vurdering over til KI |
| metakognitiv blindhet | at brukeren ikke merker at egen vurdering er svekket eller hoppet over |
| deskilling | gradvis tap av ferdigheter fordi KI gjør vurderingsarbeidet |
| verification loop | fast kontrollsløyfe der bruker sjekker output mot kilder, regler og motargumenter |
| think-first | bruker må først formulere egen vurdering før KI-forslag vises eller aksepteres |

## 3. Viktigste kilder

| Kilde | Eier | Type | Hva kilden sier | Relevans | Forbehold |
|---|---|---|---|---|---|
| Microsoft overreliance framework | Microsoft | teknisk veileder | Overreliance skjer når brukere aksepterer feil eller ufullstendige KI-output; rammeverket foreslår risikokartlegging og UX-tiltak. | Hovedkilde for tiltak. | Leverandørkilde, men forskningsforankret. |
| Microsoft Research TR 2025 | Microsoft Research | teknisk rapport | Beskriver spørsmål og UX-mål for å identifisere og redusere overreliance. | Støtter operasjonalisering. | Nytt felt, ikke endelig standard. |
| EU AI Act artikkel 14 | EU | regulering | Tilsynspersoner skal være oppmerksomme på mulig automatisk tillit/overreliance og kunne overstyre. | Gir juridisk støtte. | Gjelder høyrisiko-systemer. |
| NIST AI RMF | NIST | risikorammeverk | AI-risiko må måles, styres og følges opp gjennom livsløpet. | Brukes for kontrollsløyfe. | Ikke spesifikt overreliance. |

## 4. Kontrollmekanismer

| Kontrollmekanisme | Hva den betyr | Mulig app-spørsmål | Mulig stoppregel | Kilde |
|---|---|---|---|---|
| think-first | Bruker må formulere egen vurdering før KI-output aksepteres. | «Har du skrevet egen vurdering før du ser KI-forslaget?» | Stopp hvis bruker ikke kan gi egen begrunnelse i høy-risiko saker. | Microsoft / EU AI Act |
| egen forklaring | Bruker må kunne forklare hvorfor output er riktig eller feil. | «Kan du forklare anbefalingen med egne ord?» | Stopp hvis ansvarlig ikke kan forklare beslutningen. | EU AI Act / EDPS |
| motargumenter | Systemet skal vise eller etterspørre alternative forklaringer. | «Har minst ett motargument blitt vurdert?» | Stopp ved høy risiko uten motargumentvurdering. | Microsoft |
| verifikasjon | Output må sjekkes mot kilder, regler eller data. | «Er KI-output verifisert mot en uavhengig kilde?» | Stopp hvis output ikke kan verifiseres. | Microsoft / NIST |
| usikkerhet | Systemet må synliggjøre usikkerhet og feiltypene som kan oppstå. | «Viser systemet hvor usikkert svaret er?» | Stopp hvis usikkerhet skjules i alvorlige saker. | Microsoft / EU AI Act |
| lav friksjon for kontroll | Det må være enkelt å sjekke kilder og avvise forslag. | «Er det lett å sjekke og avvise forslaget?» | Stopp hvis bruker presses mot auto-aksept. | Microsoft |
| beslutningslogg | Aksept, overstyring og begrunnelse må logges. | «Logges hvem som aksepterte/overstyrte og hvorfor?» | Stopp hvis høy-risiko beslutning ikke logges. | NIST / ISO |

## 5. Forslag til skåringsspørsmål

1. Hvor lett er det for bruker å oppdage feil i KI-output?
2. Hvor godt vises usikkerhet og begrensninger?
3. Hvor lett er det å verifisere output mot kilde eller regel?
4. Hvor sterkt presses brukeren mot å akseptere KI-forslaget?
5. Hvor tydelig må bruker begrunne egen vurdering?
6. Hvor ofte kreves motargument eller alternativ vurdering?
7. Hvor godt logges aksept, avvisning og overstyring?
8. Hvor mye fagkompetanse har brukeren som skal kontrollere output?
9. Hvor mye KI-kompetanse har brukeren?
10. Hvor alvorlige er konsekvensene hvis bruker stoler blindt på KI?

## 6. Foreløpig skåringslogikk

- **1–2 = høy overreliance-risiko:** ingen automatisering; KI kan bare brukes utforskende.
- **3 = moderat risiko:** KI kan støtte, men krever eksplisitt verifikasjon og menneskelig begrunnelse.
- **4–5 = lav risiko:** delautomatisering kan vurderes hvis øvrige kontrollkrav er oppfylt.

## 7. Røde flagg

- Bruker aksepterer KI-output uten å lese kilder.
- Systemet gir autoritativt språk uten usikkerhet.
- Kilder vises, men er ikke direkte relevante.
- Kontroll krever mer tid enn brukeren realistisk har.
- Bruker mangler fagkompetanse til å oppdage feil.
- Beslutningen er høy-risiko, men systemet har ingen verifikasjonskrav.

## 8. Eksempler

- **HR:** KI foreslår rangering av kandidater. Rødt flagg hvis HR aksepterer uten å kontrollere kriterier, diskrimineringsrisiko og datagrunnlag.
- **Offentlig sektor:** KI foreslår avslag. Rødt flagg hvis saksbehandler ikke kan forklare rettslig grunnlag.
- **SMB:** KI foreslår leverandørvalg. Lavere risiko hvis valget bare gjelder lavverdianskaffelse og kan reverseres.
- **Strategi:** KI anbefaler ny retning. Må brukes som sparring, ikke fasit.
- **Kundedialog:** KI foreslår standardsvar. Kan delautomatiseres hvis lav risiko, lett korrigering og tydelig eskalering.

## 9. Kildekontroll

- Primærkilder: EU AI Act.
- Forskning/teknisk rapport: Microsoft Research TR 2025.
- Praktiske verktøy: Microsoft Learn framework, NIST AI RMF.
- Svake kilder: generiske «prompting»-råd uten empirisk eller regulatorisk grunnlag.

## 10. Handoff til syntese

- Anti-overreliance bør være kontrollkrav, ikke kompassakse.
- Think-first bør vurderes som standarddesign i høy-risiko bruk.
- Verifikasjon bør være egen stoppregel.
- Forklarbarhet kan øke blind tillit hvis den bare gir pyntede forklaringer.
- Beslutningslogg må kobles til overstyring og læring.
