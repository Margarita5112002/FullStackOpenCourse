import { useQuery } from '@tanstack/react-query'
import anecdoteService from './services/anecdotes'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {

	const result = useQuery({
		queryKey: ['anecdotes'],
		queryFn: anecdoteService.getAll
	})

	if(result.isPending){
		return <span>Loading ...</span>
	}

	if(result.isError){
		return <span>Error: {result.error.message}</span>
	}

	const anecdotes = result.data

	const handleVote = (anecdote) => {
		console.log('vote')
	}

	return (
		<div>
			<h3>Anecdote app</h3>

			<Notification />
			<AnecdoteForm />

			{anecdotes.map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>vote</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default App
