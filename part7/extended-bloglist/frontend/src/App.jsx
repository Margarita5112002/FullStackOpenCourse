import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import './index.css'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import { notify } from './reducers/notificationReducer'
import { createNewBlog, deleteUpdateBlog, initializeBlogs, likeUpdateBlog } from './reducers/blogsReducer'

const App = () => {
	const message = useSelector((state) => state.notification)
	const blogs = useSelector((state) => state.blogs)
	const dispatch = useDispatch()
	const [user, setUser] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	useEffect(() => {
		dispatch(initializeBlogs())
	}, [dispatch])

	useEffect(() => {
		const loggedUser = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUser) {
			const parseLoggedUser = JSON.parse(loggedUser)
			setUser(parseLoggedUser)
			blogService.setToken(parseLoggedUser.token)
		}
	}, [])

	const setMessage = (msg, disappearIn, err) => {
		dispatch(notify(msg, err, disappearIn))
	}

	const setErrorMessage = (msg, disappearIn = 0) => {
		setMessage(msg, disappearIn, true)
	}

	const setSuccessMessage = (msg, disappearIn = 0) => {
		setMessage(msg, disappearIn, false)
	}

	const handleLogin = async (event) => {
		event.preventDefault()
		console.log('logging ... ')
		try {
			const user = await loginService.login({
				username,
				password,
			})
			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
			setSuccessMessage(`Log in ${user.name}`, 5)
		} catch (exception) {
			setErrorMessage(exception.response.data.error, 5)
		}
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
		window.localStorage.clear()
		setUser(null)
		blogService.setToken('')
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
