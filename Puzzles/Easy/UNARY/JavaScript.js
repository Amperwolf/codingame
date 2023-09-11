/** implementation provided by codingame, do not include this in solution */
const readline = () => "";

/* 
codingame.com
Puzzle: UNARY
Difficulty: Easy
https://www.codingame.com/training/easy/unary

Example
    Let’s take a simple example with a message which consists of only one character: Capital C. C in binary is represented as 1000011, so with this method, this gives:
    0 0 (the first series consists of only a single 1)
    00 0000 (the second series consists of four 0)
    0 00 (the third consists of two 1)
    So C is coded as: 0 0 00 0000 0 00

    Input:
        C
    Output:
        0 0 00 0000 0 00

*/

// regex matches groups of repeating 1s or 0s
const reg = /0+|1+/g

const MESSAGE = readline()
    // split the message into chars
    .split("")
    // translate each char into a binary form with a length of 7 bits, substitute zeros at the beginning if the length is less than 7
    .map(s => s.charCodeAt(0).toString(2).padStart(7, "0"))
    // translate into string and match groups of reapiting 1s and 0s
    .join("")
    .match(reg)
    // if a group of 1s, then replace it with "0" and add through the space number of 0s equal to the length of the group
    // the same for group of 0s, but replace with "00"
    // dont forget to add a space at the end
    .map(s => (s[0] == "1" ? "0 " : "00 ") +"0".repeat(s.length)+" ")
    .join("")
    // turn the message back into a string and trim waste space
    .trim()
console.log(MESSAGE)


//** extra short version for Code Golf */
print(...[...readline()].map(s=>s.charCodeAt(0).toString(2).padStart(7,0)).join``.match(/0+|1+/g).map(s=>(+s[1]?'0 ':'00 ')+'0'.repeat(s.length)))