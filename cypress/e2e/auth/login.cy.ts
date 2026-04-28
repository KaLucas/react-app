describe('Login', () => {
  it('Should login successfully', () => {
    cy.visit('/admin');

    cy.get('[data-test=email]').type('admin@email.com');
    cy.get('[data-test=password]').type('123456');
    cy.get('[data-test=login-button]').click();

    cy.url().should('include', '/admin/users-list');
    cy.get('h2').contains('Lista de Usuários').should('be.visible');
  });

  it('Should show error on invalid login', () => {
    cy.visit('/admin');

    cy.get('[data-test=email]').type('teste@email.com');
    cy.get('[data-test=password]').type('2345');
    cy.get('[data-test=login-button]').click();

    cy.get('.MuiSnackbar-root').contains('E-mail ou senha inválidos.').should('be.visible');
  });
});
