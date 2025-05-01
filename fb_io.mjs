//**************************************************************/
// fb_io.mjs
// Generalised firebase routines
// Written by <Your Name Here>, Term 2 202?
//
// All variables & function begin with fb_  all const with FB_
// Diagnostic code lines have a comment appended to them //DIAG
/**************************************************************/
const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#CD7F32';	//  console.log for functions scheme
console.log('%c fb_io.mjs',
            'color: blue; background-color: white;');

/**************************************************************/
// Import all external constants & functions required
/**************************************************************/
// Import all the methods you want to call from the firebase modules
    
import { initializeApp }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
    import { getAuth, GoogleAuthProvider, signInWithPopup }

    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

//Variables

/**************************************************************/
// EXPORT FUNCTIONS
// List all the functions called by code or html outside of this module
/**************************************************************/
export { 
    fb_initialise,fb_authenticate };

function fb_initialise() {
    console.log('%c fb_initialise(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const FB_CONFIG = {
    apiKey: "AIzaSyAC9lbREKwJJ95pZUJ7Wy3hI_QfivE2a34",
    authDomain: "comp-firebaseskills.firebaseapp.com",
    projectId: "comp-firebaseskills",
    storageBucket: "comp-firebaseskills.firebasestorage.app",
    messagingSenderId: "634491601796",
    appId: "1:634491601796:web:1c48be8af741f25bd353d1"
  };

  // Initialize Firebase
  console.log(FB_CONFIG)
  const FB_APP = initializeApp(FB_CONFIG);
  console.log(FB_APP);
  const FB_DATABASE = getDatabase(FB_APP);
  console.log(FB_DATABASE);

}

function fb_authenticate() {
    console.log("Fb_Authenitcate")

    const AUTH = getAuth();
    const PROVIDER = new GoogleAuthProvider();
    // The following makes Google ask the user to select the account
PROVIDER.setCustomParameters({
        prompt: 'select_account'
    });
    signInWithPopup(AUTH, PROVIDER).then((result) => {
        console.log("Authenticated sucessfully!")
    })
    .catch((error) => {
        console.log(error)
        });
}

/**************************************************************/
// END OF CODE
/**************************************************************/