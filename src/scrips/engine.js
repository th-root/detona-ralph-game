const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },

    value: {        
        gameVelocity: 1000, // 1 second
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },

    actions: {
        timerId: null,
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function countDown() {
    state.value.currentTime--;
    state.view.timeLeft.textContent = state.value.currentTime;

    if (state.value.currentTime === 0) {
        // clearInterval(state.actions.countDownTimerId);
        // clearInterval(state.actions.timerId);
        alert("Game Over! Your score is " + state.value.result);
        // Reset game state 
        state.value.result = 0;
        state.value.currentTime = 60; // Reset time to 5 seconds
        state.view.score.textContent = state.value.result;  
        state.view.timeLeft.textContent = state.value.currentTime;
    }
};

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}`);
    audio.volume = 0.1; // Ajuste o volume conforme necessário
    audio.play();
}
let lastRandomNumber = null; // variável fora da função, para lembrar do último número

function randomSquare() {
    // Remove a classe "enemy" de todos os quadrados
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");  
    });

    // Gera novo número aleatório diferente do anterior
    let randomNumber;
    do {
        randomNumber = Math.floor(Math.random() * 9);
    } while (randomNumber === lastRandomNumber);
    
    lastRandomNumber = randomNumber; // salva para próxima vez

    // Adiciona classe "enemy" ao novo quadrado
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");

    // Atualiza posição de acerto
    state.value.hitPosition = randomSquare.id;
};

function mooveEnemy() {

    state.value.timerId = setInterval(randomSquare, state.value.gameVelocity);

};

function addListenerHitBox() {

    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.value.hitPosition) {
                state.value.result++;
                state.view.score.textContent = state.value.result;
                state.value.hitPosition = null;
                playSound("hit.m4a");
            }
        });
    });

};

function init() {

    mooveEnemy();
    addListenerHitBox();
    
    state.value.score = 0;
    state.value.timeLeft = 5; // 5 minutes in seconds
    
};

init();