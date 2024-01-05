import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'

const LoginForm = () => {
	const dispatch = useDispatch()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = async (event) => {
		event.preventDefault()
		console.log('logging ... ')
		dispatch(loginUser(username, password))
	}

	return (
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
}

export default LoginForm