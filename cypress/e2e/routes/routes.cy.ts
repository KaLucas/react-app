describe('Routes', () => {
  context('Private Routes', () => {
    it('Should redirect to home if not logged in', () => {
      cy.logout();
      cy.visit('/admin/users-list');

      cy.url().should('include', '/admin');
      cy.get('form').should('be.visible');
    });

    it('Should allow access if logged in', () => {
      cy.login();
      cy.visit('/admin/users-list');

      cy.get('h2').contains('Lista de Usuários').should('be.visible');
    });
  });

  context('Public Routes', () => {
    it.only('Should navigate to public users list from login page', () => {
      cy.visit('/admin');

      cy.get('[data-test=redirect-button-list]').click();

      cy.url().should('include', '/');
      cy.get('h6').contains('Usuários cadastrados').should('be.visible');
      cy.get('.MuiContainer-root').should('exist');
    });

    it('Should navigate to admin from public page', () => {
      cy.visit('/');

      cy.get('[data-test=redirect-button-admin]').click();

      cy.url().should('include', '/admin');
      cy.get('form').should('be.visible');
    });
  });
});
