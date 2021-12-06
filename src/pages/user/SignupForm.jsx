import jwtDecode from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router";
import { apiUrl } from "../../utils/constants";

export default function SignupForm({ setAuthUser }) {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    setUser({ ...user, [inputName]: inputValue });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userToCreate = {
      ...user,
    };

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userToCreate),
    };

    fetch(`${apiUrl}/signup`, fetchOptions)
      .then((res) => {
        if (res.status === 400) {
          throw Error("Missing information!");
        } else if (res.status !== 201) {
          throw Error("[500 ERROR] Internal Server Error");
        }
        return res.json();
      })
      .then((data) => {
        const { token } = data;
        if (token) {
          const user = jwtDecode(token);
          setAuthUser(user);

          localStorage.setItem("token", token);

          navigate("/lobby");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
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
