
export default function Tile(props) {
  const { children, bgColor } = props

  const bgClass = bgColor ? "bg-black" : "bg-white"

  return (
    <div className={`${bgClass} board-square flex justify-center items-center`}>{children}</div>
  )
}
