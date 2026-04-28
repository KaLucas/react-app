describe('Users Edit', () => {
  beforeEach(() => {
    cy.login();

    cy.intercept('GET', '**/collections/users/records*', {
      fixture: 'users-list.json',
    }).as('get-users-list');

    cy.visit('/admin/users-list');
    cy.wait('@get-users-list');
  });

  it('Should select user, open dialog, edit successfully and fetch updated list', () => {
    cy.intercept('PUT', '**/collections/users/records/*', {
      fixture: 'users-edit.json',
    }).as('get-users-edit');

    cy.intercept('GET', '**/collections/users/records*', {
      fixture: 'users-list-user-updated.json',
    }).as('get-users-list-updated');

    cy.get('div[role=rowgroup] > [data-rowindex=0]').within(() => {
      cy.get('[data-test=edit-user]').click();
    });

    cy.get('h2').should('contain.text', 'Editar usuário');

    cy.get('form').within(() => {
      cy.get('input[name=first_name]').type('{backspace}a');
      cy.get('button').contains('Salvar').click();
    });

    cy.wait('@get-users-edit');

    cy.get('.MuiDialog-root').should('not.exist');

    cy.get('.MuiAlert-message').should('contain.text', 'Usuário salvo com sucesso.');

    cy.wait('@get-users-list-updated');

    cy.get('div[role=rowgroup] > [data-rowindex=0] > [data-field=first_name]').should(
      'contain.text',
      'Nova',
    );
  });

  it('Should select user, open dialog, edit and get error', () => {
    cy.intercept('PUT', '**/collections/users/records/*', {
      statusCode: 500,
    }).as('get-users-edit');

    cy.get('div[role=rowgroup] > [data-rowindex=0]').within(() => {
      cy.get('[data-test=edit-user]').click();
    });

    cy.get('form').within(() => {
      cy.get('input[name=first_name]').type('{backspace}a');
      cy.get('button').contains('Salvar').click();
    });

    cy.wait('@get-users-edit');

    cy.get('.MuiAlert-message').should('contain.text', 'Erro ao salvar usuário.');
  });
});
