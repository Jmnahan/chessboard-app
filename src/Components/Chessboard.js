import { Chess } from "chess.js"
import Tile from "./Tile";

export default function Chessboard() {
  const chess = new Chess()
  const board = chess.board()

  const mapping = board.map((items, index) => {
    return (
      <Tile 
        key={index}
        items={items}
        index={index}
      />
    )
  })

  return (
    <>
      <section className="chessboard">
        {mapping}
      </section>
    </>
  )
}