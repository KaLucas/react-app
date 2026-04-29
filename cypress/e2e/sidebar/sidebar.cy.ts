describe('Sidebar', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/admin/users-list');
  });

  it('Should display sidebar data', () => {
    cy.get('[data-test=sidebar]').should('be.visible');

    cy.get('[data-test=user-summary-card]').should('be.visible');
    cy.get('[data-test=logout-button]').should('exist');
  });

  it('Should logout', () => {
    cy.get('[data-test=sidebar]').should('be.visible');

    cy.get('[data-test=logout-button]').should('exist').click();
    cy.url().should('include', '/admin');
  });
});
