/** implementation provided by codingame, do not include this in solution */
const readline = () => "";

/* 
codingame.com
Puzzle: There is no spoon Episode 1
Difficulty: Medium
URL: https://www.codingame.com/training/medium/there-is-no-spoon-episode-1

	Game Input
The program must first read the initialization data from standard input. Then, provide to the standard output one line per instruction.
Initialization input
Line 1: one integer width for the number of cells along the x axis.

Line 2: one integer height for the number of cells along the y axis.

Next height lines: A string  line  containing  width  characters. A dot . represents an empty cell. A zero 0 represents a cell containing a node.

Output for one game turn
One line per node. Six integers on each line:   x1  y1  x2  y2  x3  y3

Where:
(x1,y1) the coordinates of a node
(x2,y2) the coordinates of the closest neighbor on the right of the node
(x3,y3) the coordinates of the closest bottom neighbor
If there is no neighbor, the coordinates should be -1 -1.

*/

// the number of cells on the X axis
const width = parseInt(readline()); 
// the number of cels on the Y axis
const height = parseInt(readline()); 
/** arra wich store the grid */
const grid = []
for (let i = 0; i < height; i++) {
    const line = readline();
    grid.push(line.split(""))
}

// we start from x0, y0 and going step by step along the x-axis, then go down the y-axis and repeat
for (let currentY = 0; currentY < height; currentY++) {
    for (let currentX = 0; currentX < width; currentX++) {
        //let's say there are no neighbors
        let rightNeighborX = rightNeighborY = bottomNeighborX = bottomNeighborY = -1;
        // if we meet a point
        if (grid[currentY][currentX] == "0") {
            // go to the right until we find the next point, mark its coordinates as the right neighbor
            // if there are no points, no action is required, because we have already noted that there is no neighbor on the right
            for (let tx = currentX + 1; tx < width; tx++) {
                if (grid[currentY][tx] == '0') {
                    rightNeighborX = tx;
                    rightNeighborY = currentY;
                    break;
                }
            }
            // do the same for y-axis to find bottom neighbor
            for (let ty = currentY + 1; ty < height; ty++) {
                if (grid[ty][currentX] == '0') {
                    bottomNeighborX = currentX;
                    bottomNeighborY = ty;
                    break;
                }
            }
        // we are not interested in neighbors of empty points, skip it
        } else {
            continue
        }
        // print coordinates of the current point, nearest neighbor to the right and bottom
        console.log(currentX, currentY, rightNeighborX, rightNeighborY, bottomNeighborX, bottomNeighborY,);
    }
}
