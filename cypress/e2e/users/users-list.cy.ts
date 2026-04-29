describe('Users List', () => {
  beforeEach(() => {
    cy.login();

    cy.intercept('GET', '**/collections/users/records*', {
      fixture: 'users-list.json',
    }).as('get-users-list');

    cy.visit('/admin/users-list');
    cy.wait('@get-users-list');
  });

  it('Should list users', () => {
    cy.get('[data-test=users-list-result] > .MuiDataGrid-root').should(
      'have.length.greaterThan',
      0,
    );
    cy.get('div[role=rowgroup] > [data-rowindex=0] > [data-field=first_name]').should(
      'contain.text',
      'Novo',
    );
    cy.get('div[role=rowgroup] > [data-rowindex=0] > [data-field=last_name]').should(
      'contain.text',
      'Usuário',
    );
    cy.get('div[role=rowgroup] > [data-rowindex=0] > [data-field=email]').should(
      'contain.text',
      'novo@email.com',
    );
  });

  it('Should change to page 2 and list users', () => {
    cy.intercept('GET', '**/collections/users/records*', {
      fixture: 'users-list-page-2.json',
    }).as('get-users-list2');

    cy.get('[data-test=users-list-result] > .MuiDataGrid-root').should(
      'have.length.greaterThan',
      0,
    );
    cy.get('button[title="Ir para a próxima página"]').click();

    cy.wait('@get-users-list2');

    cy.get('div[role=rowgroup] > [data-rowindex=0] > [data-field=first_name]').should(
      'contain.text',
      'Dawn',
    );
    cy.get('div[role=rowgroup] > [data-rowindex=0] > [data-field=last_name]').should(
      'contain.text',
      'Summers',
    );
    cy.get('div[role=rowgroup] > [data-rowindex=0] > [data-field=email]').should(
      'contain.text',
      'dawn.summers@sunnydale.com',
    );
  });
});
