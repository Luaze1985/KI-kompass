---
title: "UI/UX Handoff v2 — HR Strategiradar"
date: 2026-05-17
status: aktiv
tags: [ui, ux, handoff, antigravity, mvp]
category: handoff
---

# UI/UX Handoff v2: HR Strategiradar

Denne handoffen oppsummerer alle UI/UX-beslutninger tatt i grilling-økten 2026-05-17.

## 0. Posisjonering og scope

### Hva vi bygger NÅ
En **visuell UI-shell** med mock-data. Ingen LLM, ingen backend, ingen database.
UI-et skal være ferdig til å koble på multi-agent backend etterpå.

### Hvem er brukeren?
**Alle offentlig og privat ansatte** — ikke bare HR-sjefer.
Verktøyet skal snappe opp KI-spørsmål i daglig arbeid, fra "Kan jeg bruke ChatGPT til møtenotater?" til "Skal KI fordele turnusen?"

### Hva kommer etterpå (IKKE nå)?
- LLM i bakgrunnen med **flere linser og agenter**
- Agenten kobler riktige linser, riktige oppgaver, riktige spørsmål basert på case
- RAG mot kildegrunnlag
- Multi-agent orkestrering for konkrete tilbakemeldinger

### Hva gjør appen bedre enn ChatGPT?
1. **Visuelt kompass** — umiddelbar, beregnet plassering av KI-spørsmålet
2. **Fart** — svar på 30 sekunder, ikke 5 minutter prompt-skriving
3. **Strukturert veiledning** — ikke fri tekst, men kontekstuell case-basert rådgivning
4. **Persistens** — beslutningslogg, historikk (kommer senere)

## 1. Layout-arkitektur: Outlook/Cursor-stil

Appen skal se ut som et kjent produktivitetsverktøy (Outlook, Cursor, VS Code), ikke som en nettside.

```
┌─────────────┬────────────────────────┬──────────────────┐
│  Navigasjon │   Hovedinnhold         │  Kontekstpanel   │
│  (venstre)  │   (midten)             │  (høyre,         │
│             │                        │   kollapset)     │
│  • Steg 1   │  Kompass + diagnose    │  Research-prompt │
│  • Steg 2   │  Forslag + bekreft    │  Stoppregel-info │
│  • Steg 3   │                        │  Forklaringer    │
│             │                        │                  │
├─────────────┴────────────────────────┴──────────────────┤
│  Chatbot (bunn, kan poppe opp / skjules)               │
└────────────────────────────────────────────────────────-┘
```

### Regler
- **Venstre navigasjon:** Enkel, få valg. Ikke trestruktur. Bare stegene.
- **Høyre kontekstpanel:** Kollapset som default. Åpnes ved klikk på elementer i midten (f.eks. klikk på en stoppregel → høyre viser forklaring).
- **Bunn chatbot:** Kan poppe opp når som helst. Brukeren skal kunne velge å snakke med chatten istedenfor å klikke seg gjennom stegene.

## 2. Responsivitet: Mobil, nettbrett, PC

- **Neo-brutalistisk størrelse** på knapper og interaktive elementer. Store nok til å treffe med tommelen på mobil.
- **Mobil:** Navigasjon kollapser til hamburger. Høyrepanel blir fullskjerm-overlay. Chatbot blir bunnflate.
- **Nettbrett:** Navigasjon synlig. Høyrepanel som slide-over.
- **PC:** Alle tre paneler synlige, høyre kollapset som default.

## 3. Kompasset: Smart React-komponent

### Beregning
- Kompasset er en React-komponent som **beregner prikk-posisjon automatisk** fra input.
- Prikken skal **animere/gli** til ny posisjon når brukerens svar endrer underliggende scorer.
- Skala er 0–1 internt, men **vises aldri som tall til brukeren**.

### Visning
- Prikk-posisjon = beregnet rolle.
- Kvadrant-labels oversettes til **brukerens språk**:
  - Utforskende støtte → **"KI som sparringspartner"**
  - Forsterket skjønn → **"KI hjelper, du bestemmer"**
  - Delautomatisering → **"KI gjør deler, du kontrollerer"**
  - Automatisert beslutning → **"KI avgjør (krever godkjenning)"**
- Fremmedord og fagtermer skal ha **tooltip-forklaringer** (hover/klikk for å se hva ordet betyr).

### Farger i kompasset
- Kvadrantene kan ha **subtile, lyse, gjennomskinnelige bakgrunnsfarger**:
  - Grønn tone: lav risiko (KI som sparringspartner)
  - Gul tone: moderat (KI hjelper, du bestemmer)
  - Oransje tone: høyere risiko (KI gjør deler)
  - Rød tone: høyest risiko (KI avgjør)
- Fargene skal være **forsiktige og lyse**, ikke skrikende. Tenk pastellaktig gjennomsiktighet.

## 4. Flyten: System foreslår, bruker bekrefter

### Steg 1: Beskriv saken
1. Dropdown velger fagområde (RAG/backend-drevet)
2. Systemet viser forslag **øverst**: "Vi tror saken handler om..."
3. Brukeren bekrefter med ett klikk
4. Fritekst alltid tilgjengelig som fallback (kollapset)
5. Kompasset synlig (starter i nøytral posisjon, beveger seg ved valg)

### Steg 2: Foreløpig diagnose
- Kontekstuelle oppfølgingsspørsmål (drevet av valget i Steg 1)
- Stoppregler og rolle vises
- Brukeren kan svare via chat istedenfor å klikke

### Steg 3: Innsikt
- Kompasset viser ferdig beregnet posisjon
- Handlingsboks: "Basert på vurderingen bør du..."
- Research-prompts i høyrepanelet med **kopier-knapp**
- Mulighet for å tweake videre via chat

## 5. Stoppregler → Kompassveiledning (IKKE separate advarsler)

Stoppregler skal **ikke** vises som egne blokker med koder (SR-01, SR-05 osv.).
De skal **bakes inn i kompasset** som kontekstuell veiledning tilpasset sonen prikken lander i.

### Eksempler på omskriving
| Gammel (fagsjargong) | Ny (kompassveiledning) |
|---|---|
| SR-01: Rettighets- eller arbeidspåvirkning | "Denne saken påvirker noens arbeidssituasjon. Snakk med dem først." |
| SR-05: Manglende beslutningslogg | "I denne sonen bør du logge hva du besluttet og hvorfor." |
| SR-08: Output kan ikke verifiseres | "KI-svaret er vanskelig å sjekke. Bruk det som sparring, ikke fasit." |

### Visning
- Veiledningen vises **i kompasset** eller **rett under** som korte setninger
- Klikk på en setning → høyrepanelet åpnes med utdypende forklaring
- Ingen koder, ingen "stopp"-retorikk. Bare klare råd.

## 6. Daglig bruk: Må integreres i arbeidshverdagen

> **Verktøyet er ikke en engangsvurdering for HR-sjefen.
> Det er et daglig kompass for alle ansatte som møter KI-spørsmål i arbeidet sitt.**

Dette betyr:
- Må kunne brukes på **30 sekunder** for en enkel sak
- Må kunne **skalere** til grundigere vurdering for komplekse saker
- Må **snappe opp** både små ("Kan jeg bruke ChatGPT til dette møtenotatet?") og store ("Skal KI fordele turnusen?") saker
- Må føles som et **naturlig verktøy** i arbeidshverdagen, ikke et compliance-skjema

## 6. Research-prompts: Kopierbare og kontekstuelle

- Vises i **høyrepanelet** (ikke i hovedflyten)
- Har en synlig **"Kopier"-knapp**
- Korte og lettleste (2-3 setninger + prompt)
- Merket tydelig: "Lim inn i ChatGPT, Claude eller lignende"

## 7. Chatbot: RAG-basert alternativ vei

- Alltid tilgjengelig i bunn
- Kan **poppe opp** som en flytende boble eller bunnpanel
- Chatboten bruker **RAG-teknikk**: spør basert på case-kontekst, ikke generisk
- Kan **lede** (foreslå neste steg) og **følge** (svare på brukerens spørsmål)
- Brukeren skal kunne snakke seg gjennom flyten, men **knapper er primærveien**
- Mock-LLM i MVP, ekte LLM i produksjon

## 8. Kjerneprisnipp: Fart til svar

> **Hvis brukeren ikke kommer raskere til innsikt her enn i ChatGPT, vil de bruke ChatGPT.**

Dette betyr:
- **Maks 3 klikk** fra start til kompass med beregnet rolle
- Systemet foreslår — brukeren bekrefter — ferdig
- Ingen lange skjemaer, ingen obligatoriske tekstfelt
- Visuell og kontekstuell forståelse umiddelbart (kompass + farger + klarspråk)
- Chatboten er der for de som *heller vil snakke*, ikke som et krav

## 9. Designprinsipper

| Prinsipp | Regel |
|---|---|
| Farger | Grått og hvitt som base. Subtile pastellfarger KUN i kompasset og for risiko-indikatorer |
| Knapper | Neo-brutalistisk store. Minst 44x44px touch target |
| Tekst | Ingen fagsjargong uten tooltip. Korte setninger. |
| Tall | Aldri rå scorer (0.50). Alltid kvalitative nivåer ("Middels", "Høy") |
| Layout | Outlook-lignende paneler. Kjent for brukeren. |
| Differensiering | Appen må gi noe brukeren IKKE kan gjøre i egen ChatGPT |

## 9. Teknisk stack (uendret)

- React 19, TypeScript, Vite, Vitest
- Zustand for state
- Zod for domenevalidering
- Mock-LLM i MVP, ekte backend kobles på av Codex
- Ingen database, auth eller deploy i MVP

## 10. Nåværende status

### Filer som eksisterer og fungerer
- `src/domain/schemas.ts` — Zod-skjemaer (16 tester grønt)
- `src/fixtures/all-cases.ts` — 8 realistiske HR-caser (41 tester grønt)
- `src/store/store.ts` — Zustand state
- `src/services/mockDiagnosisService.ts` — Mock-tjeneste med chat, proposals, compass-beregning
- `src/components/` — Step1, Step2, Step3, ChatPanel (fungerer men trenger omskriving til panel-layout)

### Neste byggesteg
1. Implementere Outlook-lignende panel-layout (sidebar, main, right, bottom)
2. Bygge smart kompass-komponent med animasjon og pastellfarger
3. Legge til tooltip-forklaringer på fagtermer
4. Responsiv tilpasning (mobil/nettbrett/PC)
5. Kopier-knapp på research-prompts
6. Stoppregler som klikkbare elementer med kontekstpanel
