import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useEffect, useState } from "react";

const Books = (props) => {
  const [filter, setFilter] = useState("");
  const [books, setBooks] = useState([]);
  const result = useQuery(ALL_BOOKS, {
    pollInterval: 2000,
  });

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

  const onFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((b) => !filter || b.genres.includes(filter))
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <form>
        <div>
          <label>
            <input
              type="radio"
              name="filter"
              value=""
              onChange={onFilterChange}
              defaultChecked
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
                onChange={onFilterChange}
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
