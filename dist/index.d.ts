type Empty = 0;
type Circle = 1;
type Cross = 2;
type Stone = Empty | Circle | Cross;
declare class GomokuBoard {
    private board;
    private isExact;
    private combinationLength;
    private winningCombination;
    private placedStones;
    private maxStones;
    constructor(cols: number, rows: number, winningCombinationLength: number, exactCombinationLength: boolean);
    private generateBoard;
    setStone(col: number, row: number, stone: Stone): void;
    getStone(col: number, row: number): Stone;
    getWinningCombination(): Array<[number, number]>;
    isPositionEmpty(col: number, row: number): boolean;
    isTie(): boolean;
    private ventureDirection;
    hasWon(playerStone: Stone, column: number, row: number): boolean;
}
export { GomokuBoard };
