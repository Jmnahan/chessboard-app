import { createContext, useEffect, useRef, useState } from "react";
import { Chess } from "chess.js"
const ChessContext = createContext();
const FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export function ChessProvider({children}){
  const [fen, setFen] = useState(FEN)
  const [piecePromote, setPiecePromote] = useState()
  const {current: chess} = useRef(new Chess(fen))
  const [ board, setBoard ] = useState(chess.board()) 

  useEffect(()=> {
    checkGameState(chess)
    kingCheck(board)
  },[chess,fen])

  const checkGameState = (chess) => {
    if(chess.isCheckmate()) {
      console.log(chess.isGameOver())
    }

    else if(chess.isDraw()) {
      console.log(true)
    }

    if(chess.isStalemate()) {
      console.log(true)
    }
      console.log(false)
  } 

  const kingCheck = (board) => {
   let flatBoard = board.flat()

   flatBoard.map(item => {
    if(chess.isCheck()) {
      if((item?.color === 'b' && item?.type === 'k')|| (item?.color === 'w' && item?.type === 'k')){
        console.log(37, item)
      }
    }
    
   })
  }

  const Move = (from, to) => {  
    const legalMove = chess.move({from, to}) 
    if(legalMove) {
      setBoard(chess.board())
      setFen(chess.fen())
    }
  }

  const toPromote = (from, to, item) => {
    const promotionMove = chess.move({from, to, promotion: item})

    if (promotionMove) {
      setBoard(chess.board())
      setPiecePromote(null)
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
        toPromote,
        getBgColor,
        getPosition,
      }
      }>{children}
    </ChessContext.Provider>
  )
}

export default ChessContext;