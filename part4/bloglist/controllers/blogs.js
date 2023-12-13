const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
		.populate('user', { username: 1, name: 1 })
	response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
	const body = request.body

	const user = await User.findById(body.userId)

	const newBlog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes === undefined ? 0 : body.likes,
		user: user.id
	}

	const blog = new Blog(newBlog)
	const result = await blog.save()
	user.blogs = user.blogs.concat(result._id)
	await user.save()
	response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
	const res = await Blog.findByIdAndDelete(request.params.id)
	if (res) {
		return response.status(204).end()
	}
	response.status(404).end()
})

blogRouter.put('/:id', async (request, response) => {
	const blog = { ... request.body }
	const blogUpdated = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
	if (blogUpdated){
		return response.status(200).json(blogUpdated)
	}
	response.status(404).end()
})

module.exports = blogRouter