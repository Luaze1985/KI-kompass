---
title: "Formell Arkitektur- og Sikkerhetsrevisjon: Integrering av 14 HR-roller og 28 Oppgavemaler"
date: 2026-05-24
status: completed
tags: [revisjon, arkitektur, sikkerhet, hr-strategiradar, kristiansand-kommune, human-in-the-loop, GDPR, forvaltningsloven, HTA, HA]
category: Quality Assurance / Audit
---

# Formell Arkitektur- og Sikkerhetsrevisjon: Integrering av 14 HR-roller og 28 Oppgavemaler i `laeringsvei_v2.html`

Denne rapporten dokumenterer den formelle arkitektur-, sikkerhets- og samsvarsrevisjonen av den fullførte implementeringen for å etablere en database over alle 14 HR-roller (`linser/linselab/registers/ROLE_TASKS_REGISTRY.yml`) og deres integrasjon i læringsveien (`laeringsvei_v2.html`) for Kristiansand kommunes Learning Lab.

Revisjonen er utført av **07-arkitekturdommer** i henhold til de styrende prinsippene for prosjektet og gjeldende lovverk (GDPR, Forvaltningsloven, Likestillingsloven, Hovedtariffavtalen og Hovedavtalen i KS-området).

---

## 1. Revisjonsomfang og Evaluering av Leveransen

Leveransen består av to kjerneelementer som nå er fullstendig implementert, verifisert og integrert:
1. **`ROLE_TASKS_REGISTRY.yml`**: En komplett og profesjonelt strukturert YAML-database over alle 14 HR-roller (13 kanoniske roller `R-02` til `R-14` + `_placeholder` for uspesifiserte roller). Hver rolle er tildelt nøyaktig to høyst realistiske, kommunespesifikke oppgavemaler (totalt 28 oppgaver) med pre-utfylte kompassverdier, lovhenvisninger og linse-triage.
2. **`laeringsvei_v2.html`**:
   - **Rolle-select i Steg 1**: Utvidet til 14 detaljerte alternativer med de eksakte `R-xx` kodene, slik at brukerens valgte rolle er direkte koblet til databasen.
   - **`ROLE_TASKS_DATABASE` i JavaScript**: Integrert som en komplett speiling av den nye YAML-databasen, noe som gjør løsningen fullstendig selvstendig, robust og umiddelbart kjørbar uten eksterne nettverksavhengigheter.
   - **Dynamisk kompass-pre-utfylling i Steg 3**: Når en oppgave velges som mal, pre-utfylles målklarhet, separabilitet og risikostatus i kompasset automatisk.
   - **Sikkerhetsstopp / Refleksjonslås (Gatekeeper)**: En tvingende bekreftelses-hake ("Jeg bekrefter at jeg IKKE har lagt inn sensitive data") hindrer automation bias og tvinger fram en bevisst menneskelig sjekk før resultatene kan vises eller prompts genereres.
   - **Domenegrenser og Lex-disclaimere**: Dynamisk innsprøyting av strenge domenegrenser i promptgenereringen. HR-jurister (`R-06`) får avansert sparring og utfordres på rettslige gråsoner, mens ikke-jurister (øvrige roller) får en streng "Lex-disclaimer" som eksplisitt pålegger dem å delegere komplekse tolkninger til kommunens faktiske HR-jurist.

---

## 2. Sikkerhets- og Samsvarsanalyse (Sikkerhetsportene)

Hver av de fem kritiske sikkerhetsportene har blitt evaluert mot de faktiske endringene i kildekoden.

### Port A: Menneskelig kontroll ("Human-in-the-loop" og Anti-Overreliance)
* **Sårbarhet**: Automatisk pre-utfylling av kompass-radioknapper (Målklarhet, Separabilitet, Risiko) ut fra en fast mal kan føre til at brukere blindt aksepterer antakelsene uten selvstendig refleksjon (automation bias).
* **Vurdering av tiltak**: *Godkjent med forsterkning.*
  - Kildekoden har en integrert "Sikkerhetsstopp" i JavaScript-funksjonen `visResultat()`. Dersom brukeren har valgt en oppgavemal eller dersom oppgaven er vurdert til høy risiko, *sperres* videre fremdrift inntil brukeren manuelt haker av for `safety-gate-checkbox`.
  - Huketeksten understreker at forhåndsutfyllingen kun er et *forslag* og at brukeren personlig må innestå for at vurderingen er tilpasset deres lokale forhold. Dette tvinger brukeren ut av sløv automatiseringsaksept og inn i en aktiv human-in-the-loop refleksjon.

### Port B: Kognitiv bias-sikring ("Think-First")
* **Sårbarhet**: KI-er (Copilot) brukt som snarvei til å generere ferdige utkast direkte gjør at ansatte unngår å analysere problemets kjerne manuelt, noe som svekker den faglige modningen i Learning Lab.
* **Vurdering av tiltak**: *Utmerket.*
  - Prompt 1 ("Dømmekraft med KI") er programmert med **Disseksjonsprotokollen** (skille mellom Fakta, Antakelser, Tolkning og Gjennomskjæring).
  - Copilot instrueres eksplisitt til å *ikke* gi hele løsningen på en gang. Den tvinges til å opptre som en pedagogisk coach som stiller *ett* spørsmål av gangen og utfordrer brukeren til å tenke selv først. Dette bevarer "Think-First"-tilnærmingen og maksimerer læringsutbyttet.

### Port C: Profesjonelle domenegrenser (Lex-disclaimer & Lagskille)
* **Sårbarhet**: Saksbehandlere uten juridisk embetseksamen (f.eks. HR-rådgivere, rekrutterere eller IA-rådgivere) som bruker Copilot til å tolke lovverk, risikerer å fatte ulovlige vedtak eller gi feilaktig juridisk rådgivning (metakognitiv blindhet).
* **Vurdering av tiltak**: *Utmerket.*
  - JavaScript-funksjonen `genererDynamiskePrompts` sjekker nå direkte om `state.rolle === 'R-06'` (HR-jurist).
  - **For ikke-jurister**: Copilot pålegges en streng instruks om å legge inn en **Lex-disclaimer** i alle svar, og minne brukeren om at komplekse tolkninger av Arbeidsmiljøloven eller forvaltningsrett *må* delegeres til kommunens HR-jurist (`R-06`). Dette opprettholder ansvarsfordelingen og beskytter organisasjonen mot uautorisert rettsanvendelse.
  - **For HR-jurister**: Copilot slår over i "avansert faglig sparring", som hjelper juristen med å lete etter nyanser, gråsoner og motargumenter i rettskildene, uten å overstyre juristens faglige autoritet.

### Port D: Personvern (GDPR) og Soneskiller
* **Sårbarhet**: Ansatte i saksbehandling (særlig sykefravær `R-13` eller lærlingoppfølging `R-10`) kan bli fristet til å lime inn sensitiv helsehistorikk, medlemskap i fagforening (særlig sensitive kategorier personopplysninger under GDPR art. 9) eller fulle navn i promptene.
* **Vurdering av tiltak**: *Svært robust.*
  - Hver eneste oppgavemal i databasen som omhandler sensitive temaer har eksplisitte, røde advarsler i `contextRules` (f.eks. `🚨 SENSITIVE HELSEDATA`, `🚨 GDPR-REGEL: Bruk faste plassholdere`, `🚨 SONEFORBUD`).
  - Felleskonteksten som flettes inn i alle prompts inneholder en dynamisk GDPR-advarsel basert på om `risiko === 'rød'`. Den pålegger brukeren å utelukkende prosessere anonymiserte opplysninger i den sikre kommunale M365 Copilot-tenanten, og benytte anonyme plassholdere (f.eks. `[Navn Ansatt]`) i stedet for personopplysninger.

### Port E: Lokal forankring av faglige linser (Municipal Grounding)
* **Sårbarhet**: Linselabens 12 active linser (D1, E5, K2, osv.) kan fremstå som abstrakte akademiske termer, noe som svekker relevansen for en saksbehandler i Kristiansand kommune.
* **Vurdering av tiltak**: *Fullt integrert.*
  - `LINSE_REGISTER` i HTML-koden kobler linsene direkte til kommunale stillingstitler (f.eks. `D1` til "HR-jurist (D1)", `D3` til "Personvernombud / PVO (D3)", `J3` til "Hovedtillitsvalgt (J3)").
  - Disse lokale yrkestitlene vises direkte på anbefalingskortet og flettes inn i promptene, slik at brukeren umiddelbart forstår hvem i kommunen som eier det aktuelle fagperspektivet.

---

## 3. Endelig Beslutning (YAML-format)

Som **07-arkitekturdommer** leveres herved den endelige arkitektoniske vurderingen og beslutningen.

```yaml
architecture_judgement:
  decision: continue
  short_reason: "Implementeringen av de 14 HR-rollene og 28 oppgavemalene er fullstendig, robust og 100 % i tråd med prinsipper for human-in-the-loop, Lex-disclaimere og GDPR-samsvar."
  must_fix_before_codex: []
  allowed_to_wait:
    - "Day-2: Utvide med ytterligere etatsspesifikke oppgavemaler basert på tilbakemeldinger fra pilotgruppene."
    - "Day-2: Etablere en dedikert PDF-rapport-eksport av beslutningsnotatet."
  recommended_codex_instruction: "Leveransen er verifisert og klar for produksjon. Neste steg er å informere prosjekteier og starte de første fasiliterte pilotworkshopene med prosjektgruppene i Kristiansand kommune."
```

```yaml
target_project: "KI-beslutningsradar / HR Strategiradar"
target_repo: "c:/Users/larse/Documents/ki-beslutningsradar"
review_scope: "Integrasjon av 14 HR-roller, 28 oppgavemaler og domenegrenser i laeringsvei_v2.html"
current_plan: "Etablere database i ROLE_TASKS_REGISTRY.yml og dynamic mapping i laeringsvei_v2.html"
allowed_files:
  - "linser/linselab/registers/ROLE_TASKS_REGISTRY.yml"
  - "C:/Users/larse/Documents/Interne prosjekter/learning lab/domains/kommune_org/01_organisasjonsmodell/laeringsvei_v2.html"
forbidden_files: []
done_when:
  - "Alle 14 roller (13 kanoniske + placeholder) og 28 oppgaver er registrert i ROLE_TASKS_REGISTRY.yml."
  - "Steg 1 select-elementet i laeringsvei_v2.html er oppdatert med de eksakte R-kodene."
  - "ROLE_TASKS_DATABASE i laeringsvei_v2.html er oppdatert og fullt synkronisert med registerspesifikasjonen."
  - "Menneskelig 'safety-gate' verifikasjon og dynamiske Lex-disclaimere er testet og operative."
  - "Formell arkitektur- og sikkerhetsrevisjon er fullført og signert av 07-arkitekturdommer."
```

---

## 4. Konklusjon og Anbefalinger for Drift

Den utførte implementeringen løfter `laeringsvei_v2.html` fra en enkel statisk prototype til en høyst avansert, pedagogisk og etisk bunnsolid øvingsarena og arbeidsverktøy.

* **Pedagogisk styrke**: Brukere opplever en friksjonsfri inngang ved at deres faktiske rolle gir relevante oppgavemaler, men tvinges umiddelbart inn i en reflektert dialog med Copilot i stedet for passiv "Copy-Paste".
* **Sikkerhetsmessig trygghet**: Sperrene mot personopplysninger og den tvingende manuelle bekreftelsen (Gatekeeper) ivaretar personvernet på en forbilledlig måte.
* **Faglig integritet**: Det skarpe lagskillet mellom HR-jurister og øvrige rådgivere sikrer at faglige ansvarslinjer i kommunen respekteres, samtidig som man motvirker metakognitiv blindhet i organisasjonen.

**Anbefaling**: Løsningen godkjennes herved uten forbehold for videre pilotering og utrulling i Kristiansand kommunes Learning Lab.
