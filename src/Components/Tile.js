import { useContext} from "react"
import ChessContext from "../Context";

export default function Tile(props) {
  const { children, bgColor, position } = props
  const { GetDots, kingWarn } = useContext(ChessContext)
  let bgClass = bgColor ? "bg-black_tile" : "bg-white_tile"
  let dotVal = GetDots(children)
  const {square} = kingWarn

  const markKing = () => {
    if (position === square) {
      bgClass = "bg-red-500"
    }
  }

  markKing()

  return (
    <div className={`${bgClass} board-square flex justify-center items-center`} id ={position}>
      {children}
      {dotVal}
    </div>
  )
}
