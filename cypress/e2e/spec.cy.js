/// <reference types="cypress" />
import 'cypress-cdp'

// this test works really nice in Chrome Canary v110
// and sometimes fails in Electron v106
it('shows locale and timezone', { browser: 'Chrome' }, () => {
  cy.CDP('Emulation.setLocaleOverride', { locale: 'de_DE' })
  cy.CDP('Emulation.setTimezoneOverride', { timezoneId: 'Europe/Berlin' })
  cy.visit('index.html')
  cy.contains('locale: de-DE').should('include.text', 'Berlin')

  // clear any current override
  cy.CDP('Emulation.setTimezoneOverride', { timezoneId: '' })
  cy.reload()
  cy.contains('locale: de-DE').should('not.include.text', 'Berlin')
})
