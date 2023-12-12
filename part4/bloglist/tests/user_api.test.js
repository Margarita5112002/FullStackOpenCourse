require('express-async-errors')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

describe('when there initially one user in db', () => {
	beforeEach(async () => {
		await User.deleteMany({})
		const passwordHash = await bcrypt.hash('secret', 10)
		const user = new User({ username: 'root', passwordHash })
		await user.save()
	})

	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'someone',
			name: 'David',
			password: 'securePass123'
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
		const usernames = usersAtEnd.map(x => x.username)
		expect(usernames).toContain(newUser.username)
	})
	afterAll(async () => {
		await mongoose.connection.close()
	})
})