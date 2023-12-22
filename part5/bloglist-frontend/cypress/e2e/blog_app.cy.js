describe('Blog app', function () {
	beforeEach(function () {
		cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
		cy.createNewUser({
			username: 'user123',
			name: 'Rob',
			password: '12345'
		})
		cy.visit('')
	})

	it('Login form is shown', function () {
		cy.contains('Log in to application')
		cy.contains('Username').get('input')
		cy.contains('Password').get('input')
		cy.contains('Login')
	})

	describe('Login', function () {
		it('succeeds with correct credentials', function () {
			cy.get('#username').type('user123')
			cy.get('#password').type('12345')
			cy.contains('Login').click()
			cy.contains('Rob logged in')
		})
		it('login fails with wrong password', function () {
			cy.get('#username').type('user123')
			cy.get('#password').type('wrong')
			cy.contains('Login').click()
			cy.contains('invalid username or password')
		})
	})

	describe('When logged in', function () {
		beforeEach(function () {
			cy.login({
				username: 'user123',
				password: '12345'
			})
			cy.visit('')
		})

		it('A blog can be created', function () {
			cy.contains('Create new blog').click()
			cy.get('#title').type('New Blog Title')
			cy.get('#url').type('www.a.com')
			cy.get('#author').type('David')
			cy.get('#create-blog-button').click()
			cy.get('.blog')
				.should('contain', 'New Blog Title')
				.should('contain', 'David')
			cy.get('.blog').contains('View').click()
			cy.get('.blog')
				.should('contain', 'www.a.com')
				.should('contain', 'Rob')
		})

		describe('and a blog exist', function (){
			beforeEach(function (){
				cy.createBlog({
					title: 'An existing blog',
					url: 'www.abc.com',
					author: 'Tom'
				})
			})

			it('can like a blog', function(){
				cy.contains('View').click()
				cy.contains('Like').click()
				cy.get('.blog').contains('likes: 1')
			})

			it('can delete a blog if logged user created it', function(){
				cy.contains('An existing blog').contains('View').click()
				cy.contains('Delete').click()
				cy.should('not.contain', 'An existing blog')
			})

			it('can not delete a blog if logged user did not created it', function(){
				cy.createNewUser({
					username: 'newuser123',
					password: '54321',
					name: 'Carla'
				})
				cy.login({
					username: 'newuser123',
					password: '54321'
				})
				cy.contains('An existing blog').contains('View').click()
				cy.contains('An existing blog').should('not.contain', 'Delete')
			})
		})

	})

})