/** implementation provided by codingame, do not include this in solution */
const readline = () => "";

/*
codingame.com
Puzzle: ASZEROIDS
Difficulty: Easy
URL: https://www.codingame.com/training/easy/asteroids

	@Goal:
        You have been tasked with studying a region of space to detect potentially dangerous asteroids.
        You are given two pictures of the night sky of dimensions W*H, taken at two different times t1 and t2.
        For your convenience, asteroids have been marked with capital letters A to Z, the rest is empty space represented by a dot (.) .
        Using the information contained in those two pictures, determine the position of the asteroids at t3, and output a picture of the same region of the sky.

        If necessary, the final coordinates are to be rounded-down (floor).
        Asteroids travel at different altitudes (with A being the closest and Z the farthest from your observation point) and therefore cannot collide with each other during their transit.
        If two or more asteroids have the same final coordinates, output only the closest one.
        It is guaranteed that all asteroids at t1 will still be present at t2, that no asteroids are hidden in the given pictures, and that there is only one asteroid per altitude.

        NB: Because of the flooring operation, it is important that you choose a coordinate system with the origin at the top left corner and the y axis increasing in the downward direction.

    Example:
        Input:
            5 5 1 2 3
            A.... .A...
            ..... .....
            ..... .....
            ..... .....
            ..... .....
        Output:
            ..A..
            .....
            .....
            .....
            .....
*/


var inputs = readline().split(' ');
const width = parseInt(inputs[0]);
const high = parseInt(inputs[1]);
const firstTimePoint = parseInt(inputs[2]);
const secondTimePoint = parseInt(inputs[3]);
const thridTimePoint = parseInt(inputs[4]);
/** map wich stores names and positions of asteroids from first picture */
const firstStarMap = new Map();
/** map wich stores names and positions of asteroids from second picture */
const secondStarMap = new Map();
for (let i = 0; i < high; i++) {
    var inputs = readline().split(' ');
    const firstPictureRow = inputs[0];
    const secondPictureRow = inputs[1];
    for (let j = 0; j < width; j++){
        /* each point can be a dot or a letter(asteroid name), case not a dot, save as name
           line is position on Y-axis and index position on X-axis */
        if(firstPictureRow[j] != '.'){
            const name = firstPictureRow[j];
            const line = i;
            const index = firstPictureRow.indexOf(name);
            firstStarMap.set(name, {line: line, index: index, time: firstTimePoint});
        }; /* same saves daten from second picture */ 
        if(secondPictureRow[j] != '.'){
            const name = secondPictureRow[j];
            const line = i;
            const index = secondPictureRow.indexOf(name);
            secondStarMap.set(name, {line: line, index: index, time: secondTimePoint});
        };
    };
};

/* create array to hold the map of the given size and fill it with dots. In the future by given coordinates here will be stored asteroid names */
const thridPictureRows = [...Array(high)].map(_ => '.'.repeat(width).split(''));

/* the names of the asteroids are the keys in our Map, so iterate through all the keys */
firstStarMap.forEach((_, key) => {
    const name = key;
    /* for a simple understanding create a variables wich will store coordinate and time changes */
    const lineChange = secondStarMap.get(name).line - firstStarMap.get(name).line;
    const indexChange = secondStarMap.get(name).index - firstStarMap.get(name).index;
    const timeChange = secondStarMap.get(name).time - firstStarMap.get(name).time;
    const timeShift = thridTimePoint - secondTimePoint;
    /* using simple formulas obtain new coordinates */
    const line = Math.floor(secondStarMap.get(name).line + (lineChange) * (timeShift / timeChange));
    const index = Math.floor(secondStarMap.get(name).index + (indexChange) * (timeShift / timeChange));
    /* by the the conditions, we observe a map of given sizes, we are not interested in the coordinates of asteroids outside the borders */
    if(index >= 0 && index < width && line >=0 && line < high){
        /* and again by the conditions we can observe only 1 asteroid by the point, so check if the point is empty ('.') case yes stores the name */
        if(thridPictureRows[line][index] == '.'){
            thridPictureRows[line][index] = name;
            /* x3 by the conditions we can observe at one position only asteroid wich is closer (A the closest and Z the farthest)
               so we check asteroid name */
        } else if( name < thridPictureRows[line][index]){
            thridPictureRows[line][index] = name;
        };
    };
});

/* at the end print a map in console */
console.log(thridPictureRows.map(row => row.join('')).join('\n'));