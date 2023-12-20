/* eslint-disable linebreak-style */
Cypress.Commands.add('createNewUser', (username, name, password) => {
	cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
		username,
		name,
		password
	})
})