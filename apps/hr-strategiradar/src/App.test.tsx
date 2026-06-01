import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the KI-Radar heading', () => {
    render(<App />)
    expect(screen.getByText('KI-Radar')).toBeTruthy()
    expect(screen.getByText('Arbeidsflate for prosjektgruppen')).toBeTruthy()
  })
})
