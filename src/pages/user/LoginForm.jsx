import { useState } from "react";
import { useNavigate } from "react-router";

export default function LoginForm({ setAuthUser }) {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (event) => {
    console.log(event.target.name, event.target.value);

    const inputName = event.target.name;
    const inputValue = event.target.value;

    setUser({ ...user, [inputName]: inputValue });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    console.log("Inside LOGIN form token: ", token);

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...user }),
    };

    fetch(`${process.env.REACT_APP_API_URL}/login`, fetchOptions)
      .then((res) => {
        if (res.status === 401) {
          throw Error("Not Authorized!");
        } else if (res.status !== 200) {
          throw Error(res);
        }
        return res.json();
      })
      .then((data) => {
        console.log({ INSIDElogin: data });
        const { token } = data;

        if (token) {
          setAuthUser(token);

          localStorage.setItem("token", token);

          navigate("/lobby");
        }
      })
      .catch((error) => error);
  };

  console.log({ user });
  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h2>Log In</h2>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          onChange={handleInputChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
