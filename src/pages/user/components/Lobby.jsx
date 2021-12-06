import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
const { apiUrl } = require("../../../utils/constants");

export default function Lobby({ user }) {
  const navigate = useNavigate();

  const [games, setGames] = useState([]);

  const userId = user.id;

  const token = localStorage.getItem("token");

  useEffect(() => {
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
        console.log("INSIDE LOBBY");
        console.log({ GAMES: data });
        const games = data.games;
        if (games) {
          setGames(games);
        }
      })
      .catch((error) => {
        console.error(error);
      });
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

  const gamesToRender = games.filter((game) => {
    return (
      game.gameStatus === "waiting" &&
      !game.users.some((user) => user.userId === userId)
    );
  });

  return (
    <main>
      <p>Welcome, {user.username}</p>
      <ul>
        {gamesToRender.map((game, index) => {
          console.log({ game });
          return (
            <li key={index}>
              #{game.id} -- {game.gameStatus} --
              <button
                onClick={() => {
                  handleJoinGame(game.id);
                }}
              >
                Join game
              </button>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
