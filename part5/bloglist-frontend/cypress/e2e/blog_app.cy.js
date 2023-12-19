describe('Blog app', function() {
	beforeEach(function() {
		cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
		cy.visit('')
	})

	it('Login form is shown', function() {
		cy.contains('Log in to application')
		cy.contains('Username').get('input')
		cy.contains('Password').get('input')
		cy.contains('Login')
	})
})