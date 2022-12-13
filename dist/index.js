"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GomokuBoard = void 0;
class GomokuBoard {
    constructor(cols, rows, winningCombinationLength, exactCombinationLength) {
        this.board = this.generateBoard(cols, rows);
        this.isExact = exactCombinationLength;
        this.combinationLength = winningCombinationLength;
        this.winningCombination = [];
        this.placedStones = 0;
        this.maxStones = cols * rows;
    }
    generateBoard(cols, rows) {
        const board = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                row.push(0);
            }
            board.push(row);
        }
        return board;
    }
    setStone(col, row, stone) {
        this.board[row][col] = stone;
        this.placedStones++;
    }
    getStone(col, row) {
        if (col < 0 ||
            row < 0 ||
            col >= this.board[0].length ||
            row >= this.board.length)
            return 0;
        return this.board[row][col];
    }
    getWinningCombination() {
        return this.winningCombination;
    }
    isPositionEmpty(col, row) {
        return this.getStone(col, row) === 0;
    }
    isTie() {
        return this.placedStones === this.maxStones;
    }
    ventureDirection(stone, origin, vector) {
        const [col, row] = origin;
        const [vecX, vecY] = vector;
        let distance = 1;
        while (this.getStone(col + distance * vecX, row + distance * vecY) == stone) {
            distance += 1;
        }
        return distance - 1;
    }
    hasWon(playerStone, column, row) {
        const venture = (vectorX, vectorY) => this.ventureDirection(playerStone, [column, row], [vectorX, vectorY]);
        const left = venture(-1, 0);
        const right = venture(1, 0);
        const down = venture(0, -1);
        const up = venture(0, 1);
        const leftDown = venture(-1, -1);
        const leftUp = venture(-1, 1);
        const rightDown = venture(1, -1);
        const rightUp = venture(1, 1);
        const directions = [
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
            if (from + to == this.combinationLength - 1 ||
                (from + to >= this.combinationLength - 1 && !this.isExact)) {
                this.winningCombination = genWinningCombination(column, row, directionVector, from, to);
                return true;
            }
        }
        return false;
    }
}
exports.GomokuBoard = GomokuBoard;
function genWinningCombination(col, row, vectorFromTo, fromDistance, toDistance) {
    const result = [];
    let currCol = col + vectorFromTo[0] * fromDistance * -1;
    let currRow = row + vectorFromTo[0] * fromDistance * -1;
    for (let i = fromDistance; i < toDistance + 1; i++) {
        result.push([currCol, currRow]);
        currCol += vectorFromTo[0];
        currRow += vectorFromTo[1];
    }
    return result;
}
//# sourceMappingURL=index.js.map