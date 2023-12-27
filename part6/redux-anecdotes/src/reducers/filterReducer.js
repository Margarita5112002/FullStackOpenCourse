export const changeFilter = (query) => {
	return {
		type: 'SET_FILTER',
		payload: query
	}
}

const reducer = (state = '', action) => {
	switch(action.type){
		case 'SET_FILTER': 
			return action.payload
		default:
			return state
	}
}

export default reducer