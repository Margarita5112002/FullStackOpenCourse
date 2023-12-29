import PropTypes from 'prop-types'
import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
	switch (action.type) {
		case 'CHANGE':
			return action.payload
		case 'RESET':
			return ''
		default:
			return state
	}
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
	const [notification, notificationDispatch] = useReducer(notificationReducer, '')
	return (
		<NotificationContext.Provider value={[notification, notificationDispatch]}>
			{props.children}
		</NotificationContext.Provider>
	)
}

NotificationContextProvider.propTypes = {
	children: PropTypes.node.isRequired
}

export const useNotificationValue = () => {
	const notification = useContext(NotificationContext)
	return notification[0]
}

export const useNotificationDispatch = () => {
	const notification = useContext(NotificationContext)
	return notification[1]
}

export const setNotification = (dispatch, message, displayInSeconds) => {
	dispatch({
		type: 'CHANGE',
		payload: message
	})
	setTimeout(() => {
		dispatch({ type: 'RESET' })
	}, 1000 * displayInSeconds)
}

export default NotificationContext