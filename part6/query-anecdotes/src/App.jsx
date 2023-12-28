import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import anecdoteService from './services/anecdotes'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
	const queryClient = useQueryClient()

	const result = useQuery({
		queryKey: ['anecdotes'],
		queryFn: anecdoteService.getAll
	})

	const voteMutation = useMutation({
		mutationFn: anecdoteService.update,
		onSuccess: (updatedAnecdote) => {
			const anecdotes = queryClient.getQueryData(['anecdotes'])
			queryClient.setQueryData(['anecdotes'], anecdotes.map(a => a.id === updatedAnecdote.id ? updatedAnecdote : a))
		}
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
		voteMutation.mutate({
			id: anecdote.id,
			updatedAnecdote: {
				... anecdote,
				votes: anecdote.votes + 1
			}
		})
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
