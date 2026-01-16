let gameSeq = [];
let userSeq = [];

let btns = ['red', 'yellow', 'green', 'purple'];

let started = false;
let level = 0;
let acceptingInput = false;

let h2 = document.querySelector('#status');

function startGame() {
    if (started) return;

    started = true;
    level = 0;
    gameSeq = [];
    userSeq = [];
    h2.innerText = 'Game Started!';
    levelUp();
}

document.addEventListener('keypress', startGame);

h2.addEventListener('click', startGame);


function gameFlash(btn) {
    btn.classList.add('flash');
    setTimeout(() => btn.classList.remove('flash'), 300);
}

function userFlash(btn) {
    btn.classList.add('userFlash');
    setTimeout(() => btn.classList.remove('userFlash'), 150);
}


function levelUp() {
    acceptingInput = false;
    userSeq = [];
    level++;

    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    gameSeq.push(randColor);

    let btn = document.querySelector(`#${randColor}`);

    setTimeout(() => {
        gameFlash(btn);
        acceptingInput = true;
    }, 600);
}


function checkAns(idx) {
    if (userSeq[idx] !== gameSeq[idx]) {
        gameOver();
        return;
    }

    if (userSeq.length === gameSeq.length) {
        setTimeout(levelUp, 800);
    }
}

function btnPress() {
    if (!started || !acceptingInput) return;

    let btn = this;
    let userColor = btn.id;

    userFlash(btn);
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll('.btn');
for (let btn of allBtns) {
    btn.addEventListener('click', btnPress); 


function gameOver() {
    h2.innerHTML = `Game Over! Your score was <b>${level - 1}</b><br>Tap status or press key to restart`;

    document.body.style.backgroundColor = 'red';
    setTimeout(() => {
        document.body.style.backgroundColor = 'white';
    }, 200);

    started = false;
    acceptingInput = false;
    gameSeq = [];
}
