const { solveSudoku } = require('./solver');

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generateFullBoard() {
    const board = Array(9).fill().map(() => Array(9).fill(0));
    
    // Fill diagonal boxes first (independent)
    for (let i = 0; i < 9; i += 3) {
        let nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                board[i + r][i + c] = nums[r * 3 + c];
            }
        }
    }
                
    // Solve to fill the rest
    solveSudoku(board);
    return board;
}

function removeElements(board, count) {
    const cells = [];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            cells.push([i, j]);
        }
    }
    
    shuffle(cells);
    
    for (let i = 0; i < count; i++) {
        const [r, c] = cells[i];
        board[r][c] = 0;
    }
        
    return board;
}

function generateSudoku(difficulty) {
    const solution = generateFullBoard();
    
    // Clone solution
    const puzzle = solution.map(row => [...row]);
    
    let removeCount = 40;
    const diff = difficulty ? difficulty.toLowerCase() : "medium";
    
    if (diff === "easy") {
        removeCount = 30;
    } else if (diff === "medium") {
        removeCount = 40;
    } else if (diff === "hard") {
        removeCount = 50;
    } else if (diff === "expert") {
        removeCount = 60;
    }
        
    removeElements(puzzle, removeCount);
    return { puzzle, solution };
}

module.exports = { generateSudoku };
