/// <reference types="cypress" />
// install the cypress-cdp plugin

it('shows locale and timezone', () => {
  // set the timezone to Berlin
  // set the locale to "de_DE"
  cy.visit('index.html')
  // confirm the output element
  // shows the emulated timezone and locale
  // https://on.cypress.io/contains
  //
  // reset the timezone
  // and reload the page
  // https://on.cypress.io/reload
  // confirm the page still shows the emulated locale
  // but no longer shows the Berlin timezone
  // (unless you ARE in Berlin timezone)
})
