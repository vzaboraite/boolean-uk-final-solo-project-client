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

    if (leftMove === null) {
      validMoves.push({
        toRowIndex: fromRowIndex - 1,
        toColIndex: fromColIndex - 1,
      });
    }

    const rightMove = rowUp[fromColIndex + 1];
    console.log({ leftMove, rightMove });
  }
  return validMoves;
}

module.exports = { getValidMoves };
