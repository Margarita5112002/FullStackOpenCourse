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

blogRouter.delete('/:id', async (request, response) => {
	const res = await Blog.findByIdAndDelete(request.params.id)
	if (res) {
		return response.status(204).end()
	}
	response.status(404).end()
})

module.exports = blogRouter