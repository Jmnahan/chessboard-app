import Tile from "./Tile"
import Piece from "./Piece"
import { useDrop } from 'react-dnd'
import { useContext } from 'react';
import ChessContext from "../Context";

export default function Square(props) {
  const {piece, bgColor, position} = props
  const { Move, tiles } = useContext(ChessContext)

  const [ , drop] = useDrop({
    accept: "piece",
    drop: (item) => {
      const [fromPosition] = item.id.split("_")
      Move(fromPosition, position)
    }
  })
  
  return (
    <div className="board-square relative" ref={drop}>
      <Tile bgColor={bgColor} tiles={tiles}>
        <span className="hidden absolute w-8 h-8 rounded-full" id={`${position}`}></span>
        { piece && <Piece piece={piece} position={position}/>}
      </Tile>
    </div>
  )
}
