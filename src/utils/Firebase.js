// // Importando funções específicas do Firebase
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';

// import { getAuth } from 'firebase/auth';

// export class Firebase {
//     constructor() {
//         this.init();
//     }

//     init() {
//         const firebaseConfig = {
//             apiKey: "AIzaSyB7sApl8rGpDN8DSRpGtO6mQZ43k3qQa90",
//             authDomain: "projeto-whatsapp-clone-a7a65.firebaseapp.com",
//             projectId: "projeto-whatsapp-clone-a7a65",
//             storageBucket: "projeto-whatsapp-clone-a7a65.appspot.com",
//             messagingSenderId: "256718637009",
//             appId: "1:256718637009:web:d253e0c9fd2fa426ac02f0",
//             measurementId: "G-F2852X341H"
//         };

//         if (!this._initialized) {
//             // Inicializando o Firebase
//             this.app = initializeApp(firebaseConfig);
//             this._initialized = true;
//         }
//     }

//     static db() {
//         return getFirestore(this.app);
//     }

//     static storage() {
//         return getStorage(this.app);
//     }

//     static auth() {
//         return getAuth(this.app);
//     }
// }
