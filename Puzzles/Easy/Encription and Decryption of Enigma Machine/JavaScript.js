/** implementation provided by codingame, do not include this in solution */
const readline = () => "";

/*
codingame.com
Puzzle: Encryption/Decryption of Enigma Machine
Difficulty: Easy
URL: https://www.codingame.com/training/easy/encryptiondecryption-of-enigma-machine


First Caesar shift is applied using an incrementing number:
If String is AAA and starting number is 4 then output will be EFG.
A + 4 = E
A + 4 + 1 = F
A + 4 + 1 + 1 = G

Now map EFG to first ROTOR such as:
ABCDEFGHIJKLMNOPQRSTUVWXYZ
BDFHJLCPRTXVZNYEIWGAKMUSQO
So EFG becomes JLC. Then it is passed through 2 more rotors to get the final value.

If the second ROTOR is AJDKSIRUXBLHWTMCQGZNPYFVOE, we apply the substitution step again thus:
ABCDEFGHIJKLMNOPQRSTUVWXYZ
AJDKSIRUXBLHWTMCQGZNPYFVOE
So JLC becomes BHD.

If the third ROTOR is EKMFLGDQVZNTOWYHXUSPAIBRCJ, then the final substitution is:
ABCDEFGHIJKLMNOPQRSTUVWXYZ
EKMFLGDQVZNTOWYHXUSPAIBRCJ
So BHD becomes KQF.

Final output is sent via Radio Transmitter.
    Input:
        Line 1: ENCODE or DECODE
        Line 2: Starting shift N
        Lines 3-5:
        BDFHJLCPRTXVZNYEIWGAKMUSQO ROTOR I
        AJDKSIRUXBLHWTMCQGZNPYFVOE ROTOR II
        EKMFLGDQVZNTOWYHXUSPAIBRCJ ROTOR III
        Line 6: Message to Encode or Decode
    Output:
        Encoded or Decoded String
        Constraints
        0 ≤ N < 26
        Message consists only of uppercase letters (A-Z)
        1 ≤ Message length < 50
    
        Example:
            Input:
                ENCODE
                4
                BDFHJLCPRTXVZNYEIWGAKMUSQO
                AJDKSIRUXBLHWTMCQGZNPYFVOE
                EKMFLGDQVZNTOWYHXUSPAIBRCJ
                AAA
            Output:
                KQF

*/


const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
/** "ENCODE" or "DECODE" */
const operation = readline();
/** number of steps to shift */
const pseudoRandomNumber = parseInt(readline());
/** masks applied on message */
const rotors = [...Array(3)].map(readline)
let message = readline().split("");

if (operation == "ENCODE") {
    console.log(encode(message))
} else if (operation == "DECODE") {
    console.log(decode(message))
}

// first, to the message a is applied Caesar cipher with a shift by a pseudoRandomNumber and an additional shift by the index of each charы
// then 3 masks are applied bit by bit
// at the end the array is converted to a string and returned
function encode(message) {
    let encodeResult = message.map((char, index) => char = alphabet[(alphabet.indexOf(char) + pseudoRandomNumber + index) % alphabet.length])
    for (let rotor of rotors) {
        encodeResult = encodeResult.map((char) => char = rotor[alphabet.indexOf(char)])
    }
    return encodeResult.join("")
}

// for encoding, the algorithm reverses
// first masks are applied to the message in reverse order
// then the Caesar cipher is applied with a shift in the reverse direction
// at the end the array is converted to a string and returned
function decode(message) {
    for (let rotor of rotors.reverse()){
        message =  message.map((char) => char = alphabet[rotor.indexOf(char)])
    }
    let decodeResult = message.map((char, index) => {
        let indexInAlphabet = (alphabet.indexOf(char) - pseudoRandomNumber - index) % alphabet.length
        // because of shifting back, the index goes into minus, we add the length of the alphabet until the value becomes positive
        // it makes possible to decode a message of any length and any shift value
        while (indexInAlphabet < 0) {
            indexInAlphabet += alphabet.length
        }
        return char = alphabet[indexInAlphabet] 
    })
    return decodeResult.join("")
}