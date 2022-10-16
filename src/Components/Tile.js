import { useContext } from "react"
import ChessContext from "../Context";

export default function Tile(props) {
  const { children, bgColor } = props
  const { GetDots } = useContext(ChessContext)

  const bgClass = bgColor ? "bg-black_tile" : "bg-white_tile"
  let dotVal = GetDots(children)

  
  return (
    <div className={`${bgClass} board-square flex justify-center items-center`}>
      {children}
      {dotVal}
      </div>
  )
}
