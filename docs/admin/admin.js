import { initializeApp } from
    "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from
    "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from
    "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";


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
const db = getFirestore(app);


// ログイン確認

onAuthStateChanged(auth, (user) => {

    if (!user) {
        location.href = "login.html";
    }

});


// 投稿

document.getElementById("postButton")
    .addEventListener("click", async () => {

        const text =
            document.getElementById("postText").value.trim();

        if (text === "") {
            return;
        }

        try {

            await addDoc(collection(db, "posts"), {

                text: text,

                createdAt: serverTimestamp()

            });

            document.getElementById("postText").value = "";

            document.getElementById("message").textContent =
                "投稿しました！";

        } catch (error) {

            console.error(error);

            document.getElementById("message").textContent =
                "投稿に失敗しました";

        }

    });


// ログアウト

document.getElementById("logoutButton")
    .addEventListener("click", async () => {

        await signOut(auth);

        location.href = "login.html";

    });