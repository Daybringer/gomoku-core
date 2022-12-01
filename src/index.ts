type Empty = 0;
type Circle = 1;
type Cross = 2;
type Stone = Empty | Circle | Cross;
type Row = Stone[];

class GomokuBoard {
  private board: Array<Row>;
  private isExact: boolean;
  private combinationLength: number;
  private winningCombination: Array<[number, number]>;
  private placedStones: number;
  private maxStones: number;

  constructor(
    cols: number,
    rows: number,
    winningCombinationLength: number,
    exactCombinationLength: boolean
  ) {
    this.board = this.generateBoard(cols, rows);
    this.isExact = exactCombinationLength;
    this.combinationLength = winningCombinationLength;
    this.winningCombination = [];
    this.placedStones = 0;
    this.maxStones = cols * rows;
  }

  private generateBoard(cols: number, rows: number): Row[] {
    const board: Row[] = [];
    for (let i = 0; i < rows; i++) {
      const row: Row = [];
      for (let j = 0; j < cols; j++) {
        row.push(0);
      }
      board.push(row);
    }
    return board;
  }

  setStone(col: number, row: number, stone: Stone): void {
    this.board[row][col] = stone;
    this.placedStones++;
  }
  getStone(col: number, row: number): Stone {
    return this.board[row][col];
  }
  getWinningCombination(): Array<[number, number]> {
    return this.winningCombination;
  }
  isPositionEmpty(col: number, row: number): boolean {
    return this.getStone(col, row) === 0;
  }
  isTie(): boolean {
    return this.placedStones === this.maxStones;
  }

  private ventureDirection(
    stone: Stone,
    /** [column:number, row:number]  */
    origin: [number, number],
    vector: [number, number]
  ): number {
    const [col, row] = origin;
    const [vecX, vecY] = vector;
    let distance = 1;

    while (
      this.getStone(col + distance * vecX, row + distance * vecY) == stone
    ) {
      distance += 1;
    }

    return distance - 1;
  }

  /**
   *
   * @param playerStone
   * @param column
   * @param row
   */
  hasWon(playerStone: Stone, column: number, row: number): boolean {
    const venture = (vectorX: number, vectorY: number) =>
      this.ventureDirection(playerStone, [column, row], [vectorX, vectorY]);
    const left = venture(-1, 0);
    const right = venture(1, 0);
    const down = venture(0, -1);
    const up = venture(0, 1);
    const leftDown = venture(-1, -1);
    const leftUp = venture(-1, 1);
    const rightDown = venture(1, -1);
    const rightUp = venture(1, 1);

    const directions: [[number, number], [number, number]][] = [
      [
        [left, right],
        [1, 0],
      ],
      [
        [down, up],
        [0, 1],
      ],
      [
        [leftDown, rightUp],
        [1, 1],
      ],
      [
        [rightDown, leftUp],
        [-1, 1],
      ],
    ];

    for (const [fromToDistancePair, directionVector] of directions) {
      const [from, to] = fromToDistancePair;
      if (this.isExact) {
      }

      if (
        from + to == this.combinationLength - 1 ||
        (from + to >= this.combinationLength - 1 && !this.isExact)
      ) {
        this.winningCombination = genWinningCombination(
          column,
          row,
          directionVector,
          from,
          to
        );
        return true;
      }
    }
    return false;
  }

  print() {
    console.log("");
  }
}

function genWinningCombination(
  col: number,
  row: number,
  vectorFromTo: [number, number],
  fromDistance: number,
  toDistance: number
): [number, number][] {
  const result: [number, number][] = [];
  const currentPosition: [number, number] = [
    col + fromDistance * vectorFromTo[0],
    row + toDistance * vectorFromTo[1],
  ];
  for (let i = 0; i < fromDistance + toDistance; i++) {
    result.push(currentPosition);
    currentPosition[0] += vectorFromTo[0];
    currentPosition[1] += vectorFromTo[1];
  }
  return result;
}

export { GomokuBoard };
