import { useDrag, DragPreviewImage } from 'react-dnd'
import { useContext, useEffect, useState } from 'react';
import ChessContext from "../Context";

export default function Piece(props) {
  const { piece: {type, color}, position } = props
  const { GetMoves, DraggingValue } = useContext(ChessContext)
  const [ dragging, setDragging ] = useState(false)

  const [ { isDragging, item}, drag, preview] = useDrag({
    item: {id: `${position}_${type}_${color}` },
    type: "piece",
    collect: monitor => ({
      item: monitor.getItem(type),
      isDragging: !!monitor.isDragging(),
    })
  })

  useEffect(() => { 
    setDragging(isDragging)
    DraggingValue(isDragging)
    if(isDragging) {
      GetMoves(isDragging, item )
    }
  },[isDragging])

  const pieceimg = require(`../assets/Piece=${type}, Side=${color}.png`)
  
  return (
    <>
    <DragPreviewImage connect={preview} src={pieceimg}/>
    <div className="w-full h-full flex justify-center items-center" ref={drag}
      style={{backgroundColor: dragging ? "#b1a7fc" : "transparent"}}>
      <img className="hover:cursor-grab active:cursor-grabbing" src={pieceimg} alt="" />
    </div>
    </>
    
  )
}
