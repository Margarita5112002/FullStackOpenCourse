import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const getId = () => (100000 * Math.random()).toFixed(0)

const sortAnecdotes = (anecdotes) => {
	return anecdotes.sort((a, b) => b.votes - a.votes)
}

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState: [],
	reducers: {
		voteAnecdote(state, action){
			const id = action.payload
			const anecdote = state.find(a => a.id === id)
			const changedAnecdote = {
				... anecdote,
				votes: anecdote.votes + 1
			}
			return sortAnecdotes(state.map(a => a.id === id ? changedAnecdote : a))
		},
		newAnecdote(state, action){
			state.push(action.payload)
			return sortAnecdotes(state)
		},
		setAnecdotes(state, action){
			return action.payload
		}
	}
})

export const { voteAnecdote, newAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		dispatch(setAnecdotes(anecdotes))
	}
}

export const createNewAnecdote = (content) => {
	return async dispatch => {
		const anecdote = await anecdoteService.createNew(content)
		dispatch(newAnecdote(anecdote))
	}
}

export default anecdoteSlice.reducer