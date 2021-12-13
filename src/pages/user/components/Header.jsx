import { Link } from "react-router-dom";

export default function Header({ authUser, setAuthUser }) {
  function handleLogout() {
    localStorage.removeItem("token");
    setAuthUser(null);
  }

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {!authUser && (
            <div className="auth-menu">
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/login">Log In</Link>
              </li>
            </div>
          )}
          {authUser && (
            <div className="dropdown">
              <button className="link">{authUser.username}</button>
              <div className="dropdown-menu">
                <li>
                  <Link to="/lobby">Lobby</Link>
                </li>
                <li>
                  <Link to="/my-games">My games</Link>
                </li>
                <li>
                  <Link to="/" onClick={handleLogout}>
                    Log Out
                  </Link>
                </li>
              </div>
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
}
