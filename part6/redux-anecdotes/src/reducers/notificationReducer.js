import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
	name: 'notification',
	initialState: '',
	reducers: {
		changeNotification(state, action){
			return action.payload
		},
		removeNotification(state, action){
			return ''
		}
	}
})

export const { changeNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, displayInSeconds) => {
	return async dispatch => {
		dispatch(changeNotification(message))
		setTimeout(() => {
			dispatch(removeNotification())
		}, displayInSeconds * 1000)
	}
}

export default notificationSlice.reducer