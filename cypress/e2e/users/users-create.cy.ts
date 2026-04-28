describe('Users Create', () => {
  beforeEach(() => {
    cy.login();

    let getCall = 0;

    cy.intercept('GET', '**/collections/users/records*', (req) => {
      getCall++;

      if (getCall === 1) {
        req.reply({ fixture: 'users-list.json' });
      } else {
        req.reply({ fixture: 'users-list-user-created.json' });
      }
    }).as('get-users');

    cy.intercept('POST', '**/collections/users/records*', {
      body: {
        data: {
          first_name: 'New',
          last_name: 'User',
          email: 'email@email.com',
        },
      },
    }).as('create-user');

    cy.visit('/admin/users-list');
    cy.wait('@get-users');
  });

  it('Should create new user successfully and fetch updated list', () => {
    cy.get('[data-test=create-user]').click();

    cy.contains('h2', 'Cadastrar novo usuário');

    cy.get('form').within(() => {
      cy.get('[name=first_name]').type('New');
      cy.get('[name=last_name]').type('User');
      cy.get('[name=email]').type('email@email.com');
      cy.contains('button', 'Criar').click();
    });

    cy.wait('@create-user');

    cy.get('.MuiDialog-root').should('not.exist');
    cy.contains('.MuiAlert-message', 'Usuário criado com sucesso.');

    cy.wait('@get-users');
    cy.get('[role=rowgroup]')
      .find('[data-rowindex=0] [data-field=first_name]')
      .should('contain.text', 'New');
  });
  it('Should get error when creating new user', () => {
    cy.intercept('POST', '**/collections/users/records*', {
      statusCode: 500,
    }).as('create-user-error');

    cy.get('button[data-test=create-user]').click();

    cy.get('h2').should('contain.text', 'Cadastrar novo usuário');

    cy.get('form').within(() => {
      cy.get('input[name=first_name]').type('New');
      cy.get('input[name=last_name]').type('User');
      cy.get('input[name=email]').type('email@email.com');
      cy.get('button').contains('Criar').click();
    });

    cy.wait('@create-user-error');

    cy.get('.MuiAlert-message').should('contain.text', 'Erro ao criar novo usuário.');
  });
});
