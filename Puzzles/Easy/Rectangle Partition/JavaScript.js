/** implementation provided by codingame, do not include this in solution */
const readline = () => "";

/* 
codingame.com
Puzzle: Rectangle Partition
Difficulty: Easy
https://www.codingame.com/training/easy/rectangle-partition

Example

    w = 10
    h = 5
    measurements on x-axis: 2, 5
    measurements on y-axis: 3

    ___2______5____________
    |   |      |          |
    |   |      |          |
   3|___|______|__________|
    |   |      |          |
    |___|______|__________|

    Number of squares in sub-rectangles = 4 (one 2x2, one 3x3, two 5x5)

    Input:
        10 5 2 1
        2 5
        3
    Output:
        4
*/

const inputs = readline().split(' ');
const width = parseInt(inputs[0]);
const heigth = parseInt(inputs[1]);
/** all horizontal points */
const marksOnWidth = [0,...readline().split(' ').map(Number), width];
/** all vertical points */
const marksOnHeigth = [0,...readline().split(' ').map(Number), heigth];
/** count of squares */
let counter = 0;

// take currentX and  currentY as the starting point
// take a step along y axis and compare with the segments on the x axis (from currentX to stepX until reach the end) if matching ones increase the square counter by 1 
// then shift the point on the currentY axis by 1 and repeat until we reach the end
for (let currentY = 0; currentY < marksOnHeigth.length; currentY++) {
    for (let currentX = 0; currentX < marksOnWidth.length; currentX++) {
        for (let stepY = currentY + 1; stepY < marksOnHeigth.length; stepY++) {
            for (let stepX = currentX + 1; stepX < marksOnWidth.length; stepX++) {
                if ((marksOnWidth[stepX] - marksOnWidth[currentX]) == (marksOnHeigth[stepY] - marksOnHeigth[currentY])) {
                    counter++
                }
            }
        }
    }
}
console.log(counter)