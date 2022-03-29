
function initialize() {
  const start = document.querySelector('#start');
  const scorePar = document.getElementById('scorePar');
  const hiScorePar = document.getElementById('hiScorePar');
  start.style.visibility = 'hidden';
  scorePar.style.visibility = 'visible';
  hiScorePar.style.visibility = 'visible';
  const gameContainer = document.getElementById("game");
  let score = 0;
  let gameEnd = false;
  let firstCard = "";
  let cardCount = 0;
  let clickCount = 0;
  let matchCount = 0;

  const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
  ];
  cardCount = COLORS.length;

  function loadHiScore() {
    let hiScore = localStorage.getItem('hiScore');
    const hiScoreLabel = document.getElementById('hiScore');
    hiScoreLabel.innerText = hiScore;
  }

  function gameRestart(matchCount) {
    if(matchCount == cardCount) {
      const resetButton = document.querySelector('#reset');
      resetButton.style.visibility = 'visible';
      resetButton.addEventListener('click', function() {
        window.location.reload();
      })
    }
  }

  // here is a helper function to shuffle an array
  // it returns the same array with values shuffled
  // it is based on an algorithm called Fisher Yates if you want to research more
  function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }

  let shuffledColors = shuffle(COLORS);

  // this function loops over the array of colors
  // it creates a new div and gives it a class with the value of the color
  // it also adds an event listener for a click for each card
  function createDivsForColors(colorArray) {
    let cardID = 0;
    for (let color of colorArray) {
      // create a new div
      const newDiv = document.createElement("div");
      // give it a class attribute for the value we are looping over
      newDiv.classList.add(color);
      newDiv.id = 'card';
      newDiv.dataset.id = cardID;
      newDiv.dataset.matched = 'false';
      // call a function handleCardClick when a div is clicked on
      newDiv.addEventListener("click", handleCardClick);

      // append the div to the element with an id of game
      gameContainer.append(newDiv);
      cardID++;
    }
  }

  // TODO: Implement this function!
  function handleCardClick(event) {
    clickCount++;
    // you can use event.target to see which element was clicked
    console.log("you just clicked", event.target.className);
    if(event.target.dataset.matched == 'true') {
      clickCount--;
      console.log(clickCount);
    }
    else {
      if(clickCount === 1) {
        event.target.style.backgroundColor = event.target.className;
        firstCard = event.target;
      }
      else if(clickCount === 2) {
        event.target.style.backgroundColor = event.target.className;
        if(event.target.dataset.id !== firstCard.dataset.id) {
          if(checkCardmatch(firstCard, event.target)) {
            setTimeout(function() {
              clickCount = 0;
            }, 1000);
          } 
        }
      }
    }
  }

  function checkCardmatch(firstCard, secondCard) {
    if((firstCard.className === secondCard.className) ) {
      firstCard.dataset.matched = 'true';
      secondCard.dataset.matched = 'true';
      matchCount += 2;
      score += 100;
      const scoreTxt = document.getElementById('score');
      scoreTxt.innerText = score;
      gameRestart(matchCount);
    }
    else {
      setTimeout(function() {
        firstCard.style.backgroundColor = '';
        secondCard.style.backgroundColor = '';
      }, 1000);
    }
    return true;
  }

  // when the DOM loads
  createDivsForColors(shuffledColors);
  loadHiScore();
}