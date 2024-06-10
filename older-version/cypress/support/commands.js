// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("isNotActionable", function(selector, done) {
    cy.get(selector).click({ force: true })
    cy.once('fail', (err) => {
      expect(err.message).to.include('cy.click() failed because this element');
      expect(err.message).to.include('is being covered by another element');
      done();
    });
    cy.get("#button-covered-in-span").click().then(x => {
      done(new Error('Expected element NOT to be clickable, but click() succeeded'));
    })
  })
