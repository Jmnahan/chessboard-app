
export default function CustomModal(props) {
  const { openModal, HandleTimer, setTime } = props

  return (
    <div className="absolute top-0">
      {openModal && 
      <form className="bg-white p-2" onSubmit={HandleTimer}>
        <input
        className="outline-none bg-white_tile text-center w-full p-1 text-md"
        type="number"
        placeholder="Enter time in minute(s)"
        onChange={(event) => setTime(event.target.value)}
        />
        <button className=" bg-active font-medium w-full p-1 hover:text-white_tile">Set Timer</button>
      </form>
      }
    </div>
    
  )
}
