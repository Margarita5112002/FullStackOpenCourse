import { useRef, useState } from 'react'
import Togglable from './Togglable'
import { useDispatch } from 'react-redux'
import { createNewBlog } from '../reducers/blogsReducer'

const BlogForm = () => {
	const dispatch = useDispatch()
	const [title, setTitle] = useState('')
	const [url, setUrl] = useState('')
	const [author, setAuthor] = useState('')

	const togglableRef = useRef()

	const addBlog = async (e) => {
		e.preventDefault()
		console.log('create new blog ...')
		dispatch(createNewBlog({ title, url, author }))
	}

	return (
		<Togglable buttonLabel="Create new blog" ref={togglableRef}>
			<form onSubmit={addBlog}>
				<h1>Create new blog</h1>
				<label>
          title:
					<input
						id="title"
						placeholder="Enter the blog title"
						type="text"
						name="title"
						value={title}
						onChange={({ target }) => {
							setTitle(target.value)
						}}
					/>
				</label>
				<br />
				<label>
          author:
					<input
						id="author"
						placeholder="Enter the blog author"
						type="text"
						name="author"
						value={author}
						onChange={({ target }) => {
							setAuthor(target.value)
						}}
					/>
				</label>
				<br />
				<label>
          url:
					<input
						id="url"
						placeholder="Enter the blog url"
						type="text"
						name="url"
						value={url}
						onChange={({ target }) => {
							setUrl(target.value)
						}}
					/>
				</label>
				<br />
				<button id="create-blog-button" type="submit">
          Create
				</button>
			</form>
		</Togglable>
	)
}

export default BlogForm
