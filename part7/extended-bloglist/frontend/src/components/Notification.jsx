const Notification = ({ message }) => {
	if (message.error) {
		return <div className="error">{message.message}</div>
	}
	return <div className="notification">{message.message}</div>
}

export default Notification
