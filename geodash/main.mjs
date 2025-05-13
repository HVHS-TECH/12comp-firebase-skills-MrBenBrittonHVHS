/**************************************************************/
// main.mjs
// Main entry for index.html
// Written by <Your Name Here>, Term 2 202?
/**************************************************************/
const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#CD7F32';	//  console.log for functions scheme
console.log('%c main.mjs', 
    'color: blue; background-color: white;');

/**************************************************************/
// Import all external constants & functions required
/**************************************************************/
// Import all the constants & functions required from fb_io module
import {
fb_initialise,
fb_authenticate,
    fb_writeScore
} from '../fb_io.mjs';

// Attach functions to the global window object

window.fb_writeScore = fb_writeScore;
  
import { initializeApp }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

/**************************************************************/
// index.html main code
/**************************************************************/

fb_initialise();
fb_authenticate();
/**************************************************************/
//   END OF CODE
/**************************************************************/
