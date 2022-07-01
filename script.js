'use strict';


// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');


const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


// starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');


const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;


// game reset funtion
const init = () => {
    diceEl.classList.remove('hidden');
    playing = true;
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    activePlayer = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    for (let i = 0; i < scores.length; i++) {
        currentScore = 0;
        scores[i] *= currentScore;
    }
}



const switchPlayer = function () {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    // switch active player
    activePlayer = activePlayer === 0 ? 1 : 0;
    // toggle active class between each player
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// rolling dice functionality

btnRoll.addEventListener('click', function () {
    if (playing) {
       // 1. Generating a random dice roll
       const dice = Math.trunc(Math.random() * 6) + 1;

       // 2. Display dice
       diceEl.classList.remove('hidden');
       diceEl.src = `dice-${dice}.png`;
       
       // 3. Check for rolled 1
       if (dice !== 1) {
           // Add dice to current score
           currentScore += dice;
           document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
       } else {
           // Switch to next player
           switchPlayer();
       }     
    }
});

// Hold button click function
btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. Add current score to the score of the active player
    
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
    
        // 2. Check if player's score >= 100
        if (scores[activePlayer] >= 10) {
             // Finish the game
            diceEl.classList.add('hidden');
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            // 3. Switch to the next player
            switchPlayer();
        }
    }
});
   

// New game buttonn click function(reset)
btnNew.addEventListener('click', init);

