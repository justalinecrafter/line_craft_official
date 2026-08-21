
import { initializeApp } from
    "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs,
    query,
    orderBy,
    updateDoc,
    doc,
    increment
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
const db = getFirestore(app);


// Firestoreからpostsを取得
const q = query(
    collection(db, "posts"),
    orderBy("createdAt", "desc")
);

const snapshot = await getDocs(q);


// 投稿を入れる場所
const postList = document.getElementById("postList");

snapshot.forEach(async (post) => {

    const data = post.data();

    const postElement = document.createElement("article");

    const linkifiedText = data.text.replace(
    /(https?:\/\/[^\s]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    postElement.className = "news-post";


    const date = data.createdAt
        ? data.createdAt.toDate().toLocaleString("ja-JP")
        : "日時不明";


    // 現在の数値
    let love = data.love ?? 0;
    let like = data.like ?? 0;
    let dislike = data.dislike ?? 0;
    let hate = data.hate ?? 0;
    let impressions = data.impressions ?? 0;


    postElement.innerHTML = `
        <div class="post-header">

            <time>${date}</time>

            <div class="reaction-buttons">

                <button class="reaction-button love-button">
                    神評価 <span>${love}</span>
                </button>

                <button class="reaction-button like-button">
                    高評価 <span>${like}</span>
                </button>

                <button class="reaction-button dislike-button">
                    低評価 <span>${dislike}</span>
                </button>

                <button class="reaction-button hate-button">
                    酷評価 <span>${hate}</span>
                </button>

            </div>

        </div>

        <p>${linkifiedText}</p>

        <div class="post-stats">
            <span class="impression-count">
                読み込み数 ${impressions}
            </span>
        </div>
    `;


    postList.appendChild(postElement);


    // =========================
    // インプレッション
    // =========================

    updateDoc(
        doc(db, "posts", post.id),
        {
            impressions: increment(1)
        }
    );


    // =========================
    // 評価ボタン
    // =========================

    const reactions = [
        ["love-button", "love"],
        ["like-button", "like"],
        ["dislike-button", "dislike"],
        ["hate-button", "hate"]
    ];


    reactions.forEach(([className, fieldName]) => {

        const button =
            postElement.querySelector("." + className);

        const count =
            button.querySelector("span");


        button.addEventListener("click", () => {

            // まず画面上で即座に +1
            let current =
                Number(count.textContent);

            current++;

            count.textContent = current;


            // Firebaseにも +1
            updateDoc(
                doc(db, "posts", post.id),
                {
                    [fieldName]: increment(1)
                }
            ).catch((error) => {

                console.error(
                    "評価の保存に失敗しました:",
                    error
                );

            });

        });

    });

});
