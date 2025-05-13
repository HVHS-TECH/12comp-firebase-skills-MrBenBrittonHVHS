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

var fb_gamedb;
var userName;
var UID;
/**************************************************************/
// Import all external constants & functions required
/**************************************************************/
// Import all the methods you want to call from the firebase modules

import { initializeApp }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, set, ref, get, update, query, orderByChild, limitToFirst }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

//Variables

/**************************************************************/
// EXPORT FUNCTIONS
// List all the functions called by code or html outside of this module
/**************************************************************/
export {
    fb_initialise,
    fb_authenticate,
    fb_detectLoginChange,
    fb_logout,
    fb_writeRecord,
    fb_readRecord,
    fb_readAll,
    fb_updateRecord,
    fb_sortedRead,
    fb_listenForChanges,
    fb_deleteRecord,
    fb_rebuild, // Add fb_rebuild to the export list
    fb_wreakHavock,
    fb_writeScore
};

function fb_initialise() {
    console.log('%c fb_initialise(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');

    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
    //https://comp-firebaseskills-default-rtdb.asia-southeast1.firebasedatabase.app
    // Your web app's Firebase configuration
    /*   const FB_CONFIG = {
           apiKey: "AIzaSyAC9lbREKwJJ95pZUJ7Wy3hI_QfivE2a34",
           authDomain: "comp-firebaseskills.firebaseapp.com",
           projectId: "comp-firebaseskills",
           storageBucket: "comp-firebaseskills.firebasestorage.app",
           messagingSenderId: "634491601796",
           appId: "1:634491601796:web:1c48be8af741f25bd353d1"
       }; */
    const FB_CONFIG = {
        apiKey: "AIzaSyAC9lbREKwJJ95pZUJ7Wy3hI_QfivE2a34",
        authDomain: "comp-firebaseskills.firebaseapp.com",
        databaseURL: "https://comp-firebaseskills-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "comp-firebaseskills",
        storageBucket: "comp-firebaseskills.firebasestorage.app",
        messagingSenderId: "634491601796",
        appId: "1:634491601796:web:1c48be8af741f25bd353d1"
    };
    // Initialize Firebase
    console.log(FB_CONFIG)
    const FB_APP = initializeApp(FB_CONFIG);
    console.log(FB_APP);
    fb_gamedb = getDatabase(FB_APP);
    console.log(fb_gamedb);
    //document.getElementById("p_fbInitialise").innerHTML = "Initialised";

}

function fb_authenticate() {
    console.log("Fb_Authenitcate")

    const AUTH = getAuth();
    const PROVIDER = new GoogleAuthProvider();
    // The following makes Google ask the user to select the account
    //    PROVIDER.setCustomParameters({
    //       prompt: 'select_account'
    // });
    signInWithPopup(AUTH, PROVIDER).then((result) => {
        console.log("Authenticated sucessfully!");
        console.log(result.user);
        //document.getElementById("p_fbAuthenticate").innerHTML = result.user.displayName;
        userName = result.user.displayName;
        UID = result.user.uid;

    })
        .catch((error) => {
            console.log(error)
        });
}
// filepath: /workspaces/12comp-firebase-skills-MrBenBrittonHVHS/main.mjs

 function fb_detectLoginChange() {
    console.log("Detecting login changes...");
    const AUTH = getAuth();

    onAuthStateChanged(AUTH, (user) => {
        if (user) {
            console.log("Change State Logged in");
        } else {
            console.log("change state Logged out");
        }
    }, (error) => {
        console.log("onAuthState error");
    });
    // Add your implementation here
}

 function fb_logout() {
    console.log("Logging out...");
    // Add your implementation here
    const AUTH = getAuth();

    signOut(AUTH).then(() => {
        console.log("Logged out");
    })
        .catch((error) => {
            console.log("Log out error");
        });
}

 function fb_writeRecord() {
    console.log("Writing a record...");
    // Add your implementation here


    const dbReference = ref(fb_gamedb, "Games/Pong/Score/UID");
    var data = { HighScore: 3, Name: 'Bob' }

    set(dbReference, data).then(() => {
        console.log("Write success");
    }).catch((error) => {
        console.log("Write error");
        console.log(error);
    });
}

 function fb_readRecord() {
    console.log("Reading a record...");
    // Add your implementation here
    const dbReference = ref(fb_gamedb, "Games/Pong/Score/UID/Name");

    get(dbReference).then((snapshot) => {
        var fb_data = snapshot.val();
        if (fb_data != null) {
            console.log("Read Success!");
            console.log(fb_data)
        } else {
            console.log("Read empty");
        }
    }).catch((error) => {
        console.log(error);
    });
}

 function fb_readAll() {
    console.log("Reading all records...");
    // Add your implementation here
    const dbReference = ref(fb_gamedb, "Games/Pong/Score/UID");

    get(dbReference).then((snapshot) => {
        var fb_data = snapshot.val();
        if (fb_data != null) {
            console.log("Read Success!");
            console.log(fb_data)
        } else {
            console.log("Read empty");
        }
    }).catch((error) => {
        console.log(error);
    });
}

 function fb_updateRecord() {
    console.log("Updating a record...");
    // Add your implementation here
    const dbReference = ref(fb_gamedb, "Games/Pong/Score/UID");

    var data = { Name: "Bruno" };

    update(dbReference, data).then(() => {
        console.log("Write success");
    }).catch((error) => {
        console.log("Write error");
        v
    });
}

 function fb_sortedRead() {
    console.log("Performing a sorted read...");
    // Add your implementation here
    var sortKey = "HighScore";
    const dbReference = query(ref(fb_gamedb, "Games/Pong/Score"), orderByChild(sortKey), limitToFirst(3));
    get(dbReference).then((allScoreDataSnapshot) => {
        allScoreDataSnapshot.forEach(function (userScoreSnapshot) {
            var obj = userScoreSnapshot.val();
            console.log(obj);
        });
    });

}

 function fb_listenForChanges() {
    console.log("Listening for changes...");
    // Add your implementation here
}

 function fb_deleteRecord() {
    console.log("Deleting a record...");
    // Add your implementation here
}
 function fb_writeScore(score) {
    console.log("writing score...");
    console.log(userName, UID, score)
    // Add your implementation here
        const dbReference = ref(fb_gamedb, "Games/GeoDash/Score/"+UID);

    var data = { Name: userName, score: score };

    update(dbReference, data).then(() => {
        console.log("Write success");
    }).catch((error) => {
        console.log("Write error");
    });
}
 function fb_rebuild() {
    console.log("rebuilding a record...");
    // Add your implementation here
    var data = {
  "Games": {
    "Pong": {
      "Score": {
        "UID": {
          "HighScore": 3,
          "Name": "Bob"
        },
        "UID2": {
          "HighScore": 1,
          "Name": "Bruno"
        },
        "UID3": {
          "HighScore": 100,
          "Name": "Bess"
        }
      }
    }
  }
}
    const dbReference = ref(fb_gamedb, "/");

    set(dbReference, data).then(() => {
        console.log("Write success");
    }).catch((error) => {
        console.log("Write error");
        console.log(error);
    });
}

 function fb_wreakHavock() {
    console.log("Wreaking havock...");
    // Add your implementation here

    const FB_CONFIG = {
        apiKey: "AIzaSyAC9lbREKwJJ95pZUJ7Wy3hI_QfivE2a34",
        authDomain: "comp-firebaseskills.firebaseapp.com",
        databaseURL: "https://comp-firebaseskills-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "comp-firebaseskills",
        storageBucket: "comp-firebaseskills.firebasestorage.app",
        messagingSenderId: "634491601796",
        appId: "1:634491601796:web:1c48be8af741f25bd353d1"
    };
    // Initialize Firebase
    console.log("Connecting to "+FB_CONFIG.projectId)
    var FB_APP = initializeApp(FB_CONFIG);
    //console.log(FB_APP);
    fb_gamedb = getDatabase(FB_APP);
    //console.log(fb_gamedb);
    document.getElementById("p_fbInitialise").innerHTML = FB_CONFIG.projectId;

    // Read the DB
    
    console.log("Reading all records...");
    // Add your implementation here
    const dbReference = ref(fb_gamedb, "/");

    get(dbReference).then((snapshot) => {
        var fb_data = snapshot.val();
        if (fb_data != null) {
            console.log("Read Success!");
            console.log(fb_data)
        } else {
            console.log("Read empty");
        }
    }).catch((error) => {
        console.log(error);
    });

    //Delete the DB
    /*
    const dbReference = ref(fb_gamedb, "/");
    var data = { Message: "You've been pwnd!" }

    set(dbReference, data).then(() => {
        console.log("Write success");
    }).catch((error) => {
        console.log("Write error"); 
        console.log(error);
    });
*/
}

/**************************************************************/
// END OF CODE
/**************************************************************/