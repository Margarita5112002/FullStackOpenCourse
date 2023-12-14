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
	const [title, setTitle] = useState('')
	const [url, setUrl] = useState('')
	const [author, setAuthor] = useState('')

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs(blogs)
		)
	}, [])

	useEffect(() => {
		const loggedUser = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUser) {
			const parseLoggedUser = JSON.parse(loggedUser)
			setUser(parseLoggedUser)
			blogService.setToken(parseLoggedUser.token)
		}
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
			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
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

	const logOut = () => {
		window.localStorage.clear()
		setUser(null)
		blogService.setToken('')
	}

	const handleNewBlog = async (event) => {
		event.preventDefault()
		console.log('create new blog ...')
		try {
			const response = await blogService.create({
				title,
				url, 
				author
			})
			setTitle('')
			setAuthor('')
			setUrl('')
			setBlogs(blogs.concat(response))
		} catch (exception){
			console.log(exception)
			setErrorMessage(exception.response.data.error, 5000)
		}
	}

	const blogForm = () => (
		<div>
			<h2>blogs</h2>
			<p>{user.name} logged in</p>
			<button onClick={logOut}>Log out</button>
			<form onSubmit={handleNewBlog}>
				<h1>Create new blog</h1>
				<label>
					title:
					<input
						type='text'
						name='title'
						value={ title }
						onChange={({target}) => {setTitle(target.value)}} />
				</label><br />
				<label>
					author:
					<input
						type='text'
						name='author'
						value={ author }
						onChange={({target}) => {setAuthor(target.value)}} />
				</label><br />
				<label>
					url:
					<input
						type='text'
						name='url'
						value={ url }
						onChange={({target}) => {setUrl(target.value)}} />
				</label><br />
				<button type='submit'>Create</button>
			</form>
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