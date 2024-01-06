import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/userReducer'

const Menu = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)

	const padding = {
		padding: 5
	}

	const logOut = () => {
		dispatch(logoutUser())
	}

	return (
		<>
			<div>
				<Link style={padding} to='/'>Blogs</Link>
				<Link style={padding} to='/users'>Users</Link>
				<>
					<em>{user.name} logged in</em>
					<button onClick={logOut}>Log out</button>
				</>
			</div>
			<h2>blogs</h2>
		</>
	)
}

export default Menu