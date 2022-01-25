import { useState, ReactElement } from "react";

function App() {
  return (
    <div className="w-screen h-screen bg-red-300">
      {/* <h1 className="text-3xl font-bold underline">Daniel's Tic Tac Toe App</h1> */}
      <blockquote className="pt-6 mb-6 text-3xl font-semibold italic text-center ">
        <span className="mr-2">✨ Daniel's</span>
        <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block">
          <span className="relative text-white tracking-tight">
            Tic Tac Toe
          </span>
        </span>
        <span className="ml-2">App ✨</span>
      </blockquote>
      <Game />
    </div>
  );
}

const Square = (props: { value: string; onSquareClick: () => void }) => {
  return (
    <button
      className="w-32 h-32 bg-transparent hover:bg-blue-500 text-blue-700 font-bold hover:text-white border-2 border-blue-500 px-3 py-5 hover:border-transparent"
      onClick={props.onSquareClick}
    >
      <span className="text-[60px] font-extrabold">{props.value}</span>
    </button>
  );
};

const Board = ({
  xIsNext,
  squares,
  onPlay,
}: {
  xIsNext: boolean;
  squares: string[];
  onPlay: (squares: string[]) => void;
}): ReactElement => {
  // handle click
  const handleClick = (i: number) => {
    if (squares[i] || calculateWinner(squares)) return; // so it doesn't overwrite existing squares
    const nextSquares = [...squares];
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  };

  const winner = calculateWinner(squares)?.winner;
  const winningSquares = calculateWinner(squares)?.line;
  let status;
  let winningSqares;
  if (winner) {
    status = "Winner: " + winner;
    winningSqares = winningSquares;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="flex flex-col">
      <div className="ml ">
        <h1 className="text-4xl font-bold text-gray-800">{status}</h1>
        <h1 className="text-4xl font-bold text-gray-800">
          The winning squares are: {winningSqares}
        </h1>
      </div>
      <div>
        {Array(3)
          .fill(null)
          .map((_, i) => (
            <div className="flex items-center" key={i}>
              {Array(3)
                .fill(null)
                .map((_, j) => (
                  <Square
                    key={j}
                    value={squares[i * 3 + j]}
                    onSquareClick={() => handleClick(i * 3 + j)}
                  />
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};

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

  const moves = history.map((squares, move) => {
    let description;
    if (move === 0) {
      description = "Go to game start";
    } else if (move === currentMove) {
      description = `You are at move #${move}`;
    } else {
      description = "Go to move #" + move;
    }

    return (
      <li key={move}>
        <button
          className="w-64 mb-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="flex mt-16 justify-around">
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      <div className="ml-16">
        <div className="mb-16">
          <button
            className="w-64 mb-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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

const calculateWinner = (
  squares: string[]
): { winner: string; line: number[] } | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
};

export default App;
