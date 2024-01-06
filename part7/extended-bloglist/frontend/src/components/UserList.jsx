import { useUsers } from '../reducers/usersReducer'

const User = ({ user }) =>
	<tr><td>{user.name}</td><td>{user.blogs.length}</td></tr>


const UserList = () => {
	const users = useUsers()

	return (
		<>
			<h1>Users</h1>
			<table>
				<thead>
					<tr><th></th><th>blogs created</th></tr>
				</thead>
				<tbody>
					{users.map(user => <User key={user.id} user={user} />)}
				</tbody>
			</table>
		</>
	)
}

export default UserList