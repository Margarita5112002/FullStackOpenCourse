require('express-async-errors')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
	await Blog.deleteMany({})
	for(let blog of helper.initialBlogs){
		let blogObject = new Blog(blog)
		await blogObject.save()
	}
})

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog posts have id property', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body[0].id).toBeDefined()
})

test('a valid blog post can be added', async () => {
	const newBlog = {
		title: 'Example of blog',
		author: 'Tom',
		url: 'http://www.blog1.com',
		likes: 30
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const response = await api.get('/api/blogs')

	const titles = response.body.map(r => r.title)
	const authors = response.body.map(r => r.author)
	const urls = response.body.map(r => r.url)
	const likes = response.body.map(r => r.likes)

	expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
	expect(titles).toContain(newBlog['title'])
	expect(authors).toContain(newBlog['author'])
	expect(urls).toContain(newBlog['url'])
	expect(likes).toContain(newBlog['likes'])
})

afterAll(async () => {
	await mongoose.connection.close()
})