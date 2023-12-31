const Notification = ({ msg }) => {
	if(msg){
		return (<div>{msg}</div>)
	}
	return null
}

export default Notification