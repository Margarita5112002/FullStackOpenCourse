import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
	test('only render title and author but no url or likes', () => {
		const blog = {
			title: 'Testing blog',
			author: 'David',
			url: 'www.abc.com',
			likes: 40,
			user: {
				name: 'Magi',
				username: 'user123',
				id: '1234'
			}
		}

		const dummyLikeBlog = jest.fn()
		const dummyDeleteBlog = jest.fn()

		const container = render(
			<Blog blog={blog}
				canDelete={false}
				deleteBlog={dummyDeleteBlog}
				likeBlog={dummyLikeBlog} />).container

		const authorElement = screen.getByText(blog.author, { exact: false })
		const titleElement = screen.getByText(blog.title, { exact: false })
		const fullDetailsDiv = container.querySelector('.fullDetails')
		expect(fullDetailsDiv).toHaveStyle('display: none')
	})
})