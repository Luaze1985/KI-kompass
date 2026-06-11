import { type Page, expect } from '@playwright/test'

/**
 * Naviger til et gitt steg i KI-Radar. Tar hensyn til progresjonsvalideringen:
 * - Steg 2→3 krever at alle stoppregler er huket av.
 * - Steg 3→4 krever at minst ett risikoscenario er fylt ut.
 */
export async function gotoStep(page: Page, target: 2 | 3 | 4) {
  await page.goto('/')
  await expect(page.locator('#case-select-dashboard')).toBeVisible()

  // Steg 1 → 2
  await page.getByLabel('Velg fagområde:').selectOption({ label: 'Seniorbevaring i hjemmetjenesten' })
  await page.getByRole('button', { name: 'Stemmer — gå videre →' }).click()

  // Steg 2: blindtest
  await page.getByRole('button', { name: 'KI som idégiver (Lav risiko)' }).click()
  if (target === 2) return

  // Steg 2 → 3: hak av alle stoppregler
  const checkboxes = await page.getByRole('checkbox').all()
  for (const cb of checkboxes) await cb.check()
  await page.getByRole('button', { name: 'Gå til risikovurdering →' }).click()
  if (target === 3) return

  // Steg 3 → 4: fyll minst ett scenario
  await page.getByLabel('Hva kan gå galt?').first().fill('KI gir misvisende prioritering av ansatte.')
  await page.getByRole('button', { name: 'Gå til beslutningsnotat →' }).click()
}
