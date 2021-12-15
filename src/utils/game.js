const initialBoard = [
  [null, "red", null, "red"],
  [null, null, null, null],
  [null, null, null, null],
  ["black", null, "black", null],
];

function getValidMoves(board, selectedPiece) {
  console.log({ board, selectedPiece });
  if (!selectedPiece) {
    return [];
  }
  switch (selectedPiece.color) {
    case "red":
      return getValidMovesDown(board, selectedPiece);
    case "black":
      return getValidMovesUp(board, selectedPiece);
    default:
      return [];
  }
}

function getValidMovesUp(board, selectedPiece) {
  const validMoves = [];
  const moveUp = selectedPiece.color === "black";

  if (moveUp) {
    const movesUpRight = getValidMovesUpRight(board, selectedPiece);
    const movesUpLeft = getValidMovesUpLeft(board, selectedPiece);

    return [...movesUpRight, ...movesUpLeft];
  }
  return validMoves;
}

function getValidMovesUpRight(board, selectedPiece) {
  const validMoves = [];
  const { rowIndex: fromRowIndex, colIndex: fromColIndex } = selectedPiece;
  const rowUp = board[fromRowIndex - 1];

  if (!rowUp) {
    return validMoves;
  }

  const rightMove = rowUp[fromColIndex + 1];
  const rightCapture = board[fromRowIndex - 2]?.[fromColIndex + 2];

  if (rightMove === null) {
    validMoves.push({
      toRowIndex: fromRowIndex - 1,
      toColIndex: fromColIndex + 1,
    });
  } else if (rightMove === "red" && rightCapture === null) {
    validMoves.push({
      toRowIndex: fromRowIndex - 2,
      toColIndex: fromColIndex + 2,
      capturePiece: {
        rowIndex: fromRowIndex - 1,
        colIndex: fromColIndex + 1,
      },
    });
  }
  return validMoves;
}

function getValidMovesUpLeft(board, selectedPiece) {
  const validMoves = [];
  const { rowIndex: fromRowIndex, colIndex: fromColIndex } = selectedPiece;
  const rowUp = board[fromRowIndex - 1];

  if (!rowUp) {
    return validMoves;
  }

  const leftMove = rowUp[fromColIndex - 1];
  const leftCapture = board[fromRowIndex - 2]?.[fromColIndex - 2];

  if (leftMove === null) {
    validMoves.push({
      toRowIndex: fromRowIndex - 1,
      toColIndex: fromColIndex - 1,
    });
  } else if (leftMove === "red" && leftCapture === null) {
    validMoves.push({
      toRowIndex: fromRowIndex - 2,
      toColIndex: fromColIndex - 2,
      capturePiece: {
        rowIndex: fromRowIndex - 1,
        colIndex: fromColIndex - 1,
      },
    });
  }
  return validMoves;
}

function getValidMovesDown(board, selectedPiece) {
  const validMoves = [];
  const moveDown = selectedPiece.color === "red";

  if (moveDown) {
    const movesDownLeft = getValidMovesDownLeft(board, selectedPiece);

    const movesDownRight = getValidMovesDownRight(board, selectedPiece);
    return [...movesDownLeft, ...movesDownRight];
  }
  return validMoves;
}

function getValidMovesDownLeft(board, selectedPiece) {
  const validMoves = [];
  const { rowIndex: fromRowIndex, colIndex: fromColIndex } = selectedPiece;
  const rowDown = board[fromRowIndex + 1];

  if (!rowDown) {
    return validMoves;
  }

  const leftMove = rowDown[fromColIndex - 1];
  const leftCapture = board[fromRowIndex + 2]?.[fromColIndex - 2];

  if (leftMove === null) {
    validMoves.push({
      toRowIndex: fromRowIndex + 1,
      toColIndex: fromColIndex - 1,
    });
  } else if (leftMove === "black" && leftCapture === null) {
    validMoves.push({
      toRowIndex: fromRowIndex + 2,
      toColIndex: fromColIndex - 2,
      capturePiece: {
        rowIndex: fromRowIndex + 1,
        colIndex: fromColIndex - 1,
      },
    });
  }
  return validMoves;
}

function getValidMovesDownRight(board, selectedPiece) {
  const validMoves = [];
  const { rowIndex: fromRowIndex, colIndex: fromColIndex } = selectedPiece;
  const rowDown = board[fromRowIndex + 1];

  if (!rowDown) {
    return validMoves;
  }

  const rightMove = rowDown[fromColIndex + 1];
  const rightCapture = board[fromRowIndex + 2]?.[fromColIndex + 2];
  console.log({ rightMove });

  if (rightMove === null) {
    validMoves.push({
      toRowIndex: fromRowIndex + 1,
      toColIndex: fromColIndex + 1,
    });
  } else if (rightMove === "black" && rightCapture === null) {
    validMoves.push({
      toRowIndex: fromRowIndex + 2,
      toColIndex: fromColIndex + 2,
      capturePiece: {
        rowIndex: fromRowIndex + 1,
        colIndex: fromColIndex + 1,
      },
    });
  }

  return validMoves;
}

function getMovesFromString(moves) {
  if (!moves) {
    return [];
  }

  return moves.split("|").map((move, i) => {
    const [from, to] = move.split("-");
    const [fromX, fromY] = from.split(",").map((num) => parseInt(num));
    const [toX, toY] = to.split(",").map((num) => parseInt(num));

    const isCapture = Math.abs(fromX - toX) === 2;
    let capturePiece;

    if (isCapture) {
      const captureX = fromX - toX > 0 ? fromX - 1 : fromX + 1;
      const captureY = fromY - toY > 0 ? fromY - 1 : fromY + 1;
      capturePiece = { captureX, captureY };
    }

    return {
      fromX,
      fromY,
      toX,
      toY,
      color: i % 2 === 0 ? "red" : "black",
      capturePiece,
    };
  });
}

function applyMoves(initialBoard, moves) {
  let board = cloneBoard(initialBoard);

  moves.forEach((move) => {
    board = board.map((row, y) => {
      return row.map((square, x) => {
        if (move.fromY === y && move.fromX === x) {
          return null;
        }

        if (move.toY === y && move.toX === x) {
          return move.color;
        }

        if (
          move.capturePiece &&
          move.capturePiece.captureY === y &&
          move.capturePiece.captureX === x
        ) {
          return null;
        }

        return square;
      });
    });
  });

  return board;
}

function cloneBoard(initialBoard) {
  return initialBoard.map((row) => [...row]);
}

module.exports = {
  initialBoard,
  getValidMoves,
  applyMoves,
  getMovesFromString,
};
