function print(par1: string): void {
  console.log(par1);
}

type Empty = 0;
type Circle = 1;
type Cross = 2;
type Stone = Empty | Circle | Cross;

class GomokuBoard {
  board: Stone[][];
  isExact: boolean;
  combinationLength: number;

  constructor(
    cols: number,
    rows: number,
    winningCombinationLength: number,
    exactCombinationLength: boolean
  ) {
    this.board = this.generateBoard(cols, rows);
    this.isExact = exactCombinationLength;
    this.combinationLength = winningCombinationLength;
  }

  private generateBoard(cols: number, rows: number): Empty[][] {
    const board: Empty[][] = [];
    for (let i = 0; i < rows; i++) {
      const row: Empty[] = [];
      for (let j = 0; j < cols; j++) {
        row.push(0);
      }
      board.push(row);
    }
    return board;
  }

  setPosition() {}
  getStone(col: number, row: number) {}
}
// create game board
//
// change position
//
// check for win
//
// print out

export { print };
