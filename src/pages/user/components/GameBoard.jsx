import { useState, useEffect } from "react";

const initialBoard = [
  [null, "red", null, "red"],
  [null, null, null, null],
  [null, null, null, null],
  ["black", null, "black", null],
];
export default function GameBoard({ players }) {
  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    setGameStarted(players.length === 2);
  }, [players]);

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
            gameStarted &&
              !square &&
              selectedPiece &&
              !isWhiteSquare &&
              handleMove(index, i);
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
    return <div className="board">{boardRows}</div>;
  }

  function drawPiece(square, rowIndex, colIndex) {
    return (
      <div
        className={`piece ${
          square !== null && (square === "red" ? "piece__red" : "piece__black")
        }`}
        onClick={() => {
          gameStarted &&
            setSelectedPiece({ rowIndex, colIndex, color: square });
        }}
      ></div>
    );
  }

  function handleMove(toRowIndex, toColIndex) {
    const { rowIndex: fromRowIndex, colIndex: fromColIndex } = selectedPiece;

    const updatedBoard = board.map((row, rowIndex) => {
      return row.map((square, colIndex) => {
        if (fromRowIndex === rowIndex && fromColIndex === colIndex) {
          return null;
        }

        if (toRowIndex === rowIndex && toColIndex === colIndex) {
          return selectedPiece.color;
        }

        return square;
      });
    });

    setBoard(updatedBoard);
    setSelectedPiece(null);
  }

  return <>{buildBoard()}</>;
}
