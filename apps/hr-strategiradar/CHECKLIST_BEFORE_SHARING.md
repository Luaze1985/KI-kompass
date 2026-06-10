# Sjekkliste før deling

Bruk denne før du deler koden (zip, opplasting, e-post, til en agent/LLM, osv.).

## Lag en ren pakke fra git — ikke zip arbeidsmappa

Arbeidsmappa inneholder `.env`, `node_modules` og `dist`. En vanlig zip drar med alt dette.
Bruk git i stedet — `git archive` tar **kun sporet innhold** og hopper over alt i `.gitignore`:

```bash
git archive --format=zip -o share.zip HEAD
# eller:
npm run share:zip
```

## Verifiser at pakken er ren

Pakk ut `share.zip` og bekreft at den **ikke** inneholder:

- [ ] `.env` (eller andre filer med API-nøkler / hemmeligheter)
- [ ] `node_modules/`
- [ ] `dist/`
- [ ] `.vercel/`
- [ ] `test-results/`, `playwright-report/`
- [ ] `*.log` / `debug.log`
- [ ] `.claude/` eller andre agent-/sesjonsfiler

```bash
unzip -l share.zip | grep -iE "\.env|node_modules|/dist/|\.vercel|test-results|\.log$"
# Ingen treff = ren pakke.
```

## Hvis `.env` likevel ble delt

- [ ] **Roter `PERPLEXITY_API_KEY`** i Perplexity-panelet umiddelbart.
- [ ] Oppdater din lokale `.env` med den nye nøkkelen.

## Mottakeren kjører appen slik

`node_modules` skal aldri følge med — mottakeren installerer på nytt fra `package-lock.json`:

```bash
npm install
npm run dev
```
