const express = require('express');
const cors = require('cors');
const { solveSudoku, isValid } = require('./solver');
const { generateSudoku } = require('./generator');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/solve', (req, res) => {
    const { board } = req.body;
    
    // Create a deep copy of the original board to keep it unmodified
    const originalBoard = board.map(row => [...row]);
    const solvedBoard = board.map(row => [...row]);
    
    const { isSolved, steps } = solveSudoku(solvedBoard);
    
    res.json({
        original_board: originalBoard,
        solved_board: solvedBoard,
        steps: steps,
        is_solved: isSolved
    });
});

app.get('/api/generate', (req, res) => {
    const difficulty = req.query.difficulty || 'medium';
    const { puzzle, solution } = generateSudoku(difficulty);
    
    res.json({
        puzzle,
        solution,
        difficulty
    });
});

app.get('/api/hint', (req, res) => {
    const row = parseInt(req.query.row);
    const col = parseInt(req.query.col);
    const boardStr = req.query.board;
    
    try {
        const board = JSON.parse(boardStr);
        const candidates = [];
        const conflicts = [];
        
        for (let num = 1; num <= 9; num++) {
            const { valid, reason } = isValid(board, row, col, num);
            if (valid) {
                candidates.push(num);
            } else {
                conflicts.push({ number: num, reason });
            }
        }
        
        res.json({ row, col, candidates, conflicts });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
