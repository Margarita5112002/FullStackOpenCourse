import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUser, logoutUser } from './reducers/userReducer'
import LoginForm from './components/Login'
import BlogList from './components/BlogList'

const App = () => {
	const message = useSelector(state => state.notification)
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeBlogs())
	}, [dispatch])

	useEffect(() => {
		dispatch(initializeUser())
	}, [dispatch])

	const logOut = () => {
		dispatch(logoutUser())
	}

	return (
		<>
			{message !== null && <Notification message={message} />}
			{user === null && <LoginForm />}
			{user !== null && (
				<>
					<h2>blogs</h2>
					<p>{user.name} logged in</p>
					<button onClick={logOut}>Log out</button>
					<BlogForm />
					<BlogList />
				</>
			)}
		</>
	)
}

export default App
