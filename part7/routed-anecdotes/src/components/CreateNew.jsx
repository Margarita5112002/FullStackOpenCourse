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
			content: content.value,
			author: author.value,
			info: info.value,
			votes: 0
		})
		showNotification(content.value, 5)
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
					<input {...content} />
				</div>
				<div>
					author
					<input {...author} />
				</div>
				<div>
					url for more info
					<input {...info} />
				</div>
				<button>create</button>
				<button onClick={handleReset}>reset</button>
			</form>
		</div>
	)
}

export default CreateNew