import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Rydd opp i DOM-en etter hver test så render() ikke akkumulerer på tvers av tester
afterEach(() => {
  cleanup()
})
