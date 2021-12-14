import { useState, useEffect } from "react";
import { getValidMoves } from "../../../utils/game";

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
  // derived state for valid moves
  const validMoves = getValidMoves(board, selectedPiece);

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
            gameStarted && !square && selectedPiece && handleMove(index, i);
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
        onClick={() => handleClick({ rowIndex, colIndex, color: square })}
      ></div>
    );
  }

  function handleClick(pieceData) {
    gameStarted && setSelectedPiece(pieceData);
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

    const updatedBoard = board.map((row, rowIndex) => {
      return row.map((square, colIndex) => {
        if (fromRowIndex === rowIndex && fromColIndex === colIndex) {
          return null;
        }

        if (toRowIndex === rowIndex && toColIndex === colIndex) {
          return selectedPiece.color;
        }

        if (
          foundMove.capturePiece &&
          foundMove.capturePiece.rowIndex === rowIndex &&
          foundMove.capturePiece.colIndex === colIndex
        ) {
          return null;
        }

        return square;
      });
    });

    setBoard(updatedBoard);
    setSelectedPiece(null);
  }

  return <>{buildBoard()}</>;
}
