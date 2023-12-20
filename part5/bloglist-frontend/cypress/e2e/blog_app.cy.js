describe('Blog app', function() {
	beforeEach(function() {
		cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
		cy.createNewUser('user123', 'Rob', '12345')
		cy.visit('')
	})

	it('Login form is shown', function() {
		cy.contains('Log in to application')
		cy.contains('Username').get('input')
		cy.contains('Password').get('input')
		cy.contains('Login')
	})

	describe('Login', function(){
		it('succeeds with correct credentials', function(){
			cy.get('#username').type('user123')
			cy.get('#password').type('12345')
			cy.contains('Login').click()
			cy.contains('Rob logged in')
		})
		it('login fails with wrong password', function(){
			cy.get('#username').type('user123')
			cy.get('#password').type('wrong')
			cy.contains('Login').click()
			cy.contains('invalid username or password')
		})
	})

})