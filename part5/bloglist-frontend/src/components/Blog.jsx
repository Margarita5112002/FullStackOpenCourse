import { useState } from "react"
import '../index.css'

const Blog = ({ blog }) => {
	const [visible, setVisible] = useState(false)

	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}
	
	return (
		<div className="blog">
			{blog.title} {blog.author}
			<button onClick={toggleVisibility}>{visible?'Hide':'View'}</button>
			<div style={showWhenVisible}>
				<p>url: {blog.url}</p>
				<p>likes: {blog.likes}</p>
				<p>added by: {blog.user.name}</p>
			</div>
		</div>
	)
}

export default Blog