import { useParams } from "react-router-dom"

const Anecdote = ({ anecdotes }) => {
	const id = useParams().id
	const anecdote = anecdotes.find(a => a.id === Number(id))
	const padding = {
		paddingTop: 5,
		paddingBottom: 5
	}
	return (
		<>
			<h1>{anecdote.content} by {anecdote.author}</h1>
			<div style={padding}>has {anecdote.votes} votes</div>
			<div style={padding}>
				For more information see{' '}
				<a href={anecdote.info}>{anecdote.info}</a>
			</div>
		</>
	)
}

export default Anecdote