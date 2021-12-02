import { useEffect, useState } from "react";
const { apiUrl } = require("../../../utils/constants");

export default function Lobby() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

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
  }, []);

  return (
    <main>
      <ul>
        {games.map((game, index) => {
          console.log({ game });
          return (
            <li key={index}>
              {game.id} -- {game.status}
            </li>
          );
        })}
      </ul>
    </main>
  );
}
