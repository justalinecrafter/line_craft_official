const menuButton = document.getElementById("menuButton");
const sideMenu = document.getElementById("sideMenu");
const closeButton = document.getElementById("closeButton");


// 3本線 → 開く
menuButton.addEventListener("click", () => {
    sideMenu.classList.add("open");
});


// × → 閉じる
closeButton.addEventListener("click", () => {
    sideMenu.classList.remove("open");
});


// メニュー項目 → 閉じる
const menuLinks = sideMenu.querySelectorAll("a");

menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
        sideMenu.classList.remove("open");
    });
});