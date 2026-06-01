import { z } from 'zod';

export const KiRole = z.enum([
  'utforskende_støtte',
  'forsterket_skjønn',
  'automatisert_beslutning',
  'strategisk_autonomi',
]);
export type ExpectedKiRole = z.infer<typeof KiRole>;

export const StopRule = z.enum([
  'SR-01',
  'SR-02',
  'SR-03',
  'SR-04',
  'SR-05',
  'SR-06',
  'SR-07',
  'SR-08',
]);
export type StopRule = z.infer<typeof StopRule>;

export const HrStrategyArea = z.enum([
  'livsfasepolitikk',
  'nærvær_sykefravær_hms',
  'heltidskultur',
  'rekruttering',
  'kompetanse',
  'lærling',
  'arbeidstid_og_heltidskultur',
  'omstilling',
]);
export type HrStrategyArea = z.infer<typeof HrStrategyArea>;

export const TaskType = z.enum([
  'strukturering',
  'prioritering',
  'forslag',
  'analyse',
  'tildeling',
  'rangering',
  'prediksjon',
  'oppsummering',
  'klassifisering',
  'beslutning',
]);
export type TaskType = z.infer<typeof TaskType>;

export const RiskLevel = z.enum(['low', 'medium', 'high']);
export type RiskLevel = z.infer<typeof RiskLevel>;

export const ValueJudgmentsSchema = z.object({
  relationalTrustImportant: z.boolean(),
  humanPresencePartOfValue: z.boolean(),
  localExceptionsMatter: z.boolean(),
  valueConflictPresent: z.boolean(),
  errorReversible: z.boolean(),
  rightsOrWorkImpact: z.boolean(),
  sensitiveOrPersonalDataRisk: z.boolean(),
});
export type ValueJudgments = z.infer<typeof ValueJudgmentsSchema>;

const ScoreField = z.object({
  score: z.number().min(1).max(5),
  justification: z.string().min(1, 'Krever begrunnelse'),
});

export const ModuleScoresSchema = z.object({
  målklarhet: ScoreField,
  separabilitet: ScoreField,
  forklarbarhet: ScoreField,
  antiOverreliance: ScoreField,
});
export type ModuleScores = z.infer<typeof ModuleScoresSchema>;

export const RiskFlagsSchema = z.object({
  rightsOrSignificantImpact: z.boolean(),
  vulnerableParty: z.boolean(),
  personalOrSensitiveData: z.boolean(),
  healthSafetyEnvironment: z.boolean(),
  irreversibleConsequences: z.boolean(),
  workConditionsImpact: z.boolean(),
  discriminationRisk: z.boolean(),
  surveillanceOrControl: z.boolean(),
});
export type RiskFlags = z.infer<typeof RiskFlagsSchema>;

export const AiUseTaskSchema = z.object({
  taskId: z.string(),
  title: z.string(),
  taskType: TaskType,
  inputDataType: z.string(),
  outputUse: z.string(),
  humanDecisionPoint: z.string(),
  directEffectOnPeople: z.boolean(),
  usesPersonalOrSensitiveData: z.boolean(),
  expectedModuleScores: ModuleScoresSchema,
  expectedRiskFlags: RiskFlagsSchema,
  expectedStopRules: z.array(StopRule),
  expectedCalculatedRole: KiRole,
  expectedAllowedRole: KiRole,
  expectedTrafficLight: z.enum(['green', 'yellow', 'red']).optional(),
  expectedComplianceScore: z.number().optional(),
  requiredControls: z.array(z.string()),
  requiredLocalVerification: z.string(),
});
export type AiUseTask = z.infer<typeof AiUseTaskSchema>;

export const HrMicroprojectSchema = z.object({
  caseId: z.string(),
  title: z.string(),
  strategyArea: HrStrategyArea,
  strategicGoal: z.string(),
  targetGroups: z.array(z.string()),
  affectedParties: z.array(z.string()),
  decisionOwner: z.string(),
  knownFacts: z.array(z.string()),
  uncertainties: z.array(z.string()),
  sourceBasis: z.string(),
  aiUseTasks: z.array(AiUseTaskSchema).min(1, 'Krever minst en KI-bruksoppgave'),
});
export type HrMicroproject = z.infer<typeof HrMicroprojectSchema>;

const BaseDecisionLogSchema = z.object({
  beslutningId: z.string(),
  beslutningTittel: z.string(),
  beslutningseier: z.string(),
  forelopigTillattRolle: KiRole,
  kiOutputBrukt: z.string(),
  endeligBeslutning: z.string(),
  endeligAnsvarlig: z.string(),
  dato: z.string(),
});

const LowRiskLogSchema = BaseDecisionLogSchema.extend({
  riskLevel: z.literal('low'),
});

const HighRiskLogSchema = BaseDecisionLogSchema.extend({
  riskLevel: z.literal('high'),
  berorteParter: z.array(z.string()),
  risikoniva: z.string(),
  stopreglerUtloest: z.array(z.string()),
  rolleTak: KiRole,
  beregnetRolle: KiRole,
  menneskeligForhandsvurdering: z.string(),
  menneskeligSluttvurdering: z.string(),
  motargumenterVurdert: z.string(),
  verifikasjon: z.string(),
  usikkerhet: z.string(),
  overstyring: z.boolean(),
  begrunnelseForOverstyring: z.string().optional(),
});

export const DecisionLogSchema = z.discriminatedUnion('riskLevel', [
  LowRiskLogSchema,
  HighRiskLogSchema,
]);
export type DecisionLog = z.infer<typeof DecisionLogSchema>;

// New schemas based on PRD requirements
export const DimensionIndicatorsSchema = z.object({
  maalklarhetIndicators: z.array(z.string()),
  separabilitetIndicators: z.array(z.string()),
  forklarbarhetIndicators: z.array(z.string()),
  antiOverrelianceIndicators: z.array(z.string()),
}).strict();
export type DimensionIndicators = z.infer<typeof DimensionIndicatorsSchema>;

export const AssessmentResultSchema = z.object({
  caseId: z.string().min(1),
  taskId: z.string().min(1),
  triggeredStopRules: z.array(StopRule),
  roleCap: KiRole,
  maalklarhetScore: z.number().min(1).max(5),
  separabilitetScore: z.number().min(1).max(5),
  compassScore: z.number().min(1).max(5),
  controlScore: z.number().min(1).max(5),
  calculatedRole: KiRole,
  allowedRole: KiRole,
  roleCapApplied: z.boolean(),
  riskLevel: RiskLevel,
  explanation: z.string().min(1),
  requiredControls: z.array(z.string()),
  decisionLogRequired: z.boolean(),
}).strict();
export type AssessmentResult = z.infer<typeof AssessmentResultSchema>;

export const HandoverPacketSchema = z.object({
  owner: z.string().min(1),
  activatedRandsoner: z.array(z.string()),
  reason: z.array(z.string()),
  requiredLocalVerification: z.array(z.string()),
  nextControlPoint: z.string().min(1),
}).strict();
export type HandoverPacket = z.infer<typeof HandoverPacketSchema>;

export const ScenarioSchema = z.object({
  temaKey: z.string(),
  temaTittel: z.string(),
  simulertHendelse: z.string(),
  utfallstype: z.string(),
  tidshorisont: z.string(),
  berørteParter: z.string(),
  utløsendeAntakelse: z.string(),
  tidligeSignaler: z.string(),
  konsekvensHvisIkkeHåndtert: z.string(),
  lokalVerifikasjon: z.string(),
  ansvarligEier: z.string(),
  bekymringsniva: z.enum(['lav', 'middels', 'høy']),
}).strict();
export type Scenario = z.infer<typeof ScenarioSchema>;
