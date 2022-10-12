import { createContext, useState } from "react";
import { Chess } from "chess.js"
const ChessContext = createContext();

export function ChessProvider({children}){
  const chess = new Chess()
  const [ board, setBoard ] = useState(chess.board()) 

  const Move = (from, to) => {  
    const legalMove = chess.move({from, to}) 
    if(legalMove) {
      setBoard(chess.board())
    }
  }

  const getCoor = (subIndex, index) => {
    const x = (subIndex) % 8;
    const y = Math.abs(Math.floor((index) % 8) - 7)
    return {x, y}
  }

  const getBgColor = (subIndex, index) => {
    return (subIndex + index) % 2 === 0
  }

  const getPosition = (subIndex, index) => {
    const {x, y} = getCoor(subIndex, index)
    const letter = ["a", "b", "c", "d", "e", "f", "g", "h"][x]
    return `${letter}${y+1}`
  }

  return(
    <ChessContext.Provider 
      value={
        {board, 
        getCoor,
        Move,
        getBgColor,
        getPosition}
      }>{children}
    </ChessContext.Provider>
  )
}

export default ChessContext;