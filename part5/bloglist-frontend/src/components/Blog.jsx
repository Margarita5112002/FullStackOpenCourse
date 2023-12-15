import { useState } from "react"
import '../index.css'

const Blog = ({ blog, likeBlog }) => {
	const [visible, setVisible] = useState(false)

	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}
	
	const onLike = async () => {
		await likeBlog(blog)
	}

	return (
		<div className="blog">
			{blog.title} {blog.author}
			<button onClick={toggleVisibility}>{visible?'Hide':'View'}</button>
			<div style={showWhenVisible}>
				<p>url: {blog.url}</p>
				<p>likes: {blog.likes}<button onClick={onLike}>Like</button></p>
				<p>added by: {blog.user.name}</p>
			</div>
		</div>
	)
}

export default Blog