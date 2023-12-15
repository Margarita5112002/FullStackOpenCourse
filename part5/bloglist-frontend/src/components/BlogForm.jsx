import PropTypes from 'prop-types'
import { useRef, useState } from 'react'
import Togglable from './Togglable'

const BlogForm = ({ createBlog }) => {
	const [title, setTitle] = useState('')
	const [url, setUrl] = useState('')
	const [author, setAuthor] = useState('')

	const togglableRef = useRef()

	const addBlog = async (e) => {
		e.preventDefault()
		console.log('create new blog ...')
		const success = await createBlog({
			title,
			url,
			author
		})
		if (success) {
			setTitle('')
			setAuthor('')
			setUrl('')
		}
	}

	return (
		<Togglable buttonLabel='Create new blog' ref={togglableRef}>
			<form onSubmit={addBlog}>
				<h1>Create new blog</h1>
				<label>
					title:
					<input
						type='text'
						name='title'
						value={title}
						onChange={({ target }) => { setTitle(target.value) }} />
				</label><br />
				<label>
					author:
					<input
						type='text'
						name='author'
						value={author}
						onChange={({ target }) => { setAuthor(target.value) }} />
				</label><br />
				<label>
					url:
					<input
						type='text'
						name='url'
						value={url}
						onChange={({ target }) => { setUrl(target.value) }} />
				</label><br />
				<button type='submit'>Create</button>
			</form>
		</Togglable>
	)
}

BlogForm.propTypes = {
	createBlog: PropTypes.func.isRequired
}

export default BlogForm