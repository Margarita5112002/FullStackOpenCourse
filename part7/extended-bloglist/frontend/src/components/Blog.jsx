import { useDispatch, useSelector } from 'react-redux'
import { likeUpdateBlog, deleteUpdateBlog, useBlogById } from '../reducers/blogsReducer'
import { useNavigate, useParams } from 'react-router-dom'
import '../index.css'

const Blog = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const blogId = useParams().id
	const blog = useBlogById(blogId)
	const user = useSelector(state => state.user)

	if (!blog){
		return null
	}

	const onLike = async () => {
		dispatch(likeUpdateBlog(blog))
	}

	const onDelete = async () => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
			dispatch(deleteUpdateBlog(blog.id))
			navigate('/')
		}
	}

	const canDelete = () => {
		return user.id === blog.user.id
	}

	return (
		<div>
			<h1>{blog.title} by {blog.author}</h1>
			<p>url: {blog.url}</p>
			<p>likes: {blog.likes} <button onClick={onLike}>Like</button></p>
			<p>added by: {blog.user.name}</p>
			{canDelete() && <button onClick={onDelete}>Delete</button>}
		</div>
	)
}

export default Blog
