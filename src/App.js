import Chessboard from "./Components/Chessboard";
import { ChessProvider } from "./Context";

export default function App() {
  return (
    <div className="grid place-content-center h-screen">
      <ChessProvider>
        <Chessboard/>
      </ChessProvider>
    </div>
  );
}
