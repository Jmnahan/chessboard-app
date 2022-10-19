import { useContext } from "react";
import ChessContext from "../Context";
import Board from "./Board";

export default function Chessboard() {
  const { board, turn, hints, setHints, Reset, Fen, setFenVal, fenVal, gameState} = useContext(ChessContext)
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

  const GameOverModal = (props) => {
    const {status, winner} = gameState
    const modal = (
      <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">
                        {status}
                      </h3>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                        {winner}
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-0 fixed inset-0 z-40 bg-black"></div>
            </>
      );

      return(
        modal
      )
  }

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
        <GameOverModal/>
    </div>
    </div>
  )
}