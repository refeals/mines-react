import { useEffect } from "react"
import { useBoardStore } from "@/hooks/useBoardStore"
import { Button } from "@/components/ui/button"
import { Board } from "@/components/Board"

function App() {
  const { resetBoard, bombsRemaning, piecesRemaning, x, y, bombs } =
    useBoardStore()

  useEffect(() => {
    resetBoard(12, 12, 10)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="flex flex-col gap-4 w-1/2 mx-auto">
        <Board />

        <Button onClick={() => resetBoard(x, y, bombs)}>Restart</Button>

        <div>
          <p>Bombs remaning: {bombsRemaning}</p>
          <p>Pieces remaning: {piecesRemaning}</p>
        </div>
      </div>
    </>
  )
}

export default App
