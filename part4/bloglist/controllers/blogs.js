const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
	const newBlog = { ... request.body }
	if (!newBlog.likes){
		newBlog.likes = 0
	}
	const blog = new Blog(newBlog)
	const result = await blog.save()
	response.status(201).json(result)
})

module.exports = blogRouter