import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { notify } from './notificationReducer'

const compareBlogs = (b1, b2) => b2.likes - b1.likes

const blogSlice = createSlice({
	name: 'blogs',
	initialState: [],
	reducers: {
		setBlogs(state, action) {
			return action.payload.sort(compareBlogs)
		},
		addBlog(state, action) {
			return state.concat(action.payload).sort(compareBlogs)
		},
		updateBlog(state, action) {
			const { blogId, blog } = action.payload
			return state.map((b) => (b.id === blogId ? blog : b)).sort(compareBlogs)
		},
		deleteBlog(state, action){
			return state.filter(b => b.id !== action.payload)
		}
	},
})

export const initializeBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll()
		dispatch(setBlogs(blogs))
	}
}

export const createNewBlog = ({ title, url, author }) => {
	return async (dispatch) => {
		try {
			const newBlog = await blogService.create({
				title,
				url,
				author,
			})
			dispatch(addBlog(newBlog))
			dispatch(
				notify(
					`a new blog ${newBlog.title} by ${newBlog.author} added`,
					false,
					5,
				),
			)
		} catch (exception) {
			dispatch(notify(exception.response.data.error, true, 5))
		}
	}
}

export const likeUpdateBlog = (blog) => {
	return async (dispatch) => {
		const updatedBlog = {
			title: blog.title,
			url: blog.url,
			author: blog.author,
			likes: blog.likes + 1,
			user: blog.user.id,
		}
		const response = await blogService.update(blog.id, updatedBlog)
		dispatch(
			updateBlog({
				blogId: blog.id,
				blog: response,
			})
		)
	}
}

export const deleteUpdateBlog = (blogId) => {
	return async dispatch => {
		await blogService.deleteBlog(blogId)
		dispatch(deleteBlog(blogId))
	}
}

export const { setBlogs, addBlog, updateBlog, deleteBlog } = blogSlice.actions
export default blogSlice.reducer
