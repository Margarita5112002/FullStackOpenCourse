import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import './index.css'
import Notification from './components/Notification'
import { createNewBlog, deleteUpdateBlog, initializeBlogs, likeUpdateBlog } from './reducers/blogsReducer'
import { initializeUser, loginUser, logoutUser } from './reducers/userReducer'

const App = () => {
	const message = useSelector((state) => state.notification)
	const blogs = useSelector((state) => state.blogs)
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	useEffect(() => {
		dispatch(initializeBlogs())
	}, [dispatch])

	useEffect(() => {
		dispatch(initializeUser())
	}, [dispatch])

	const handleLogin = async (event) => {
		event.preventDefault()
		console.log('logging ... ')
		dispatch(loginUser(username, password))
	}

	const loginForm = () => (
		<div>
			<h2>Log in to application</h2>
			<form onSubmit={handleLogin}>
				<label>
          Username:{' '}
					<input
						type="text"
						id="username"
						value={username}
						onChange={({ target }) => setUsername(target.value)}
						name="username"
					/>
				</label>
				<br />
				<label>
          Password:{' '}
					<input
						type="password"
						id="password"
						value={password}
						onChange={({ target }) => setPassword(target.value)}
						name="password"
					/>
				</label>
				<br />
				<button type="submit">Login</button>
			</form>
		</div>
	)

	const logOut = () => {
		dispatch(logoutUser())
	}

	const createBlog = async ({ title, url, author }) => {
		dispatch(createNewBlog({ title, url, author }))
	}

	const likeBlog = async (blog) => {
		dispatch(likeUpdateBlog(blog))
	}

	const deleteBlog = async (blog) => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
			dispatch(deleteUpdateBlog(blog.id))
		}
	}

	return (
		<>
			{message !== null && <Notification message={message} />}
			{user === null && loginForm()}
			{user !== null && (
				<>
					<h2>blogs</h2>
					<p>{user.name} logged in</p>
					<button onClick={logOut}>Log out</button>
					<BlogForm createBlog={createBlog} />
					{blogs.map((blog) => (
						<Blog
							key={blog.id}
							blog={blog}
							likeBlog={likeBlog}
							canDelete={user.username === blog.user.username}
							deleteBlog={deleteBlog}
						/>
					))}
				</>
			)}
		</>
	)
}

export default App
