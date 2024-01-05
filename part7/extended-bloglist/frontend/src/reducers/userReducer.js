import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { notify } from './notificationReducer'

const userSlice = createSlice({
	name: 'user',
	initialState: null,
	reducers: {
		setUser(action, state){
			return state.payload
		},
		initializeUser(action, state){
			const loggedUser = window.localStorage.getItem('loggedBlogappUser')
			if (loggedUser) {
				const parseLoggedUser = JSON.parse(loggedUser)
				blogService.setToken(parseLoggedUser.token)
				return parseLoggedUser
			}
		},
		logoutUser(action, state){
			window.localStorage.clear()
			blogService.setToken('')
			return null
		}
	}
})

export const loginUser = (username, password) => {
	return async dispatch => {
		try {
			const user = await loginService.login({
				username,
				password,
			})
			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
			blogService.setToken(user.token)
			dispatch(setUser(user))
			dispatch(notify(`Log in ${user.name}`, false, 5))
		} catch (exception) {
			dispatch(notify(exception.response.data.error, true, 5))
		}
	}
}

export const { setUser, logoutUser, initializeUser } = userSlice.actions
export default userSlice.reducer