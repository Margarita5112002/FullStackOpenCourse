import { useDispatch } from 'react-redux'
import { commentUpdateBlog } from '../reducers/blogsReducer'

const CommentForm = ({ blog }) => {
	const dispatch = useDispatch()

	const onSubmit = (e) => {
		e.preventDefault()
		dispatch(commentUpdateBlog(blog, e.target.comment.value))
		e.target.comment.value = ''
	}
	return (
		<form onSubmit={onSubmit}>
			<input name="comment" />
			<button type="submit">add comment</button>
		</form>
	)
}

export default CommentForm