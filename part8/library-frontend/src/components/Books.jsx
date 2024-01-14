import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useEffect, useState } from "react";
import BookList from "./BookList";

const Books = (props) => {
  const [filter, setFilter] = useState("");
  const [books, setBooks] = useState([]);
  const result = useQuery(ALL_BOOKS);

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks);
    }
  }, [result.data]);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading ...</div>;
  }

  const getAllGenres = (books) => {
    const genres = new Set();
    for (const ibook in books) {
      for (const ibookgenre in books[ibook].genres) {
        genres.add(books[ibook].genres[ibookgenre]);
      }
    }
    return [...genres];
  };

  const genres = getAllGenres(books);

  return (
    <div>
      <h2>books</h2>

      <BookList filter={filter} books={books} />
      <form>
        <div>
          <label>
            <input
              type="radio"
              name="filter"
              value=""
              onChange={(e) => setFilter(e.target.value)}
              checked={filter === ""}
            />
            all genres
          </label>
        </div>
        {genres.map((g) => (
          <div key={g}>
            <label>
              <input
                type="radio"
                name="filter"
                value={g}
                onChange={(e) => setFilter(e.target.value)}
                checked={filter === g}
              />
              {g}
            </label>
          </div>
        ))}
      </form>
    </div>
  );
};

export default Books;
