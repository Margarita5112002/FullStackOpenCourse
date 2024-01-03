import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"

const CreateNew = (props) => {
	const content = useField('text')
	const author = useField('text')
	const info = useField('text')
	const navigate = useNavigate()

	const showNotification = (content, displayInSeconds) => {
		props.notify(`a new anecdote "${content}" created`)
		setTimeout(() => {
			props.notify('')
		}, displayInSeconds * 1000)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		props.addNew({
			content: content.field.value,
			author: author.field.value,
			info: info.field.value,
			votes: 0
		})
		showNotification(content.field.value, 5)
		navigate('/')
	}

	const handleReset = (e) => {
		e.preventDefault()
		content.reset()
		author.reset()
		info.reset()
	}

	return (
		<div>
			<h2>create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				<div>
					content
					<input {...content.field} />
				</div>
				<div>
					author
					<input {...author.field} />
				</div>
				<div>
					url for more info
					<input {...info.field} />
				</div>
				<button>create</button>
				<button onClick={handleReset}>reset</button>
			</form>
		</div>
	)
}

export default CreateNew