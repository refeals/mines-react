import { Button } from "@/components/ui/button"
import { useBoardStore } from "@/hooks/useBoardStore"
import { Bomb, Flag } from "lucide-react"

export function Board() {
  const { board, clickPiece, toggleFlagged, x } = useBoardStore()

  return (
    <div className="flex gap-4 justify-center w-1/2 mx-auto mt-4">
      <div
        className={`grid gap-0.5 bg-slate-500 p-1`}
        style={{ gridTemplateColumns: `repeat(${x}, minmax(0, 1fr))` }}
        onContextMenu={(e) => e.preventDefault()}
      >
        {board.map((piece, index) =>
          piece.isClicked ? (
            <Button
              variant={piece.value === -1 ? "destructive" : "secondary"}
              className="size-12 rounded-none"
              onContextMenu={(e) => e.preventDefault()}
              key={index}
            >
              {piece.value === -1 ? <Bomb className="size-12" /> : piece.value}
            </Button>
          ) : (
            <Button
              className="size-12 rounded-none"
              onClick={() => {
                if (!piece.isFlagged) clickPiece(index)
              }}
              onContextMenu={(e) => {
                e.preventDefault()
                toggleFlagged(index)
              }}
              key={index}
            >
              {piece.isFlagged ? (
                <Flag className="size-12 fill-destructive" />
              ) : (
                ""
              )}
            </Button>
          )
        )}
      </div>
    </div>
  )
}
