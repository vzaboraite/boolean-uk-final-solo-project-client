export default function GameBoard() {
  const initialBoard = [
    [null, "red", null, "red"],
    [null, null, null, null],
    [null, null, null, null],
    ["black", null, "black", null],
  ];

  function buildRow(row, index) {
    const rowSquares = row.map((square, i) => (
      <div
        className={`board-square ${
          (index + i) % 2 === 0 ? "sq-color__white" : "sq-color__grey"
        }`}
      >
        {drawPiece(square)}
      </div>
    ));

    return <div className="row">{rowSquares}</div>;
  }

  function buildBoard() {
    const boardRows = initialBoard.map((row, index) => buildRow(row, index));
    return <div className="board">{boardRows}</div>;
  }

  function drawPiece(square) {
    return (
      <div
        className={`piece ${
          square !== null && (square === "red" ? "piece__red" : "piece__black")
        }`}
      ></div>
    );
  }

  return <>{buildBoard()}</>;
}
