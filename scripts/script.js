let front_card = "front_card";
let back_card = "back_card";
const CARD = "card";
const icon = "icon";
let restartBtn = document.querySelector(".restart");
let startBtn = document.querySelector(".start");
// startBtn.addEventListener("click", start);
restartBtn.addEventListener("click", restart);
function restart() {
  document.location.reload();
}

startGame();

function startGame() {
  initializeCards(game.createCardsFromTechs());
}
function initializeCards(cards) {
  let tabuleiro = document.querySelector(".tabuleiro");

  for (let card of cards) {
    let cardElement = document.createElement("div");
    cardElement.id = card.id;
    cardElement.classList.add(CARD);
    cardElement.dataset.icon = card.icon;

    CreateCardContent(card, cardElement);
    cardElement.addEventListener("click", flipCard);
    tabuleiro.appendChild(cardElement);
  }
}

function CreateCardContent(card, cardElement) {
  createCardFace(front_card, card, cardElement);
  createCardFace(back_card, card, cardElement);
}

function createCardFace(face, card, element) {
  let cardElementFace = document.createElement("div");
  cardElementFace.classList.add(face);
  if (face == front_card) {
    let iconElement = document.createElement("img");
    iconElement.classList.add(icon);
    iconElement.src = "./imgs/images/" + card.icon + ".png";
    cardElementFace.appendChild(iconElement);
  } else {
    cardElementFace.innerHTML = "&lt/&gt";
  }
  element.appendChild(cardElementFace);
}

function flipCard() {
  if (game.checkGameOver()) {
    setTimeout(function () {
      let gameOverSreen = document.querySelector(".gameOver");
      gameOverSreen.style.display = "flex";
    }, 500);
  }
  if (game.setCard(this.id)) {
    this.classList.add("flip");
    if (game.secondCard) {
      if (game.checkMatch()) {
        game.clearCard();
      } else {
        setTimeout(function () {
          let firstCardView = document.getElementById(game.firstCard.id);
          let secondCardView = document.getElementById(game.secondCard.id);

          firstCardView.classList.remove("flip");
          secondCardView.classList.remove("flip");
          game.unflipCards();
        }, 1000);
      }
    }
  }
}
