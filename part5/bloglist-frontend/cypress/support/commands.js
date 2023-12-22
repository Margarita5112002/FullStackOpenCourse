/* eslint-disable linebreak-style */
Cypress.Commands.add('createNewUser', ({ username, name, password }) => {
	cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
		username,
		name,
		password
	})
})

Cypress.Commands.add('login', ({ username, password }) => {
	cy.request('POST', 'http://localhost:3003/api/login', {
		username, password
	}).then(({ body }) => {
		localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
		cy.visit('http://localhost:5173')
	})
})