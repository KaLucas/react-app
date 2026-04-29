/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>;
      logout(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', () => {
  cy.session(
    'user-session',
    () => {
      cy.visit('/admin');
      cy.window().then((win) => {
        win.localStorage.setItem('token', 'fake-token');
      });
    },
    {
      validate() {
        cy.wrap(localStorage.getItem('token')).should('eq', 'fake-token');
      },
    },
  );
});

Cypress.Commands.add('logout', () => {
  localStorage.removeItem('token');
});

export {};
