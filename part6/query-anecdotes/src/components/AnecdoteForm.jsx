import { useMutation, useQueryClient } from "@tanstack/react-query"
import anecdoteService from "../services/anecdotes"
import { useNotificationDispatch, setNotification } from "../NotificationContext"

const AnecdoteForm = () => {

	const queryClient = useQueryClient()
	const notificationDispatch = useNotificationDispatch()

	const newAnecdoteMutation = useMutation({
		mutationFn: anecdoteService.createNew,
		onSuccess: (newAnecdote) => {
			const anecdotes = queryClient.getQueryData(['anecdotes'])
			queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
			setNotification(notificationDispatch, `You created ${newAnecdote.content} anectode`, 5)
		},
		onError: (err) => {
			setNotification(notificationDispatch, err.response.data.error, 5)
		}
	})

	const onCreate = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		newAnecdoteMutation.mutate(content)
	}

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name='anecdote' />
				<button type="submit">create</button>
			</form>
		</div>
	)
}

export default AnecdoteForm
