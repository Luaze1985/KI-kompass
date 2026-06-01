import { test, expect } from '@playwright/test'

test.describe('HR Strategiradar: Basic E2E Test', () => {

  test('loads the dashboard and locks a maker-checked assessment', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('heading', { name: 'KI-Radar', exact: true })).toBeVisible()
    await expect(page.getByText('Arbeidsflate for prosjektgruppen')).toBeVisible()

    await page.getByLabel('Fagfelt vi har grunnlag for å vurdere').selectOption({ label: 'Seniorbevaring i hjemmetjenesten' })

    // Step 1 -> Step 2
    await page.getByRole('button', { name: 'Bekreft antakelser og generer diagnose' }).click()

    // In Step 2: Answer the Blindtest first
    await page.getByRole('button', { name: 'KI som sparringspartner (Lavest risiko)' }).click()

    // Step 2 -> Step 3
    await page.getByRole('button', { name: 'Gå til scenariotenking' }).click()

    // In Step 3: Fill in reflection toggles
    await page.getByRole('button', { name: 'Involverer rettigheter? Nei' }).click()
    await page.getByRole('button', { name: 'Sensitive opplysninger? Nei' }).click()
    await page.getByRole('button', { name: 'Krever lokalkunnskap? Nei' }).click()
    await page.getByRole('button', { name: 'Kan feil rettes opp? Ja' }).click()

    // Step 3 -> Step 4
    await page.getByRole('button', { name: 'Gå til beslutningsnotat' }).click()

    // In Step 4: Verify decision log, sign and lock
    await expect(page.getByRole('heading', { name: 'Foreløpig beslutningsnotat' })).toBeVisible()

    await page.getByRole('button', { name: 'Autofyll' }).click()

    await expect(page.getByLabel('Signer gjennomgått foreløpig notat')).toBeEnabled()
    await page.getByLabel('Signer gjennomgått foreløpig notat').check()
    await page.getByLabel('Makker som har lest notatet').fill('Kari Kontroll')
    await page.getByLabel('Lås vurderingen i denne økten').check()

    await expect(page.getByRole('button', { name: 'Autofyll' })).toBeDisabled()
    await expect(page.getByRole('button', { name: '1. Beskriv saken' })).toBeDisabled()
  })

})
