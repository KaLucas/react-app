describe('Users sync with sidebar', () => {
  beforeEach(() => {
    cy.login();

    cy.intercept('GET', '**/collections/users/records*', {
      fixture: 'users-list.json',
    }).as('get-users');

    cy.visit('/admin/users-list');
    cy.wait('@get-users');
  });

  it('Should update sidebar count after creating user', () => {
    cy.intercept('POST', '**/collections/users/records*', {
      body: {
        data: {
          first_name: 'New',
          last_name: 'User',
          email: 'email@email.com',
        },
      },
    }).as('create-user');

    cy.intercept('GET', '**/collections/users/records*', {
      fixture: 'users-list-user-created.json',
    }).as('get-users-created');

    cy.get('[data-test=sidebar-count]').should('contain.text', '11');

    cy.get('[data-test=create-user]').click();

    cy.get('form').within(() => {
      cy.get('input[name=first_name]').type('New');
      cy.get('input[name=last_name]').type('User');
      cy.get('input[name=email]').type('email@email.com');
      cy.contains('Criar').click();
    });

    cy.wait('@create-user');
    cy.wait('@get-users-created');

    cy.get('[data-test=sidebar-count]').should('contain.text', '12');
  });

  it('Should update sidebar count after deleting user', () => {
    cy.intercept('DELETE', '**/collections/users/records/*', {}).as('get-users-delete');

    cy.intercept('GET', '**/collections/users/records*', {
      fixture: 'users-list-user-delete.json',
    }).as('get-users-created');

    cy.get('div[role=rowgroup] > [data-rowindex=0]').within(() => {
      cy.get('[data-test=delete-user]').click();
    });

    cy.get('form').within(() => {
      cy.get('.MuiAlert-message').should('contain.text', 'Deseja deletar o usuário Novo Usuário?');
      cy.get('button').contains('Confirmar').click();
    });

    cy.wait('@get-users-delete');

    cy.get('[data-test=sidebar-count]').should('contain.text', '10');
  });
});
