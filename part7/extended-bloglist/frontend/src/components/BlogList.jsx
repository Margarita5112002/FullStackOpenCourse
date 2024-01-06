import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
	const blogs = useSelector((state) => state.blogs)

	return blogs.map((blog) => (
		<div className='blog' key={blog.id}>
			<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
		</div>
	))
}

export default BlogList
