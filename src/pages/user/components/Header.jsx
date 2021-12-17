import { Link } from "react-router-dom";

export default function Header({ authUser, setAuthUser }) {
  function handleLogout() {
    localStorage.removeItem("token");
    setAuthUser(null);
  }

  return (
    <header className="mg-bottom__20">
      <nav className="mg__20 center">
        <ul className="place-items__center">
          {!authUser && (
            <div className="auth-menu">
              <Link to="/signup" className="link">
                Sign Up
              </Link>
              <Link to="/login" className="link">
                Log In
              </Link>
            </div>
          )}
          {authUser && (
            <>
              <Link to="/lobby" className="link">
                Lobby
              </Link>
              <div className="dropdown">
                <button className="link">{authUser.username}</button>
                <div className="dropdown-menu place-items__center">
                  <li>
                    <Link
                      to="/"
                      onClick={handleLogout}
                      className="padding__vertical"
                    >
                      Log Out
                    </Link>
                  </li>
                </div>
              </div>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
