import { useState } from "react";
import { apiUrl } from "../../../utils/constants";
import { getValidMoves } from "../../../utils/game";

export default function GameBoard({
  gameId,
  playerColor,
  board,
  nextMove,
  allowToMove,
  handleGameUpdate,
}) {
  const token = localStorage.getItem("token");

  const [selectedPiece, setSelectedPiece] = useState(null);

  // derived state for valid moves
  const validMoves = getValidMoves(board, selectedPiece);

  function buildRow(row, index) {
    const rowSquares = row.map((square, i) => {
      const isWhiteSquare = (index + i) % 2 === 0;
      return (
        <div
          key={i}
          className={`board-square ${
            isWhiteSquare ? "sq-color__white" : "sq-color__grey"
          }`}
          onClick={() => {
            allowToMove && !square && selectedPiece && handleMove(index, i);
          }}
        >
          {square && drawPiece(square, index, i)}
        </div>
      );
    });

    return (
      <div key={index} className="row">
        {rowSquares}
      </div>
    );
  }

  function buildBoard() {
    const boardRows = board.map((row, index) => buildRow(row, index));
    return (
      <div
        className={`board  ${
          playerColor === "red" ? "rotate shadow__rotate" : "shadow"
        }`}
      >
        {boardRows}
      </div>
    );
  }

  function drawPiece(square, rowIndex, colIndex) {
    let showBorder = false;
    if (
      selectedPiece &&
      selectedPiece.rowIndex === rowIndex &&
      selectedPiece.colIndex === colIndex
    ) {
      showBorder = true;
    }

    return (
      <div
        className={`piece ${
          square !== null && (square === "red" ? "piece__red" : "piece__black")
        } ${showBorder && "selected"}
        `}
        onClick={() => handleClick({ rowIndex, colIndex, color: square })}
      ></div>
    );
  }

  function handleClick(pieceData) {
    allowToMove &&
      nextMove === playerColor &&
      playerColor === pieceData.color &&
      setSelectedPiece(pieceData);
  }

  function handleMove(toRowIndex, toColIndex) {
    const fromRowIndex = selectedPiece.rowIndex;
    const fromColIndex = selectedPiece.colIndex;

    const foundMove = validMoves.find(
      (move) => move.toRowIndex === toRowIndex && move.toColIndex === toColIndex
    );

    if (!foundMove) {
      return;
    }

    if (!selectedPiece) {
      return;
    }

    const fetchOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({
        newMove: `${fromColIndex},${fromRowIndex}-${toColIndex},${toRowIndex}`,
      }),
    };

    fetch(`${apiUrl}/games/${gameId}/move-piece`, fetchOptions)
      .then((res) => {
        if (res.status === 401) {
          throw Error("Not Authorized");
        } else if (res.status !== 200) {
          throw Error("[500 ERROR] Internal Server Error");
        }
        return res.json();
      })
      .then((data) => {
        const { game } = data;
        if (game) {
          handleGameUpdate(game);
          setSelectedPiece(null);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return <>{buildBoard()}</>;
}
