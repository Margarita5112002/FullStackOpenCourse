import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'
import { useSelector } from 'react-redux'

const userSlice = createSlice({
	name: 'users',
	initialState: [],
	reducers: {
		setUsers(action, state) {
			return state.payload
		},
	},
})

export const initializeUsers = () => {
	return async (dispatch) => {
		const users = await usersService.getAll()
		dispatch(setUsers(users))
	}
}

export const useUsers = () => {
	return useSelector((state) => state.users)
}

export const useUserById = (id) => {
	return useSelector(state => state.users.find(u => u.id === id))
}

export const { setUsers } = userSlice.actions
export default userSlice.reducer
