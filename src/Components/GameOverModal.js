import { useContext } from "react";
import ChessContext from "../Context";

const GameOverModal = () => {
  const {gameState, gameOver, Reset} = useContext(ChessContext)
    const {status, winner} = gameState
    const modal = (
      <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-center justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">
                        {status}
                      </h3>
                    </div>
                    {/*body*/}
                    <div className="relative m-auto p-6 flex-auto items-center justify-center font-bold">
                        {winner}
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end m-auto p-5 border-t border-solid border-slate-200 rounded-b">
                    <button className = "bg-slate-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={Reset}>New Game?</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-0 fixed inset-0 z-40 bg-black"></div>
            </>
      );
      return(
        gameOver ? modal : null
      )
  }

export default GameOverModal