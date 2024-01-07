import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'
import { useSelector } from 'react-redux'

const userSlice = createSlice({
	name: 'users',
	initialState: [],
	reducers: {
		setUsers(state, action) {
			return action.payload
		},
		addBlogToUser(state, action) {
			const { userId, blog } = action.payload
			return state.map(u => {
				if (u.id === userId){
					return {
						... u,
						blogs: u.blogs.concat(blog)
					}
				}
				return u
			})
		},
		updateBlogFromUser(state, action) {
			const { userId, blogId, blog } = action.payload
			return state.map(u => {
				if (u.id === userId){
					return {
						... u,
						blogs: u.blogs.map(b => b.id === blogId ? blog : b)
					}
				}
				return u
			})
		},
		deleteBlogFromUser(state, action){
			const { blogId } = action.payload
			return state.map(u => {
				return {
					... u,
					blogs: u.blogs.filter(b => b.id !== blogId)
				}
			})
		}
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

export const { setUsers, addBlogToUser, updateBlogFromUser, deleteBlogFromUser } = userSlice.actions
export default userSlice.reducer
