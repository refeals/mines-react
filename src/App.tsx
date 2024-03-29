import { useEffect } from "react"
import { useBoardStore } from "./hooks/useBoardStore"
import { Button } from "./components/ui/button"

function App() {
  const { board, resetBoard, clickPiece } = useBoardStore()

  useEffect(() => {
    resetBoard(10, 10, 20)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex justify-center w-1/2 mx-auto mt-4">
      <div className="grid grid-cols-10 gap-1 bg-slate-500 p-1">
        {board.map((piece, index) =>
          piece.clicked ? (
            <Button
              variant="secondary"
              className="size-10 rounded-none"
              key={index}
              disabled
            >
              {piece.value}
            </Button>
          ) : (
            <Button
              className="size-10 rounded-none relative"
              onClick={() => clickPiece(index)}
              key={index}
            ></Button>
          )
        )}
      </div>
    </div>
  )
}

export default App
