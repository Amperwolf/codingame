/** implementation provided by codingame, do not include this in solution */
const readline = () => "";

/*
codingame.com
Puzzle: Reverse Minesweeper
Difficulty: Easy
URL: https://www.codingame.com/training/easy/reverse-minesweeper


  	@Goal
    Given a grid of mine locations (where . are empty cells and x are mines), your goal is to display the grid like it appears if you win the game.
    Each position is a digit indicating the number of mines bordering it (including diagonals). The mines (x) don't appear anymore. Mines and positions that do not border any mines both appear as empty cells (.). 

    Example:

        Input:
            16
            9
            ................
            ................
            ................
            ................
            ................
            ....x...........
            ................
            ................
            ................
        Output:
            ................
            ................
            ................
            ................
            ...111..........
            ...1.1..........
            ...111..........
            ................
            ................
 */

/** will be used to store and output our grid */
const grid = [];
const w = parseInt(readline());
const h = parseInt(readline());
// for simpler manipulations change all dots to zero
for (let i = 0; i < h; i++) {
    const line = readline();
    grid.push(line.replaceAll('.', '0').split(''));
}

const BOMB = 'x';
const FREE = '0';

// loop trough array and whe find a bomb call a function and pass a coordinates
for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
        if (grid[y][x] == BOMB) {
            lookAround(y, x);
        }
    }
}


/**
 * @param {Number} currentY 
 * @param {Number} currentX 
 */
 // function take curent Y and X and checks all neighbors and if its not a bomb raises counter by 1 
function lookAround(currentY, currentX) {
    // just variables for easier understanding of the check
    const top = currentY - 1;
    const bot = currentY + 1;
    const right = currentX + 1;
    const left = currentX - 1;
        // do not forget to check if we are out of bounds of the array
        if (left >= 0 && grid[currentY][left] != BOMB) {
            grid[currentY][left]++;
        }
        if (left >=0 && top >= 0 && grid[top][left] != BOMB) {
            grid[top][left]++;
        }
        if (top >= 0 && grid[top][currentX] != BOMB) {
            grid[top][currentX]++;
        }
        if (top >= 0 && right < w && grid[top][right] != BOMB) {
            grid[top][right]++;
        }
        if (right < w && grid[currentY][right] != BOMB) {
            grid[currentY][right]++;
        }
        if (bot < h && right < w && grid[bot][right] != BOMB) {
            grid[bot][right]++;
        }
        if (bot < h && grid[bot][currentX] != BOMB) {
            grid[bot][currentX]++;
        }
        if (bot < h && left >=0 && grid[bot][left] != BOMB) {
            grid[bot][left]++;
        }
    
}
// we output our grid into console and for the correct display change all the bombs and nulls into dots
console.log(grid.map((row) => row.join('').replaceAll(0, '.').replaceAll('x', '.')).join('\n'));
