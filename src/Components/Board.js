import Square from "./Square"
import { useContext } from "react";
import ChessContext from "../Context";

export default function Board(props) {
  const { items, index } = props 
  const { getBgColor, getPosition } = useContext(ChessContext)

  const ItemsMapping = items.map((subItems, subIndex) => {
    return(<div key={subIndex}>
      <Square
       piece={subItems}
       bgColor={getBgColor(subIndex, index)}
       position={getPosition(subIndex, index)}
      />
    </div>)
  })

  return <>
    {ItemsMapping}
  </>
}

