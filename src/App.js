import { Route, Routes } from "react-router";

function App() {
  return (
    // TODO: replace h1 elements with components and pages
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/signup" element={<h1>Sign Up</h1>} />
      <Route path="/login" element={<h1>Log In</h1>} />
      <Route path="/lobby" element={<h1>Lobby</h1>} />
      <Route path="/my-games" element={<h1>My Games</h1>} />
      <Route path="/game/:id" element={<h1>Game</h1>} />
    </Routes>
  );
}

export default App;
