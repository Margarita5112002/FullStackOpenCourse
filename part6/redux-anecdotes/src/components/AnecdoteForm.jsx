import { useDispatch } from "react-redux"
import { newAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, removeNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const addAnecdote = (e) => {
		e.preventDefault()
		const content = e.target.anecdote.value
		e.target.anecdote.value = ''
		dispatch(newAnecdote(content))
		dispatch(setNotification(`Added "${content}" anecdote`))
		setTimeout(() => {
			dispatch(removeNotification())
		}, 5000)
	}

	return (
		<>
			<h2>create new</h2>
			<form onSubmit={addAnecdote}>
				<div><input name='anecdote' /></div>
				<button type='submit'>create</button>
			</form>
		</>
	)
}

export default AnecdoteForm