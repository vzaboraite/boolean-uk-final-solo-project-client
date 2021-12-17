import jwtDecode from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router";
import { apiUrl } from "../../utils/constants";

export default function LoginForm({ setAuthUser }) {
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

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...user }),
    };

    fetch(`${apiUrl}/login`, fetchOptions)
      .then((res) => {
        if (res.status === 401) {
          throw Error("Not Authorized!");
        } else if (res.status !== 200) {
          throw Error("[500 ERROR] Internal Server Error");
        }
        return res.json();
      })
      .then((data) => {
        console.log({ INSIDElogin: data });
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
    <>
      <div className="login-container">
        <h1>Log In</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            onChange={handleInputChange}
          />
          <label htmlFor="password" className="padding-top__10">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
