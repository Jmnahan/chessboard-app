import { useContext} from "react";
import ChessContext from "../Context";

const PromotionModal = (props) => {
    const {from, to, openModal, setOpenModal } = props

    const {toPromote} = useContext(ChessContext)

    const eventHandle = (item) => {
      toPromote(from, to, item)
      setOpenModal(false)
    }
  
      const modal = (
      <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">
                        Choose Promotion
                      </h3>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                        <button value='q' onClick={(e)=>{eventHandle(e.target.value)}}> Queen </button>
                        <button value='n' onClick={(e)=>{eventHandle(e.target.value)}}> Knight </button>
                        <button value='b' onClick={(e)=>{eventHandle(e.target.value)}}> Bishop </button>
                        <button value='r' onClick={(e)=>{eventHandle(e.target.value)}}> Rook </button>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-0 fixed inset-0 z-40 bg-black"></div>
            </>
      );  
      return (
        <>
          <div>{ openModal ?  modal  : null}</div>
        </>
      );
    };

export default PromotionModal;
