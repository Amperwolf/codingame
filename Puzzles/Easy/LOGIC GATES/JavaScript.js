/** implementation provided by codingame, do not include this in solution */
const readline = () => "";

/* 
codingame.com
Puzzle: Logic Gates
Difficulty: Easy
URL: https://www.codingame.com/training/easy/logic-gates

example:
    Input:
        2
        3
        A __---___---___---___---___
        B ____---___---___---___---_
        C AND A B
        D OR A B
        E XOR A B
    Output:
        C ____-_____-_____-_____-___
        D __-----_-----_-----_-----_
        E __--_--_--_--_--_--_--_--_
*/

const HIGH_SIGNAL = '-';
const LOW_SIGNAL = '_';

const inputSignalCount = parseInt(readline());
const outputSignalCount = parseInt(readline());

/** 
 * maps input names to their signals
 * @type {Map<string, string>}
 */
const inputMap = new Map();

//read inputs signals and push tham into map
for (let i = 0; i < inputSignalCount; i++) {
    const inputs = readline().split(' ');
    const inputName = inputs[0];
    const inputSignal = inputs[1];
    inputMap.set(inputName, inputSignal);
}

//read the conditions for the output signal and save tham into variables
for (let i = 0; i < outputSignalCount; i++) {
    const outputs = readline().split(' ');
    const outputName = outputs[0];
    const type = outputs[1];
    const firstSignal = inputMap.get(outputs[2]);
    const secondSignal = inputMap.get(outputs[3]);

    //by condition, the output must begin with a name, so we immediately add it to the result
    //the first and second signals will be read bit by bit and the result added to the variable
    let result = `${outputName} `;

    // call a function that takes two signals and returns the result
    result += compareSignals(firstSignal, secondSignal, type);

    //print the result to the console
    console.log(result);
}


/**
 * @param {string} signal1
 * @param {string} signal2
 * @param {string} logic
 * @returns {string}
 */
 // function passes each pair of bits and logic to the next function
function compareSignals(signal1, signal2, logic) {
    let result = '';
    for (let index = 0; index < signal1.length; index++) {
        result += logicFunc(signal1[index], signal2[index], logic);
    }
    return result;
}

/**
 * @param {string} value1
 * @param {string} value2
 * @param {string} logic
 * @returns {string}
 */

// function takes pair of bits and logic, than returns result of compare
// will use "switch-case" to switch logic and "if-clauses" to compare values
function logicFunc(value1, value2, logic) {
    switch (logic) {
        case "NXOR":
            if (value1 == HIGH_SIGNAL && value2 == HIGH_SIGNAL) {
                return HIGH_SIGNAL;
            } else if (value1 == LOW_SIGNAL && value2 == LOW_SIGNAL) {
                return HIGH_SIGNAL;
            } else {
                return LOW_SIGNAL;
            }
        case "NOR":
            if (value1 == LOW_SIGNAL && value2 == LOW_SIGNAL) {
                return HIGH_SIGNAL;
            }
            else {
                return LOW_SIGNAL;
            }
        case "NAND":
            if (value1 == HIGH_SIGNAL && value2 == HIGH_SIGNAL) {
                return LOW_SIGNAL;
            }
            else {
                return HIGH_SIGNAL;
            }
        case "XOR":
            if (value1 == HIGH_SIGNAL && value2 == HIGH_SIGNAL) {
                return LOW_SIGNAL;
            } else if (value1 == LOW_SIGNAL && value2 == LOW_SIGNAL) {
                return LOW_SIGNAL;
            }
            else {
                return HIGH_SIGNAL;
            }
        case "OR":
            if (value1 == HIGH_SIGNAL || value2 == HIGH_SIGNAL) {
                return HIGH_SIGNAL;
            } else {
                return LOW_SIGNAL;
            }
        case "AND":
            if (value1 == HIGH_SIGNAL && value2 == HIGH_SIGNAL) {
                return HIGH_SIGNAL;
            } else {
                return LOW_SIGNAL;
            }
    }
}
