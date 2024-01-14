import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";
import { useEffect, useState } from "react";

const Login = ({ show, setPage, setToken }) => {
  const [error, setError] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (err) => {
      notify(err.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      localStorage.setItem("library-usertoken", token);
      setToken(token)
      setPage('authors')
    }
  }, [result.data]);

  if (!show) {
    return null;
  }

  const notify = (msg) => {
    setError(msg);
    setTimeout(() => {
      setError("");
    }, 5000);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    login({
      variables: { username, password },
    });
  };

  return (
    <>
      <h1>Login</h1>
      {error && <div>{error}</div>}
      <form onSubmit={onSubmit}>
        <div>
          <label>
            username <input name="username" />
          </label>
        </div>
        <div>
          <label>
            password <input type="password" name="password" />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default Login;
