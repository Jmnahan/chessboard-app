import Tile from "./Tile"
import Piece from "./Piece"
import { useDrop } from 'react-dnd'
import { useContext, useState } from 'react';
import ChessContext from "../Context";
import PromotionModal from "./PromotionModal";

export default function Square(props) {
  const {piece, bgColor, position} = props
  const { Move, tiles} = useContext(ChessContext)
  const [openModal, setOpenModal] = useState(false)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const [ , drop] = useDrop({
    accept: "piece",
    drop: (item) => {
      const [fromPosition, type, color] = item.id.split("_")
      
      if ((color === 'w' && type === 'p' && position.includes("8") )||(color === 'b' && type === 'p' && position.includes("1"))) {
        setOpenModal(true)
        setFrom(fromPosition)
        setTo(position)
      }
      Move(fromPosition, position)
      setFrom(fromPosition)
      setTo(position)
    }
  })
  
  return (
    <div className="board-square relative" ref={drop}>
      <PromotionModal from ={from} to={to} openModal={openModal} setOpenModal={setOpenModal}/>
      <Tile bgColor={bgColor} tiles={tiles} position={`${position}`}>
        <span className="hidden absolute w-8 h-8 rounded-full" id={`${position}`}></span>
        { piece && <Piece piece={piece} position={position}/>}
      </Tile>
    </div>
  )
}
