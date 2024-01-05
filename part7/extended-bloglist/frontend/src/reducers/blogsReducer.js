import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const compareBlogs = (b1, b2) => b2.likes - b1.likes

const blogSlice = createSlice({
	name: 'blogs',
	initialState: [],
	reducers: {
		setBlogs(state, action){
			return action.payload.sort(compareBlogs)
		},
		addBlog(state, action){
			return state.concat(action.payload).sort(compareBlogs)
		}
	}
})

export const initializeBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		dispatch(setBlogs(blogs))
	}
}

export const { setBlogs, addBlog } = blogSlice.actions
export default blogSlice.reducer