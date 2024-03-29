import { useEffect } from "react"
import { useBoardStore } from "@/hooks/useBoardStore"
import { Button } from "@/components/ui/button"
import { Board } from "@/components/Board"

function App() {
  const { resetBoard } = useBoardStore()

  useEffect(() => {
    resetBoard(12, 12, 10)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex gap-4 justify-center w-1/2 mx-auto mt-4">
      <Board />

      <Button onClick={() => resetBoard(10, 10, 20)}>Restart</Button>
    </div>
  )
}

export default App
