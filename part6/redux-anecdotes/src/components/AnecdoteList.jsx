import { useSelector, useDispatch } from "react-redux"
import { voteAndUpdateAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
	const anecdotes = useSelector(({ filter, anecdotes }) => {
		return anecdotes.filter(a => a.content.includes(filter))
	})
	const dispatch = useDispatch()

	const vote = (id) => {
		console.log('vote', id)
		dispatch(voteAndUpdateAnecdote(id))
		const votedAnecdote = anecdotes.find(a => a.id === id)
		dispatch(setNotification(`You voted "${votedAnecdote.content}"`, 5))
	}

	return anecdotes.map(anecdote =>
		<div key={anecdote.id}>
			<div>
				{anecdote.content}
			</div>
			<div>
				has {anecdote.votes}
				<button onClick={() => vote(anecdote.id)}>vote</button>
			</div>
		</div>
	)
}

export default AnecdoteList