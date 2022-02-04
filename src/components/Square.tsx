const Square = (props: {
  value: string;
  order: number;
  onSquareClick: () => void;
  winningSquaresList: number[] | undefined;
}) => {
  const isWinningSquare = props.winningSquaresList?.includes(props.order);
  const squareStyle = isWinningSquare ? "bg-green-500" : "";

  return (
    <div bg-transparent>
      <button
        className={`${squareStyle} w-24 h-24 md:w-32 md:h-32 hover:bg-blue-500 text-blue-700 font-bold hover:text-white border-2 border-blue-500 px-3 py-5 hover:border-transparent transform transition-transform duration-300 hover:scale-105`}
        onClick={props.onSquareClick}
      >
        <span className="text-4xl lg:text-[60px] font-extrabold">
          {props.value}
        </span>
      </button>
    </div>
  );
};

export default Square;
