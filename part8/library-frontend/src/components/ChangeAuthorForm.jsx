import { useMutation } from "@apollo/client"
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries"
import { useEffect, useState } from "react"

const ChangeAuthorForm = ({ authors }) => {
	const [updateAuthor, result] = useMutation(UPDATE_AUTHOR, {
		refetchQueries: [{query: ALL_AUTHORS}],
		onError: (error) => {
			const messages = error.graphQLErrors.map(e => e.message).join('\n')
			notify(messages)
		}
	})
	const [error, setError] = useState(null)

	useEffect(() => {
		if (result.data && result.data.editAuthor === null){
			notify('author not found')
		}
	}, [result.data])

	const notify = (msg) => {
		setError(msg)
		setTimeout(() => {
			setError(null)
		}, 5000)
	}

	const onSubmit = (e) => {
		e.preventDefault()
		const name = e.target.name.value
		const born = parseInt(e.target.born.value)
		updateAuthor({
			variables: { name, born }
		})
	}

	return (
		<>
			<h1>Set birthyear</h1>
			{error && <div>{error}</div>}
			<form onSubmit={onSubmit}>
				<select name="name">
					{authors.map(a => 
						<option key={a.name} value={a.name}>{a.name}</option>)}
				</select>
				<br />
				<label>
					born <input type="number" name="born"/>
				</label><br />
				<button>update author</button>
			</form>
		</>
	)
}

export default ChangeAuthorForm