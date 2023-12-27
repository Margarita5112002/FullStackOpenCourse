import { useDispatch } from "react-redux"
import { changeFilter } from "../reducers/filterReducer"

const Filter = () => {
	const dispatch = useDispatch()

	const handleChange = (event) => {
		// input-field value is in variable event.target.value
		dispatch(changeFilter(event.target.value))
	}

	const style = {
		marginBottom: 10
	}

	return (
		<label style={style}>
			filter <input name="filter" onChange={handleChange} />
		</label>
	)
}

export default Filter