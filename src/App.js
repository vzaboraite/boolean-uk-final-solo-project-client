import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import Header from "./pages/user/components/Header";
import LoginForm from "./pages/user/LoginForm";
import SignupForm from "./pages/user/SignupForm";

function App() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    if (authUser) return;

    const token = localStorage.getItem("token");

    if (token) {
      setAuthUser(token);
    }
  }, [authUser]);

  return (
    // TODO: replace h1 elements with components and pages
    <>
      <Header />
      <Routes>
        <Route path="/*">
          <Route index element={<h1>Home</h1>} />
          <Route
            path="signup"
            element={<SignupForm setAuthUser={setAuthUser} />}
          />
          <Route
            path="login"
            element={<LoginForm setAuthUser={setAuthUser} />}
          />
          <Route path="lobby" element={authUser && <h1>Lobby</h1>} />
          <Route path="my-games" element={<h1>My Games</h1>} />
          <Route path="game/:id" element={<h1>Game</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
