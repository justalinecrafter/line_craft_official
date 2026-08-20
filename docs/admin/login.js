import { initializeApp } from
    "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword
} from
    "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyBBFGow2_dY1K_TzaJMlrMTtEpgzaDtqi0",
  authDomain: "linecraftposts.firebaseapp.com",
  projectId: "linecraftposts",
  storageBucket: "linecraftposts.firebasestorage.app",
  messagingSenderId: "976055610808",
  appId: "1:976055610808:web:cd19e2b33b5e8d1b2eb34d",
  measurementId: "G-L3MMMK5NB3"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


document.getElementById("loginButton").addEventListener("click", async () => {

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    try {

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        location.href = "admin.html";

    } catch (error) {

        document.getElementById("message").textContent =
            "ログインできませんでした";

        console.error(error);
    }

});