import { describe, it, expect } from 'vitest';
import { allCases } from '../../fixtures/all-cases';
import { runCalculationEngine, INITIAL_VALUE_JUDGMENTS } from '../../services/mockDiagnosisService';

describe('HR-Strategiradar: Casetype-tester mot 5 obligatoriske scenarioer', () => {

  // 1. Lavrisiko standardoppgave
  it('Scenario 1: Lavrisiko standardoppgave (HRR-04-A - Kravprofil)', () => {
    const case04 = allCases.find(c => c.caseId === 'HRR-04');
    expect(case04).toBeDefined();
    const task04A = case04?.aiUseTasks.find(t => t.taskId === 'HRR-04-A');
    expect(task04A).toBeDefined();

    if (task04A) {
      expect(task04A.directEffectOnPeople).toBe(false);
      expect(task04A.usesPersonalOrSensitiveData).toBe(false);
      expect(task04A.expectedRiskFlags.personalOrSensitiveData).toBe(false);
      expect(task04A.expectedRiskFlags.rightsOrSignificantImpact).toBe(false);

      const judgments = { ...INITIAL_VALUE_JUDGMENTS, rightsOrWorkImpact: false, sensitiveOrPersonalDataRisk: false };
      const result = runCalculationEngine(task04A, judgments, true);

      // Lavrisiko standardoppgave uten risikoflagg kan tillate automatisert beslutning
      expect(result.expectedAllowedRole).toBe('automatisert_beslutning');
    }
  });

  // 2. HR / Høyrisiko oppgave
  it('Scenario 2: HR / høyrisiko oppgave (HRR-02-B - Tilretteleggingsforslag)', () => {
    const case02 = allCases.find(c => c.caseId === 'HRR-02');
    expect(case02).toBeDefined();
    const task02B = case02?.aiUseTasks.find(t => t.taskId === 'HRR-02-B');
    expect(task02B).toBeDefined();

    if (task02B) {
      expect(task02B.directEffectOnPeople).toBe(true);
      expect(task02B.usesPersonalOrSensitiveData).toBe(true);
      expect(task02B.expectedRiskFlags.rightsOrSignificantImpact).toBe(true);
      expect(task02B.expectedRiskFlags.personalOrSensitiveData).toBe(true);

      const judgments = { ...INITIAL_VALUE_JUDGMENTS, rightsOrWorkImpact: true, sensitiveOrPersonalDataRisk: true };
      const result = runCalculationEngine(task02B, judgments, false);

      // Høyrisiko oppgave som berører helse og individ skal bremses av stoppregler og lande på utforskende støtte
      expect(result.expectedStopRules).toContain('SR-08');
      expect(result.expectedStopRules).toContain('SR-05'); // logg ufullstendig
      expect(result.expectedAllowedRole).toBe('utforskende_støtte');
    }
  });

  // 3. Offentlig rettighetscase
  it('Scenario 3: Offentlig rettighetscase (HRR-04-B - Rekruttering og rangering)', () => {
    const case04 = allCases.find(c => c.caseId === 'HRR-04');
    expect(case04).toBeDefined();
    const task04B = case04?.aiUseTasks.find(t => t.taskId === 'HRR-04-B');
    expect(task04B).toBeDefined();

    if (task04B) {
      expect(task04B.directEffectOnPeople).toBe(true);
      expect(task04B.expectedRiskFlags.rightsOrSignificantImpact).toBe(true);
      expect(task04B.expectedRiskFlags.discriminationRisk).toBe(true);

      const judgments = { ...INITIAL_VALUE_JUDGMENTS, rightsOrWorkImpact: true, valueConflictPresent: true };
      const result = runCalculationEngine(task04B, judgments, true);

      // Offentlig rekrutteringssak med fare for diskriminering trigger SR-01, SR-02 og SR-06
      expect(result.expectedStopRules).toContain('SR-01');
      expect(result.expectedStopRules).toContain('SR-02');
      expect(result.expectedStopRules).toContain('SR-06');
      expect(result.expectedAllowedRole).toBe('utforskende_støtte');
    }
  });

  // 4. Strategisk beslutning
  it('Scenario 4: Strategisk beslutning (HRR-03-A - Analysere aggregert bemanning)', () => {
    const case03 = allCases.find(c => c.caseId === 'HRR-03');
    expect(case03).toBeDefined();
    const task03A = case03?.aiUseTasks.find(t => t.taskId === 'HRR-03-A');
    expect(task03A).toBeDefined();

    if (task03A) {
      expect(task03A.directEffectOnPeople).toBe(false);
      expect(task03A.usesPersonalOrSensitiveData).toBe(false);
      expect(task03A.expectedRiskFlags.healthSafetyEnvironment).toBe(true);

      const judgments = { ...INITIAL_VALUE_JUDGMENTS, rightsOrWorkImpact: false, valueConflictPresent: true };
      const result = runCalculationEngine(task03A, judgments, true);

      // Strategiske scenario-analyser på gruppenivå (med fullført logg) kan godkjennes til forsterket skjønn (sparring)
      expect(result.expectedStopRules).not.toContain('SR-01'); // Ingen direkte effekt på enkeltpersoner
      expect(result.expectedAllowedRole).toBe('forsterket_skjønn');
    }
  });

  // 5. Sårbar kunde / sårbar part
  it('Scenario 5: Sårbar kunde / sårbar part (HRR-06-B - Frafallsrisiko lærling)', () => {
    const case06 = allCases.find(c => c.caseId === 'HRR-06');
    expect(case06).toBeDefined();
    const task06B = case06?.aiUseTasks.find(t => t.taskId === 'HRR-06-B');
    expect(task06B).toBeDefined();

    if (task06B) {
      expect(task06B.expectedRiskFlags.vulnerableParty).toBe(true);
      expect(task06B.expectedRiskFlags.personalOrSensitiveData).toBe(true);

      const judgments = { ...INITIAL_VALUE_JUDGMENTS, rightsOrWorkImpact: true, sensitiveOrPersonalDataRisk: true };
      const result = runCalculationEngine(task06B, judgments, true);

      // Sårbar part (lærling) med persondata bremser rollen kraftig
      expect(result.expectedStopRules).toContain('SR-08');
      expect(result.expectedAllowedRole).toBe('utforskende_støtte');
    }
  });

});
