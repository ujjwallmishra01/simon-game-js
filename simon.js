let gameSeq = [];
let userSeq = [];

let btns = ['red', 'yellow', 'green', 'purple'];

let started = false;
let level = 0;
let acceptingInput = false;

let h2 = document.querySelector('#status');

function startGame() {
    if (!started) {
        started = true;
        level = 0;
        gameSeq = [];
        h2.innerText = 'Game Started!';
        levelUp();
    }
}

document.addEventListener('keypress', startGame);

document.addEventListener('click', startGame);


function gameFlash(btn) {
    btn.classList.add('flash');
    setTimeout(() => {
        btn.classList.remove('flash');
    }, 300);
}

function userFlash(btn) {
    btn.classList.add('userFlash');
    setTimeout(() => {
        btn.classList.remove('userFlash');
    }, 150);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    acceptingInput = false;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let btn = document.querySelector(`#${randColor}`);

    gameSeq.push(randColor);

    setTimeout(() => {
        gameFlash(btn);
        acceptingInput = true;
    }, 500);
}


function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 800);
        }
    } else {
        resetGame();
    }
}


function btnPress() {
    if (!acceptingInput || !started) return;

    let btn = this;
    let userColor = btn.getAttribute('id');

    userFlash(btn);
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll('.btn');
for (let btn of allBtns) {
    btn.addEventListener('click', btnPress);
    btn.addEventListener('touchstart', btnPress);
}


function resetGame() {
    h2.innerHTML = `Game Over! Your score was <b>${level - 1}</b><br>Tap or press any key to restart`;

    document.body.style.backgroundColor = 'red';
    setTimeout(() => {
        document.body.style.backgroundColor = 'white';
    }, 200);

    started = false;
    acceptingInput = false;
    gameSeq = [];
}
