import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
	name: 'notification',
	initialState: null,
	reducers: {
		changeNotify(state, action){
			return action.payload
		},
		reset(state, action){
			return null
		}
	}
})

export const { changeNotify, reset } = notificationSlice.actions

export const notify = (message, error, disappearInSeconds) => {
	return async dispatch => {
		dispatch(changeNotify({
			message, error
		}))
		setTimeout(() => {
			dispatch(reset())
		}, 1000 * disappearInSeconds)
	}
}

export default notificationSlice.reducer