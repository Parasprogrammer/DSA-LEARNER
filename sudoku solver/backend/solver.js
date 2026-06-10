function isValid(board, row, col, num) {
    // Check row
    if (board[row].includes(num)) {
        return { valid: false, reason: `${num} already exists in the row.` };
    }
    
    // Check column
    for (let i = 0; i < 9; i++) {
        if (board[i][col] === num) {
            return { valid: false, reason: `${num} already exists in the column.` };
        }
    }
            
    // Check 3x3 box
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] === num) {
                return { valid: false, reason: `${num} already exists in the 3x3 box.` };
            }
        }
    }
                
    return { valid: true, reason: `${num} satisfies all Sudoku constraints.` };
}

function findEmpty(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) {
                return [i, j];
            }
        }
    }
    return [-1, -1];
}

class SudokuSolver {
    constructor() {
        this.steps = [];
    }
        
    solve(board) {
        const [row, col] = findEmpty(board);
        if (row === -1 && col === -1) {
            return true; // Solved
        }
            
        for (let num = 1; num <= 9; num++) {
            const { valid, reason } = isValid(board, row, col, num);
            
            if (valid) {
                this.steps.push({
                    row,
                    col,
                    number: num,
                    action: "place",
                    reason: "valid placement"
                });
                board[row][col] = num;
                
                if (this.solve(board)) {
                    return true;
                }
                    
                // Backtrack
                this.steps.push({
                    row,
                    col,
                    number: num,
                    action: "remove",
                    reason: "No valid number found down this path. Removing and returning to previous decision."
                });
                board[row][col] = 0;
            } else {
                this.steps.push({
                    row,
                    col,
                    number: num,
                    action: "invalid",
                    reason: reason
                });
            }
        }
                
        return false;
    }
}

function solveSudoku(board) {
    const solver = new SudokuSolver();
    const isSolved = solver.solve(board);
    return { isSolved, steps: solver.steps };
}

module.exports = { solveSudoku, isValid };
