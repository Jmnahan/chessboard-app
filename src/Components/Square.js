import Tile from "./Tile"
import Piece from "./Piece"
import { useDrop } from 'react-dnd'
import { useContext } from 'react';
import ChessContext from "../Context";

export default function Square(props) {
  const {piece, bgColor, position} = props
  const { Move } = useContext(ChessContext)

  const [ , drop] = useDrop({
    accept: "piece",
    drop: (item) => {
      const [fromPosition] = item.id.split("_")
      Move(fromPosition, position)
      console.log(fromPosition, position)
    }
  })

  return (
    <div className="board-square" ref={drop}>
      <Tile bgColor={bgColor}>
        { piece && <Piece piece={piece} position={position}/>}
      </Tile>
    </div>
  )
}
