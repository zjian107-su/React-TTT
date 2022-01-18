import { useState } from "react";

function App() {
  return (
    <div className="w-screen h-screen bg-red-300">
      <h1 className="text-3xl font-bold underline">Daniel's Tic Tac Toe App</h1>
      <Board />
    </div>
  );
}

const Square = (props: { value: string; onSquareClick: () => void }) => {
  return (
    <>
      <button
        className="w-32 h-32 bg-transparent hover:bg-blue-500 text-blue-700 font-bold hover:text-white border-2 border-blue-500 px-3 py-5 hover:border-transparent"
        onClick={props.onSquareClick}
      >
        <span className="text-[60px] font-extrabold">{props.value}</span>
      </button>
    </>
  );
};

const Board = () => {
  const [xIsNext, setXIsNext] = useState(true); // order tracking
  const [squares, setSquares] = useState(Array(9).fill("")); // board state

  const handleClick = (i: number) => {
    if (squares[i]) return; // so it doesn't overwrite existing squares

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
    <>
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
    </>
  );
};

export default App;
