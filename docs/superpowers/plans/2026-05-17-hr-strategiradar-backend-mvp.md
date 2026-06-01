# HR Strategiradar Backend MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bygge en lokal, testbar backend for HR Strategiradar som importerer relevant Learning Lab-kontekst, eksponerer HR-caser, beregner stoppregler/KI-rolle deterministisk og lager beslutningsklart grunnlag uten database eller LLM-avhengighet.

**Architecture:** Backend legges i `apps/hr-strategiradar/server/` som en Fastify/TypeScript API-server i samme package som Vite-appen. Domenekontrakter ligger i `apps/hr-strategiradar/src/domain/` og deles mellom frontend, backend og tester. Learning Lab brukes som read-only kilde via allowlistet import til en generert JSON-artefakt; vurderingsmotoren bruker bare strukturerte fixtures og eksplisitte kontrollregler.

**Tech Stack:** TypeScript, Vite, React, Vitest, Zod, Fastify, `tsx`, Node `fs/path/crypto`.

---

## Kodebasefunn som planen bygger på

- `apps/hr-strategiradar/` er en Vite/React/TypeScript-app med scaffoldet frontend.
- `npm test` og `npm run build` feiler nå fordi `src/domain/__tests__/schemas.test.ts` og `src/domain/__tests__/fixtures.test.ts` importerer `src/domain/schemas.ts` og `src/fixtures/all-cases.ts`, som ikke finnes.
- `tasks/active/hrsr_002_domain_schemas_and_fixtures.md` er aktiv neste issue og krever domenekontrakter, fixtures, risikoflagg, stoppregler og beslutningslogg.
- `testcases/hr_strategiradar_realistiske_caser.md` har 8 realistiske HRR-caser. HRR-07 er nå langvakter i helsesektoren.
- Learning Lab har nyttige HR-kilder:
  - `domains/kommune_org/01_organisasjonsmodell/HR_PROSESSOVERSIKT.md`
  - `domains/kommune_org/05_simulering/testsett/HR_TESTSETT_V1.md`
  - `domains/kommune_org/05_simulering/testsett/HR_RANDSONE_TESTSETT_V1.md`
  - `domains/kommune_org/01_organisasjonsmodell/HR_KJERNEPROSESSER/*.md`
  - `engines/kommuneinnsikt_rag/` som mønster for streng modellkontrakt, proveniens og gap-håndtering.
- `learning-ios-mvp/backend/worker.js` i Learning Lab er et API-key/CORS-proxy-mønster, ikke en egnet backendmodell for HR Strategiradar. Denne MVP-en skal ikke starte med ekstern AI-proxy.

## Arkitekturbeslutninger

1. Backend er lokal API-server først, ikke database først.
2. Learning Lab importeres fra allowlistede filbaner. UI skal aldri kunne sende frie filstier til backend.
3. Domenemodellen separerer lagene `kart`, `kompass`, `kontrollkrav`, `linser`, `stoppregler` og `beslutningslogg`.
4. Kompasset har bare vurderingsaksene `maalklarhet` og `separabilitet`. Forklarbarhet og sporbarhet ligger i `kontrollkrav`, ikke som kompassakse.
5. Risikoflagg skal være konkrete HR-/arbeidslivsflagg. Arbeidsplassovervåking og automation-bias skal ikke være primær modellflate i denne runden.
6. `human oversight` modelleres ikke som slagord. Backend krever eksplisitte kontrollpunkter: lokal verifikasjon, beslutningseier, manuell forhåndsvurdering ved høy risiko, og beslutningslogg.
7. Ingen endpoint skal konkludere med full automatisering. `automatisert_beslutning` kan finnes som enum-verdi for å avvise eller cappe, men MVP-resultater skal stoppe på `forsterket_skjonn` eller lavere.

## Filstruktur

### Opprettes

- `apps/hr-strategiradar/src/domain/schemas.ts`
  Zod-schemas, TypeScript-typer og enums for HR-mikroprosjekt, KI-bruksoppgaver, kompass, kontrollkrav, stoppregler, vurderingsresultat og beslutningslogg.

- `apps/hr-strategiradar/src/domain/assessment.ts`
  Deterministisk beregningsmotor: valider input, vurder stoppregler før rolle, beregn rolle, legg på rolletak, og returner sporbar forklaring.

- `apps/hr-strategiradar/src/fixtures/all-cases.ts`
  Åtte HRR-caser med minst to KI-bruksoppgaver per case, inkludert Learning Lab-referanser.

- `apps/hr-strategiradar/server/config.ts`
  Leser port og `LEARNING_LAB_ROOT`, med trygg standardsti for lokal maskin.

- `apps/hr-strategiradar/server/app.ts`
  Fastify-app med CORS og rute-registrering.

- `apps/hr-strategiradar/server/index.ts`
  Starter lokal API-server.

- `apps/hr-strategiradar/server/importers/learningLabManifest.ts`
  Allowlist over Learning Lab-filer som kan importeres.

- `apps/hr-strategiradar/server/importers/learningLabImporter.ts`
  Leser allowlistede filer, trekker ut metadata, scenarioer, kildehash og gap.

- `apps/hr-strategiradar/server/importers/markdown.ts`
  Små markdown-parsere for frontmatter, overskrifter og scenario-blokker.

- `apps/hr-strategiradar/server/scripts/importLearningLab.ts`
  CLI-script som skriver generert importartefakt.

- `apps/hr-strategiradar/server/data/generated/.gitkeep`
  Holder generert datamappe i repoet.

- `apps/hr-strategiradar/server/routes/health.ts`
  `GET /api/health`.

- `apps/hr-strategiradar/server/routes/sources.ts`
  `GET /api/sources/learning-lab/summary`.

- `apps/hr-strategiradar/server/routes/cases.ts`
  `GET /api/cases` og `GET /api/cases/:caseId`.

- `apps/hr-strategiradar/server/routes/assessments.ts`
  `POST /api/assessments/preview`.

- `apps/hr-strategiradar/server/routes/reports.ts`
  `POST /api/reports/decision-note`.

- `apps/hr-strategiradar/server/__tests__/health.test.ts`
  Backend smoke test.

- `apps/hr-strategiradar/server/__tests__/learningLabImporter.test.ts`
  Import- og path-safety tester.

- `apps/hr-strategiradar/server/__tests__/casesRoute.test.ts`
  Case API tester.

- `apps/hr-strategiradar/server/__tests__/assessmentRoute.test.ts`
  API-tester for stoppregler, rolletak og HRR-07.

- `apps/hr-strategiradar/server/__tests__/reportsRoute.test.ts`
  Markdown rapport-test.

- `apps/hr-strategiradar/src/api/client.ts`
  Typed frontend-klient mot `/api/*`. Ingen UI-ombygging i denne planen.

- `apps/hr-strategiradar/tsconfig.server.json`
  TypeScript-konfig for backendfiler.

### Endres

- `apps/hr-strategiradar/package.json`
  Legg til `fastify`, `@fastify/cors`, `tsx`, backend-scripts og importscript.

- `apps/hr-strategiradar/tsconfig.json`
  Legg til server-referanse.

- `apps/hr-strategiradar/tsconfig.app.json`
  Ekskluder testfiler fra app-build slik at `tsc -b` ikke bygger Vitest-filer som applikasjonskode.

- `apps/hr-strategiradar/vite.config.ts`
  Legg til dev proxy fra `/api` til `http://127.0.0.1:8787`.

- `apps/hr-strategiradar/src/domain/__tests__/schemas.test.ts`
  Oppdater til ny lagdelt domenekontrakt med ASCII-feltnavn.

- `apps/hr-strategiradar/src/domain/__tests__/fixtures.test.ts`
  Oppdater til ny fixturekontrakt og HRR-07-langvaktkrav.

---

## Issue 1: Stabiliser domenekontrakter før backend

**Hvorfor:** Backend kan ikke fungere før caser, stoppregler og vurderingsresultat har én delt kontrakt.

**Files:**
- Create: `apps/hr-strategiradar/src/domain/schemas.ts`
- Modify: `apps/hr-strategiradar/src/domain/__tests__/schemas.test.ts`
- Modify: `apps/hr-strategiradar/tsconfig.app.json`

- [ ] **Step 1: Skriv domenetest for lagdeling**

Erstatt `apps/hr-strategiradar/src/domain/__tests__/schemas.test.ts` med:

```ts
import { describe, expect, it } from 'vitest'
import {
  AiUseTaskSchema,
  AssessmentInputSchema,
  CompassScoresSchema,
  ControlRequirementsSchema,
  DecisionLogSchema,
  HrMicroprojectSchema,
  KiRole,
  RiskFlagsSchema,
  StopRule,
} from '../schemas'

const validTask = {
  taskId: 'HRR-01-A',
  title: 'Strukturere anonymisert innsikt og tiltakshypoteser',
  taskType: 'strukturering',
  inputDataType: 'aggregerte indikatorer og anonymiserte innspill',
  outputUse: 'intern drofting',
  humanDecisionPoint: 'HR-sjef vurderer tiltak for KI-output brukes i beslutningsnotat',
  directEffectOnPeople: false,
  usesPersonalOrSensitiveData: false,
  compassScores: {
    maalklarhet: { score: 3.5, justification: 'Retningen er tydelig, men tiltakene er flere.' },
    separabilitet: { score: 2.5, justification: 'Verdivalg og lokal tillit avgjor om output kan brukes.' },
  },
  controlRequirements: {
    explainabilityRequired: true,
    traceabilityRequired: true,
    localVerificationRequired: true,
    decisionLogRequired: true,
    manualPreAssessmentRequired: false,
    reversibilityRequired: true,
  },
  riskFlags: {
    rightsOrSignificantImpact: false,
    vulnerableParty: false,
    personalOrSensitiveData: false,
    healthSafetyEnvironment: false,
    patientOrUserSafety: false,
    workConditionsImpact: true,
    discriminationRisk: false,
    legalOrAgreementConstraint: false,
    irreversibleConsequences: false,
  },
  expectedStopRules: ['SR-02', 'SR-05'],
  expectedCalculatedRole: 'forsterket_skjonn',
  expectedAllowedRole: 'utforskende_stotte',
  requiredControls: ['lokal verifikasjon', 'beslutningslogg'],
  requiredLocalVerification: 'Leder ma vurdere mot lokale forhold.',
  sourceRefs: ['testcases/hr_strategiradar_realistiske_caser.md#HRR-01'],
}

const validProject = {
  caseId: 'HRR-01',
  title: 'Seniorbevaring i hjemmetjenesten',
  strategyArea: 'livsfasepolitikk',
  strategicGoal: 'Bidra til at senioransatte star lenger i arbeid.',
  targetGroups: ['senioransatte', 'ledere', 'HR'],
  affectedParties: ['ansatte i ulike livsfaser', 'brukere av hjemmetjenesten'],
  decisionOwner: 'HR-sjef',
  knownFacts: ['Kommunen har behov for arbeidskraft.'],
  uncertainties: ['Lokale arsaker til avgang er ikke ferdig analysert.'],
  sourceBasis: 'HRR-01, Learning Lab HR-testsett og relevante offentlige kilder.',
  learningLabRefs: ['domains/kommune_org/05_simulering/testsett/HR_TESTSETT_V1.md#Scenario 1'],
  aiUseTasks: [validTask],
}

describe('HrMicroprojectSchema', () => {
  it('accepts a valid microproject with at least one AI use task', () => {
    expect(HrMicroprojectSchema.safeParse(validProject).success).toBe(true)
  })

  it('rejects missing title, strategic goal, strategy area, owner, and AI tasks', () => {
    for (const key of ['title', 'strategicGoal', 'strategyArea', 'decisionOwner', 'aiUseTasks'] as const) {
      const invalid = { ...validProject }
      delete invalid[key]
      expect(HrMicroprojectSchema.safeParse(invalid).success).toBe(false)
    }
  })

  it('requires at least one AI use task', () => {
    expect(HrMicroprojectSchema.safeParse({ ...validProject, aiUseTasks: [] }).success).toBe(false)
  })
})

describe('AiUseTaskSchema', () => {
  it('validates AI use task shape', () => {
    expect(AiUseTaskSchema.safeParse(validTask).success).toBe(true)
  })

  it('rejects compass scores outside 1-5', () => {
    const invalid = {
      ...validTask,
      compassScores: {
        ...validTask.compassScores,
        maalklarhet: { score: 6, justification: 'For hoy.' },
      },
    }
    expect(AiUseTaskSchema.safeParse(invalid).success).toBe(false)
  })

  it('rejects invalid stop rule codes', () => {
    expect(AiUseTaskSchema.safeParse({ ...validTask, expectedStopRules: ['SR-99'] }).success).toBe(false)
  })
})

describe('Layer schemas', () => {
  it('keeps compass separate from control requirements', () => {
    expect(CompassScoresSchema.safeParse(validTask.compassScores).success).toBe(true)
    expect(ControlRequirementsSchema.safeParse(validTask.controlRequirements).success).toBe(true)
    expect(CompassScoresSchema.safeParse({ ...validTask.compassScores, forklarbarhet: { score: 4, justification: 'Wrong layer' } }).success).toBe(false)
  })

  it('uses concrete HR risk flags without surveillance as primary model field', () => {
    expect(RiskFlagsSchema.safeParse(validTask.riskFlags).success).toBe(true)
    expect(RiskFlagsSchema.safeParse({ ...validTask.riskFlags, surveillanceOrControl: true }).success).toBe(false)
  })
})

describe('AssessmentInputSchema', () => {
  it('accepts a task assessment payload', () => {
    const payload = {
      caseId: 'HRR-01',
      taskId: 'HRR-01-A',
      compassScores: validTask.compassScores,
      controlRequirements: validTask.controlRequirements,
      riskFlags: validTask.riskFlags,
      valueJudgments: {
        relationalTrustImportant: true,
        humanPresencePartOfValue: true,
        localExceptionsMatter: true,
        valueConflictPresent: true,
        errorReversible: true,
        rightsOrWorkImpact: true,
        sensitiveOrPersonalDataRisk: false,
      },
    }
    expect(AssessmentInputSchema.safeParse(payload).success).toBe(true)
  })
})

describe('DecisionLogSchema', () => {
  it('requires extended documentation for high risk decisions', () => {
    const invalid = {
      riskLevel: 'high',
      decisionId: 'D-001',
      decisionTitle: 'KI-stotte i langvaktvurdering',
      decisionOwner: 'HR-sjef',
      preliminaryAllowedRole: 'utforskende_stotte',
      aiOutputUsed: 'Scenariooversikt',
      finalDecision: 'Brukes som droftingsgrunnlag',
      finalResponsible: 'HR-sjef',
      date: '2026-05-17',
    }
    expect(DecisionLogSchema.safeParse(invalid).success).toBe(false)
  })
})

describe('Enums', () => {
  it('contains supported KI roles and stop rules', () => {
    expect(KiRole.options).toEqual([
      'utforskende_stotte',
      'forsterket_skjonn',
      'delautomatisering',
      'automatisert_beslutning',
    ])
    for (let i = 1; i <= 8; i += 1) {
      expect(StopRule.options).toContain(`SR-0${i}`)
    }
  })
})
```

- [ ] **Step 2: Kjør testen og bekreft rød status**

Run:

```powershell
cd "C:\Users\larse\Documents\New project 2\apps\hr-strategiradar"
npm test -- src/domain/__tests__/schemas.test.ts
```

Expected:

```text
FAIL  src/domain/__tests__/schemas.test.ts
Error: Failed to resolve import "../schemas"
```

- [ ] **Step 3: Implementer domenekontrakter**

Opprett `apps/hr-strategiradar/src/domain/schemas.ts`:

```ts
import { z } from 'zod'

const NonEmptyString = z.string().trim().min(1)
const NonEmptyStringArray = z.array(NonEmptyString).min(1)

export const StopRule = z.enum(['SR-01', 'SR-02', 'SR-03', 'SR-04', 'SR-05', 'SR-06', 'SR-07', 'SR-08'])
export type StopRule = z.infer<typeof StopRule>

export const KiRole = z.enum([
  'utforskende_stotte',
  'forsterket_skjonn',
  'delautomatisering',
  'automatisert_beslutning',
])
export type KiRole = z.infer<typeof KiRole>

export const RiskLevel = z.enum(['low', 'medium', 'high'])
export type RiskLevel = z.infer<typeof RiskLevel>

export const ScoreJustificationSchema = z.object({
  score: z.number().min(1).max(5),
  justification: NonEmptyString,
}).strict()
export type ScoreJustification = z.infer<typeof ScoreJustificationSchema>

export const CompassScoresSchema = z.object({
  maalklarhet: ScoreJustificationSchema,
  separabilitet: ScoreJustificationSchema,
}).strict()
export type CompassScores = z.infer<typeof CompassScoresSchema>

export const ControlRequirementsSchema = z.object({
  explainabilityRequired: z.boolean(),
  traceabilityRequired: z.boolean(),
  localVerificationRequired: z.boolean(),
  decisionLogRequired: z.boolean(),
  manualPreAssessmentRequired: z.boolean(),
  reversibilityRequired: z.boolean(),
}).strict()
export type ControlRequirements = z.infer<typeof ControlRequirementsSchema>

export const RiskFlagsSchema = z.object({
  rightsOrSignificantImpact: z.boolean(),
  vulnerableParty: z.boolean(),
  personalOrSensitiveData: z.boolean(),
  healthSafetyEnvironment: z.boolean(),
  patientOrUserSafety: z.boolean(),
  workConditionsImpact: z.boolean(),
  discriminationRisk: z.boolean(),
  legalOrAgreementConstraint: z.boolean(),
  irreversibleConsequences: z.boolean(),
}).strict()
export type RiskFlags = z.infer<typeof RiskFlagsSchema>

export const ValueJudgmentsSchema = z.object({
  relationalTrustImportant: z.boolean(),
  humanPresencePartOfValue: z.boolean(),
  localExceptionsMatter: z.boolean(),
  valueConflictPresent: z.boolean(),
  errorReversible: z.boolean(),
  rightsOrWorkImpact: z.boolean(),
  sensitiveOrPersonalDataRisk: z.boolean(),
}).strict()
export type ValueJudgments = z.infer<typeof ValueJudgmentsSchema>

export const AiUseTaskSchema = z.object({
  taskId: NonEmptyString,
  title: NonEmptyString,
  taskType: NonEmptyString,
  inputDataType: NonEmptyString,
  outputUse: NonEmptyString,
  humanDecisionPoint: NonEmptyString,
  directEffectOnPeople: z.boolean(),
  usesPersonalOrSensitiveData: z.boolean(),
  compassScores: CompassScoresSchema,
  controlRequirements: ControlRequirementsSchema,
  riskFlags: RiskFlagsSchema,
  expectedStopRules: z.array(StopRule),
  expectedCalculatedRole: KiRole,
  expectedAllowedRole: KiRole,
  requiredControls: z.array(NonEmptyString),
  requiredLocalVerification: NonEmptyString,
  sourceRefs: z.array(NonEmptyString).min(1),
}).strict()
export type AiUseTask = z.infer<typeof AiUseTaskSchema>

export const HrMicroprojectSchema = z.object({
  caseId: NonEmptyString,
  title: NonEmptyString,
  strategyArea: NonEmptyString,
  strategicGoal: NonEmptyString,
  targetGroups: NonEmptyStringArray,
  affectedParties: NonEmptyStringArray,
  decisionOwner: NonEmptyString,
  knownFacts: z.array(NonEmptyString),
  uncertainties: z.array(NonEmptyString),
  sourceBasis: NonEmptyString,
  learningLabRefs: z.array(NonEmptyString).default([]),
  aiUseTasks: z.array(AiUseTaskSchema).min(1),
}).strict()
export type HrMicroproject = z.infer<typeof HrMicroprojectSchema>

export const AssessmentInputSchema = z.object({
  caseId: NonEmptyString,
  taskId: NonEmptyString,
  compassScores: CompassScoresSchema,
  controlRequirements: ControlRequirementsSchema,
  riskFlags: RiskFlagsSchema,
  valueJudgments: ValueJudgmentsSchema,
}).strict()
export type AssessmentInput = z.infer<typeof AssessmentInputSchema>

export const AssessmentResultSchema = z.object({
  caseId: NonEmptyString,
  taskId: NonEmptyString,
  triggeredStopRules: z.array(StopRule),
  calculatedRole: KiRole,
  allowedRole: KiRole,
  roleCapApplied: z.boolean(),
  riskLevel: RiskLevel,
  explanation: NonEmptyString,
  requiredControls: z.array(NonEmptyString),
  decisionLogRequired: z.boolean(),
}).strict()
export type AssessmentResult = z.infer<typeof AssessmentResultSchema>

const BaseDecisionLogSchema = z.object({
  riskLevel: RiskLevel,
  decisionId: NonEmptyString,
  decisionTitle: NonEmptyString,
  decisionOwner: NonEmptyString,
  preliminaryAllowedRole: KiRole,
  aiOutputUsed: NonEmptyString,
  finalDecision: NonEmptyString,
  finalResponsible: NonEmptyString,
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
}).strict()

const HighRiskDecisionLogFieldsSchema = z.object({
  affectedParties: NonEmptyStringArray,
  triggeredStopRules: z.array(StopRule).min(1),
  roleCap: KiRole,
  calculatedRole: KiRole,
  manualPreAssessment: NonEmptyString,
  manualFinalAssessment: NonEmptyString,
  counterArgumentsConsidered: NonEmptyString,
  verification: NonEmptyString,
  uncertainty: NonEmptyString,
  overrideApplied: z.boolean(),
  overrideReason: NonEmptyString,
}).strict()

export const DecisionLogSchema = z.discriminatedUnion('riskLevel', [
  BaseDecisionLogSchema.extend({ riskLevel: z.literal('low') }).strict(),
  BaseDecisionLogSchema.extend({ riskLevel: z.literal('medium') }).strict(),
  BaseDecisionLogSchema.extend({
    riskLevel: z.literal('high'),
    ...HighRiskDecisionLogFieldsSchema.shape,
  }).strict(),
])
export type DecisionLog = z.infer<typeof DecisionLogSchema>
```

- [ ] **Step 4: Ekskluder tester fra app-build**

Endre `apps/hr-strategiradar/tsconfig.app.json` slik at bunnen blir:

```json
  "include": ["src"],
  "exclude": ["src/**/*.test.ts", "src/**/*.test.tsx", "src/**/__tests__/**"]
}
```

- [ ] **Step 5: Kjør testen grønn**

Run:

```powershell
cd "C:\Users\larse\Documents\New project 2\apps\hr-strategiradar"
npm test -- src/domain/__tests__/schemas.test.ts
```

Expected:

```text
Test Files  1 passed
Tests  12 passed
```

- [ ] **Step 6: Commit**

Run:

```powershell
git add apps/hr-strategiradar/src/domain/schemas.ts apps/hr-strategiradar/src/domain/__tests__/schemas.test.ts apps/hr-strategiradar/tsconfig.app.json
git commit -m "feat: add hr strategiradar domain contracts"
```

Expected:

```text
[codex/... ...] feat: add hr strategiradar domain contracts
```

---

## Issue 2: Importer caser fra HR-grunnlag og Learning Lab

**Hvorfor:** Backend trenger realistiske fixtures før API og beregning kan testes.

**Files:**
- Create: `apps/hr-strategiradar/src/fixtures/all-cases.ts`
- Modify: `apps/hr-strategiradar/src/domain/__tests__/fixtures.test.ts`

- [ ] **Step 1: Skriv fixturetest for 8 caser og langvakter**

Erstatt `apps/hr-strategiradar/src/domain/__tests__/fixtures.test.ts` med:

```ts
import { describe, expect, it } from 'vitest'
import { HrMicroprojectSchema } from '../schemas'
import { allCases } from '../../fixtures/all-cases'

describe('HR Strategiradar fixtures', () => {
  it('has exactly 8 realistic HR cases', () => {
    expect(allCases).toHaveLength(8)
  })

  it('validates every case against HrMicroprojectSchema', () => {
    for (const fixture of allCases) {
      const result = HrMicroprojectSchema.safeParse(fixture)
      if (!result.success) {
        console.error(fixture.caseId, result.error.format())
      }
      expect(result.success).toBe(true)
    }
  })

  it('has at least two AI use tasks per case', () => {
    for (const fixture of allCases) {
      expect(fixture.aiUseTasks.length).toBeGreaterThanOrEqual(2)
    }
  })

  it('has no personal data in fixture content', () => {
    for (const fixture of allCases) {
      const json = JSON.stringify(fixture)
      expect(json).not.toMatch(/\d{11}/)
      expect(json).not.toMatch(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)
    }
  })

  it('links cases to local HRR sources or Learning Lab sources', () => {
    for (const fixture of allCases) {
      expect(fixture.sourceBasis.length).toBeGreaterThan(10)
      expect([...fixture.learningLabRefs, ...fixture.aiUseTasks.flatMap((task) => task.sourceRefs)].length).toBeGreaterThan(0)
    }
  })

  it('contains a concrete long-shift healthcare case', () => {
    const case07 = allCases.find((fixture) => fixture.caseId === 'HRR-07')
    expect(case07?.title.toLowerCase()).toContain('langvakter')
    expect(JSON.stringify(case07).toLowerCase()).toMatch(/arbeidstid|hms|hvile|pasient|bruker/)
  })

  it('keeps stop rules visible before expected role', () => {
    for (const fixture of allCases) {
      for (const task of fixture.aiUseTasks) {
        expect(task.expectedStopRules).toBeDefined()
        expect(task.expectedAllowedRole).toBeDefined()
      }
    }
  })
})
```

- [ ] **Step 2: Kjør testen og bekreft rød status**

Run:

```powershell
cd "C:\Users\larse\Documents\New project 2\apps\hr-strategiradar"
npm test -- src/domain/__tests__/fixtures.test.ts
```

Expected:

```text
FAIL  src/domain/__tests__/fixtures.test.ts
Error: Failed to resolve import "../../fixtures/all-cases"
```

- [ ] **Step 3: Opprett første fixturepakke**

Opprett `apps/hr-strategiradar/src/fixtures/all-cases.ts` med eksplisitte caser fra `testcases/hr_strategiradar_realistiske_caser.md` og Learning Lab:

```ts
import type { AiUseTask, HrMicroproject, KiRole, RiskFlags } from '../domain/schemas'

const baseLowRiskFlags: RiskFlags = {
  rightsOrSignificantImpact: false,
  vulnerableParty: false,
  personalOrSensitiveData: false,
  healthSafetyEnvironment: false,
  patientOrUserSafety: false,
  workConditionsImpact: false,
  discriminationRisk: false,
  legalOrAgreementConstraint: false,
  irreversibleConsequences: false,
}

function makeTask(input: {
  taskId: string
  title: string
  taskType: string
  inputDataType: string
  outputUse: string
  humanDecisionPoint: string
  directEffectOnPeople: boolean
  usesPersonalOrSensitiveData: boolean
  maalklarhet: number
  maalklarhetJustification: string
  separabilitet: number
  separabilitetJustification: string
  riskFlags: RiskFlags
  expectedStopRules: AiUseTask['expectedStopRules']
  expectedCalculatedRole: KiRole
  expectedAllowedRole: KiRole
  requiredControls: string[]
  requiredLocalVerification: string
  sourceRefs: string[]
}): AiUseTask {
  return {
    taskId: input.taskId,
    title: input.title,
    taskType: input.taskType,
    inputDataType: input.inputDataType,
    outputUse: input.outputUse,
    humanDecisionPoint: input.humanDecisionPoint,
    directEffectOnPeople: input.directEffectOnPeople,
    usesPersonalOrSensitiveData: input.usesPersonalOrSensitiveData,
    compassScores: {
      maalklarhet: { score: input.maalklarhet, justification: input.maalklarhetJustification },
      separabilitet: { score: input.separabilitet, justification: input.separabilitetJustification },
    },
    controlRequirements: {
      explainabilityRequired: true,
      traceabilityRequired: true,
      localVerificationRequired: true,
      decisionLogRequired: input.expectedStopRules.length > 0,
      manualPreAssessmentRequired: input.directEffectOnPeople || input.usesPersonalOrSensitiveData,
      reversibilityRequired: true,
    },
    riskFlags: input.riskFlags,
    expectedStopRules: input.expectedStopRules,
    expectedCalculatedRole: input.expectedCalculatedRole,
    expectedAllowedRole: input.expectedAllowedRole,
    requiredControls: input.requiredControls,
    requiredLocalVerification: input.requiredLocalVerification,
    sourceRefs: input.sourceRefs,
  }
}

function withRisk(overrides: Partial<RiskFlags>): RiskFlags {
  return { ...baseLowRiskFlags, ...overrides }
}

export const allCases: HrMicroproject[] = [
  {
    caseId: 'HRR-01',
    title: 'Seniorbevaring i hjemmetjenesten',
    strategyArea: 'livsfasepolitikk',
    strategicGoal: 'Bidra til at senioransatte star lenger i arbeid uten a gjore alder til automatisk prioriteringsgrunnlag.',
    targetGroups: ['senioransatte', 'ledere', 'HR'],
    affectedParties: ['ansatte i ulike livsfaser', 'brukere av hjemmetjenesten'],
    decisionOwner: 'HR-sjef',
    knownFacts: ['Kommunen har behov for arbeidskraft.', 'Tiltak ma forankres lokalt.'],
    uncertainties: ['Lokale arsaker til avgang er ikke ferdig analysert.', 'Tiltakseffekt varierer mellom enheter.'],
    sourceBasis: 'HRR-01 og Learning Lab HR-SIM-01.',
    learningLabRefs: ['domains/kommune_org/05_simulering/testsett/HR_TESTSETT_V1.md#Scenario 1'],
    aiUseTasks: [
      makeTask({
        taskId: 'HRR-01-A',
        title: 'Strukturere anonymisert innsikt og tiltakshypoteser',
        taskType: 'strukturering',
        inputDataType: 'aggregerte indikatorer og anonymiserte innspill',
        outputUse: 'intern drofting',
        humanDecisionPoint: 'HR-sjef vurderer tiltak for KI-output brukes.',
        directEffectOnPeople: false,
        usesPersonalOrSensitiveData: false,
        maalklarhet: 3.5,
        maalklarhetJustification: 'Maalet er tydelig, men tiltakene er flere.',
        separabilitet: 2.5,
        separabilitetJustification: 'Verdivalg, lokal praksis og tillit avgjor om output kan brukes.',
        riskFlags: withRisk({ workConditionsImpact: true }),
        expectedStopRules: ['SR-02', 'SR-05'],
        expectedCalculatedRole: 'forsterket_skjonn',
        expectedAllowedRole: 'utforskende_stotte',
        requiredControls: ['lokal verifikasjon', 'beslutningslogg'],
        requiredLocalVerification: 'Leder ma vurdere mot lokale forhold og partsbilde.',
        sourceRefs: ['testcases/hr_strategiradar_realistiske_caser.md#HRR-01'],
      }),
      makeTask({
        taskId: 'HRR-01-B',
        title: 'Foresla individuell prioritering av senioransatte',
        taskType: 'prioritering',
        inputDataType: 'personnaere opplysninger om arbeidsevne, alder og fravaer',
        outputUse: 'liste over ansatte som bor prioriteres',
        humanDecisionPoint: 'HR-sjef ma avvise automatisert individprioritering.',
        directEffectOnPeople: true,
        usesPersonalOrSensitiveData: true,
        maalklarhet: 4,
        maalklarhetJustification: 'Maalet er konkret, men bruken blir individrettet.',
        separabilitet: 1.5,
        separabilitetJustification: 'Skjonn, tillit og rettferdighet kan ikke skilles fra beslutningen.',
        riskFlags: withRisk({ rightsOrSignificantImpact: true, personalOrSensitiveData: true, workConditionsImpact: true, discriminationRisk: true }),
        expectedStopRules: ['SR-01', 'SR-02', 'SR-04', 'SR-05'],
        expectedCalculatedRole: 'delautomatisering',
        expectedAllowedRole: 'utforskende_stotte',
        requiredControls: ['manuell forhandsvurdering', 'beslutningslogg', 'juridisk kontroll'],
        requiredLocalVerification: 'Faktum, hjemmel og lokal praksis ma vurderes uten KI-rangering.',
        sourceRefs: ['testcases/hr_strategiradar_realistiske_caser.md#HRR-01'],
      }),
    ],
  },
  {
    caseId: 'HRR-02',
    title: 'Gradert sykefravaer og tilrettelegging i turnus',
    strategyArea: 'sykefravaer og naervaer',
    strategicGoal: 'Stotte strukturert tilrettelegging uten a avgjore enkeltsaker automatisk.',
    targetGroups: ['ansatte i gradert fravaer', 'ledere', 'IA-radgiver'],
    affectedParties: ['ansatt', 'kolleger', 'brukere'],
    decisionOwner: 'Enhetsleder med IA-radgiver',
    knownFacts: ['Sykefravaersoppfolging har formelle prosesskrav.'],
    uncertainties: ['Helseopplysninger og arbeidsevne krever lokal og individuell vurdering.'],
    sourceBasis: 'HRR-02 og Learning Lab P-01 sykefravaersoppfolging.',
    learningLabRefs: [
      'domains/kommune_org/01_organisasjonsmodell/HR_KJERNEPROSESSER/P-01_SYKEFRAVAERSOPPFOLGING.md',
      'domains/kommune_org/05_simulering/testsett/HR_TESTSETT_V1.md#Scenario 1',
    ],
    aiUseTasks: [
      makeTask({
        taskId: 'HRR-02-A',
        title: 'Lage mote- og oppfolgingsstruktur',
        taskType: 'strukturering',
        inputDataType: 'generisk prosessinformasjon og rollebeskrivelser',
        outputUse: 'moteagenda og sjekkliste',
        humanDecisionPoint: 'Leder og IA-radgiver tilpasser til faktisk sak.',
        directEffectOnPeople: false,
        usesPersonalOrSensitiveData: false,
        maalklarhet: 4,
        maalklarhetJustification: 'Moteformalet er klart.',
        separabilitet: 3,
        separabilitetJustification: 'Struktur kan skilles fra individuell vurdering nar data holdes generisk.',
        riskFlags: withRisk({ workConditionsImpact: true }),
        expectedStopRules: ['SR-05'],
        expectedCalculatedRole: 'forsterket_skjonn',
        expectedAllowedRole: 'utforskende_stotte',
        requiredControls: ['lokal verifikasjon', 'ledergodkjenning'],
        requiredLocalVerification: 'Kontroller mot faktisk oppfolgingsfase og avtaleverk.',
        sourceRefs: ['testcases/hr_strategiradar_realistiske_caser.md#HRR-02'],
      }),
      makeTask({
        taskId: 'HRR-02-B',
        title: 'Foresla konkret turnustilrettelegging for navngitt ansatt',
        taskType: 'beslutningsstotte',
        inputDataType: 'helseopplysninger, arbeidsevne og turnusdata',
        outputUse: 'forslag til individuell tilrettelegging',
        humanDecisionPoint: 'Leder ma vurdere rettigheter, belastning og medisinsk grunnlag.',
        directEffectOnPeople: true,
        usesPersonalOrSensitiveData: true,
        maalklarhet: 4,
        maalklarhetJustification: 'Beslutningssporsmalet er tydelig.',
        separabilitet: 1.5,
        separabilitetJustification: 'Skjonn, relasjon og lokal kapasitet er del av beslutningsverdien.',
        riskFlags: withRisk({ rightsOrSignificantImpact: true, vulnerableParty: true, personalOrSensitiveData: true, healthSafetyEnvironment: true, workConditionsImpact: true }),
        expectedStopRules: ['SR-01', 'SR-02', 'SR-03', 'SR-05'],
        expectedCalculatedRole: 'delautomatisering',
        expectedAllowedRole: 'utforskende_stotte',
        requiredControls: ['manuell forhandsvurdering', 'beslutningslogg', 'lokal verifikasjon'],
        requiredLocalVerification: 'Sjekk helsegrunnlag, arbeidsmiljo, kollegabelastning og avtaleverk.',
        sourceRefs: ['testcases/hr_strategiradar_realistiske_caser.md#HRR-02'],
      }),
    ],
  },
  {
    caseId: 'HRR-03',
    title: 'Heltidskultur og helgebemanning',
    strategyArea: 'heltidskultur',
    strategicGoal: 'Utforske bemanningsscenarioer uten a tildele vakter eller belastning automatisk.',
    targetGroups: ['ledere', 'tillitsvalgte', 'ansatte i turnus'],
    affectedParties: ['ansatte', 'brukere', 'paaroerende'],
    decisionOwner: 'Kommunalsjef helse og omsorg',
    knownFacts: ['Heltidskultur paverker turnus, helg og arbeidsvilkar.'],
    uncertainties: ['Lokale preferanser og driftskrav varierer.'],
    sourceBasis: 'HRR-03 og Learning Lab HMS-/HR-prosesser.',
    learningLabRefs: ['domains/kommune_org/01_organisasjonsmodell/HR_PROSESSOVERSIKT.md'],
    aiUseTasks: [
      makeTask({
        taskId: 'HRR-03-A',
        title: 'Analysere aggregert bemanning og scenarioer',
        taskType: 'scenario',
        inputDataType: 'aggregert turnus- og bemanningsdata',
        outputUse: 'drofting av alternative modeller',
        humanDecisionPoint: 'Partssammensatt gruppe vurderer gjennomforbarhet.',
        directEffectOnPeople: false,
        usesPersonalOrSensitiveData: false,
        maalklarhet: 3.5,
        maalklarhetJustification: 'Maalet er retningsgivende, men flere hensyn konkurrerer.',
        separabilitet: 2,
        separabilitetJustification: 'Rettferdighet, medvirkning og lokal praksis er verdivalg.',
        riskFlags: withRisk({ workConditionsImpact: true, legalOrAgreementConstraint: true }),
        expectedStopRules: ['SR-02', 'SR-05'],
        expectedCalculatedRole: 'forsterket_skjonn',
        expectedAllowedRole: 'utforskende_stotte',
        requiredControls: ['partsdrofting', 'beslutningslogg'],
        requiredLocalVerification: 'Kontroller med avtaleverk og lokal turnuspraksis.',
        sourceRefs: ['testcases/hr_strategiradar_realistiske_caser.md#HRR-03'],
      }),
      makeTask({
        taskId: 'HRR-03-B',
        title: 'Automatisk fordele helgevakter mellom ansatte',
        taskType: 'fordeling',
        inputDataType: 'individuelle preferanser, stillingsstorrelse og historikk',
        outputUse: 'konkret vaktfordeling',
        humanDecisionPoint: 'Turnusansvarlig ma beholde beslutningen.',
        directEffectOnPeople: true,
        usesPersonalOrSensitiveData: true,
        maalklarhet: 4,
        maalklarhetJustification: 'Fordelingsmaalet er tydelig.',
        separabilitet: 1.5,
        separabilitetJustification: 'Rettferdighet og lokale unntak kan ikke skilles fra beslutningen.',
        riskFlags: withRisk({ rightsOrSignificantImpact: true, personalOrSensitiveData: true, workConditionsImpact: true, legalOrAgreementConstraint: true }),
        expectedStopRules: ['SR-01', 'SR-02', 'SR-05'],
        expectedCalculatedRole: 'automatisert_beslutning',
        expectedAllowedRole: 'utforskende_stotte',
        requiredControls: ['manuell fordeling', 'beslutningslogg', 'avtalesjekk'],
        requiredLocalVerification: 'Sjekk avtaler, hviletid, kompetansekrav og medvirkning.',
        sourceRefs: ['testcases/hr_strategiradar_realistiske_caser.md#HRR-03'],
      }),
    ],
  },
  {
    caseId: 'HRR-04',
    title: 'Rekruttering av kritisk helsefagkompetanse',
    strategyArea: 'strategisk rekruttering',
    strategicGoal: 'Styrke kravprofil og intervjustruktur uten KI-rangering av kandidater.',
    targetGroups: ['rekrutteringsradgiver', 'ledere', 'sokere'],
    affectedParties: ['sokere', 'ansatte', 'brukere'],
    decisionOwner: 'Rekrutteringsradgiver',
    knownFacts: ['Kritisk kompetanse er krevende a rekruttere.'],
    uncertainties: ['Kandidatmarked og lokale kvalifikasjonskrav ma verifiseres.'],
    sourceBasis: 'HRR-04 og Learning Lab HR-BES-02.',
    learningLabRefs: [
      'domains/kommune_org/01_organisasjonsmodell/HR_KJERNEPROSESSER/P-02_STRATEGISK_REKRUTTERING.md',
      'domains/kommune_org/05_simulering/testsett/HR_TESTSETT_V1.md#Scenario 2',
    ],
    aiUseTasks: [
      makeTask({
        taskId: 'HRR-04-A',
        title: 'Lage kravprofil og intervjuguide',
        taskType: 'produksjonsstotte',
        inputDataType: 'rollekrav og offentlig stillingsinformasjon',
        outputUse: 'utkast til kravprofil og intervjuguide',
        humanDecisionPoint: 'Rekrutteringsradgiver kvalitetssikrer kravene.',
        directEffectOnPeople: false,
        usesPersonalOrSensitiveData: false,
        maalklarhet: 4,
        maalklarhetJustification: 'Leveransen er tydelig avgrenset.',
        separabilitet: 3,
        separabilitetJustification: 'Utkast kan skilles fra endelig kvalifikasjonsvurdering.',
        riskFlags: withRisk({ discriminationRisk: true }),
        expectedStopRules: ['SR-04'],
        expectedCalculatedRole: 'forsterket_skjonn',
        expectedAllowedRole: 'utforskende_stotte',
        requiredControls: ['kvalifikasjonskontroll', 'ledergodkjenning'],
        requiredLocalVerification: 'Sjekk kvalifikasjonsprinsipp, stillingskode og lokale behov.',
        sourceRefs: ['testcases/hr_strategiradar_realistiske_caser.md#HRR-04'],
      }),
      makeTask({
        taskId: 'HRR-04-B',
        title: 'Rangere kandidater automatisk',
        taskType: 'rangering',
        inputDataType: 'soknader, CV og intervjudata',
        outputUse: 'prioritert kandidatliste',
        humanDecisionPoint: 'Ansettelsesmyndighet ma ikke basere rangering pa KI.',
        directEffectOnPeople: true,
        usesPersonalOrSensitiveData: true,
        maalklarhet: 4,
        maalklarhetJustification: 'Rangeringssporsmalet er tydelig.',
        separabilitet: 1,
        separabilitetJustification: 'Skjonn, likebehandling og kvalifikasjonsvurdering er selve beslutningen.',
        riskFlags: withRisk({ rightsOrSignificantImpact: true, personalOrSensitiveData: true, discriminationRisk: true }),
        expectedStopRules: ['SR-01', 'SR-04', 'SR-05'],
        expectedCalculatedRole: 'automatisert_beslutning',
        expectedAllowedRole: 'utforskende_stotte',
        requiredControls: ['avvis KI-rangering', 'beslutningslogg', 'manuell vurdering'],
        requiredLocalVerification: 'Sjekk hjemmel, kvalifikasjonskrav og ansettelsesprosess.',
        sourceRefs: ['testcases/hr_strategiradar_realistiske_caser.md#HRR-04'],
      }),
    ],
  },
  {
    caseId: 'HRR-05',
    title: 'Kompetanseutvikling og intern mobilitet',
    strategyArea: 'kompetanse og mobilitet',
    strategicGoal: 'Kartlegge aggregerte kompetansegap uten a konkludere om enkeltansattes karrierevei.',
    targetGroups: ['ledere', 'kompetanseradgiver', 'ansatte'],
    affectedParties: ['ansatte', 'ledere', 'brukere'],
    decisionOwner: 'Kompetanseradgiver',
    knownFacts: ['Kompetansegap ma vurderes mot tjenestebehov.'],
    uncertainties: ['Interesse, kapasitet og lokale prioriteringer varierer.'],
    sourceBasis: 'HRR-05 og Learning Lab rolle-/kompetansegrunnlag.',
    learningLabRefs: ['domains/kommune_org/01_organisasjonsmodell/HR_PROSESSOVERSIKT.md'],
    aiUseTasks: [
      makeTask({
        taskId: 'HRR-05-A',
        title: 'Kartlegge aggregerte kompetansegap',
        taskType: 'analyse',
        inputDataType: 'aggregert kompetanseoversikt',
        outputUse: 'prioritering av opplaeringstema',
        humanDecisionPoint: 'Kompetanseradgiver vurderer tiltak med ledere.',
        directEffectOnPeople: false,
        usesPersonalOrSensitiveData: false,
        maalklarhet: 3.5,
        maalklarhetJustification: 'Kompetansebehov kan beskrives, men prioritering krever lokal avveiing.',
        separabilitet: 2.5,
        separabilitetJustification: 'Skjonn og lokal kapasitet paverker prioritering.',
        riskFlags: withRisk({ workConditionsImpact: true }),
        expectedStopRules: ['SR-05'],
        expectedCalculatedRole: 'forsterket_skjonn',
        expectedAllowedRole: 'forsterket_skjonn',
        requiredControls: ['lokal verifikasjon', 'beslutningslogg'],
        requiredLocalVerification: 'Sjekk tjenestebehov, budsjett og lederforankring.',
        sourceRefs: ['testcases/hr_strategiradar_realistiske_caser.md#HRR-05'],
      }),
      makeTask({
        taskId: 'HRR-05-B',
        title: 'Foresla individuell mobilitet for ansatte',
        taskType: 'prioritering',
        inputDataType: 'individdata om kompetanse, fravaer og prestasjon',
        outputUse: 'liste over ansatte som bor flyttes eller prioriteres',
        humanDecisionPoint: 'Leder ma avvise individrettet KI-prioritering.',
        directEffectOnPeople: true,
        usesPersonalOrSensitiveData: true,
        maalklarhet: 3.5,
        maalklarhetJustification: 'Oppgaven er konkret, men beslutningsgrunnlaget er sensitivt.',
        separabilitet: 1.5,
        separabilitetJustification: 'Karriere, tillit og lokale hensyn kan ikke skilles fra vurderingen.',
        riskFlags: withRisk({ rightsOrSignificantImpact: true, personalOrSensitiveData: true, workConditionsImpact: true, discriminationRisk: true }),
        expectedStopRules: ['SR-01', 'SR-02', 'SR-04', 'SR-05'],
        expectedCalculatedRole: 'delautomatisering',
        expectedAllowedRole: 'utforskende_stotte',
        requiredControls: ['manuell vurdering', 'beslutningslogg'],
        requiredLocalVerification: 'Sjekk frivillighet, partsbilde og lokal kompetansestrategi.',
        sourceRefs: ['testcases/hr_strategiradar_realistiske_caser.md#HRR-05'],
      }),
    ],
  },
  {
    caseId: 'HRR-06',
    title: 'Laerling med fare for frafall',
    strategyArea: 'laerling og oppfolging',
    strategicGoal: 'Lage strukturert oppfolging uten a erstatte relasjonell vurdering.',
    targetGroups: ['laerlingkoordinator', 'veileder', 'leder'],
    affectedParties: ['laerling', 'veileder', 'arbeidssted'],
    decisionOwner: 'Laerlingkoordinator',
    knownFacts: ['Laerlingoppfolging krever tett lokal dialog.'],
    uncertainties: ['Frafallsarsaker kan vaere sammensatte.'],
    sourceBasis: 'HRR-06 og Learning Lab HR-PROD-07.',
    learningLabRefs: [
      'domains/kommune_org/01_organisasjonsmodell/HR_KJERNEPROSESSER/P-04_LAERLINGINNTAK_OG_OPPFOLGING.md',
      'domains/kommune_org/05_simulering/testsett/HR_TESTSETT_V1.md#Scenario 7',
    ],
    aiUseTasks: [
      makeTask({
        taskId: 'HRR-06-A',
        title: 'Lage oppfolgingsplan-mal',
        taskType: 'produksjonsstotte',
        inputDataType: 'generiske oppfolgingspunkter',
        outputUse: 'utkast til samtalestruktur',
        humanDecisionPoint: 'Laerlingkoordinator tilpasser malen.',
        directEffectOnPeople: false,
        usesPersonalOrSensitiveData: false,
        maalklarhet: 4,
        maalklarhetJustification: 'Malen har tydelig formal.',
        separabilitet: 3,
        separabilitetJustification: 'Malstruktur kan skilles fra relasjonell vurdering.',
        riskFlags: withRisk({ vulnerableParty: true }),
        expectedStopRules: ['SR-03'],
        expectedCalculatedRole: 'forsterket_skjonn',
        expectedAllowedRole: 'utforskende_stotte',
        requiredControls: ['lokal tilpasning', 'veilederkontroll'],
        requiredLocalVerification: 'Sjekk faglop, arbeidssted og kapasitet.',
        sourceRefs: ['testcases/hr_strategiradar_realistiske_caser.md#HRR-06'],
      }),
      makeTask({
        taskId: 'HRR-06-B',
        title: 'Predikere frafallsrisiko for laerling',
        taskType: 'prediksjon',
        inputDataType: 'personopplysninger, fravaer og vurderingshistorikk',
        outputUse: 'risikoscore for enkeltperson',
        humanDecisionPoint: 'Koordinator ma avvise score som beslutningsgrunnlag.',
        directEffectOnPeople: true,
        usesPersonalOrSensitiveData: true,
        maalklarhet: 3,
        maalklarhetJustification: 'Risikosporsmalet er konkret, men forklaringene er usikre.',
        separabilitet: 1,
        separabilitetJustification: 'Relasjon, saringhet og lokal kontekst kan ikke skilles fra vurderingen.',
        riskFlags: withRisk({ rightsOrSignificantImpact: true, vulnerableParty: true, personalOrSensitiveData: true, workConditionsImpact: true }),
        expectedStopRules: ['SR-01', 'SR-03', 'SR-05'],
        expectedCalculatedRole: 'delautomatisering',
        expectedAllowedRole: 'utforskende_stotte',
        requiredControls: ['manuell vurdering', 'beslutningslogg', 'samtale med ansvarlig veileder'],
        requiredLocalVerification: 'Sjekk faktisk oppfolgingsstatus uten personscore.',
        sourceRefs: ['testcases/hr_strategiradar_realistiske_caser.md#HRR-06'],
      }),
    ],
  },
  {
    caseId: 'HRR-07',
    title: 'Langvakter i helsesektoren',
    strategyArea: 'arbeidstid, HMS og tjenestekvalitet',
    strategicGoal: 'Vurdere langvakter som arbeidstidsordning med tydelig skille mellom scenarioanalyse og beslutning.',
    targetGroups: ['ledere', 'HMS-radgiver', 'tillitsvalgte', 'verneombud'],
    affectedParties: ['ansatte', 'brukere', 'paaroerende'],
    decisionOwner: 'Kommunalsjef helse og omsorg',
    knownFacts: ['Langvakter paverker arbeidstid, hvile, HMS og pasient-/brukersikkerhet.'],
    uncertainties: ['Effekt avhenger av tjeneste, bemanning, hviletid, frivillighet og lokal belastning.'],
    sourceBasis: 'HRR-07, langvakt-research og Learning Lab P-05 systematisk HMS-arbeid.',
    learningLabRefs: [
      'domains/kommune_org/01_organisasjonsmodell/HR_KJERNEPROSESSER/P-05_SYSTEMATISK_HMS_ARBEID.md',
      'domains/kommune_org/05_simulering/testsett/HR_TESTSETT_V1.md#Scenario 6',
    ],
    aiUseTasks: [
      makeTask({
        taskId: 'HRR-07-A',
        title: 'Strukturere beslutningsgrunnlag og scenarioer for langvakter',
        taskType: 'scenario',
        inputDataType: 'aggregerte bemanningsdata, HMS-funn, avtaleverk og forskning',
        outputUse: 'beslutningsgrunnlag for drofting',
        humanDecisionPoint: 'Partene og beslutningseier vurderer om ordningen er forsvarlig lokalt.',
        directEffectOnPeople: false,
        usesPersonalOrSensitiveData: false,
        maalklarhet: 4,
        maalklarhetJustification: 'Vurderingssporsmalet er konkret: om langvakter kan proves forsvarlig.',
        separabilitet: 2,
        separabilitetJustification: 'HMS, hvile, pasient-/brukersikkerhet og rettferdighet krever lokal vurdering.',
        riskFlags: withRisk({ healthSafetyEnvironment: true, patientOrUserSafety: true, workConditionsImpact: true, legalOrAgreementConstraint: true }),
        expectedStopRules: ['SR-02', 'SR-05', 'SR-06'],
        expectedCalculatedRole: 'forsterket_skjonn',
        expectedAllowedRole: 'utforskende_stotte',
        requiredControls: ['HMS-vurdering', 'partsdrofting', 'beslutningslogg', 'lokal risikovurdering'],
        requiredLocalVerification: 'Sjekk hviletid, bemanning, frivillighet, forsvarlighet og lokale avvik.',
        sourceRefs: [
          'testcases/hr_strategiradar_realistiske_caser.md#HRR-07',
          'research/langvakter_helsesektoren_kildegrunnlag.md',
        ],
      }),
      makeTask({
        taskId: 'HRR-07-B',
        title: 'Automatisk anbefale hvem som skal ga langvakter',
        taskType: 'fordeling',
        inputDataType: 'individuelle arbeidstidsdata, preferanser, fravaer og kompetanse',
        outputUse: 'liste over ansatte som bor settes i langvakt',
        humanDecisionPoint: 'Turnusansvarlig og leder ma avvise individrettet automatisering.',
        directEffectOnPeople: true,
        usesPersonalOrSensitiveData: true,
        maalklarhet: 4,
        maalklarhetJustification: 'Fordelingsoppgaven er konkret.',
        separabilitet: 1,
        separabilitetJustification: 'Arbeidsbelastning, helse, frivillighet og rettferdighet kan ikke skilles fra beslutningen.',
        riskFlags: withRisk({ rightsOrSignificantImpact: true, personalOrSensitiveData: true, healthSafetyEnvironment: true, patientOrUserSafety: true, workConditionsImpact: true, legalOrAgreementConstraint: true }),
        expectedStopRules: ['SR-01', 'SR-02', 'SR-05', 'SR-06'],
        expectedCalculatedRole: 'automatisert_beslutning',
        expectedAllowedRole: 'utforskende_stotte',
        requiredControls: ['avvis automatisk tildeling', 'HMS-vurdering', 'beslutningslogg', 'avtalesjekk'],
        requiredLocalVerification: 'Sjekk arbeidstidsregler, hvile, belastning, kompetanse og partssamarbeid.',
        sourceRefs: [
          'testcases/hr_strategiradar_realistiske_caser.md#HRR-07',
          'research/langvakter_helsesektoren_kildegrunnlag.md',
        ],
      }),
    ],
  },
  {
    caseId: 'HRR-08',
    title: 'Omstilling og naturlig avgang',
    strategyArea: 'omstilling',
    strategicGoal: 'Lage scenario- og risikokart uten a styre enkeltansattes videre arbeidsforhold.',
    targetGroups: ['avdelingssjef', 'HR-jurist', 'forhandlingsradgiver', 'HMS-radgiver'],
    affectedParties: ['ansatte', 'ledere', 'tillitsvalgte', 'brukere'],
    decisionOwner: 'Avdelingssjef lederstotte',
    knownFacts: ['Omstilling krever mandat, medvirkning og sporbar prosess.'],
    uncertainties: ['Partsbildet og faktisk beslutningsrett ma avklares lokalt.'],
    sourceBasis: 'HRR-08 og Learning Lab HR-SIM-05.',
    learningLabRefs: [
      'domains/kommune_org/01_organisasjonsmodell/HR_KJERNEPROSESSER/P-08_OMSTILLINGSPROSESS.md',
      'domains/kommune_org/05_simulering/testsett/HR_TESTSETT_V1.md#Scenario 5',
    ],
    aiUseTasks: [
      makeTask({
        taskId: 'HRR-08-A',
        title: 'Lage scenario- og risikokart',
        taskType: 'scenario',
        inputDataType: 'organisasjonskart, aggregerte aldersdata og mandat',
        outputUse: 'droftingsgrunnlag for omstillingslop',
        humanDecisionPoint: 'Beslutningseier og partsforum vurderer retning.',
        directEffectOnPeople: false,
        usesPersonalOrSensitiveData: false,
        maalklarhet: 3.5,
        maalklarhetJustification: 'Scenarioarbeidet er tydelig, men avhenger av mandat.',
        separabilitet: 2,
        separabilitetJustification: 'Medvirkning, tillit og rettigheter er integrert i beslutningen.',
        riskFlags: withRisk({ rightsOrSignificantImpact: true, workConditionsImpact: true, legalOrAgreementConstraint: true }),
        expectedStopRules: ['SR-02', 'SR-05', 'SR-07'],
        expectedCalculatedRole: 'forsterket_skjonn',
        expectedAllowedRole: 'utforskende_stotte',
        requiredControls: ['mandatkontroll', 'partsdrofting', 'beslutningslogg'],
        requiredLocalVerification: 'Sjekk mandat, partsbilde, driftskonsekvens og rettslige krav.',
        sourceRefs: ['testcases/hr_strategiradar_realistiske_caser.md#HRR-08'],
      }),
      makeTask({
        taskId: 'HRR-08-B',
        title: 'Foresla hvilke ansatte som bor flyttes ved omstilling',
        taskType: 'prioritering',
        inputDataType: 'persondata, kompetanse, alder, fravaer og stillingshistorikk',
        outputUse: 'liste over ansatte for omplassering',
        humanDecisionPoint: 'HR-jurist og beslutningseier ma avvise KI-prioritering.',
        directEffectOnPeople: true,
        usesPersonalOrSensitiveData: true,
        maalklarhet: 4,
        maalklarhetJustification: 'Oppgaven er tydelig, men for inngripende.',
        separabilitet: 1,
        separabilitetJustification: 'Rettigheter, medvirkning og individuell vurdering er selve beslutningen.',
        riskFlags: withRisk({ rightsOrSignificantImpact: true, personalOrSensitiveData: true, workConditionsImpact: true, discriminationRisk: true, legalOrAgreementConstraint: true, irreversibleConsequences: true }),
        expectedStopRules: ['SR-01', 'SR-02', 'SR-04', 'SR-05', 'SR-07'],
        expectedCalculatedRole: 'automatisert_beslutning',
        expectedAllowedRole: 'utforskende_stotte',
        requiredControls: ['avvis KI-prioritering', 'juridisk kontroll', 'beslutningslogg'],
        requiredLocalVerification: 'Sjekk faktum, rettigheter, medvirkning og faktisk beslutningsmyndighet.',
        sourceRefs: ['testcases/hr_strategiradar_realistiske_caser.md#HRR-08'],
      }),
    ],
  },
]
```

- [ ] **Step 4: Kjør fixturetesten grønn**

Run:

```powershell
cd "C:\Users\larse\Documents\New project 2\apps\hr-strategiradar"
npm test -- src/domain/__tests__/fixtures.test.ts
```

Expected:

```text
Test Files  1 passed
Tests  6 passed
```

- [ ] **Step 5: Kjør alle eksisterende tester**

Run:

```powershell
cd "C:\Users\larse\Documents\New project 2\apps\hr-strategiradar"
npm test
```

Expected:

```text
Test Files  3 passed
Tests  all passed
```

- [ ] **Step 6: Commit**

Run:

```powershell
git add apps/hr-strategiradar/src/fixtures/all-cases.ts apps/hr-strategiradar/src/domain/__tests__/fixtures.test.ts
git commit -m "feat: seed realistic hr cases"
```

Expected:

```text
[codex/... ...] feat: seed realistic hr cases
```

---

## Issue 3: Legg til backend runtime og dev-konfig

**Hvorfor:** API-et skal kunne kjøre lokalt med Node uten å påvirke Vite-frontendens build.

**Files:**
- Modify: `apps/hr-strategiradar/package.json`
- Create: `apps/hr-strategiradar/tsconfig.server.json`
- Modify: `apps/hr-strategiradar/tsconfig.json`
- Modify: `apps/hr-strategiradar/vite.config.ts`

- [ ] **Step 1: Installer backend-avhengigheter**

Run:

```powershell
cd "C:\Users\larse\Documents\New project 2\apps\hr-strategiradar"
npm install fastify @fastify/cors
npm install -D tsx
```

Expected:

```text
added ... packages
found 0 vulnerabilities
```

- [ ] **Step 2: Oppdater scripts**

I `apps/hr-strategiradar/package.json`, endre `scripts` til:

```json
{
  "dev": "vite",
  "server:dev": "tsx watch server/index.ts",
  "server:start": "tsx server/index.ts",
  "import:learning-lab": "tsx server/scripts/importLearningLab.ts",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview",
  "test": "vitest run",
  "test:watch": "vitest",
  "test:backend": "vitest run server src/domain src/fixtures",
  "test:e2e": "playwright test"
}
```

Behold eksisterende `dependencies` og `devDependencies`; `npm install` legger til nye pakker.

- [ ] **Step 3: Opprett server-TS-konfig**

Opprett `apps/hr-strategiradar/tsconfig.server.json`:

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.server.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023"],
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "types": ["node"],
    "skipLibCheck": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["server/**/*.ts", "src/domain/**/*.ts", "src/fixtures/**/*.ts"],
  "exclude": ["server/**/*.test.ts", "server/**/__tests__/**"]
}
```

- [ ] **Step 4: Legg server inn i build-referanser**

Endre `apps/hr-strategiradar/tsconfig.json` til:

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" },
    { "path": "./tsconfig.server.json" }
  ]
}
```

- [ ] **Step 5: Legg inn Vite API-proxy**

Endre `apps/hr-strategiradar/vite.config.ts` til:

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8787',
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
  },
})
```

- [ ] **Step 6: Kjør typecheck/build**

Run:

```powershell
cd "C:\Users\larse\Documents\New project 2\apps\hr-strategiradar"
npm run build
```

Expected:

```text
vite v...
built in ...
```

- [ ] **Step 7: Commit**

Run:

```powershell
git add apps/hr-strategiradar/package.json apps/hr-strategiradar/package-lock.json apps/hr-strategiradar/tsconfig.server.json apps/hr-strategiradar/tsconfig.json apps/hr-strategiradar/vite.config.ts
git commit -m "chore: configure local backend runtime"
```

Expected:

```text
[codex/... ...] chore: configure local backend runtime
```

---

## Issue 4: Fastify-app og health endpoint

**Hvorfor:** Før datalogikk må vi ha en kjørbar API-server med testbar app-instans.

**Files:**
- Create: `apps/hr-strategiradar/server/config.ts`
- Create: `apps/hr-strategiradar/server/app.ts`
- Create: `apps/hr-strategiradar/server/index.ts`
- Create: `apps/hr-strategiradar/server/routes/health.ts`
- Create: `apps/hr-strategiradar/server/__tests__/health.test.ts`

- [ ] **Step 1: Skriv backend smoke test**

Opprett `apps/hr-strategiradar/server/__tests__/health.test.ts`:

```ts
// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { buildApp } from '../app'

describe('health route', () => {
  it('returns backend status and version', async () => {
    const app = buildApp()
    const response = await app.inject({ method: 'GET', url: '/api/health' })

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({
      status: 'ok',
      service: 'hr-strategiradar-backend',
      version: '0.1.0',
    })
  })
})
```

- [ ] **Step 2: Kjør testen og bekreft rød status**

Run:

```powershell
cd "C:\Users\larse\Documents\New project 2\apps\hr-strategiradar"
npm test -- server/__tests__/health.test.ts
```

Expected:

```text
FAIL  server/__tests__/health.test.ts
Error: Failed to resolve import "../app"
```

- [ ] **Step 3: Implementer config**

Opprett `apps/hr-strategiradar/server/config.ts`:

```ts
import path from 'node:path'

export interface ServerConfig {
  port: number
  host: string
  learningLabRoot: string
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): ServerConfig {
  const port = Number(env.PORT ?? '8787')
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`Invalid PORT: ${env.PORT}`)
  }

  return {
    port,
    host: env.HOST ?? '127.0.0.1',
    learningLabRoot: path.resolve(
      env.LEARNING_LAB_ROOT ?? 'C:\\Users\\larse\\Documents\\Interne prosjekter\\learning lab',
    ),
  }
}
```

- [ ] **Step 4: Implementer health-rute**

Opprett `apps/hr-strategiradar/server/routes/health.ts`:

```ts
import type { FastifyInstance } from 'fastify'

export async function registerHealthRoutes(app: FastifyInstance): Promise<void> {
  app.get('/api/health', async () => ({
    status: 'ok',
    service: 'hr-strategiradar-backend',
    version: '0.1.0',
  }))
}
```

- [ ] **Step 5: Implementer app og server entrypoint**

Opprett `apps/hr-strategiradar/server/app.ts`:

```ts
import cors from '@fastify/cors'
import Fastify, { type FastifyInstance } from 'fastify'
import { registerHealthRoutes } from './routes/health'

export function buildApp(): FastifyInstance {
  const app = Fastify({ logger: false })

  void app.register(cors, {
    origin: true,
    methods: ['GET', 'POST', 'OPTIONS'],
  })

  void app.register(registerHealthRoutes)

  return app
}
```

Opprett `apps/hr-strategiradar/server/index.ts`:

```ts
import { buildApp } from './app'
import { loadConfig } from './config'

const config = loadConfig()
const app = buildApp()

try {
  await app.listen({ port: config.port, host: config.host })
  app.log.info(`HR Strategiradar backend listening on http://${config.host}:${config.port}`)
} catch (error) {
  app.log.error(error)
  process.exit(1)
}
```

- [ ] **Step 6: Kjør backendtesten grønn**

Run:

```powershell
cd "C:\Users\larse\Documents\New project 2\apps\hr-strategiradar"
npm test -- server/__tests__/health.test.ts
```

Expected:

```text
Test Files  1 passed
Tests  1 passed
```

- [ ] **Step 7: Start backend manuelt og verifiser health**

Run terminal 1:

```powershell
cd "C:\Users\larse\Documents\New project 2\apps\hr-strategiradar"
npm run server:dev
```

Run terminal 2:

```powershell
Invoke-RestMethod -Uri "http://127.0.0.1:8787/api/health"
```

Expected:

```text
status service                  version
------ -------                  -------
ok     hr-strategiradar-backend 0.1.0
```

- [ ] **Step 8: Commit**

Run:

```powershell
git add apps/hr-strategiradar/server/config.ts apps/hr-strategiradar/server/app.ts apps/hr-strategiradar/server/index.ts apps/hr-strategiradar/server/routes/health.ts apps/hr-strategiradar/server/__tests__/health.test.ts
git commit -m "feat: add local backend health endpoint"
```

Expected:

```text
[codex/... ...] feat: add local backend health endpoint
```

---

## Issue 5: Learning Lab import med allowlist og proveniens

**Hvorfor:** Backend skal kunne bruke Learning Lab-kontekst uten å gi UI fri filsystemtilgang eller late som gap er dekket.

**Files:**
- Create: `apps/hr-strategiradar/server/importers/learningLabManifest.ts`
- Create: `apps/hr-strategiradar/server/importers/markdown.ts`
- Create: `apps/hr-strategiradar/server/importers/learningLabImporter.ts`
- Create: `apps/hr-strategiradar/server/__tests__/learningLabImporter.test.ts`

- [ ] **Step 1: Skriv importer-tester**

Opprett `apps/hr-strategiradar/server/__tests__/learningLabImporter.test.ts`:

```ts
// @vitest-environment node
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { learningLabManifest, resolveAllowedLearningLabPath } from '../importers/learningLabManifest'
import { importLearningLabBundle } from '../importers/learningLabImporter'

const learningLabRoot = 'C:\\Users\\larse\\Documents\\Interne prosjekter\\learning lab'

describe('Learning Lab manifest', () => {
  it('contains HR process, HR test sets, and long-shift relevant HMS source', () => {
    const ids = learningLabManifest.map((entry) => entry.id)
    expect(ids).toContain('hr-prosessoversikt')
    expect(ids).toContain('hr-testsett-v1')
    expect(ids).toContain('hr-randsone-testsett-v1')
    expect(ids).toContain('p-05-systematisk-hms')
  })

  it('resolves only paths inside Learning Lab root', () => {
    const resolved = resolveAllowedLearningLabPath(learningLabRoot, learningLabManifest[0].relativePath)
    expect(resolved.startsWith(path.resolve(learningLabRoot))).toBe(true)
    expect(() => resolveAllowedLearningLabPath(learningLabRoot, '..\\secret.md')).toThrow(/outside Learning Lab root/)
  })
})

describe('importLearningLabBundle', () => {
  it('imports allowlisted documents with hash and missing-file gaps', async () => {
    const bundle = await importLearningLabBundle({ learningLabRoot })

    expect(bundle.generatedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/)
    expect(bundle.documents.length).toBeGreaterThanOrEqual(8)
    expect(bundle.documents.some((document) => document.id === 'hr-testsett-v1')).toBe(true)
    expect(bundle.documents.every((document) => document.sha256.length === 64)).toBe(true)
    expect(bundle.gaps).toEqual([])
  })

  it('extracts scenarios from HR test sets', async () => {
    const bundle = await importLearningLabBundle({ learningLabRoot })

    expect(bundle.scenarios.length).toBeGreaterThanOrEqual(10)
    expect(bundle.scenarios.map((scenario) => scenario.id)).toContain('HR-SIM-01')
    expect(bundle.scenarios.map((scenario) => scenario.id)).toContain('HR-RAND-01')
  })
})
```

- [ ] **Step 2: Kjør testen og bekreft rød status**

Run:

```powershell
cd "C:\Users\larse\Documents\New project 2\apps\hr-strategiradar"
npm test -- server/__tests__/learningLabImporter.test.ts
```

Expected:

```text
FAIL  server/__tests__/learningLabImporter.test.ts
Error: Failed to resolve import "../importers/learningLabManifest"
```

- [ ] **Step 3: Implementer manifest**

Opprett `apps/hr-strategiradar/server/importers/learningLabManifest.ts`:

```ts
import path from 'node:path'

export interface LearningLabManifestEntry {
  id: string
  title: string
  relativePath: string
  category: 'process' | 'testset' | 'template' | 'profile' | 'runbook'
  purpose: string
}

export const learningLabManifest: LearningLabManifestEntry[] = [
  {
    id: 'hr-prosessoversikt',
    title: 'HR prosessoversikt',
    relativePath: 'domains/kommune_org/01_organisasjonsmodell/HR_PROSESSOVERSIKT.md',
    category: 'process',
    purpose: 'Kobler HR-kjerneprosesser til eiere og arbeidslop.',
  },
  {
    id: 'p-01-sykefravaer',
    title: 'P-01 Sykefravaersoppfolging',
    relativePath: 'domains/kommune_org/01_organisasjonsmodell/HR_KJERNEPROSESSER/P-01_SYKEFRAVAERSOPPFOLGING.md',
    category: 'process',
    purpose: 'Prosessgrunnlag for sykefravaer og tilrettelegging.',
  },
  {
    id: 'p-02-strategisk-rekruttering',
    title: 'P-02 Strategisk rekruttering',
    relativePath: 'domains/kommune_org/01_organisasjonsmodell/HR_KJERNEPROSESSER/P-02_STRATEGISK_REKRUTTERING.md',
    category: 'process',
    purpose: 'Prosessgrunnlag for rekruttering og kravprofil.',
  },
  {
    id: 'p-04-laerlingoppfolging',
    title: 'P-04 Laerlinginntak og oppfolging',
    relativePath: 'domains/kommune_org/01_organisasjonsmodell/HR_KJERNEPROSESSER/P-04_LAERLINGINNTAK_OG_OPPFOLGING.md',
    category: 'process',
    purpose: 'Prosessgrunnlag for laerlingcase og oppfolging.',
  },
  {
    id: 'p-05-systematisk-hms',
    title: 'P-05 Systematisk HMS-arbeid',
    relativePath: 'domains/kommune_org/01_organisasjonsmodell/HR_KJERNEPROSESSER/P-05_SYSTEMATISK_HMS_ARBEID.md',
    category: 'process',
    purpose: 'Prosessgrunnlag for HMS, langvakter og forsvarlighet.',
  },
  {
    id: 'p-08-omstilling',
    title: 'P-08 Omstillingsprosess',
    relativePath: 'domains/kommune_org/01_organisasjonsmodell/HR_KJERNEPROSESSER/P-08_OMSTILLINGSPROSESS.md',
    category: 'process',
    purpose: 'Prosessgrunnlag for omstilling og partsbilde.',
  },
  {
    id: 'hr-testsett-v1',
    title: 'HR testsett v1',
    relativePath: 'domains/kommune_org/05_simulering/testsett/HR_TESTSETT_V1.md',
    category: 'testset',
    purpose: 'Scenarioer for simulering, beslutningsstotte, mote og produksjon.',
  },
  {
    id: 'hr-randsone-testsett-v1',
    title: 'HR randsone testsett v1',
    relativePath: 'domains/kommune_org/05_simulering/testsett/HR_RANDSONE_TESTSETT_V1.md',
    category: 'testset',
    purpose: 'Scenarioer for juridisk, lonn, offentlighet, styring og systemforvaltning.',
  },
  {
    id: 'beslutningsnotat-template',
    title: 'Beslutningsnotat template',
    relativePath: 'domains/kommune_org/09_templates_og_output/maler/BESLUTNINGSNOTAT_TEMPLATE.md',
    category: 'template',
    purpose: 'Mal for beslutningsnotat.',
  },
  {
    id: 'hr-rad-template',
    title: 'HR rad template',
    relativePath: 'domains/kommune_org/09_templates_og_output/maler/HR_RAD_TEMPLATE.md',
    category: 'template',
    purpose: 'Mal for HR-rad.',
  },
  {
    id: 'sykepleier-kommune-read-model',
    title: 'Sykepleier kommune read model',
    relativePath: 'engines/kommuneinnsikt_rag/read_models/markdown/profiles/helse-omsorg/sykepleier-kommune.md',
    category: 'profile',
    purpose: 'Rolle- og belastningskontekst for helse/omsorg.',
  },
]

export function resolveAllowedLearningLabPath(learningLabRoot: string, relativePath: string): string {
  const root = path.resolve(learningLabRoot)
  const resolved = path.resolve(root, relativePath)
  const rootWithSeparator = root.endsWith(path.sep) ? root : `${root}${path.sep}`

  if (resolved !== root && !resolved.startsWith(rootWithSeparator)) {
    throw new Error(`Resolved path is outside Learning Lab root: ${relativePath}`)
  }

  if (!learningLabManifest.some((entry) => entry.relativePath === relativePath)) {
    throw new Error(`Path is not allowlisted for Learning Lab import: ${relativePath}`)
  }

  return resolved
}
```

- [ ] **Step 4: Implementer markdown-parser**

Opprett `apps/hr-strategiradar/server/importers/markdown.ts`:

```ts
export interface MarkdownMetadata {
  frontmatter: Record<string, string>
  body: string
}

export interface ImportedScenario {
  id: string
  title: string
  primaryFlow: string
  goal: string
  expectedActivation: string
  expectedOutput: string
  localVerification: string
  sourceDocumentId: string
}

export function parseFrontmatter(markdown: string): MarkdownMetadata {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!match) {
    return { frontmatter: {}, body: markdown }
  }

  const frontmatter: Record<string, string> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const separatorIndex = line.indexOf(':')
    if (separatorIndex > 0) {
      const key = line.slice(0, separatorIndex).trim()
      const value = line.slice(separatorIndex + 1).trim().replace(/^"|"$/g, '')
      frontmatter[key] = value
    }
  }

  return { frontmatter, body: markdown.slice(match[0].length) }
}

export function parseScenarioBlocks(markdown: string, sourceDocumentId: string): ImportedScenario[] {
  const blocks = markdown.split(/\r?\n## Scenario \d+\r?\n/).slice(1)

  return blocks.flatMap((block) => {
    const lines = block.split(/\r?\n/).map((line) => line.trim())
    const fields = new Map<string, string>()

    for (const line of lines) {
      const match = line.match(/^- ([^:]+):\s*(.+)$/)
      if (match) {
        fields.set(match[1].trim(), match[2].trim().replace(/^`|`$/g, ''))
      }
    }

    const id = fields.get('id')
    const title = fields.get('tittel')
    if (!id || !title) {
      return []
    }

    return [{
      id,
      title,
      primaryFlow: fields.get('primarloep') ?? '',
      goal: fields.get('maal') ?? '',
      expectedActivation: fields.get('forventet aktivering') ?? '',
      expectedOutput: fields.get('forventet output') ?? '',
      localVerification: fields.get('lokal verifikasjon') ?? '',
      sourceDocumentId,
    }]
  })
}
```

- [ ] **Step 5: Implementer importer**

Opprett `apps/hr-strategiradar/server/importers/learningLabImporter.ts`:

```ts
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { learningLabManifest, resolveAllowedLearningLabPath, type LearningLabManifestEntry } from './learningLabManifest'
import { parseFrontmatter, parseScenarioBlocks, type ImportedScenario } from './markdown'

export interface ImportedLearningLabDocument {
  id: string
  title: string
  category: LearningLabManifestEntry['category']
  relativePath: string
  purpose: string
  sha256: string
  frontmatter: Record<string, string>
  excerpt: string
}

export interface ImportGap {
  id: string
  relativePath: string
  reason: string
}

export interface ImportedLearningLabBundle {
  generatedAt: string
  sourceRoot: string
  documents: ImportedLearningLabDocument[]
  scenarios: ImportedScenario[]
  gaps: ImportGap[]
}

export async function importLearningLabBundle(input: { learningLabRoot: string }): Promise<ImportedLearningLabBundle> {
  const documents: ImportedLearningLabDocument[] = []
  const scenarios: ImportedScenario[] = []
  const gaps: ImportGap[] = []

  for (const entry of learningLabManifest) {
    try {
      const absolutePath = resolveAllowedLearningLabPath(input.learningLabRoot, entry.relativePath)
      const content = await readFile(absolutePath, 'utf8')
      const parsed = parseFrontmatter(content)
      const sha256 = createHash('sha256').update(content).digest('hex')

      documents.push({
        id: entry.id,
        title: entry.title,
        category: entry.category,
        relativePath: entry.relativePath,
        purpose: entry.purpose,
        sha256,
        frontmatter: parsed.frontmatter,
        excerpt: parsed.body.replace(/\s+/g, ' ').trim().slice(0, 600),
      })

      if (entry.category === 'testset') {
        scenarios.push(...parseScenarioBlocks(parsed.body, entry.id))
      }
    } catch (error) {
      gaps.push({
        id: entry.id,
        relativePath: entry.relativePath,
        reason: error instanceof Error ? error.message : 'Unknown import error',
      })
    }
  }

  return {
    generatedAt: new Date().toISOString(),
    sourceRoot: input.learningLabRoot,
    documents,
    scenarios,
    gaps,
  }
}
```

- [ ] **Step 6: Kjør importer-test grønn**

Run:

```powershell
cd "C:\Users\larse\Documents\New project 2\apps\hr-strategiradar"
npm test -- server/__tests__/learningLabImporter.test.ts
```

Expected:

```text
Test Files  1 passed
Tests  4 passed
```

- [ ] **Step 7: Commit**

Run:

```powershell
git add apps/hr-strategiradar/server/importers apps/hr-strategiradar/server/__tests__/learningLabImporter.test.ts
git commit -m "feat: import learning lab sources safely"
```

Expected:

```text
[codex/... ...] feat: import learning lab sources safely
```

---

## Issue 6: Generert importartefakt og kilde-summary API

**Hvorfor:** Backend skal ha en konkret datakontrakt for importert kontekst og et endpoint som viser hvilke kilder som faktisk er tilgjengelige.

**Files:**
- Create: `apps/hr-strategiradar/server/scripts/importLearningLab.ts`
- Create: `apps/hr-strategiradar/server/data/generated/.gitkeep`
- Create after script run: `apps/hr-strategiradar/server/data/generated/learning-lab.import.json`
- Create: `apps/hr-strategiradar/server/routes/sources.ts`
- Modify: `apps/hr-strategiradar/server/app.ts`

- [ ] **Step 1: Skriv route-test for kilde-summary**

Opprett `apps/hr-strategiradar/server/__tests__/sourcesRoute.test.ts`:

```ts
// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { buildApp } from '../app'

describe('Learning Lab source summary route', () => {
  it('returns imported source summary without exposing raw filesystem reads from request', async () => {
    const app = buildApp()
    const response = await app.inject({ method: 'GET', url: '/api/sources/learning-lab/summary' })

    expect(response.statusCode).toBe(200)
    const body = response.json()
    expect(body.source).toBe('learning-lab')
    expect(body.documents.length).toBeGreaterThanOrEqual(8)
    expect(body.scenarioCount).toBeGreaterThanOrEqual(10)
    expect(body.allowlistedOnly).toBe(true)
  })
})
```

- [ ] **Step 2: Kjør testen og bekreft rød status**

Run:

```powershell
cd "C:\Users\larse\Documents\New project 2\apps\hr-strategiradar"
npm test -- server/__tests__/sourcesRoute.test.ts
```

Expected:

```text
FAIL
expected 404 to be 200
```

- [ ] **Step 3: Opprett importscript og datamappe**

Opprett `apps/hr-strategiradar/server/data/generated/.gitkeep` som tom fil.

Opprett `apps/hr-strategiradar/server/scripts/importLearningLab.ts`:

```ts
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { loadConfig } from '../config'
import { importLearningLabBundle } from '../importers/learningLabImporter'

const config = loadConfig()
const outputPath = path.resolve('server/data/generated/learning-lab.import.json')
const bundle = await importLearningLabBundle({ learningLabRoot: config.learningLabRoot })

await mkdir(path.dirname(outputPath), { recursive: true })
await writeFile(outputPath, `${JSON.stringify(bundle, null, 2)}\n`, 'utf8')

console.log(`Imported ${bundle.documents.length} Learning Lab documents`)
console.log(`Extracted ${bundle.scenarios.length} scenarios`)
console.log(`Gaps ${bundle.gaps.length}`)
console.log(outputPath)
```

- [ ] **Step 4: Kjør importscriptet**

Run:

```powershell
cd "C:\Users\larse\Documents\New project 2\apps\hr-strategiradar"
npm run import:learning-lab
```

Expected:

```text
Imported 11 Learning Lab documents
Extracted 12 scenarios
Gaps 0
server\data\generated\learning-lab.import.json
```

- [ ] **Step 5: Implementer source route**

Opprett `apps/hr-strategiradar/server/routes/sources.ts`:

```ts
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import type { FastifyInstance } from 'fastify'
import type { ImportedLearningLabBundle } from '../importers/learningLabImporter'

async function readGeneratedBundle(): Promise<ImportedLearningLabBundle> {
  const filePath = path.resolve('server/data/generated/learning-lab.import.json')
  const content = await readFile(filePath, 'utf8')
  return JSON.parse(content) as ImportedLearningLabBundle
}

export async function registerSourceRoutes(app: FastifyInstance): Promise<void> {
  app.get('/api/sources/learning-lab/summary', async (_request, reply) => {
    const bundle = await readGeneratedBundle()

    return reply.send({
      source: 'learning-lab',
      allowlistedOnly: true,
      generatedAt: bundle.generatedAt,
      documentCount: bundle.documents.length,
      scenarioCount: bundle.scenarios.length,
      gapCount: bundle.gaps.length,
      documents: bundle.documents.map((document) => ({
        id: document.id,
        title: document.title,
        category: document.category,
        relativePath: document.relativePath,
        sha256: document.sha256,
      })),
      gaps: bundle.gaps,
    })
  })
}
```

Endre `apps/hr-strategiradar/server/app.ts`:

```ts
import cors from '@fastify/cors'
import Fastify, { type FastifyInstance } from 'fastify'
import { registerHealthRoutes } from './routes/health'
import { registerSourceRoutes } from './routes/sources'

export function buildApp(): FastifyInstance {
  const app = Fastify({ logger: false })

  void app.register(cors, {
    origin: true,
    methods: ['GET', 'POST', 'OPTIONS'],
  })

  void app.register(registerHealthRoutes)
  void app.register(registerSourceRoutes)

  return app
}
```

- [ ] **Step 6: Kjør route-test grønn**

Run:

```powershell
cd "C:\Users\larse\Documents\New project 2\apps\hr-strategiradar"
npm test -- server/__tests__/sourcesRoute.test.ts
```

Expected:

```text
Test Files  1 passed
Tests  1 passed
```

- [ ] **Step 7: Commit**

Run:

```powershell
git add apps/hr-strategiradar/server/scripts/importLearningLab.ts apps/hr-strategiradar/server/data/generated apps/hr-strategiradar/server/routes/sources.ts apps/hr-strategiradar/server/app.ts apps/hr-strategiradar/server/__tests__/sourcesRoute.test.ts
git commit -m "feat: expose learning lab source summary"
```

Expected:

```text
[codex/... ...] feat: expose learning lab source summary
```

---

## Issue 7: Case API

**Hvorfor:** Frontend og senere vurderingsflyt trenger et API som server caser fra den validerte fixturepakken.

**Files:**
- Create: `apps/hr-strategiradar/server/routes/cases.ts`
- Create: `apps/hr-strategiradar/server/__tests__/casesRoute.test.ts`
- Modify: `apps/hr-strategiradar/server/app.ts`

- [ ] **Step 1: Skriv case route-tester**

Opprett `apps/hr-strategiradar/server/__tests__/casesRoute.test.ts`:

```ts
// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { buildApp } from '../app'

describe('cases route', () => {
  it('lists all 8 cases without full task details', async () => {
    const app = buildApp()
    const response = await app.inject({ method: 'GET', url: '/api/cases' })

    expect(response.statusCode).toBe(200)
    const body = response.json()
    expect(body.cases).toHaveLength(8)
    expect(body.cases[0]).toHaveProperty('caseId')
    expect(body.cases[0]).toHaveProperty('taskCount')
    expect(body.cases[0]).not.toHaveProperty('aiUseTasks')
  })

  it('returns one full case by caseId', async () => {
    const app = buildApp()
    const response = await app.inject({ method: 'GET', url: '/api/cases/HRR-07' })

    expect(response.statusCode).toBe(200)
    const body = response.json()
    expect(body.case.caseId).toBe('HRR-07')
    expect(body.case.title.toLowerCase()).toContain('langvakter')
    expect(body.case.aiUseTasks.length).toBeGreaterThanOrEqual(2)
  })

  it('returns 404 for unknown case', async () => {
    const app = buildApp()
    const response = await app.inject({ method: 'GET', url: '/api/cases/HRR-99' })

    expect(response.statusCode).toBe(404)
    expect(response.json()).toEqual({ error: 'Case not found', caseId: 'HRR-99' })
  })
})
```

- [ ] **Step 2: Kjør testen og bekreft rød status**

Run:

```powershell
cd "C:\Users\larse\Documents\New project 2\apps\hr-strategiradar"
npm test -- server/__tests__/casesRoute.test.ts
```

Expected:

```text
FAIL
expected 404 to be 200
```

- [ ] **Step 3: Implementer case routes**

Opprett `apps/hr-strategiradar/server/routes/cases.ts`:

```ts
import type { FastifyInstance } from 'fastify'
import { allCases } from '../../src/fixtures/all-cases'

export async function registerCaseRoutes(app: FastifyInstance): Promise<void> {
  app.get('/api/cases', async () => ({
    cases: allCases.map((caseItem) => ({
      caseId: caseItem.caseId,
      title: caseItem.title,
      strategyArea: caseItem.strategyArea,
      strategicGoal: caseItem.strategicGoal,
      decisionOwner: caseItem.decisionOwner,
      taskCount: caseItem.aiUseTasks.length,
    })),
  }))

  app.get<{ Params: { caseId: string } }>('/api/cases/:caseId', async (request, reply) => {
    const caseItem = allCases.find((candidate) => candidate.caseId === request.params.caseId)
    if (!caseItem) {
      return reply.status(404).send({ error: 'Case not found', caseId: request.params.caseId })
    }

    return reply.send({ case: caseItem })
  })
}
```

Endre `apps/hr-strategiradar/server/app.ts`:

```ts
import cors from '@fastify/cors'
import Fastify, { type FastifyInstance } from 'fastify'
import { registerCaseRoutes } from './routes/cases'
import { registerHealthRoutes } from './routes/health'
import { registerSourceRoutes } from './routes/sources'

export function buildApp(): FastifyInstance {
  const app = Fastify({ logger: false })

  void app.register(cors, {
    origin: true,
    methods: ['GET', 'POST', 'OPTIONS'],
  })

  void app.register(registerHealthRoutes)
  void app.register(registerSourceRoutes)
  void app.register(registerCaseRoutes)

  return app
}
```

- [ ] **Step 4: Kjør case route-test grønn**

Run:

```powershell
cd "C:\Users\larse\Documents\New project 2\apps\hr-strategiradar"
npm test -- server/__tests__/casesRoute.test.ts
```

Expected:

```text
Test Files  1 passed
Tests  3 passed
```

- [ ] **Step 5: Commit**

Run:

```powershell
git add apps/hr-strategiradar/server/routes/cases.ts apps/hr-strategiradar/server/app.ts apps/hr-strategiradar/server/__tests__/casesRoute.test.ts
git commit -m "feat: expose hr case api"
```

Expected:

```text
[codex/... ...] feat: expose hr case api
```

---

## Issue 8: Deterministisk vurderingsmotor

**Hvorfor:** Appens backendverdi ligger i at stoppregler og rolleberegning blir eksplisitt, testbar og sporbar.

**Files:**
- Create: `apps/hr-strategiradar/src/domain/assessment.ts`
- Create: `apps/hr-strategiradar/src/domain/__tests__/assessment.test.ts`

- [ ] **Step 1: Skriv vurderingstester**

Opprett `apps/hr-strategiradar/src/domain/__tests__/assessment.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { assessAiUseTask } from '../assessment'
import type { AssessmentInput } from '../schemas'

const baseInput: AssessmentInput = {
  caseId: 'HRR-07',
  taskId: 'HRR-07-A',
  compassScores: {
    maalklarhet: { score: 4, justification: 'Konkret scenario.' },
    separabilitet: { score: 2, justification: 'HMS og lokal vurdering ma med.' },
  },
  controlRequirements: {
    explainabilityRequired: true,
    traceabilityRequired: true,
    localVerificationRequired: true,
    decisionLogRequired: true,
    manualPreAssessmentRequired: false,
    reversibilityRequired: true,
  },
  riskFlags: {
    rightsOrSignificantImpact: false,
    vulnerableParty: false,
    personalOrSensitiveData: false,
    healthSafetyEnvironment: true,
    patientOrUserSafety: true,
    workConditionsImpact: true,
    discriminationRisk: false,
    legalOrAgreementConstraint: true,
    irreversibleConsequences: false,
  },
  valueJudgments: {
    relationalTrustImportant: true,
    humanPresencePartOfValue: true,
    localExceptionsMatter: true,
    valueConflictPresent: true,
    errorReversible: true,
    rightsOrWorkImpact: true,
    sensitiveOrPersonalDataRisk: false,
  },
}

describe('assessAiUseTask', () => {
  it('evaluates stop rules before allowed role for long-shift scenario work', () => {
    const result = assessAiUseTask(baseInput)

    expect(result.triggeredStopRules).toEqual(['SR-02', 'SR-05', 'SR-06'])
    expect(result.calculatedRole).toBe('forsterket_skjonn')
    expect(result.allowedRole).toBe('utforskende_stotte')
    expect(result.roleCapApplied).toBe(true)
    expect(result.riskLevel).toBe('high')
  })

  it('caps individual long-shift assignment at exploratory support', () => {
    const result = assessAiUseTask({
      ...baseInput,
      taskId: 'HRR-07-B',
      riskFlags: {
        ...baseInput.riskFlags,
        rightsOrSignificantImpact: true,
        personalOrSensitiveData: true,
      },
      controlRequirements: {
        ...baseInput.controlRequirements,
        manualPreAssessmentRequired: true,
      },
    })

    expect(result.triggeredStopRules).toEqual(['SR-01', 'SR-02', 'SR-05', 'SR-06'])
    expect(result.calculatedRole).toBe('automatisert_beslutning')
    expect(result.allowedRole).toBe('utforskende_stotte')
    expect(result.roleCapApplied).toBe(true)
  })

  it('allows low risk generic structuring as strengthened judgment when separability is adequate', () => {
    const result = assessAiUseTask({
      ...baseInput,
      caseId: 'HRR-04',
      taskId: 'HRR-04-A',
      compassScores: {
        maalklarhet: { score: 4, justification: 'Klart utkast.' },
        separabilitet: { score: 3.5, justification: 'Utkast kan skilles fra beslutning.' },
      },
      riskFlags: {
        rightsOrSignificantImpact: false,
        vulnerableParty: false,
        personalOrSensitiveData: false,
        healthSafetyEnvironment: false,
        patientOrUserSafety: false,
        workConditionsImpact: false,
        discriminationRisk: true,
        legalOrAgreementConstraint: false,
        irreversibleConsequences: false,
      },
      valueJudgments: {
        relationalTrustImportant: false,
        humanPresencePartOfValue: false,
        localExceptionsMatter: true,
        valueConflictPresent: false,
        errorReversible: true,
        rightsOrWorkImpact: false,
        sensitiveOrPersonalDataRisk: false,
      },
    })

    expect(result.triggeredStopRules).toEqual(['SR-04'])
    expect(result.calculatedRole).toBe('forsterket_skjonn')
    expect(result.allowedRole).toBe('utforskende_stotte')
  })
})
```

- [ ] **Step 2: Kjør testen og bekreft rød status**

Run:

```powershell
cd "C:\Users\larse\Documents\New project 2\apps\hr-strategiradar"
npm test -- src/domain/__tests__/assessment.test.ts
```

Expected:

```text
FAIL
Error: Failed to resolve import "../assessment"
```

- [ ] **Step 3: Implementer vurderingsmotoren**

Opprett `apps/hr-strategiradar/src/domain/assessment.ts`:

```ts
import {
  AssessmentInputSchema,
  AssessmentResultSchema,
  type AssessmentInput,
  type AssessmentResult,
  type KiRole,
  type StopRule,
} from './schemas'

const roleRank: Record<KiRole, number> = {
  utforskende_stotte: 1,
  forsterket_skjonn: 2,
  delautomatisering: 3,
  automatisert_beslutning: 4,
}

function lowerRole(left: KiRole, right: KiRole): KiRole {
  return roleRank[left] <= roleRank[right] ? left : right
}

function calculateStopRules(input: AssessmentInput): StopRule[] {
  const rules = new Set<StopRule>()

  if (input.riskFlags.rightsOrSignificantImpact || input.riskFlags.personalOrSensitiveData) {
    rules.add('SR-01')
  }
  if (input.riskFlags.workConditionsImpact || input.valueJudgments.rightsOrWorkImpact) {
    rules.add('SR-02')
  }
  if (input.riskFlags.vulnerableParty) {
    rules.add('SR-03')
  }
  if (input.riskFlags.discriminationRisk) {
    rules.add('SR-04')
  }
  if (input.compassScores.separabilitet.score < 3 || input.valueJudgments.valueConflictPresent) {
    rules.add('SR-05')
  }
  if (input.riskFlags.healthSafetyEnvironment || input.riskFlags.patientOrUserSafety) {
    rules.add('SR-06')
  }
  if (input.riskFlags.legalOrAgreementConstraint) {
    rules.add('SR-07')
  }
  if (input.riskFlags.irreversibleConsequences) {
    rules.add('SR-08')
  }

  return Array.from(rules).sort()
}

function calculateRole(input: AssessmentInput): KiRole {
  const { maalklarhet, separabilitet } = input.compassScores

  if (input.riskFlags.rightsOrSignificantImpact && input.riskFlags.personalOrSensitiveData) {
    return 'automatisert_beslutning'
  }

  if (maalklarhet.score >= 4 && separabilitet.score >= 4 && !input.valueJudgments.valueConflictPresent) {
    return 'delautomatisering'
  }

  if (maalklarhet.score >= 3 && separabilitet.score >= 2.5) {
    return 'forsterket_skjonn'
  }

  return 'utforskende_stotte'
}

function roleCapForStopRules(stopRules: StopRule[]): KiRole {
  if (stopRules.some((rule) => ['SR-01', 'SR-02', 'SR-03', 'SR-06', 'SR-08'].includes(rule))) {
    return 'utforskende_stotte'
  }

  if (stopRules.length > 0) {
    return 'utforskende_stotte'
  }

  return 'forsterket_skjonn'
}

function calculateRiskLevel(stopRules: StopRule[]): AssessmentResult['riskLevel'] {
  if (stopRules.some((rule) => ['SR-01', 'SR-02', 'SR-03', 'SR-06', 'SR-08'].includes(rule))) {
    return 'high'
  }
  if (stopRules.length > 0) {
    return 'medium'
  }
  return 'low'
}

function requiredControlsFor(input: AssessmentInput, stopRules: StopRule[]): string[] {
  const controls = new Set<string>()

  if (input.controlRequirements.localVerificationRequired) controls.add('lokal verifikasjon')
  if (input.controlRequirements.traceabilityRequired) controls.add('sporbar kilde og vurdering')
  if (input.controlRequirements.decisionLogRequired || stopRules.length > 0) controls.add('beslutningslogg')
  if (input.controlRequirements.manualPreAssessmentRequired) controls.add('manuell forhandsvurdering')
  if (input.riskFlags.healthSafetyEnvironment || input.riskFlags.patientOrUserSafety) controls.add('HMS- og forsvarlighetsvurdering')
  if (input.riskFlags.legalOrAgreementConstraint) controls.add('avtale- og hjemmelskontroll')

  return Array.from(controls)
}

export function assessAiUseTask(rawInput: AssessmentInput): AssessmentResult {
  const input = AssessmentInputSchema.parse(rawInput)
  const triggeredStopRules = calculateStopRules(input)
  const calculatedRole = calculateRole(input)
  const roleCap = roleCapForStopRules(triggeredStopRules)
  const allowedRole = lowerRole(calculatedRole, roleCap)
  const riskLevel = calculateRiskLevel(triggeredStopRules)
  const requiredControls = requiredControlsFor(input, triggeredStopRules)

  return AssessmentResultSchema.parse({
    caseId: input.caseId,
    taskId: input.taskId,
    triggeredStopRules,
    calculatedRole,
    allowedRole,
    roleCapApplied: allowedRole !== calculatedRole,
    riskLevel,
    explanation: `Stoppregler vurdert for rolle: ${triggeredStopRules.length ? triggeredStopRules.join(', ') : 'ingen'}. Beregnet rolle ${calculatedRole}, tillatt rolle ${allowedRole}.`,
    requiredControls,
    decisionLogRequired: requiredControls.includes('beslutningslogg'),
  })
}
```

- [ ] **Step 4: Kjør vurderingstest grønn**

Run:

```powershell
cd "C:\Users\larse\Documents\New project 2\apps\hr-strategiradar"
npm test -- src/domain/__tests__/assessment.test.ts
```

Expected:

```text
Test Files  1 passed
Tests  3 passed
```

- [ ] **Step 5: Commit**

Run:

```powershell
git add apps/hr-strategiradar/src/domain/assessment.ts apps/hr-strategiradar/src/domain/__tests__/assessment.test.ts
git commit -m "feat: add deterministic assessment engine"
```

Expected:

```text
[codex/... ...] feat: add deterministic assessment engine
```

---

## Issue 9: Assessment API

**Hvorfor:** Frontend trenger ett endpoint som kan forhåndsvurdere valgt KI-bruksoppgave uten å lagre data.

**Files:**
- Create: `apps/hr-strategiradar/server/routes/assessments.ts`
- Create: `apps/hr-strategiradar/server/__tests__/assessmentRoute.test.ts`
- Modify: `apps/hr-strategiradar/server/app.ts`

- [ ] **Step 1: Skriv API-test**

Opprett `apps/hr-strategiradar/server/__tests__/assessmentRoute.test.ts`:

```ts
// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { buildApp } from '../app'

describe('assessment preview route', () => {
  it('assesses HRR-07 long-shift scenario with stop rules before role', async () => {
    const app = buildApp()
    const response = await app.inject({
      method: 'POST',
      url: '/api/assessments/preview',
      payload: {
        caseId: 'HRR-07',
        taskId: 'HRR-07-A',
      },
    })

    expect(response.statusCode).toBe(200)
    const body = response.json()
    expect(body.result.caseId).toBe('HRR-07')
    expect(body.result.triggeredStopRules).toEqual(['SR-02', 'SR-05', 'SR-06'])
    expect(body.result.allowedRole).toBe('utforskende_stotte')
  })

  it('returns 404 for unknown task', async () => {
    const app = buildApp()
    const response = await app.inject({
      method: 'POST',
      url: '/api/assessments/preview',
      payload: {
        caseId: 'HRR-07',
        taskId: 'HRR-07-Z',
      },
    })

    expect(response.statusCode).toBe(404)
    expect(response.json()).toEqual({ error: 'Task not found', caseId: 'HRR-07', taskId: 'HRR-07-Z' })
  })
})
```

- [ ] **Step 2: Kjør testen og bekreft rød status**

Run:

```powershell
cd "C:\Users\larse\Documents\New project 2\apps\hr-strategiradar"
npm test -- server/__tests__/assessmentRoute.test.ts
```

Expected:

```text
FAIL
expected 404 to be 200
```

- [ ] **Step 3: Implementer assessment route**

Opprett `apps/hr-strategiradar/server/routes/assessments.ts`:

```ts
import type { FastifyInstance } from 'fastify'
import { assessAiUseTask } from '../../src/domain/assessment'
import { allCases } from '../../src/fixtures/all-cases'

interface AssessmentPreviewBody {
  caseId: string
  taskId: string
}

export async function registerAssessmentRoutes(app: FastifyInstance): Promise<void> {
  app.post<{ Body: AssessmentPreviewBody }>('/api/assessments/preview', async (request, reply) => {
    const caseItem = allCases.find((candidate) => candidate.caseId === request.body.caseId)
    if (!caseItem) {
      return reply.status(404).send({ error: 'Case not found', caseId: request.body.caseId })
    }

    const task = caseItem.aiUseTasks.find((candidate) => candidate.taskId === request.body.taskId)
    if (!task) {
      return reply.status(404).send({
        error: 'Task not found',
        caseId: request.body.caseId,
        taskId: request.body.taskId,
      })
    }

    const result = assessAiUseTask({
      caseId: caseItem.caseId,
      taskId: task.taskId,
      compassScores: task.compassScores,
      controlRequirements: task.controlRequirements,
      riskFlags: task.riskFlags,
      valueJudgments: {
        relationalTrustImportant: task.compassScores.separabilitet.score < 3,
        humanPresencePartOfValue: task.directEffectOnPeople,
        localExceptionsMatter: true,
        valueConflictPresent: task.compassScores.separabilitet.score < 3,
        errorReversible: !task.riskFlags.irreversibleConsequences,
        rightsOrWorkImpact: task.riskFlags.rightsOrSignificantImpact || task.riskFlags.workConditionsImpact,
        sensitiveOrPersonalDataRisk: task.usesPersonalOrSensitiveData,
      },
    })

    return reply.send({ result })
  })
}
```

Endre `apps/hr-strategiradar/server/app.ts`:

```ts
import cors from '@fastify/cors'
import Fastify, { type FastifyInstance } from 'fastify'
import { registerAssessmentRoutes } from './routes/assessments'
import { registerCaseRoutes } from './routes/cases'
import { registerHealthRoutes } from './routes/health'
import { registerSourceRoutes } from './routes/sources'

export function buildApp(): FastifyInstance {
  const app = Fastify({ logger: false })

  void app.register(cors, {
    origin: true,
    methods: ['GET', 'POST', 'OPTIONS'],
  })

  void app.register(registerHealthRoutes)
  void app.register(registerSourceRoutes)
  void app.register(registerCaseRoutes)
  void app.register(registerAssessmentRoutes)

  return app
}
```

- [ ] **Step 4: Kjør API-test grønn**

Run:

```powershell
cd "C:\Users\larse\Documents\New project 2\apps\hr-strategiradar"
npm test -- server/__tests__/assessmentRoute.test.ts
```

Expected:

```text
Test Files  1 passed
Tests  2 passed
```

- [ ] **Step 5: Commit**

Run:

```powershell
git add apps/hr-strategiradar/server/routes/assessments.ts apps/hr-strategiradar/server/app.ts apps/hr-strategiradar/server/__tests__/assessmentRoute.test.ts
git commit -m "feat: expose assessment preview api"
```

Expected:

```text
[codex/... ...] feat: expose assessment preview api
```

---

## Issue 10: Beslutningsnotat API

**Hvorfor:** MVP-en må kunne produsere beslutningsklart notat som viser kildegrunnlag, stoppregler, rolle og kontrollkrav.

**Files:**
- Create: `apps/hr-strategiradar/server/routes/reports.ts`
- Create: `apps/hr-strategiradar/server/__tests__/reportsRoute.test.ts`
- Modify: `apps/hr-strategiradar/server/app.ts`

- [ ] **Step 1: Skriv rapporttest**

Opprett `apps/hr-strategiradar/server/__tests__/reportsRoute.test.ts`:

```ts
// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { buildApp } from '../app'

describe('decision note report route', () => {
  it('returns markdown for HRR-07 assessment', async () => {
    const app = buildApp()
    const response = await app.inject({
      method: 'POST',
      url: '/api/reports/decision-note',
      payload: {
        caseId: 'HRR-07',
        taskId: 'HRR-07-A',
      },
    })

    expect(response.statusCode).toBe(200)
    const body = response.json()
    expect(body.markdown).toContain('# Beslutningsnotat: Langvakter i helsesektoren')
    expect(body.markdown).toContain('## Stoppregler')
    expect(body.markdown).toContain('SR-02')
    expect(body.markdown).toContain('Tillatt KI-rolle: utforskende_stotte')
    expect(body.markdown).toContain('## Lokal verifikasjon')
  })
})
```

- [ ] **Step 2: Kjør testen og bekreft rød status**

Run:

```powershell
cd "C:\Users\larse\Documents\New project 2\apps\hr-strategiradar"
npm test -- server/__tests__/reportsRoute.test.ts
```

Expected:

```text
FAIL
expected 404 to be 200
```

- [ ] **Step 3: Implementer rapport route**

Opprett `apps/hr-strategiradar/server/routes/reports.ts`:

```ts
import type { FastifyInstance } from 'fastify'
import { assessAiUseTask } from '../../src/domain/assessment'
import { allCases } from '../../src/fixtures/all-cases'

interface DecisionNoteBody {
  caseId: string
  taskId: string
}

export async function registerReportRoutes(app: FastifyInstance): Promise<void> {
  app.post<{ Body: DecisionNoteBody }>('/api/reports/decision-note', async (request, reply) => {
    const caseItem = allCases.find((candidate) => candidate.caseId === request.body.caseId)
    if (!caseItem) {
      return reply.status(404).send({ error: 'Case not found', caseId: request.body.caseId })
    }

    const task = caseItem.aiUseTasks.find((candidate) => candidate.taskId === request.body.taskId)
    if (!task) {
      return reply.status(404).send({
        error: 'Task not found',
        caseId: request.body.caseId,
        taskId: request.body.taskId,
      })
    }

    const result = assessAiUseTask({
      caseId: caseItem.caseId,
      taskId: task.taskId,
      compassScores: task.compassScores,
      controlRequirements: task.controlRequirements,
      riskFlags: task.riskFlags,
      valueJudgments: {
        relationalTrustImportant: task.compassScores.separabilitet.score < 3,
        humanPresencePartOfValue: task.directEffectOnPeople,
        localExceptionsMatter: true,
        valueConflictPresent: task.compassScores.separabilitet.score < 3,
        errorReversible: !task.riskFlags.irreversibleConsequences,
        rightsOrWorkImpact: task.riskFlags.rightsOrSignificantImpact || task.riskFlags.workConditionsImpact,
        sensitiveOrPersonalDataRisk: task.usesPersonalOrSensitiveData,
      },
    })

    const markdown = [
      `# Beslutningsnotat: ${caseItem.title}`,
      '',
      `Case: ${caseItem.caseId}`,
      `KI-bruksoppgave: ${task.title}`,
      `Beslutningseier: ${caseItem.decisionOwner}`,
      '',
      '## Strategisk mal',
      caseItem.strategicGoal,
      '',
      '## Kompass',
      `- Maalklarhet: ${task.compassScores.maalklarhet.score} - ${task.compassScores.maalklarhet.justification}`,
      `- Separabilitet: ${task.compassScores.separabilitet.score} - ${task.compassScores.separabilitet.justification}`,
      '',
      '## Stoppregler',
      result.triggeredStopRules.length ? result.triggeredStopRules.map((rule) => `- ${rule}`).join('\n') : '- Ingen',
      '',
      '## Rolle',
      `Beregnet KI-rolle: ${result.calculatedRole}`,
      `Tillatt KI-rolle: ${result.allowedRole}`,
      `Rolletak brukt: ${result.roleCapApplied ? 'ja' : 'nei'}`,
      '',
      '## Kontrollkrav',
      result.requiredControls.map((control) => `- ${control}`).join('\n'),
      '',
      '## Lokal verifikasjon',
      task.requiredLocalVerification,
      '',
      '## Kilder',
      [...caseItem.learningLabRefs, ...task.sourceRefs].map((sourceRef) => `- ${sourceRef}`).join('\n'),
      '',
    ].join('\n')

    return reply.send({ markdown })
  })
}
```

Endre `apps/hr-strategiradar/server/app.ts`:

```ts
import cors from '@fastify/cors'
import Fastify, { type FastifyInstance } from 'fastify'
import { registerAssessmentRoutes } from './routes/assessments'
import { registerCaseRoutes } from './routes/cases'
import { registerHealthRoutes } from './routes/health'
import { registerReportRoutes } from './routes/reports'
import { registerSourceRoutes } from './routes/sources'

export function buildApp(): FastifyInstance {
  const app = Fastify({ logger: false })

  void app.register(cors, {
    origin: true,
    methods: ['GET', 'POST', 'OPTIONS'],
  })

  void app.register(registerHealthRoutes)
  void app.register(registerSourceRoutes)
  void app.register(registerCaseRoutes)
  void app.register(registerAssessmentRoutes)
  void app.register(registerReportRoutes)

  return app
}
```

- [ ] **Step 4: Kjør rapporttest grønn**

Run:

```powershell
cd "C:\Users\larse\Documents\New project 2\apps\hr-strategiradar"
npm test -- server/__tests__/reportsRoute.test.ts
```

Expected:

```text
Test Files  1 passed
Tests  1 passed
```

- [ ] **Step 5: Commit**

Run:

```powershell
git add apps/hr-strategiradar/server/routes/reports.ts apps/hr-strategiradar/server/app.ts apps/hr-strategiradar/server/__tests__/reportsRoute.test.ts
git commit -m "feat: add decision note report api"
```

Expected:

```text
[codex/... ...] feat: add decision note report api
```

---

## Issue 11: Typed frontend API-klient

**Hvorfor:** Frontend skal kobles til backend via én liten klient uten å blande API-formater inn i komponentene.

**Files:**
- Create: `apps/hr-strategiradar/src/api/client.ts`
- Create: `apps/hr-strategiradar/src/api/client.test.ts`

- [ ] **Step 1: Skriv klienttest med mocket fetch**

Opprett `apps/hr-strategiradar/src/api/client.test.ts`:

```ts
import { afterEach, describe, expect, it, vi } from 'vitest'
import { getCase, listCases, previewAssessment } from './client'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('api client', () => {
  it('lists cases', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ cases: [{ caseId: 'HRR-07', title: 'Langvakter', taskCount: 2 }] }))))

    await expect(listCases()).resolves.toEqual({ cases: [{ caseId: 'HRR-07', title: 'Langvakter', taskCount: 2 }] })
  })

  it('gets one case', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ case: { caseId: 'HRR-07', title: 'Langvakter' } }))))

    await expect(getCase('HRR-07')).resolves.toEqual({ case: { caseId: 'HRR-07', title: 'Langvakter' } })
  })

  it('previews assessment', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ result: { caseId: 'HRR-07', taskId: 'HRR-07-A' } }))))

    await expect(previewAssessment('HRR-07', 'HRR-07-A')).resolves.toEqual({ result: { caseId: 'HRR-07', taskId: 'HRR-07-A' } })
  })

  it('throws on non-ok response', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ error: 'Case not found' }), { status: 404 })))

    await expect(getCase('HRR-99')).rejects.toThrow('API request failed: 404 Case not found')
  })
})
```

- [ ] **Step 2: Kjør testen og bekreft rød status**

Run:

```powershell
cd "C:\Users\larse\Documents\New project 2\apps\hr-strategiradar"
npm test -- src/api/client.test.ts
```

Expected:

```text
FAIL
Error: Failed to resolve import "./client"
```

- [ ] **Step 3: Implementer klienten**

Opprett `apps/hr-strategiradar/src/api/client.ts`:

```ts
async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  })

  const payload = await response.json()
  if (!response.ok) {
    const message = typeof payload?.error === 'string' ? payload.error : response.statusText
    throw new Error(`API request failed: ${response.status} ${message}`)
  }

  return payload as T
}

export interface CaseSummary {
  caseId: string
  title: string
  taskCount: number
}

export async function listCases(): Promise<{ cases: CaseSummary[] }> {
  return requestJson('/api/cases')
}

export async function getCase(caseId: string): Promise<{ case: unknown }> {
  return requestJson(`/api/cases/${encodeURIComponent(caseId)}`)
}

export async function previewAssessment(caseId: string, taskId: string): Promise<{ result: unknown }> {
  return requestJson('/api/assessments/preview', {
    method: 'POST',
    body: JSON.stringify({ caseId, taskId }),
  })
}

export async function createDecisionNote(caseId: string, taskId: string): Promise<{ markdown: string }> {
  return requestJson('/api/reports/decision-note', {
    method: 'POST',
    body: JSON.stringify({ caseId, taskId }),
  })
}
```

- [ ] **Step 4: Kjør klienttest grønn**

Run:

```powershell
cd "C:\Users\larse\Documents\New project 2\apps\hr-strategiradar"
npm test -- src/api/client.test.ts
```

Expected:

```text
Test Files  1 passed
Tests  4 passed
```

- [ ] **Step 5: Commit**

Run:

```powershell
git add apps/hr-strategiradar/src/api/client.ts apps/hr-strategiradar/src/api/client.test.ts
git commit -m "feat: add typed frontend api client"
```

Expected:

```text
[codex/... ...] feat: add typed frontend api client
```

---

## Issue 12: Full backend-verifikasjon før MVP-koding fortsetter

**Hvorfor:** Dette er porten før frontendflyt eller MVP-skjermbilder bygges videre.

**Files:**
- Modify if needed: `issues/hr_strategiradar_mvp_issues.md`
- Modify if needed: `workspace.yml`

- [ ] **Step 1: Kjør komplett testpakke**

Run:

```powershell
cd "C:\Users\larse\Documents\New project 2\apps\hr-strategiradar"
npm test
```

Expected:

```text
Test Files  all passed
Tests  all passed
```

- [ ] **Step 2: Kjør build**

Run:

```powershell
cd "C:\Users\larse\Documents\New project 2\apps\hr-strategiradar"
npm run build
```

Expected:

```text
vite v...
built in ...
```

- [ ] **Step 3: Kjør import og smoke mot levende backend**

Run terminal 1:

```powershell
cd "C:\Users\larse\Documents\New project 2\apps\hr-strategiradar"
npm run import:learning-lab
npm run server:dev
```

Run terminal 2:

```powershell
Invoke-RestMethod -Uri "http://127.0.0.1:8787/api/health"
Invoke-RestMethod -Uri "http://127.0.0.1:8787/api/cases"
Invoke-RestMethod -Uri "http://127.0.0.1:8787/api/cases/HRR-07"
Invoke-RestMethod -Method Post -Uri "http://127.0.0.1:8787/api/assessments/preview" -ContentType "application/json" -Body '{"caseId":"HRR-07","taskId":"HRR-07-A"}'
Invoke-RestMethod -Method Post -Uri "http://127.0.0.1:8787/api/reports/decision-note" -ContentType "application/json" -Body '{"caseId":"HRR-07","taskId":"HRR-07-A"}'
```

Expected:

```text
Health returns status ok.
Cases returns 8 items.
HRR-07 returns Langvakter i helsesektoren.
Assessment returns SR-02, SR-05, SR-06 before allowed role.
Decision note contains Stoppregler, Rolle, Kontrollkrav and Lokal verifikasjon.
```

- [ ] **Step 4: Oppdater prosjektstatus**

Endre `workspace.yml`:

```yaml
mvp_candidate_setup:
  next_issue: HRSR-003
  status: backend_domain_and_case_api_ready
```

Oppdater `issues/hr_strategiradar_mvp_issues.md` med ny backend-splitt:

```markdown
## Backend-preflight fullfort

- HRSR-002 domenekontrakter og fixtures er implementert.
- Learning Lab importerer read-only fra allowlistede kilder.
- Backend har health, source summary, cases, assessment preview og decision-note endpoints.
- Neste frontendarbeid skal bruke `/api/cases`, `/api/assessments/preview` og `/api/reports/decision-note`.
```

- [ ] **Step 5: Commit verifikasjonsoppdatering**

Run:

```powershell
git add workspace.yml issues/hr_strategiradar_mvp_issues.md
git commit -m "docs: mark backend preflight ready"
```

Expected:

```text
[codex/... ...] docs: mark backend preflight ready
```

---

## Akseptansekriterier for hele backend-planen

- `npm test` passerer i `apps/hr-strategiradar`.
- `npm run build` passerer i `apps/hr-strategiradar`.
- `npm run import:learning-lab` genererer `server/data/generated/learning-lab.import.json` fra allowlistede Learning Lab-filer.
- `GET /api/health` returnerer `status: ok`.
- `GET /api/sources/learning-lab/summary` returnerer importerte dokumenter, scenarioantall og gapantall.
- `GET /api/cases` returnerer 8 HRR-caser.
- `GET /api/cases/HRR-07` returnerer langvaktcasen.
- `POST /api/assessments/preview` vurderer stoppregler før KI-rolle.
- HRR-07-A utløser arbeid/HMS/pasient- eller brukersikkerhetsrelevante stoppregler og caps til `utforskende_stotte`.
- Ingen API-route tar imot fri lokal filsti fra frontend.
- Ingen vurdering konkluderer med uforbeholden automatisering.

## Bevisst ute av scope

- Database og persistens.
- Innlogging, roller og tilgangsstyring.
- LLM-kall, Claude/OpenAI/Sonar API og ekstern research-agent.
- Produksjonsdeploy.
- Full frontendflyt.
- Automatisk endring av Learning Lab-filer.

## Sonar/API-vurdering

Sonar API trengs ikke for denne backend-planen. Vi har nok lokal kontekst til å bygge fungerende import, case-API og deterministisk vurdering. Sonar eller annen research-agent kan brukes i et separat research-issue for å oppdatere kildegrunnlaget for langvakter, men resultatet bør da lande som nye researchfiler først, ikke direkte i vurderingsmotoren.

## Selvreview

- Spec coverage: Planen dekker backend som fungerer, Learning Lab-import, realistiske caser, langvakter, stoppregler, beslutningslogg og API-kontrakter.
- Placeholder scan: Planen bruker ingen åpne erstatningsmarkører eller kodeinstruksjoner uten konkrete filer og kommandoer.
- Type consistency: `KiRole`, `StopRule`, `RiskFlags`, `CompassScores`, `ControlRequirements`, `AssessmentInput` og `AssessmentResult` brukes likt i schema, fixtures, motor, routes og klient.
- Arkitekturregel: `kart`, `kompass`, `kontrollkrav`, `linser`, `stoppregler` og `beslutningslogg` holdes adskilt. Forklarbarhet er ikke kompassakse.
