/** implementation provided by codingame, do not include this in solution */
const readline = () => "";

/*
codingame.com
Puzzle: DEFIBRILLATORS
Difficulty: Easy
URL: https://www.codingame.com/training/easy/defibrillators

Example
    Input
        3,879483
        43,608177
        3
        1;Maison de la Prevention Sante;6 rue Maguelone 340000 Montpellier;;3,87952263361082;43,6071285339217
        2;Hotel de Ville;1 place Georges Freche 34267 Montpellier;;3,89652239197876;43,5987299452849
        3;Zoo de Lunaret;50 avenue Agropolis 34090 Mtp;;3,87388031141133;43,6395872778854
    Output
        Maison de la Prevention Sante
        
*/


//replace dot to comma to get floating point number from string
const usersLongitude = parseFloat(readline().replace(",", "."));
const usersLatitude = parseFloat(readline().replace(",", "."));
const countOfDefibrillators = parseInt(readline());
/** name of the nearest defibrillator */
let nearestDefibrillator = "";
/**destination to the nearest defibrillator */
let destination = Number.POSITIVE_INFINITY;

// read list of defibrillators and get they names and coordinates
for (let i = 0; i < countOfDefibrillators; i++) {
    const DEFIBRILLATORS = readline();
    const name = DEFIBRILLATORS.split(";")[1];
    const longitude = parseFloat(DEFIBRILLATORS.split(";")[4].replace(",", "."));
    const latitude = parseFloat(DEFIBRILLATORS.split(";")[5].replace(",", "."));

    // call a function wich returns a distance to defibrillator and set nearest to ours destination
    const distance = distanceCalculation(usersLongitude, usersLatitude, longitude, latitude);
    if (destination > distance) {
        destination = distance;
        nearestDefibrillator = name;
    }
}

//print name of the nearest defibrillator
console.log(nearestDefibrillator)

/**
 * @param {number} usersLongitude
 * @param {number} usersLatitude
 * @param {number} longitude
 * @param {number} latitude
 * @returns {number}
 */
// the function calculates and returns the distance from the current coordinates to the given ones
function distanceCalculation(usersLongitude, usersLatitude, longitude, latitude) {
    const x = (longitude - usersLongitude) * Math.cos((usersLatitude + latitude) / 2);
    const y = (latitude - usersLatitude);
    const d = Math.hypot(x, y) * 6371;
    return d
}