import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import Header from "./pages/user/components/Header";
import Lobby from "./pages/user/components/Lobby";
import Game from "./pages/user/Game";
import LoginForm from "./pages/user/LoginForm";
import SignupForm from "./pages/user/SignupForm";

function App() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    if (authUser) return;
    const token = localStorage.getItem("token");

    if (token) {
      const user = jwtDecode(token);

      setAuthUser(user);
    }
  }, [authUser]);

  return (
    // TODO: replace h1 elements with components and pages
    <>
      <Header authUser={authUser} setAuthUser={setAuthUser} />
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
          <Route path="lobby" element={authUser && <Lobby user={authUser} />} />
          <Route path="my-games" element={<h1>My Games</h1>} />
          <Route path="game/:id" element={authUser && <Game />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
