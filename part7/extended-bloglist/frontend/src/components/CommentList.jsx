const CommentList = ({ blog }) => {
	if (!blog) {
		return null
	}

	return (
		<ul>
			{blog.comments.map((c, i) =>
				<li key={`${c}/${i}`}>{c}</li>)}
		</ul>)
}

export default CommentList