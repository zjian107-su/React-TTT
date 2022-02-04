import { useState } from "react";
import Board from "./Board";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]); // board state
  const [currentMove, setCurrentMove] = useState(0); // current move [0, 1, 2, 3, 4, 5, 6, 7, 8 ] To track the current viewing step
  const xIsNext = currentMove % 2 === 0; // to track who's turn it is
  const currentSquares = history[currentMove];
  const [isAscending, setIsAscending] = useState(true); // to track the order of the moves

  function handlePlay(nextSquares: string[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const jumpTo = (nextMove: number) => {
    setCurrentMove(nextMove);
  };

  const moves = history.map((_, move) => {
    let description;
    if (move === 0) {
      description = "Go to game start";
    } else if (move === currentMove) {
      description = `You are at move #${move}`;
    } else {
      description = `Go to move #${move}:   (${Math.floor(move / 3) + 1}, ${
        (move % 3) + 1
      })`;
    }

    return (
      <li key={move}>
        <button
          className="w-64 mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transform transition-transform duration-200 hover:-translate-y-1"
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="flex flex-col items-center sm:flex-row sm:items-start mt-16 justify-around mx-8">
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      {/* <div className="ml-4 sm:ml-16 mt-16 "> */}
      <div className="ml-4 sm:ml-16 mt-16 overflow-y-auto max-h-[50vh]">
        <div className="mb-8">
          <button
            className="w-64 mb-1 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transform transition-transform duration-200 active:translate-y-1"
            onClick={() => setIsAscending(!isAscending)}
          >
            {isAscending ? "Sort Descending" : "Sort Ascending"}
          </button>
        </div>
        <ol className="list-decimal">
          {isAscending ? moves : moves.reverse()}
        </ol>
      </div>
    </div>
  );
};

export default Game;
