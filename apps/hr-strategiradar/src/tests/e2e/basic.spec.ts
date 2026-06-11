import { test, expect } from '@playwright/test'

test.describe('HR Strategiradar: Basic E2E Test', () => {

  test('loads the dashboard and locks a maker-checked assessment', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('heading', { name: 'KI-Radar', exact: true })).toBeVisible()
    await expect(page.getByText('Arbeidsflate for prosjektgruppen')).toBeVisible()

    // Step 1: Select a case from the dropdown (label: "Velg fagområde:")
    await page.getByLabel('Velg fagområde:').selectOption({ label: 'Seniorbevaring i hjemmetjenesten' })

    // Step 1 -> Step 2
    await page.getByRole('button', { name: 'Stemmer — gå videre →' }).click()

    // In Step 2: Answer the Blindtest first
    await page.getByRole('button', { name: 'KI som idégiver (Lav risiko)' }).click()

    // Progresjonsvalidering: alle stoppregler må diskuteres før man kan gå videre
    await expect(page.getByRole('button', { name: 'Gå til risikovurdering →' })).toBeDisabled()
    for (const cb of await page.getByRole('checkbox').all()) await cb.check()

    // Step 2 -> Step 3
    await page.getByRole('button', { name: 'Gå til risikovurdering →' }).click()

    // In Step 3: Fill in reflection toggles (aria-label format: "{label} {value}")
    await page.getByRole('button', { name: 'Påvirker ansattes rettigheter? Nei' }).click()
    await page.getByRole('button', { name: 'Brukes personlige eller sensitive opplysninger? Nei' }).click()
    await page.getByRole('button', { name: 'Må du kjenne lokale forhold? Nei' }).click()
    await page.getByRole('button', { name: 'Kan feil rettes opp? Ja' }).click()

    // Progresjonsvalidering: minst ett scenario må fylles ut før man kan gå videre
    await expect(page.getByRole('button', { name: 'Gå til beslutningsnotat →' })).toBeDisabled()
    await page.getByLabel('Hva kan gå galt?').first().fill('KI gir misvisende prioritering av ansatte.')

    // Step 3 -> Step 4
    await page.getByRole('button', { name: 'Gå til beslutningsnotat →' }).click()

    // In Step 4: Verify decision log, sign and lock
    await expect(page.getByRole('heading', { name: 'Foreløpig beslutningsnotat' })).toBeVisible()

    await page.getByRole('button', { name: 'Fyll inn automatisk' }).click()

    // Sign: checkbox wrapped in label with text "Signer at notatet er gjennomgått"
    await expect(page.getByRole('checkbox', { name: 'Signer at notatet er gjennomgått' })).toBeEnabled()
    await page.getByRole('checkbox', { name: 'Signer at notatet er gjennomgått' }).check()

    // Kollega: input with htmlFor="maker-name" / label "Kollega som har lest notatet"
    await page.getByLabel('Kollega som har lest notatet').fill('Kari Kontroll')

    // Lock: checkbox wrapped in label with text "Lås vurderingen"
    await page.getByRole('checkbox', { name: 'Lås vurderingen' }).check()

    await expect(page.getByRole('button', { name: 'Fyll inn automatisk' })).toBeDisabled()
    await expect(page.getByRole('button', { name: '1. Beskriv saken' })).toBeDisabled()
  })

})
