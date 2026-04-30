describe('Users Delete', () => {
  beforeEach(() => {
    cy.login();

    cy.intercept('GET', '**/collections/users/records*', {
      fixture: 'users-list.json',
    }).as('get-users-list');

    cy.visit('/admin/users-list');
    cy.wait('@get-users-list');
  });

  it('Should select user, open dialog, delete successfully and fetch updated list', () => {
    cy.intercept('DELETE', '**/collections/users/records/*', {}).as('get-users-delete');

    cy.intercept('GET', '**/collections/users/records*', {
      fixture: 'users-list-user-delete.json',
    }).as('get-users-list-user-delete');

    cy.get('div[role=rowgroup] > [data-rowindex=0] > [data-field=first_name]').should(
      'contain.text',
      'Novo',
    );

    cy.get('div[role=rowgroup] > [data-rowindex=0]').within(() => {
      cy.get('[data-test=delete-user]').click();
    });

    cy.get('form').within(() => {
      cy.get('.MuiAlert-message').should('contain.text', 'Deseja deletar o usuário Novo Usuário?');
      cy.get('button').contains('Confirmar').click();
    });

    cy.wait('@get-users-delete');

    cy.get('.MuiAlert-message').should('contain.text', 'Usuário deletado com sucesso.');

    cy.wait('@get-users-list-user-delete');

    cy.get('.MuiDialog-root').should('not.exist');

    cy.get('div[role=rowgroup] > [data-rowindex=0] > [data-field=first_name]').should(
      'contain.text',
      'Outro',
    );
  });

  it('Should select user, open dialog and get error when delete', () => {
    cy.intercept('DELETE', '**/collections/users/records/*', {
      statusCode: 500,
    }).as('get-users-delete');

    cy.get('div[role=rowgroup] > [data-rowindex=0]').within(() => {
      cy.get('[data-test=delete-user]').click();
    });

    cy.get('form').within(() => {
      cy.get('.MuiAlert-message').should('contain.text', 'Deseja deletar o usuário Novo Usuário?');
      cy.get('button').contains('Confirmar').click();
    });

    cy.wait('@get-users-delete');

    cy.get('.MuiAlert-message').should('contain.text', 'Erro ao deletar usuário.');
  });
});
