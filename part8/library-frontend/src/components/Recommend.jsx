import { useQuery } from "@apollo/client";
import BookList from "./BookList";
import { ALL_BOOKS, ME } from "../queries";

const Recommend = ({ show }) => {
    const userRequest = useQuery(ME)
    const result = useQuery(ALL_BOOKS)
    
    if(!show){
        return null
    }

    if(result.loading || userRequest.loading){
        return <div>loading ...</div>
    }

    const books = result.data.allBooks
    const user = userRequest.data.me

    return (
        <div>
          <h2>Recommendations</h2>
            <span>books in your favorite genre <b>{user.favoriteGenre}</b></span>
          <BookList filter={user.favoriteGenre} books={books} />
        </div>
      );
}

export default Recommend