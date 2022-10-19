import { createContext, useRef, useState, useEffect } from "react";
import { Chess } from "chess.js"
const ChessContext = createContext();
const FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export function ChessProvider({children}){
  const [fen, setFen] = useState(FEN)
  const {current: chess } = useRef(new Chess(fen))
  const [ board, setBoard ] = useState(chess.board()) 
  const [ tiles, setTiles ] = useState([])
  const [ dragVal, setDragVal ] = useState(false)
  const [ hints, setHints ] = useState(false) 
  const [ fenVal, setFenVal ] = useState("")
  const [kingWarn,setKingWarn] = useState({})
  const [gameState, setGameState] = useState(
  { 
    status:'test',
    winner:'habanero',
  })
  const [piecePromote, setPiecePromote] = useState(false)

  const turn = chess.turn()
  useEffect(()=> {
    kingCheck(board)
    checkGameState(chess)
  },[chess, board])

  const checkGameState = (chess) => {
    let endTurn = ''

    if(turn ==='b') {
      endTurn = 'White'
    }
    else {
      endTurn = 'Black'
    }
    console.log(chess.isCheckmate())
    if(chess.isCheckmate()) {
      setGameState({ status:'GameOver', winner:`${endTurn} wins` })
      
    }

    else if(chess.isDraw()) {
      setGameState({ status:'GameOver', winner:`Game is a Draw` })
      console.log(true)
    }
  } 

  const kingCheck = (board) => {
   let flatBoard = board?.flat()

   let king = {}
   if (turn === 'b') {
      if(chess.inCheck()){
       king = flatBoard.find(item => item?.type === 'k' && item?.color === turn)
      }
   }
   else {
    if(chess.inCheck()){
      king = flatBoard.find(item => item?.type === 'k' && item?.color === turn)
    }
  }
  setKingWarn(king)
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
      setPiecePromote(false)
    }
    
  }

  const Fen = () => {
    chess.load(fenVal)
    setBoard(chess.board())
    setFenVal("")
  }

  const GetMoves = ( isDragging, item ) => {
    if(isDragging) {
      const [fromPosition] = item.id.split("_")
      const legalMoves = (chess.moves({ square: fromPosition}))
      setTiles(legalMoves)
    } 
  }

  const DraggingValue = (dragVal) => {
    setDragVal(dragVal)
  }

  const Reset = () => {
    chess.reset()
    setBoard(chess.board())
  }

  const GetDots = (children) => {
    let ids = (children[0].props.id)
    if(dragVal && hints === true) {
      const dot = tiles.map((items) => {
        if(items.length > 2) {
          let newItem = items.slice(-2)
          if(newItem === ids) {
            return (<span className="absolute bg-active w-8 h-8 rounded-full" key={newItem}></span>)
          }
        } else if(items === ids) {
          return (<span className="absolute bg-active w-8 h-8 rounded-full" key={items}></span>)
        } 
      })
      return(dot)
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
        kingWarn,
        getCoor,
        GetMoves,
        turn,
        Move,
        Reset,
        DraggingValue,
        setHints,
        GetDots,
        hints,
        dragVal,
        tiles,
        fenVal,
        setFenVal,
        Fen,
        setTiles,
        toPromote,
        getBgColor,
        getPosition,
        setKingWarn,
        piecePromote,
        setPiecePromote,
        gameState
      }
      }>{children}
    </ChessContext.Provider>
  )
}

export default ChessContext;