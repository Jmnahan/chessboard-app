import { useContext } from "react";
import ChessContext from "../Context";
import Board from "./Board";

export default function Chessboard() {
  const { board, turn, hints, setHints, Reset, Fen, setFenVal, fenVal } = useContext(ChessContext)
  const isOn = hints ? "ON" : "OFF"
  const YAxis = [1, 2, 3, 4, 5, 6, 7, 8];
  const XAxis = ["", "a", "b", "c", "d", "e", "f", "g", "h"];

  const numbers = YAxis.reverse().map((numbers) => {
    return(<div className={`vertical-${numbers} bg-coor flex justify-center items-center text-md font-medium text-piece`} key={numbers}>{numbers}</div>)
  })

  const letters = XAxis.map((letters) => {
    return(<div className={`horizontal-${letters} bg-coor flex justify-center items-center text-md font-medium text-piece`} key={letters}>{letters}</div>)
  })

  const isTurned = (turn) => {
    if(turn === "w") {
      return <span className="text-white">White</span>
    } else return <span className="text-Black">Black</span>
  }

  const mapping = board.map((items, index) => {
    return (
      <Board 
        key={index}
        items={items}
        index={index}
      />
    )
  })

  return (
    <div className="container">
      {numbers}
    <section className="chessboard border-t-2 border-r-2 border-black_tile">
      {mapping}
    </section>
      {letters}
    <div className="side text-piece">
      <div className="text-3xl font-semibold bg-black_tile text-center">Turn: 
       <span>{isTurned(turn)}</span>
      </div>
      <button className="text-3xl font-semibold bg-black_tile text-center w-full" 
        onClick={() => setHints(prevHints => !prevHints)}>Hints: {isOn}
      </button>
      <button className="text-3xl font-semibold bg-black_tile text-center w-full" 
        onClick={() => Reset() }>Reset
      </button>
        <input
          type="text"
          value={fenVal}
          placeholder="Enter FEN"
          onChange={(event) => setFenVal(event.target.value)}
        />
        <button className="text-3xl font-semibold bg-black_tile text-center w-full" 
          onClick={() => Fen() }>Clickity
        </button>
    </div>
    </div>
  )
}