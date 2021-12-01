import { useState } from "react";

export default function SignupForm() {
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
    console.log("Submitted");

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

    fetch(`${process.env.REACT_APP_API_URL}/signup`)
      .then((res) => {
        if (res.status === 400) {
          throw Error("Missing information!");
        } else if (res.status !== 200) {
          throw Error(res);
        }
        return res.json();
      })
      .then(console.log)
      .catch((error) => error);
  };

  console.log({ user });
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
