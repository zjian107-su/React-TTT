import { useState } from "react";
import Board from "./components/Board";
import Game from "./components/Game";

function App() {
  return (
    <div className="w-screen min-h-screen bg-red-300">
      {/* <h1 className="text-3xl font-bold underline">Daniel's Tic Tac Toe App</h1> */}
      <blockquote className="pt-6 mb-6 md:text-4xl text-xl font-semibold italic text-center">
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

export default App;
