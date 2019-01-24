/*
 * Create a list that holds all of your cards
 */
var icons = [ 'fa-diamond', 'fa-bolt', 'fa-paper-plane-o', 'fa-anchor',
 'fa-cube', 'fa-bomb', 'fa-leaf', 'fa-bicycle',
 'fa-diamond', 'fa-bolt', 'fa-paper-plane-o', 'fa-anchor',
 'fa-cube', 'fa-bomb', 'fa-leaf', 'fa-bicycle' ];
var openCards = [];
var counter = 0;
var timerElement = document.getElementsByClassName('timer')[0];
var timer = 0;
var gameInProgress = false;
setInterval(function() {
  if (gameInProgress) {
    timer = timer + 1;
    // Show timer
    timerElement.innerHTML = timer;
  }
}, 1000);
// Add event listener to restart button
var restart = document.getElementsByClassName('restart')[0];
restart.addEventListener('click', resetGame);
// Save reference to moves element (to use later in updateCounter)
var moves = document.getElementsByClassName('moves')[0];
var stars = document.getElementsByClassName('stars')[0];
resetGame();
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function resetGame() {
  icons = shuffle(icons);
// Shuffle function from http://stackoverflow.com/a/2450976
  var cards = document.getElementsByClassName('card');
  var numCards = cards.length;
  openCards = [];
  counter = 0;
  timer = 0;
  gameInProgress = false;
  moves.innerHTML = 0;
  timerElement.innerHTML = 0;
  stars.children[0].style.visibility = 'visible';
  stars.children[1].style.visibility = 'visible';
  stars.children[2].style.visibility = 'visible';
  for (var i = 0; i < numCards; i++) {
    cards[i].addEventListener('click', clickHandler);
    cards[i].classList.remove('show', 'open', 'match');
    cards[i].innerHTML = '<i class="fa ' + icons[i] + '"></i>';
  }
}
function clickHandler(e) {
  // Called on card click
  var card = e.target;
  if (openCards.length < 2 && card.classList.contains('card')) {
    gameInProgress = true;
    showCard(card);
    addToOpen(card);
  }
}
function showCard(card) {
  // Show card
  card.classList.add('open', 'show');
}
function addToOpen(card) {
  // Add card to the list of open cards
  if (!openCards.includes(card) && !card.classList.contains('match')) {
    openCards.push(card);
    setTimeout(checkCards, 2000);
    updateCounter();
  }
}
function checkCards() {
  if (openCards.length === 2) {
    if (doCardsMatch(openCards[0], openCards[1])) {
      lockOpened();
      checkGameEnd();
    } else {
      hideOpened();
    }
    openCards = [];
  }
}
function doCardsMatch(card1, card2) {
  // Check if card1 and card2 have the same icon
  return (card1.innerHTML === card2.innerHTML);
}
function lockOpened() {
  // Called when cards match, lock them opened on the screen
  for (var i = 0; i < openCards.length; i++) {
    openCards[i].classList.add('match');
  }
}
function hideOpened() {
  // Called when cards fo not match, close them back
  for (var i = 0; i < openCards.length; i++) {
    openCards[i].classList.remove('show', 'open');
  }
}
function updateCounter() {
  // Increment move counter and display it on the screen
  counter = counter + 1;
  if(counter >= 20) {
    stars.children[2].style.visibility = 'hidden';
  }
  if(counter >= 30) {
    stars.children[1].style.visibility = 'hidden';
  }
  //*if(counter >= 26) {
    //stars.children[0].style.visibility = 'hidden';
  //}
  // Update number of moves
  moves.innerHTML = counter;
}
function checkGameEnd() {
  // Called on each move to see if all cards are opened
  // Add game end check
  var matchedCards = document.getElementsByClassName('match');
  if (matchedCards.length === 16) {
    // Game restart confirmation
    gameInProgress = false;
    if (confirm("Well played!\n"
    + "You made " + counter + " moves and it took " + timer + " seconds"
    + "\nWant to play again?")) {
      resetGame();
    }
  }
}
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
