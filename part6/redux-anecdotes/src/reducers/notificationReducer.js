import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
	name: 'notification',
	initialState: 'Default Message'
})

export default notificationSlice.reducer