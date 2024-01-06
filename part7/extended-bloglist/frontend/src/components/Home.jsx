import { useSelector } from 'react-redux'
import LoginForm from './Login'
import BlogForm from './BlogForm'
import BlogList from './BlogList'

const Home = () => {
	const user = useSelector((state) => state.user)

	if (user === null) {
		return <LoginForm />
	}
	return (
		<>
			<BlogForm />
			<BlogList />
		</>
	)
}

export default Home
