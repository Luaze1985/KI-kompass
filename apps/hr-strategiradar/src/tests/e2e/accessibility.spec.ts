import { test, expect, type Page } from '@playwright/test'
import { AxeBuilder } from '@axe-core/playwright'
import { gotoStep } from './helpers'

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']

// Alle WCAG 2.1 AA-regler håndheves, inkludert fargekontrast (4.5:1).
const EXCLUDED_RULES: string[] = []

// La CSS-overganger (transition: all 0.1s på knapper) fullføre før skann,
// slik at axe måler den ferdig-rendrede tilstanden – ikke en overgangsramme.
async function scan(page: Page) {
  await page.waitForTimeout(300)
  return new AxeBuilder({ page }).withTags(WCAG_TAGS).disableRules(EXCLUDED_RULES).analyze()
}

test.describe('HR Strategiradar: Accessibility (a11y) tests', () => {

  test('Step 1 should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('#case-select-dashboard')).toBeVisible()

    const results = await scan(page)
    expect(results.violations).toEqual([])
  })

  test('Step 2 (foreløpig diagnose) should not have a11y violations', async ({ page }) => {
    await gotoStep(page, 2)
    await expect(page.getByRole('heading', { name: 'Steg 2: Foreløpig vurdering' })).toBeVisible()

    const results = await scan(page)
    expect(results.violations).toEqual([])
  })

  test('Step 3 (risikovurdering) should not have a11y violations', async ({ page }) => {
    await gotoStep(page, 3)
    await expect(page.getByRole('heading', { name: 'Tenk gjennom risiko' })).toBeVisible()
    // Fyll et scenario så «Gå videre»-knappen er aktiv (representativ utfylt tilstand)
    await page.getByLabel('Hva kan gå galt?').first().fill('KI gir misvisende prioritering av ansatte.')

    const results = await scan(page)
    expect(results.violations).toEqual([])
  })

  test('Step 4 (beslutningsnotat) should not have a11y violations', async ({ page }) => {
    await gotoStep(page, 4)
    await expect(page.getByRole('heading', { name: 'Foreløpig beslutningsnotat' })).toBeVisible()

    const results = await scan(page)
    expect(results.violations).toEqual([])
  })

})
