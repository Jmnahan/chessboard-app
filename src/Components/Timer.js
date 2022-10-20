import { useState, useEffect, useContext } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ChessContext from "../Context";
import { faPlay, faPause, faRotateRight, faGear } from "@fortawesome/free-solid-svg-icons"
import CustomModal from "./CustomModal"

export default function Timer() {
  const { 
    turn, 
    player1, 
    player2, 
    setPlayer1, 
    setPlayer2,  
    P1seconds,
    setP1Seconds,
    P2seconds,
    setP2Seconds,
    boardReset, 
    start, 
    setStart, 
    setGameOver } = useContext(ChessContext)
  const [ P1minutes, setP1Minutes ] = useState(0);
  const [ P1hour, setP1Hour ] = useState(0);
  const [ P2minutes, setP2Minutes ] = useState(0);
  const [ P2hour, setP2Hour ] = useState(0);
  const [ time, setTime] = useState(0)
  const [ openModal, setOpenModal ] = useState(false)
  const [ toggle, setToggle ] = useState(true)
  const [ pause, setPause ] = useState(false)
  
  useEffect(()=> {
    if(toggle && !pause && start) {
      const timer = setInterval(() => {
        setP1Seconds(P1seconds-1)
        if(P1hour !== 0 && P1minutes === 0) {
          setP1Hour(P1hour-1)
          setP1Minutes(59) 
          setP1Seconds(59)
        } else if(P1minutes !== 0 && P1seconds === 0) {
          setP1Minutes(P1minutes-1)
          setP1Seconds(59)
        } else if(P1seconds === 0) {
          setP1Seconds(0)
          setGameOver(true)
        }
      }, 1000);
      return () => clearInterval(timer)
    } else if (!toggle && !pause && start) {
      const timer = setInterval(() => {
        setP2Seconds(P2seconds-1)
        if(P2hour !== 0 && P2minutes === 0) {
          setP2Hour(P2hour-1)
          setP2Minutes(59) 
          setP2Seconds(59)
        } else if(P2minutes !== 0 && P2seconds === 0) {
          setP2Minutes(P2minutes-1)
          setP2Seconds(59)
        } else if(P2seconds === 0) {
          setP2Seconds(0)
          setGameOver(true)
        }
      }, 1000);
      return () => clearInterval(timer)
    } 
  },[P1minutes, P1seconds, P2minutes, P2seconds, pause, start, toggle, P1hour, P2hour, setGameOver, setP2Seconds, setP1Seconds])

  useEffect(() => {
    if(boardReset) {
      Restart()
    }
  })

  const Restart = () => {
    setP1Minutes(0)
    setP1Seconds(0)
    setP2Minutes(0)
    setP2Seconds(0)
    setStart(false)
    setPause(false)
    setToggle(true)
  }

  const HandleTimer = (e) => {
    e.preventDefault()
    let hour = Math.floor(time/60)
    let minute = time % 60

    setP1Hour(hour)
    setP2Hour(hour)
    setP1Minutes(minute)
    setP2Minutes(minute)
  }

  useEffect(()=> {
    if(turn === "w") {
      setToggle(true)
    } else {
      setToggle(false)
    }
  }, [turn])

  return (
    <>
    <section className="w-full h-2/6 flex flex-col border-black_tile border-x-2">
      <div className="flex relative flex-col items-center h-2/6 justify-center border-black_tile border-b-2">
        <input
        className="border-b-2 border-active outline-none bg-transparent text-center w-1/2 placeholder:text-black_tile text-2xl"
        type="text"
        value={player1}
        placeholder="Player 1"
        onChange={(event) => setPlayer1(event.target.value)}
        />
        <p className="text-3xl font-medium">{P1hour} : {P1minutes} : {P1seconds}</p>
      </div>
      <div className="flex flex-col items-center h-2/6 justify-center">
        <input
        className="border-b-2 border-active outline-none bg-transparent text-center w-1/2 placeholder:text-black_tile text-2xl"
        type="text"
        value={player2}
        placeholder="Player 2"
        onChange={(event) => setPlayer2(event.target.value)}
        />
        <p className="text-3xl font-medium">{P2hour} : {P2minutes} : {P2seconds}</p>
      </div>
      <button className="p-2 bg-active text-2xl font-medium hover:text-white_tile"
        onClick={() => setToggle(prevState => !prevState)}>End Turn
      </button>
      <div className="mt-auto flex justify-evenly items-center border-b-2 border-black_tile px-2 p-2 text-xl">
        <button className="hover:text-active" onClick={() => setStart(prevState => !prevState)}>
          <FontAwesomeIcon icon={faPlay}/>
        </button>
        <button className="hover:text-active" onClick={() => setPause(prevState => !prevState)}>
          <FontAwesomeIcon icon={faPause}/>
        </button>
        <button className="hover:text-active" onClick={() => Restart()}>
          <FontAwesomeIcon icon={faRotateRight}/>
        </button>
        <button className="hover:text-active" onClick={() => setOpenModal(prevState => !prevState)}>
        <FontAwesomeIcon icon={faGear}/>
        </button>
      </div>
      <div className="relative">
      <CustomModal
        openModal={openModal}
        HandleTimer={HandleTimer}
        setTime={setTime}
      />
      </div>
    </section>
    </>
  )
}
