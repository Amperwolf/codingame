/** implementation provided by codingame, do not include this in solution */
const readline = () => "";

/* 

 var inputs = readline().split(' ');
 /** width of the building. */
 const W = parseInt(inputs[0]);
 /** height of the building. */
 const H = parseInt(inputs[1]);
 /** maximum number of turns before game over */
 const N = parseInt(readline());
 var inputs = readline().split(' ');
 const X0 = parseInt(inputs[0]);
 const Y0 = parseInt(inputs[1]);
 /** current position on X-axis */
 let curX = X0;
 /** current position on Y-axis */
 let curY = Y0;
 /** moving pont Y-axis */
 let dirY = 0;
 /** moving point X-axis */
 let dirX = 0;
 /** nearest known high point */
 let high = 0;
 /** nearest known low point */
 let low = H;
 /** nearest known left point */
 let left = 0;
 /** nearest known right point */
 let right = W;
 
 
 while (true) {
     /** the direction of the bombs from batman's current location (U, UR, R, DR, D, DL, L or UL) */
     const bombDir = readline(); 
     //if the direction is down, mark the current point as the nearest top point
     // move to the middle between the current and the maximum known bottom point, and mark it as the new current point. 
     //We repeat this operation for each of the 4 directions until we find the desired point
     if (bombDir.includes("U")) {
         low = curY;
         dirY = Math.floor((high + curY) / 2);
         curY = dirY;
     } else if (bombDir.includes("D")) {
         high = curY;
         dirY = Math.floor((low + curY) / 2)
         curY = dirY;
     }
     if (bombDir.includes("L")) {
         right = curX;
         dirX = Math.floor((left + curX) / 2);
         curX = dirX;
     } else if (bombDir.includes("R")) {
         left = curX;
         dirX = Math.floor((right + curX) / 2);
         curX = dirX;
     }
     console.log(`${dirX} ${dirY}`)
 }
 