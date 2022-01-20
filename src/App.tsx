import { useState, ReactElement } from "react";

function App() {
  return (
    <div className="w-screen h-screen bg-red-300">
      <h1 className="text-3xl font-bold underline">Daniel's Tic Tac Toe App</h1>
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
  setXIsNext,
  setSquares,
}: {
  xIsNext: boolean;
  squares: string[];
  setXIsNext: React.Dispatch<React.SetStateAction<boolean>>;
  setSquares: React.Dispatch<React.SetStateAction<string[]>>;
}): ReactElement => {
  // get the winner
  const calculateWinner = (squares: string[]): string | null => {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  // handle click
  const handleClick = (i: number) => {
    if (squares[i] || calculateWinner(squares)) return; // so it doesn't overwrite existing squares

    const nextSquares = [...squares];
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  return (
    <div className="flex mt-16">
      <div>
        <div className="flex items-center">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="flex items-center">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="flex items-center">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
      <div className="ml-16">
        <h1>
          {calculateWinner(squares)
            ? `Winner is ${calculateWinner(squares)}`
            : "No Winner Yet"}
        </h1>
      </div>
    </div>
  );
};

const Game = () => {
  const [xIsNext, setXIsNext] = useState(true); // order tracking
  const [squares, setSquares] = useState(Array(9).fill("")); // board state

  return (
    <Board
      xIsNext={xIsNext}
      squares={squares}
      setXIsNext={setXIsNext}
      setSquares={setSquares}
    />
  );
};

export default App;
