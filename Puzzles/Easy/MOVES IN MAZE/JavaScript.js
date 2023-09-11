/** implementation provided by codingame, do not include this in solution */
const readline = () => "";

/*
codingame.com
Puzzle: MOVES IN MAZE
Difficulty: Easy
URL: https://www.codingame.com/training/easy/moves-in-maze


The input maze is made of # for walls, . for free spaces and S for the starting position.
The output must be made of # for walls, . for unreachable points, and numbers 0-9, A-Z

Example:
    Input:
        10 5
        ##########
        #S.......#
        ##.#####.#
        ##.#.....#
        ##########
    Output:
        ##########
        #01234567#
        ##2#####8#
        ##3#DCBA9#
        ##########
*/


/** will be used to bring the numbered steps to the specified form */
const marks =
    { 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: 'A', 11: 'B', 12: 'C', 13: 'D', 14: 'E', 15: 'F', 16: 'G', 17: 'H', 18: 'I', 19: 'J', 20: 'K', 21: 'L', 22: 'M', 23: 'N', 24: 'O', 25: 'P', 26: 'Q', 27: 'R', 28: 'S', 29: 'T', 30: 'U', 31: 'V', 32: 'W', 33: 'X', 34: 'Y', 35: 'Z' };
let currentStep = 0;
const mazeMap = [];
const inputs = readline().split(' ');
const width = parseInt(inputs[0]);
const high = parseInt(inputs[1]);
const WALL = '#';
const EMPTY = '.';
//** saves map into array */
for (let i = 0; i < high; i++) {
    const ROW = readline();
    mazeMap.push(ROW.split(""));
}

//** to make sure that the whole map is passed correctly, iterate over the array completely for each step */
while (currentStep <= 35) {
    for (let i = 0; i < high; i++) {
        for (let j = 0; j < width; j++) {
            //** this check is needed only 1 time to find the starting point, unfortunately i could not remove it yet and it is performed on each iteration */
            // TODO: remove or take out
            if (mazeMap[i][j] === 'S') {
                mazeMap[i][j] = currentStep;
            }
            //** for each step calls function wich check neighbors and marks them as next step */
            if (mazeMap[i][j] === currentStep) {
                lookingAround(i, j);
            }
        }
    }
    //** after passing through the array increses current step by 1 */
    currentStep++
}


//** after marking all paths, we name all points according to the condition, rules stores in Object marks */
for (let i = 0; i < high; i++) {
    for (let j = 0; j < width; j++) {
        if (mazeMap[i][j] !== WALL && mazeMap[i][j] !== EMPTY) {
            //** because key and step haves same value, current step number is equal to the index of its value */
            const index = mazeMap[i][j];
            mazeMap[i][j] = Object.values(marks)[index];
        }
    }
}

/**
 * @param {Number} y
 * @param {Number} x
 */

//** the function takes x and y as a point on x- and y-axis and checks for neighbors around the given point */
function lookingAround(y, x) {
    //** creates variable to mark next step */
    const nextStep = currentStep + 1;
    //** creates variables to store positions of neighbors around the given point */
    const top = mazeMap[(y - 1 + high) % high][x];
    const bot = mazeMap[(y + 1) % high][x];
    const right = mazeMap[y][(x + 1) % width];
    const left = mazeMap[y][(x - 1 + width) % width];

    if (bot === EMPTY) {
        mazeMap[(y + 1) % high][x] = nextStep;
    }
    if (right === EMPTY) {
        mazeMap[y][(x + 1) % width] = nextStep;
    }
    if (top === EMPTY) {
        mazeMap[(y - 1 + high) % high][x] = nextStep;
    }
    if (left === EMPTY) {
        mazeMap[y][(x - 1 + width) % width] = nextStep;
    }
}

//** print our map according to the conditions */
console.log(mazeMap.map(row => row.join('')).join('\n'))
