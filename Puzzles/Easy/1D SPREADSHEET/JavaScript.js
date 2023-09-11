/** implementation provided by codingame, do not include this in solution */
const readline = () => "";

/*
codingame.com
Puzzle: 1D SPREADSHEET
Difficulty: Easy
URL: https://www.codingame.com/training/easy/1d-spreadsheet

Example
    Input:
        2
        VALUE 3 _
        ADD $0 4
    Output:
        3
        7
*/

/*
    @ebauer:
    i like that you created a structure similar to what i talked about, read data - evaluate/ transform - print result

    also i like that you used a map with an object structure that makes the input data more understandable

    i've added some comments here and there with tips on how to further improve the overall style

    good work :)
 */


/** a map that will store all the spreadsheets */
const sheet = new Map();
/** status switcher */
const STATUS = {
    NotComplete: 0,
    Complete: 1
};
const numberOfOperations = parseInt(readline());
// read the data, save all operations and arguments, and add the keywords "result" and "status" to display the result and set the flag
for (let i = 0; i < numberOfOperations; i++) {
    const inputs = readline().split(" ");
    //@ebauer: nitpicking, but to avoid typing mistakes, use constants for string values like "Complete" and "Not Complete"
    sheet.set(i, { OP: inputs[0], arg1: inputs[1], arg2: inputs[2], result: 0, status: `${STATUS.NotComplete}` });
}

// function will be called for each operation
for (let i = 0; i < numberOfOperations; i++) {
    implement(i)
}

// show result of each operation
for (let i = 0; i < numberOfOperations; i++) {
    console.log(sheet.get(i).result)
}

/*
all data is presented as a string, it converts them into numbers, and then, stores the number, sum, difference, or multiplication in the "result" field
argument can contain a reference to another operation, in which case the result of the operation "$N" should be used as an argument
this case function recursively calls itself for the operation "$N"
*/

function implement(n) {
    /*
        @ebauer: while "sheet.get(n)" works, it would be better readable to store the result in a variable like "argN" and work with that
        you will (probably) need to call "sheet.set(n, argN)" at the end of the function if you modified "argN" though
        for example:
            const argN = sheet.get(n);
            const arg1 = argN.arg1;
            const arg2 = argN.arg2;
            ...
            sheet.set(n, argN);
        
        optional bonus tip: javascript can do "object deconstruction", so you can do this: (read more online if curious)
            const { arg1, arg2 } = argN;
     */

    const operationN = sheet.get(n);
    const OP = operationN.OP;
    let arg1 = operationN.arg1;
    let arg2 = operationN.arg2;
    // checks if the operation is completed
    if (operationN.status != STATUS.Complete) {


        //@ebauer: while using "arg1[0]" works to get the first letter, consider using methods like "arg1.startsWith("$")" to clearly communicate what you are checking
        // if argument contain "$" it means a reference to result of operation "$N", so we take "N" as argument to call function
        // then store result of operatin "$N" as argument
        if (arg1.startsWith("$")) {

            /*
                @ebauer: i guess you use "~~" to convert the string to a number? you can do that with "+arg1" or more explicitly with "Number(arg1)" or "parseInt/parseFloat"

                anyway, it is bad practice to change the meaning of a variable during a function:
                    -> arg1 is the string "$1" when initialized
                    -> arg1 is being changed here (inside an if branch) to a number that is the index of the operation whose result we want

                this change of meaning of the variable name can lead to confusing bugs when the variable is used again later
                it is better to simply create a new variable like:
                    const operationIndex = +arg1.slice(1);

                that way, the meaning of arg1 does not change and you communicate to the reader, what you are doing with arg1 and why
             */
            const operationIndex = parseInt(arg1.slice(1))
            implement(operationIndex)
            arg1 = sheet.get(operationIndex).result
            // otherwise just convert from string to number
        } else {
            arg1 = parseInt(arg1)
        }
        // the same for another argument
        if (arg2 != "_") {
            if (arg2.startsWith("$")) {
                const operationIndex = parseInt(arg2.slice(1))
                implement(operationIndex)
                arg2 = sheet.get(operationIndex).result
            } else {
                arg2 = parseInt(arg2)

            }
        }
        /*
            @ebauer: nice usage of the inline comment to explain the normally "odd" usage of "+ 0" here and why it's important
         */
        /* in javascript there is a negative zero, it does not affect the result
        but the codingame accepts only a positive zero as the correct answer, so we add zero to any result to fix it */
        if (OP == "ADD") {
            operationN.result = arg1 + arg2 + 0;
        } else if (OP == "SUB") {
            operationN.result = arg1 - arg2 + 0;
        } else if (OP == "MULT") {
            operationN.result = arg1 * arg2 + 0;
        } else { operationN.result = arg1 }
        // at the end sets flag "Complete"
        operationN.status = STATUS.Complete
    }
}
