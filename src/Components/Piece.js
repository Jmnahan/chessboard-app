import React from "react"
import { useDrag, DragPreviewImage } from "react-dnd"

export default function Piece(props) {
  const { subItems } = props
    const [ { isDragging }, drag, preview ] = useDrag({
    item: {id:`${subItems.type}_${subItems.color}`},
    type: "piece",
    collect: (monitor) => {
      return {isDragging: !!monitor.isDragging() }
    }
    })

  const pieceimg = require(`../assets/Piece=${subItems.type}, Side=${subItems.color}.png`)

  return (
    <>
      <DragPreviewImage connect={preview} src={pieceimg}/>
      <div ref={drag} style={{opacity: isDragging ? 0 : 1}}>
          <img className="pointer-events-none	" src={pieceimg} alt=""/>
      </div>
    </>
  )
}

