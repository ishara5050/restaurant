// import * as firebase from "firebase"

// var firebaseConfig = {
//     apiKey: "AIzaSyAjV8CpDWo3omuVWjUoSCy4ra537OSGtM0",
//     authDomain: "boncafe-cc1be.firebaseapp.com",
//     databaseURL: "https://boncafe-cc1be.firebaseio.com",
//     projectId: "boncafe-cc1be",
//     storageBucket: "boncafe-cc1be.appspot.com",
//     messagingSenderId: "761856856762",
//     appId: "1:761856856762:web:54ad1991f37cf57d4ba883"
//   };
//   // Initialize Firebase
// var fireDb = firebase.initializeApp(firebaseConfig);

// export default fireDb.database().ref();
import * as firebase from 'firebase'

const config={
    apiKey: "AIzaSyAjV8CpDWo3omuVWjUoSCy4ra537OSGtM0",
    authDomain: "boncafe-cc1be.firebaseapp.com",
    databaseURL: "https://boncafe-cc1be.firebaseio.com",
    projectId: "boncafe-cc1be",
    storageBucket: "boncafe-cc1be.appspot.com",
    messagingSenderId: "761856856762",
    appId: "1:761856856762:web:54ad1991f37cf57d4ba883"

}

firebase.initializeApp(config);

export default firebase