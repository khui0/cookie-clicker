// This code is a big mess and sucks so much im sorry

const cookie = document.getElementById("clicker");
const info = document.getElementById("info");

var score = 0;
var multiplier = 1;
var goal = 100;
var level = 1;
var clicks = 0;

// Initialize localStorage variables
(localStorage.getItem("score") === null) ? localStorage.setItem("score", score) : score = parseFloat(localStorage.getItem("score"));
(localStorage.getItem("multiplier") === null) ? localStorage.setItem("multiplier", multiplier) : multiplier = parseFloat(localStorage.getItem("multiplier"));
(localStorage.getItem("goal") === null) ? localStorage.setItem("goal", goal) : goal = parseFloat(localStorage.getItem("goal"));
(localStorage.getItem("level") === null) ? localStorage.setItem("level", level) : level = parseInt(localStorage.getItem("level"));
(localStorage.getItem("clicks") === null) ? localStorage.setItem("clicks", clicks) : clicks = parseInt(localStorage.getItem("clicks"));
updateCounter();
updateInfo();

cookie.addEventListener("click", e => {
    clicks++;
    localStorage.setItem("clicks", clicks);
    clickCookie();

    spawnCookie(e.pageX, e.pageY);
});

document.addEventListener("keydown", e => {
    if (e.key == "Enter") {
        e.preventDefault();
    }
})

function clickCookie() {
    let add = 1 * multiplier;
    score += add;
    localStorage.setItem("score", score);
    if (score >= goal) {
        goal *= 2;
        localStorage.setItem("goal", goal);

        level++;
        localStorage.setItem("level", level);

        multiplier *= 1.5;
        localStorage.setItem("multiplier", multiplier);
    }
    updateCounter();
    updateInfo();
}

function spawnCookie(x, y) {
    let element = document.createElement("img");
    element.className = "cookie";
    element.src = "cookie.png";
    element.style.top = (y - 25) + "px";
    element.style.left = (x - 25) + "px";
    document.body.appendChild(element);
    setTimeout(() => {
        element.remove();
    }, 500);
}

function updateCounter() {
    cookie.textContent = score.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function updateInfo() {
    info.innerHTML = `Level: ${level}<br>Goal: ${goal.toLocaleString("en-US")}<br>Multiplier: ${multiplier.toFixed(2)}x<br>Calories burned: ${(clicks / 10000000).toFixed(7)}`;
}

setInterval(() => {
    let clickers = level;
    !document.hidden && click();
    function click() {
        if (clickers > 1) {
            clickCookie();
            clickers--;
        }
        setTimeout(click, 100);
    }
}, 1000);