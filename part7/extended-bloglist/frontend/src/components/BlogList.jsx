import { useSelector, useDispatch } from 'react-redux'
import { likeUpdateBlog, deleteUpdateBlog } from '../reducers/blogsReducer'
import Blog from './Blog'

const BlogList = () => {
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user)
	const blogs = useSelector((state) => state.blogs)

	const likeBlog = async (blog) => {
		dispatch(likeUpdateBlog(blog))
	}

	const deleteBlog = async (blog) => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
			dispatch(deleteUpdateBlog(blog.id))
		}
	}

	return blogs.map((blog) => (
		<Blog
			key={blog.id}
			blog={blog}
			likeBlog={likeBlog}
			canDelete={user.username === blog.user.username}
			deleteBlog={deleteBlog}
		/>
	))
}

export default BlogList
