import { test, expect } from '@playwright/test'
import { AxeBuilder } from '@axe-core/playwright'

test.describe('HR Strategiradar: Accessibility (a11y) tests', () => {

  test('Step 1 should not have any automatically detectable accessibility issues', async ({ page }) => {
    // Navigate to the dashboard
    await page.goto('/')

    // Wait for the case select element to be visible
    await expect(page.locator('#case-select-dashboard')).toBeVisible()

    // Run the accessibility scanner
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    // Assert that there are no violations
    expect(accessibilityScanResults.violations).toEqual([])
  })

})
