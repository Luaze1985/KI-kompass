# AGENTS.md

## Prosjektregel

Dette workspace-et er et konsept- og kontekstarbeid for KI-beslutningsradaren. Behandle materialet som researchgrunnlag, ikke som klar appspesifikasjon.

Les først:

1. `CONTEXT.md`
2. `CLAUDE.md`
3. `state/context/current_context.md`
4. `docs/agents/domain.md`

HR Strategiradar skal forstås som et arbeidsverktøy og en øvingsarena for reelle prosjektvurderinger. Primærbruken er en prosjekteier eller rådgiver som fasiliterer en prosjektgruppe gjennom kart, konkret KI-bruksoppgave, kompass, stoppregler, ROS-punkter, lokal verifikasjon og beslutningsnotat. Appen skal ikke fremstå som compliance-fasit, juridisk godkjenningsmotor eller revisjonssertifikat.

Antigravity-handoffs fra 2026-05-23 er teknisk historikk hvis de kolliderer med disse kildene. Trafikklys, samsvarsgrad og makkersjekk er støtte for prioritering og etterspor, ikke erstatning for human-in-the-loop.

## Arbeidsregler

- Ikke bygg frontend, backend, database eller scoringmotor før testcaser, stoppregler og beslutningslogg er validert.
- Hold `kart`, `kompass`, `kontrollkrav`, `linser` og `beslutningslogg` som separate lag.
- Ikke slå sammen målklarhet og separabilitet.
- Ikke gjør forklarbarhet til kompassakse.
- Ikke gjør linser til kompassdimensjoner.
- Ikke automatiser dømmekraft.
- Ikke overskriv researchfiler uten å bevare originalen eller skrive arkivnotat.
- Nye Markdown-filer skal ha YAML-frontmatter med `title`, `date`, `status`, `tags` og `category`.
- Bruk norsk bokmål i prosjektfiler med mindre brukeren ber om noe annet.

## Kildeprioritet

1. `archive/source_packages/runde_1_ready/` er kanonisk for komplett runde 1.
2. `archive/source_packages/grunnfundament_med_bilder/` er kanonisk for grunnfundament og bilder.
3. `archive/source_packages/runde_1_klargjoring/` brukes for kontekstpakker og opprinnelig klargjøringslogikk.
4. `archive/source_packages/runde_1_archive_variant/` brukes kun for inntaks- og kvalitetskontrollreferanser.

## Agent skills

- Issue tracker: bruk lokale Markdown-saker under `issues/`; se `docs/agents/issue-tracker.md`.
- Triage labels: bruk `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human` og `wontfix`; se `docs/agents/triage-labels.md`.
- Domain docs: dette er et single-context repo med rotkontekst i `CONTEXT.md` og arkitekturnotater under `docs/architecture/`; se `docs/agents/domain.md`.
- UI/UX-subagent: bruk `docs/agents/ui-ux-subagent.md` ved arbeid med vekting, interaksjonsdesign, brukerreise, språk eller visuell prioritering i HR Strategiradar.
