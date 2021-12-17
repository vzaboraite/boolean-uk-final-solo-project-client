import { useParams } from "react-router";
import { useCallback, useEffect, useState } from "react";
import { apiUrl } from "../../utils/constants";
import GameBoard from "./components/GameBoard";
import { applyMoves, getMovesFromString, initialBoard } from "../../utils/game";

export default function Game({ user }) {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [currentGame, setCurrentGame] = useState(null);
  const [playerColor, setPlayerColor] = useState(null);

  /* 
  Here using useCallback hook to avoid creating handleGameUpdate on each re-render.
  Reference: https://reactjs.org/docs/hooks-reference.html#usecallback
   */
  const handleGameUpdate = useCallback(
    (game) => {
      if (!game) {
        return;
      }

      if (currentGame === null) {
        setCurrentGame(game);
      } else if (
        game.gameStatus !== currentGame.gameStatus ||
        game.users.length !== currentGame.users.length ||
        game.moves !== currentGame.moves
      ) {
        setCurrentGame(game);
      }
    },
    [currentGame]
  );

  useEffect(() => {
    if (!currentGame) {
      return;
    }

    const player = currentGame.users.find((player) => player.id === user.id);

    if (player) {
      setPlayerColor(player.color.toLowerCase());
    }
  }, [currentGame, user]);

  useEffect(() => {
    if (
      currentGame !== null &&
      currentGame.gameStatus !== "in-progress" &&
      currentGame.gameStatus !== "waiting"
    ) {
      return;
    }
    const intervalId = setInterval(() => {
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
            handleGameUpdate(game);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentGame, id, token, handleGameUpdate]);

  if (currentGame === null) {
    return null;
  }

  const moves = getMovesFromString(currentGame.moves);

  const board = applyMoves(initialBoard, moves);

  const nextMove = moves.length % 2 === 0 ? "red" : "black";

  const playerOne = currentGame.users[0];
  const playerTwo = currentGame.users[1];

  const status = currentGame.gameStatus;
  const isWaiting = status === "waiting";
  const inProgress = status === "in-progress";

  function getStatusNotification() {
    let notification = "";

    switch (status) {
      case "red-win":
        notification =
          user.id === playerOne.id
            ? "✨You Won!✨"
            : "Red is victorious! You lost...";
        break;
      case "black-win":
        notification =
          user.id === playerTwo.id
            ? "✨You Won!✨"
            : "Black is victorious! You lost...";
        break;
      case "draw":
        notification = "It's a Draw!";
        break;
      default:
        return "";
    }

    return notification;
  }

  return (
    <>
      <div className={`players ${isWaiting && "align-center"}`}>
        <div className={inProgress && nextMove === "red" && "players-turn"}>
          {playerOne && `🔴 ${playerOne.username}`}
        </div>
        <div className={inProgress && nextMove === "black" && "players-turn"}>
          {playerTwo
            ? `⚫ ${playerTwo.username}`
            : "Waiting for second player..."}
        </div>
      </div>
      <div className="game-board">
        <GameBoard
          gameId={currentGame.id}
          playerColor={playerColor}
          board={board}
          nextMove={nextMove}
          allowToMove={currentGame.users.length === 2}
          handleGameUpdate={handleGameUpdate}
        />
      </div>

      <h2 className="notification">{getStatusNotification()}</h2>
    </>
  );
}
