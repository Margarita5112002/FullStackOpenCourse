import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const sortAnecdotes = (anecdotes) => {
	return anecdotes.sort((a, b) => b.votes - a.votes)
}

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState: [],
	reducers: {
		voteAnecdote(state, action){
			const id = action.payload
			return sortAnecdotes(state.map(a => {
				if (a.id === id){
					return {
						... a,
						votes: a.votes + 1
					}
				}
				return a
			}))
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

export const voteAndUpdateAnecdote = (id) => {
	return async (dispatch, getState) => {
		const anecdote = selectAnecdoteById(getState(), id)
		const updatedAnecdote = {
			... anecdote,
			votes: anecdote.votes + 1
		}
		await anecdoteService.update(anecdote.id, updatedAnecdote)
		dispatch(voteAnecdote(anecdote.id))
	}
}

const selectAnecdoteById = (state, id) => {
	return state.anecdotes.find(a => a.id === id)
}

export default anecdoteSlice.reducer