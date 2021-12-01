import { Route, Routes } from "react-router";
import Header from "./pages/user/components/Header";
import SignupForm from "./pages/user/SignupForm";

function App() {
  return (
    // TODO: replace h1 elements with components and pages
    <>
      <Header />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<h1>Log In</h1>} />
        <Route path="/lobby" element={<h1>Lobby</h1>} />
        <Route path="/my-games" element={<h1>My Games</h1>} />
        <Route path="/game/:id" element={<h1>Game</h1>} />
      </Routes>
    </>
  );
}

export default App;
