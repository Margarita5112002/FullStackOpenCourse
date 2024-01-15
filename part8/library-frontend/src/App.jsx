import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import { useApolloClient, useSubscription } from "@apollo/client";
import Recommend from "./components/Recommend";
import { BOOK_ADDED } from "./queries";

const App = () => {
  const client = useApolloClient();
  const [token, setToken] = useState(null)
  const [page, setPage] = useState("authors");

  useSubscription(BOOK_ADDED, {
    onData: ({data}) => {
        window.alert(data.data.bookAdded.title)
    }
  })

  useEffect(() => {
    const token = localStorage.getItem("library-usertoken")
    if (token){
        setToken(token)
    }
  }, [])

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("authors")
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {!token && <button onClick={() => setPage("login")}>login</button>}
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {token && <button onClick={() => setPage("recommend")}>recommend</button>}
        {token && <button onClick={logout}>logout</button>}
      </div>

      <Authors show={page === "authors"} token={token}/>

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommend show={page === "recommend"} />

      <Login show={page === "login"} setPage={setPage} setToken={setToken}/>
    </div>
  );
};

export default App;
