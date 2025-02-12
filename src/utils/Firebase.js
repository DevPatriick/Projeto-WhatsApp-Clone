// const firebase = require('firebase')
// require('firebase/firestore')

// export class Firebase {
//     constructor() {
//         this.init()
//     }

//     init() {
//         // Import the functions you need from the SDKs you need
        
//         // TODO: Add SDKs for Firebase products that you want to use
//         // https://firebase.google.com/docs/web/setup#available-libraries

//         // Your web app's Firebase configuration
//         // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//         const firebaseConfig = {
//             apiKey: "AIzaSyB7sApl8rGpDN8DSRpGtO6mQZ43k3qQa90",
//             authDomain: "projeto-whatsapp-clone-a7a65.firebaseapp.com",
//             projectId: "projeto-whatsapp-clone-a7a65",
//             storageBucket: "projeto-whatsapp-clone-a7a65.firebasestorage.app",
//             messagingSenderId: "256718637009",
//             appId: "1:256718637009:web:d253e0c9fd2fa426ac02f0",
//             measurementId: "G-F2852X341H"
//         };

//         if(!this._initialized){
//             // Initialize Firebase
//             firebase.initializeApp(firebaseConfig);
//             // const analytics = getAnalytics(firebase);
//             firebase.firestore().settings({
//                 timestampsInSnapshots:true
//             })
//             this._initialized = true;
//         }

//     }

//     static db(){
//         return app.firestore()
//     }

//     static hd(){
//         return app.storage()
//     }

//     initAuth(){
//         return new Promise((resolve, reject)=>{

//             let provider = new firebase.auth.GoogleAuthProvider()
//             firebase.auth().signInWithPopup(provider).then(result =>{
                
//             })
//         })
//     }
// }