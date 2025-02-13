const firebase = require('firebase')
require('firebase/firestore')

export class Firebase {
    constructor() {
        this.init()
    }

    init() {
        // Import the functions you need from the SDKs you need
        
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries

        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
            apiKey: "AIzaSyB7sApl8rGpDN8DSRpGtO6mQZ43k3qQa90",
            authDomain: "projeto-whatsapp-clone-a7a65.firebaseapp.com",
            projectId: "projeto-whatsapp-clone-a7a65",
            storageBucket: "projeto-whatsapp-clone-a7a65.firebasestorage.app",
            messagingSenderId: "256718637009",
            appId: "1:256718637009:web:d253e0c9fd2fa426ac02f0",
            measurementId: "G-F2852X341H"
        };

        if(!window._initializedFirebase){
            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);
            // const analytics = getAnalytics(firebase);
            firebase.firestore().settings({
                timestampsInSnapshots:true
            })
            window._initializedFirebase = true;
        }

    }

    static db(){
        return firebase.firestore();
    }

    static hd(){
        return firebase.storage();
    }

    // solicitando a autenticação ao firebase
    initAuth(){
        return new Promise( (resolve, reject)=>{

            // autenticação do Google numa variavel para passar o provider
            let provider = new firebase.auth.GoogleAuthProvider();
            // qual conta do google o user que acessar
             firebase.auth().signInWithPopup(provider).then(result =>{
                let token = result.credential.acessToken;
                let user = result.user;

                resolve({user, token});
            }).catch(err=>{
                reject(err)
            })
        })
    }
}