const dummy = (blogs) => 1

const totalLikes = (blogs) =>
    blogs.reduce((acc, b) => {
        return acc + b.likes
    }, 0)

const favoriteBlog = (blogs) => {
    const fav = blogs.reduce((acc, b) => {
        if (!acc || acc.likes < b.likes) return b
        return acc
    }, null)
    if (fav){
        return {
            title: fav.title,
            author: fav.author,
            likes: fav.likes
        }
    }
    return null
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}