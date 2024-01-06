import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	BrowserRouter as Router,
	Routes, Route, Navigate
} from 'react-router-dom'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'
import Notification from './components/Notification'
import UserList from './components/UserList'
import Home from './components/Home'
import LoggedUser from './components/LoggedUser'

const App = () => {
	const message = useSelector((state) => state.notification)
	const user = useSelector((state) => state.user)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeBlogs())
	}, [dispatch])

	useEffect(() => {
		dispatch(initializeUsers())
	}, [dispatch])

	return (
		<Router>
			{message !== null && <Notification message={message} />}
			{user && <LoggedUser />}
			<Routes>
				<Route path='/users' element={user ? <UserList /> : <Navigate to='/' />} />
				<Route path='/' element={<Home />}/>
			</Routes>
		</Router>
	)
}

export default App
