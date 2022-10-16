import Tile from "./Tile"
import Piece from "./Piece"
import { useDrop } from 'react-dnd'
import { useContext } from 'react';
import ChessContext from "../Context";
export default function Square(props) {
  const {piece, bgColor, position} = props
  const { Move, toPromote,} = useContext(ChessContext)

  const [ , drop] = useDrop({
    accept: "piece",
    drop: (item) => {
      const [fromPosition, type, color] = item.id.split("_")
      
      if ((color === 'w' && position.includes("8") )||(color === 'b' && position.includes("1"))) {
        toPromote(fromPosition, position, 'q')
        console.log(true)
      }
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
