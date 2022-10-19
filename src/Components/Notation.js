import ChessContext from "../Context";
import { useContext, useEffect, useState } from "react";

export default function Notation() {
  const { movesArr, Reset, fenVal, setFenVal, Fen } = useContext(ChessContext)
  const [ whiteData, setWhiteData ] = useState([])
  const [ blackData, setBlackData ] = useState([])

  useEffect(() => {
    let x = movesArr.filter((element, index) => {
      return index % 2 === 0  
    })
    setWhiteData(x)
    let y = movesArr.filter((element, index) => {
      return index % 2 === 1
    })
    setBlackData(y)
  },[movesArr])

  const whiteRow = whiteData.map((items, index) => {
    return (<p key={index+1} className="border-b-2 border-r-2 font-medium border-active">{items}</p>)})

  const blackRow = blackData.map((items, index) => {
    return (<p key={index+2} className="border-b-2 border-active font-medium">{items}</p>)})

  return (
  <>
  <input
    className="w-full h-8 outline-none text-center border-x-2 border-black_tile"
    type="text"
    value={fenVal}
    placeholder="Enter FEN"
    onChange={(event) => setFenVal(event.target.value)}
  />
  <button className="text-2xl font-semibold bg-active text-center w-full hover:text-white_tile" 
    onClick={() => Fen() }>Load FEN
  </button>
  <section className="flex flex-col w-full items-center border-active border-2 bg-black_tile overflow-y-auto h-2/5">
    <div className="flex text-2xl justify-evenly font-medium p-2 border-b-active border-b-2 w-full">
      <h2 className="text-white_tile">White</h2>
      <h2>Black</h2>
    </div>
    <div className="flex justify-center text-center w-full">
      <div className="w-3/6">
        {whiteRow}
        </div>
      <div className="w-3/6">
        {blackRow}
        </div>
    </div>
  </section>
  <button className="text-3xl font-semibold hover:text-white_tile text-center w-full bg-active p-3" 
    onClick={() => Reset() }>Reset Board
  </button>
  </>
  )
}