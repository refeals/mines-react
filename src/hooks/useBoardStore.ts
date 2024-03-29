import { create } from "zustand"

type Board = Piece[]

type Piece = {
  value: number
  isClicked: boolean
  isFlagged: boolean
}

interface BoardStore {
  board: Board
  x: number
  y: number
  bombs: number
  bombsRemaning: number
  piecesRemaning: number
  resetBoard: (x: number, y: number, bombs: number) => void
  clickPiece: (index: number) => void
  clickPieceClicked: (index: number) => void
  toggleFlagged: (index: number) => void
  addBombRemaning: () => void
  subtractBombRemaning: () => void
}

export const useBoardStore = create<BoardStore>()((set, get) => ({
  board: [],
  x: 0,
  y: 0,
  bombs: 0,
  bombsRemaning: 0,
  piecesRemaning: 0,
  resetBoard: (x, y, bombs) =>
    set({
      board: createBoard(x, y, bombs),
      x,
      y,
      bombs,
      bombsRemaning: bombs,
      piecesRemaning: x * y,
    }),
  clickPiece: (index) => set({ board: recursiveClickPiece(get(), index) }),
  clickPieceClicked: (index) =>
    set({ board: recursiveClickPiece(get(), index) }),
  toggleFlagged: (index) =>
    set({ board: toggleFlaggedAtIndex(get().board, index) }),
  addBombRemaning: () => set({ bombsRemaning: get().bombsRemaning + 1 }),
  subtractBombRemaning: () => set({ bombsRemaning: get().bombsRemaning - 1 }),
}))

function createBoard(x: number, y: number, bombs: number): Board {
  let boardStr = "0".repeat(x * y)
  const bombsPositions = getRandomNumbers(bombs, x * y)

  bombsPositions.forEach((pos) => {
    boardStr = changeCharacterAtIndex(boardStr, pos, "b")
  })

  const boardWithBombs: Board = boardStr.split("").map((value) => ({
    value: value === "b" ? -1 : Number(value),
    isClicked: false,
    isFlagged: false,
  }))

  const board = setNeighborsValue(boardWithBombs, bombsPositions, x, y)

  return board
}

function setNeighborsValue(
  boardWithBombs: Board,
  bombsPositions: number[],
  x: number,
  y: number
): Board {
  const board: Board = boardWithBombs

  const add = (index: number) => {
    if (board[index].value !== -1) {
      board[index].value++
    }
  }

  bombsPositions.forEach((index) => {
    if (index - x - 1 >= 0 && index % x > 0) add(index - x - 1) // top left
    if (index - x >= 0) add(index - x) // top
    if (index - x + 1 > 0 && index % x < x - 1) add(index - x + 1) // top right
    if ((index - 1) % x >= 0 && index % x !== 0) add(index - 1) // left
    if ((index + 1) % x >= 0 && index % x !== x - 1) add(index + 1) // right
    if (Math.floor(index / x) < y - 1 && index % x > 0) add(index + x - 1) // bottom left
    if (Math.floor(index / x) < y - 1) add(index + x) // bottom
    if (Math.floor(index / x) < y - 1 && index % x < x - 1) add(index + x + 1) // bottom right
  })

  return board
}

function recursiveClickPiece(store: BoardStore, index: number): Board {
  const { board, x, y } = store

  board[index].isClicked = true
  useBoardStore.setState({
    piecesRemaning: useBoardStore.getState().piecesRemaning - 1,
  })

  const recall = (index: number) => {
    if (board[index].isClicked === false && board[index].isFlagged === false) {
      recursiveClickPiece(store, index)
    }
  }

  if (board[index].value === 0) {
    if (index - x - 1 >= 0 && index % x > 0) recall(index - x - 1) // top left
    if (index - x >= 0) recall(index - x) // top
    if (index - x + 1 > 0 && index % x < x - 1) recall(index - x + 1) // top right
    if ((index - 1) % x >= 0 && index % x !== 0) recall(index - 1) // left
    if ((index + 1) % x >= 0 && index % x !== x - 1) recall(index + 1) // right
    if (Math.floor(index / x) < y - 1 && index % x > 0) recall(index + x - 1) // bottom left
    if (Math.floor(index / x) < y - 1) recall(index + x) // bottom
    if (Math.floor(index / x) < y - 1 && index % x < x - 1)
      recall(index + x + 1) // bottom right
  }

  return board
}

function toggleFlaggedAtIndex(board: Board, index: number): Board {
  board[index].isFlagged = !board[index].isFlagged

  if (board[index].isFlagged) {
    useBoardStore.getState().subtractBombRemaning()
  } else {
    useBoardStore.getState().addBombRemaning()
  }

  return board
}

// HELPERS
function getRandomNumbers(bombs: number, size: number) {
  const numbers: number[] = []

  while (numbers.length < bombs) {
    const randomNumber = Math.floor(Math.random() * size)

    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber)
    }
  }

  return numbers
}

function changeCharacterAtIndex(str: string, index: number, newChar: string) {
  const chars = str.split("")
  chars[index] = newChar
  return chars.join("")
}
