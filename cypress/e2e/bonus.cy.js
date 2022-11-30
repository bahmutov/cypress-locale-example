/// <reference types="cypress" />

it('shows locale and timezone', () => {
  cy.visit('index.html', {
    onBeforeLoad(win) {
      // stub the application's "window" browser API method
      cy.stub(win.Intl.DateTimeFormat.prototype, 'resolvedOptions')
        .callsFake(function () {
          // get the majority of options using the real method
          const realOptions =
            win.Intl.DateTimeFormat.prototype.resolvedOptions.wrappedMethod.call(
              this,
            )
          // but overwrite the "locale" and the "timeZone" properties
          return {
            ...realOptions,
            locale: 'de-DE',
            timeZone: 'Europe/Berlin',
          }
        })
        .as('resolvedOptions')
    },
  })
  // confirm the stub was called
  cy.get('@resolvedOptions').should('have.been.calledOnce')
  // and that it worked
  cy.contains('locale: de-DE').should('include.text', 'Berlin')

  // clear any current override
  cy.get('@resolvedOptions').invoke('restore')
  cy.reload()
  // assuming we are not testing in Germany...
  cy.get('#output')
    .should('not.include.text', 'locale: de-DE')
    .should('not.include.text', 'Berlin')
})
