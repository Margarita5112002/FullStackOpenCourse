const Blog = require('../models/blog')

const initialBlogs = [
	{
		title: 'Type wars',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		likes: 2
	},
	{
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 12
	}
]

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

const nonExistingId = async () => {
	const blog = new Blog({
		title: 'delete soon',
		author: 'n',
		url: 'www.a.com',
		likes: 20
	})
	await blog.save()
	await blog.deleteOne()
	return blog._id.toString()
}

module.exports = {
	blogsInDb,
	initialBlogs,
	nonExistingId
}