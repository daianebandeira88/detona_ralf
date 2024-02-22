const state = {
    view: {
      squares: document.querySelectorAll(".square"),
      timeleft: document.querySelector("#time-left"),
      score: document.querySelector("#score"),
      lives: document.querySelector("#live"),
      audio: new Audio("assets/audios/src_audios_hit.m4a"), // Substitua pelo caminho do seu arquivo de som
    },
    values: {
      timerId: null,
      gameVelocity: 1000,
      lives: 3,
      time: 10,
      gameStarted: false,
    },
  };
  
  function moveEnemy() {
    if (state.values.gameStarted) {
      randomSquare();
    }
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
  }
  
  function randomSquare() {
    if (state.values.gameStarted) {
      state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
      });
  
      let randomNumber = Math.floor(Math.random() * 9);
      let randomSquare = state.view.squares[randomNumber];
      randomSquare.classList.add("enemy");
    }
  }
  
  function addListenerHitBox() {
    state.view.squares.forEach((square) => {
      square.addEventListener("click", () => {
        if (state.values.gameStarted && square.classList.contains("enemy")) {
          state.view.audio.currentTime = 0; // Reiniciar a reprodução do áudio
          state.view.audio.play(); // Tocar som quando o jogador acertar um inimigo
          state.view.score.innerText = parseInt(state.view.score.innerText) + 1;
          square.classList.remove("enemy");
        } else if (state.values.gameStarted && state.values.lives > 0) {
          state.values.lives -= 1;
          state.view.lives.innerText = state.values.lives;
  
          if (state.values.lives === 0) {
            endGame();
          }
        }
      });
    });
  }
  
  
  function endGame() {
    state.values.gameStarted = false;
    clearInterval(state.values.timerId);
    alert("Jogo encerrado!");
    state.view.score.innerText = 0; // Reiniciar o score ao fim do jogo
    state.values.lives = 3; // Reiniciar as vidas ao fim do jogo
    state.view.lives.innerText = state.values.lives;
    state.values.time = 30; // Reiniciar o tempo ao fim do jogo
    state.view.timeleft.innerText = state.values.time;
  }
  
  function updateLivesAndTime() {
    state.view.lives.innerText = state.values.lives;
    state.view.timeleft.innerText = state.values.time;
  }
  
  function updateGame() {
    updateLivesAndTime();
    state.values.gameStarted = true;
    state.view.score.innerText = 0;
    state.values.lives = 3;
    state.view.lives.innerText = state.values.lives;
    state.values.time = 30;
    state.view.timeleft.innerText = state.values.time;
    moveEnemy();
  
    state.values.timerId = setInterval(() => {
      state.values.time -= 1;
      state.view.timeleft.innerText = state.values.time;
  
      if (state.values.time === 0) {
        endGame();
      }
    }, 1000);
  }
  
  function init() {
    addListenerHitBox();
    updateGame();
  }
  
  init();
  
 