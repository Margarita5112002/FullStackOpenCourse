import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

const LoggedUser = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)

	const logOut = () => {
		dispatch(logoutUser())
	}

	return (
		<>
			<h2>blogs</h2>
			<p>{user.name} logged in</p>
			<button onClick={logOut}>Log out</button>
		</>
	)
}

export default LoggedUser