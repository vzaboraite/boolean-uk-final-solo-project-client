import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { apiUrl } from "../../utils/constants";
import GameBoard from "./components/GameBoard";

export default function Game() {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [currentGame, setCurrentGame] = useState(null);

  useEffect(() => {
    fetch(`${apiUrl}/games/${id}`, {
      method: "GET",
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          throw Error("Not Authorized");
        } else if (res.status !== 200) {
          throw Error("[500 ERROR] Internal Server Error");
        }
        return res.json();
      })
      .then((data) => {
        const game = data.game;
        if (game) {
          setCurrentGame(game);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, token]);

  if (currentGame === null) {
    return null;
  }

  const playerOne = currentGame.users[0];
  const playerTwo = currentGame.users[1];

  return (
    <>
      <div>
        player 1 -
        {playerOne &&
          `${playerOne.username} - ${playerOne.color.toLowerCase()}`}
      </div>
      <div>
        player 2 -
        {playerTwo
          ? `${playerTwo.username} - ${playerTwo.color.toLowerCase()}`
          : "Waiting for second player..."}
      </div>
      <GameBoard players={currentGame.users} gameId={currentGame.id} />
    </>
  );
}
