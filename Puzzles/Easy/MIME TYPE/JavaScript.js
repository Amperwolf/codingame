/** implementation provided by codingame, do not include this in solution */
const readline = () => "";

/*
codingame.com
Puzzle: MIME TYPES
Difficulty: Easy
URL: https://www.codingame.com/training/easy/mime-type

Example

    Input:
        3
        3
        html text/html
        png image/png
        gif image/gif
        animated.gif
        portrait.png
        index.html
    Output:
        image/gif
        image/png
        text/html
*/



/** number of elements which make up the association table */ 
const NnumberOfMIME = parseInt(readline()); 
/** number Q of file names to be analyzed */
const numberOfFiles = parseInt(readline()); 
/** Map that will store all supported media types */
const supportedMIMES = new Map();

// by condition file extensions are composed of a maximum of 10 alphanumerical ASCII characters 
// i will use this regex to define it
// it matches 10 alphanumeric characters after the last dot, because filename can contain dots
const regx = /\.[0-9a-zA-Z]{1,10}$/
// read and save extensions and MIMY-types into map
for (let i = 0; i < NnumberOfMIME; i++) {
    var inputs = readline().split(' ');
    // because by condition, data can be in upper or lower case, for convenience, we reduce everything to lower
    const EXT = inputs[0].toLowerCase();
    const MT = inputs[1];
    // for a simpler search add a dot before the extension name
    supportedMIMES.set("."+EXT, MT)
}
// read all files
for (let i = 0; i < numberOfFiles; i++) {
    const FNAME = readline();
    // use regex to file name to find out they extension and save it into variable
    const MIME = FNAME.match(regx)
    console.error(MIME)
    // check if extension exists and such an extension is stored in our map
    if(MIME && supportedMIMES.has(MIME[0].toLowerCase())){
        // print MIME-type to the console
        console.log(supportedMIMES.get(MIME[0].toLowerCase()))
    }else {
        // if nothing matches print to the console 'UNKNOWN'
        console.log( `UNKNOWN`)
    }
}