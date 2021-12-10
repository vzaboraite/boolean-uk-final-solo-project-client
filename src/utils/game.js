function getValidMoves(board, selectedPiece) {
  console.log({ board, selectedPiece });

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

  const rightMove = rowUp[fromColIndex + 1];
  const rightCapture = board[fromRowIndex - 2]?.[fromColIndex + 2];

  if (!rowUp) {
    return validMoves;
  }

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

  const leftMove = rowUp[fromColIndex - 1];
  const leftCapture = board[fromRowIndex - 2]?.[fromColIndex - 2];

  if (!rowUp) {
    return validMoves;
  }

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

module.exports = { getValidMoves };
