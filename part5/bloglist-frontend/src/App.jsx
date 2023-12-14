import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import './index.css'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ message }) => {
	if (message.error) {
		return <div className='error'>{message.message}</div>
	}
	return <div className='notification'>{message.message}</div>
}

const App = () => {
	const [message, setMessage] = useState(null)
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs(blogs)
		)
	}, [])

	const setErrorMessage = (msg, disappearIn = 0) => {
		setMessage({
			message: msg,
			error: true
		})
		if (disappearIn > 0) {
			setTimeout(() => {
				setMessage(null)
			}, disappearIn)
		}
	}

	const handleLogin = async (event) => {
		event.preventDefault()
		console.log('logging ... ')
		try {
			const user = await loginService.login({
				username,
				password
			})
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			setErrorMessage('Wrong Credentials', 5000)
		}
	}

	const loginForm = () => (
		<div>
			<h2>Log in to application</h2>
			<form onSubmit={handleLogin}>
				<label>
					Username:{' '}
					<input type='text'
						value={username}
						onChange={({ target }) => setUsername(target.value)}
						name='username' />
				</label><br />
				<label>
					Password:{' '}
					<input type='password'
						value={password}
						onChange={({ target }) => setPassword(target.value)}
						name='password' />
				</label><br />
				<button type='submit'>Login</button>
			</form>
		</div>
	)

	const blogForm = () => (
		<div>
			<h2>blogs</h2>
			<p>{user.name} is logged !!!</p>
			{blogs.map(blog =>
				<Blog key={blog.id} blog={blog} />
			)}
		</div>
	)

	return (
		<>
			{message !== null && <Notification message={message} />}
			{user === null && loginForm()}
			{user !== null && blogForm()}
		</>
	)
}

export default App