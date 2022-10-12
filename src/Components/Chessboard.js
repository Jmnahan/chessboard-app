import { useContext } from "react";
import ChessContext from "../Context";
import Board from "./Board";

export default function Chessboard() {
  const { board } = useContext(ChessContext)

  const mapping = board.map((items, index) => {
    return (
      <Board 
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