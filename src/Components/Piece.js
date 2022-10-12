import { useDrag, DragPreviewImage } from 'react-dnd'

export default function Piece(props) {
  const { piece: {type, color}, position } = props

  const [ { isDragging }, drag, preview] = useDrag({
    item: {id: `${position}_${type}_${color}`},
    type: "piece",
    collect: (monitor) => {
      return {isDragging: !!monitor.isDragging()}
    }
  })

  const pieceimg = require(`../assets/Piece=${type}, Side=${color}.png`)
  return (
    <>
    <DragPreviewImage connect={preview} src={pieceimg}/>
    <div className="" style={{opacity: isDragging ? 0 : 1}}>
        <img src={pieceimg} alt="" ref={drag}/>
      </div>
    </>
  )
}
