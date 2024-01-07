import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'

const User = ({ user }) => (
	<TableRow>
		<TableCell>
			<Link to={`/users/${user.id}`}>{user.name}</Link>
		</TableCell>
		<TableCell>{user.blogs.length}</TableCell>
	</TableRow>
)

const UserList = () => {
	const users = useUsers()

	return (
		<>
			<h1>Users</h1>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell></TableCell>
							<TableCell>blogs created</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map((user) => (
							<User key={user.id} user={user} />
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}

export default UserList
