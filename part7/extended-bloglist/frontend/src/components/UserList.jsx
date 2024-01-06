import { useUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'

const User = ({ user }) => (
	<tr>
		<td>
			<Link to={`/users/${user.id}`}>{user.name}</Link>
		</td>
		<td>{user.blogs.length}</td>
	</tr>
)

const UserList = () => {
	const users = useUsers()

	return (
		<>
			<h1>Users</h1>
			<table>
				<thead>
					<tr>
						<th></th>
						<th>blogs created</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<User key={user.id} user={user} />
					))}
				</tbody>
			</table>
		</>
	)
}

export default UserList
