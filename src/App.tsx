function App() {
  return (
    <div className="w-screen h-screen bg-red-300">
      <h1 className="text-3xl font-bold underline">Daniel's Tic Tac Toe App</h1>
      <Board />
    </div>
  );
}

const Square = (props: { value: string }) => {
  function handleClick() {
    console.log("Clicked " + props.value);
  }

  return (
    <>
      <button
        className="w-16 h-16  item-center bg-transparent hover:bg-blue-500 text-blue-700 font-bold hover:text-white border-2 border-blue-500  py-3 px-5 hover:border-transparent"
        onClick={handleClick}
      >
        {props.value}
      </button>
    </>
  );
};

const Board = () => {
  return (
    <>
      <div>
        <Square value="1" />
        <Square value="2" />
        <Square value="3" />
      </div>
      <div>
        <Square value="4" />
        <Square value="5" />
        <Square value="6" />
      </div>
      <div>
        <Square value="7" />
        <Square value="8" />
        <Square value="9" />
      </div>
    </>
  );
};

export default App;
