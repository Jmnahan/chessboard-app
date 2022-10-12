import Piece from "./Piece"

export default function Tile(props) {
  const { items, index } = props

  const ItemsMapping = items.map((subItems, subIndex) => {
    if(subItems === null) {
      if((subIndex + index) % 2 === 0) {
        return <div className="flex justify-center items-center bg-black"
        key={subIndex}></div>
      } else {
        return <div className="flex justify-center items-center bg-white" 
        key={subIndex}></div>
      }
    } else {
      if((subIndex + index) % 2 === 0) {
        return <div className="flex justify-center items-center hover:cursor-grab active:cursor-grabbing bg-black" 
        key={subIndex}>
          <Piece subItems={subItems}/>
        </div>
      } else {
        return <div className="flex justify-center items-center hover:cursor-grab active:cursor-grabbing bg-white" 
        key={subIndex}>
          <Piece subItems={subItems}/>
        </div>
      }
    }
  })

  return <>
    {ItemsMapping}
  </>
}

