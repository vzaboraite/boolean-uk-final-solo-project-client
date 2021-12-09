function getValidMoves(board, currentPosition, selectedPiece) {
  const validMoves = [];
  console.log({ board, currentPosition, selectedPiece });

  const { fromRowIndex, fromColIndex } = currentPosition;

  const moveUp = selectedPiece.color === "black";
  const moveDown = selectedPiece.color === "red";
  console.log({ moveUp, moveDown });

  //  move up-left direction
  if (moveUp) {
    const rowUp = board[fromRowIndex - 1];
    console.log({ rowUp });

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

    //  move up-right direction
    const rightMove = rowUp[fromColIndex + 1];
    const rightCapture = board[fromRowIndex - 2]?.[fromColIndex + 2];
    console.log({ leftMove, rightMove });
    console.log({ leftCapture, rightCapture });

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
  }

  //   move down-left direction
  if (moveDown) {
    const rowDown = board[fromRowIndex + 1];
    console.log({ rowDown });
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

    //  move down-right direction
    const rightMove = rowDown[fromColIndex + 1];
    const rightCapture = board[fromRowIndex + 2]?.[fromColIndex + 2];
    console.log({ leftMove, rightMove });

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
  }

  return validMoves;
}

module.exports = { getValidMoves };
