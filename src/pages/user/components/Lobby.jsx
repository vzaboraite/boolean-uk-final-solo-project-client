import { useEffect, useState } from "react";

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

    fetch(`${process.env.REACT_APP_API_URL}/games`, fetchOptions)
      .then((res) => {
        if (res.status === 401) {
          throw Error("Not Authorized");
        } else if (res.status !== 200) {
          throw Error(res);
        }
        return res.json();
      })
      .then((data) => {
        console.log("INSIDE LOBBY");
        console.log({ GAMES: data });
        const games = data.cleanGames;
        if (games) {
          setGames(games);
        }
      })
      .catch((error) => error);
  }, []);

  return (
    <main>
      <ul>
        {games.map((game, index) => {
          console.log({ game });
          return (
            <li key={index}>
              <ul>
                {game.users.map((user, index) => {
                  console.log({ INSIDEMAP: user });
                  return <li key={index}>{user.username}</li>;
                })}
              </ul>
              {game.id} -- {game.status}
            </li>
          );
        })}
      </ul>
    </main>
  );
}
