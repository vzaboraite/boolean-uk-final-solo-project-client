import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
const { apiUrl } = require("../../../utils/constants");

export default function Lobby({ user }) {
  const navigate = useNavigate();

  const [games, setGames] = useState([]);

  const userId = user.id;

  const token = localStorage.getItem("token");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const fetchOptions = {
        method: "GET",
        headers: {
          authorization: token,
        },
      };

      fetch(`${apiUrl}/games`, fetchOptions)
        .then((res) => {
          if (res.status === 401) {
            throw Error("Not Authorized");
          } else if (res.status !== 200) {
            throw Error("[500 ERROR] Internal Server Error");
          }
          return res.json();
        })
        .then((data) => {
          const games = data.games;
          if (games) {
            setGames(games);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [token]);

  const handleJoinGame = (gameId) => {
    const fetchOptions = {
      method: "PUT",
      headers: {
        authorization: token,
      },
    };

    fetch(`${apiUrl}/games/${gameId}/join`, fetchOptions)
      .then((res) => {
        if (res.status === 401) {
          throw Error("Not Authorized");
        } else if (res.status !== 200) {
          throw Error("[500 ERROR] Internal Server Error");
        }
        navigate(`/game/${gameId}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCreateGame = () => {
    const fetchOptions = {
      method: "POST",
      headers: {
        authorization: token,
      },
    };

    fetch(`${apiUrl}/games`, fetchOptions)
      .then((res) => {
        if (res.status === 401) {
          throw Error("Not Authorized");
        } else if (res.status !== 200) {
          throw Error("[500 ERROR] Internal Server Error");
        }
        return res.json();
      })
      .then((data) => {
        const newGame = data.game;
        navigate(`/game/${newGame.id}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const gamesToRender = games.filter((game) => {
    return (
      game.gameStatus === "waiting" &&
      !game.users.some((user) => user.userId === userId)
    );
  });

  return (
    <>
      <h1 className="welcome-header">
        Welcome, <span className="user-name">✨{user.username}✨</span>
      </h1>
      <button onClick={handleCreateGame} className="create-game">
        CREATE A GAME
      </button>
      <table className="lobby">
        <tbody>
          {gamesToRender.map((game, index) => {
            return (
              <tr key={index}>
                <td>#{game.id.substring(0, 2)}</td>
                <td className="player"> 🔴 {game.users[0].user.username}</td>
                <td className="player">
                  ⚫
                  <button
                    onClick={() => {
                      handleJoinGame(game.id);
                    }}
                  >
                    JOIN
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
