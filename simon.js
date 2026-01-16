let gameSeq=[];
let userSeq=[];

let btns = ['red', 'yellow', 'green', 'purple']; 

let started = false;
let Level=0;
let acceptingInput=false;

let h2 = document.querySelector('#status');

document.addEventListener('keypress', function(){
    if (!started){
        started = true;
        Level=0;
        gameSeq=[];
        h2.innerText= 'Game Started!';
        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add('flash')
    setTimeout(function(){
        btn.classList.remove('flash');
    }, 300);
}

function userFlash(btn){
    btn.classList.add('userFlash')
    setTimeout(function(){
        btn.classList.remove('userFlash');
    }, 150);
}


function levelUp(){
    userSeq = [];
    Level++;
    h2.innerText = `Level ${Level}`;
    acceptingInput = false;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let btn = document.querySelector(`#${randColor}`);

    gameSeq.push(randColor);

    setTimeout(function(){
        gameFlash(btn);
        acceptingInput = true;
    }, 500);
}

function checkAns(idx){
    if (userSeq[idx]=== gameSeq[idx]){
        if (userSeq.length==gameSeq.length){
            setTimeout(levelUp, 800);
        }     
    }else{
        reset();
    }
}

function btnPress() {
    if (!acceptingInput) return;
    let btn = this;
    let userColor = btn.getAttribute('id');

    userFlash(btn);
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll('.btn');
for (btn of allBtns) {
    btn.addEventListener('click', btnPress);
}

function reset() {
    h2.innerHTML = `Game Over! Your score was <b>${Level-1}</b> <br> Press any key to restart.`;
        document.querySelector('body').style.backgroundColor = 'red';
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor = 'white';
        }, 150);
    started = false;
    acceptingInput=false;

}
