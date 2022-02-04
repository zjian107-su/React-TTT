import { ReactElement } from "react";
import calculateWinner from "../helperFuncs/index";
import Square from "./Square";

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

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo?.winner;
  const winningSquares = winnerInfo?.line;
  let status: string | null;
  let winningSquaresList: number[] | undefined;
  if (winner) {
    status = "Winner: " + winner;
    // console.log(winningSquaresList);
    winningSquaresList = winningSquares;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="flex flex-col">
      <div className="ml-1">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          <a
            href="https://github.com/zjian107-su/React-TTT"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-800 hover:underline"
          >
            GitHub Repo
          </a>
        </h1>
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          {status}
        </h1>
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          {`Tile order numbers ${winningSquaresList} are marked green`}
        </h1>
      </div>
      <div className="mt-2 flex justify-center items-center ">
        <div></div>
        <div className="border-amber-900">
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
                      order={i * 3 + j}
                      onSquareClick={() => handleClick(i * 3 + j)}
                      winningSquaresList={winningSquaresList}
                    />
                  ))}
              </div>
            ))}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Board;
