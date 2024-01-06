import { useParams } from 'react-router-dom'
import { useUserById } from '../reducers/usersReducer'

const User = () => {
	const id = useParams().id
	const user = useUserById(id)

	if (!user){
		return null
	}

	const blogs = user.blogs

	return (
		<>
			<h1>{user.name}</h1>
			<h2>blogs added</h2>
			<ul>
				{blogs.map(b => <li key={b.id}>{b.title}</li>)}
			</ul>
		</>
	)
}

export default User