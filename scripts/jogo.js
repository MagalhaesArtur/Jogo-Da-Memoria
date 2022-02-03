let game = {
  lockMode: false,
  firstCard: null,
  secondCard: null,

  setCard: function (id) {
    let card = this.cards.filter((card) => card.id === id)[0];
    if (card.flipped || this.lockMode) {
      return false;
    }
    if (!this.firstCard) {
      this.firstCard = card;
      this.firstCard.flipped = true;
      return true;
    } else {
      this.secondCard = card;
      this.lockMode = true;
      return true;
    }
  },

  unflipCards() {
    this.firstCard.flipped = false;
    this.secondCard.flipped = false;
    this.clearCard();
  },

  checkGameOver() {
    return this.cards.filter((card) => !card.flipped).length == 10;
  },

  checkMatch: function () {
    if (!this.firstCard || !this.secondCard) {
      return false;
    }
    return this.firstCard.icon === this.secondCard.icon;
  },

  clearCard: function () {
    this.firstCard = null;
    this.secondCard = null;
    this.lockMode = false;
  },

  techs: [
    "react",
    "node",
    "mongo",
    "jquery",
    "javascript",
    "html",
    "css",
    "firebase",
    "electron",
    "bootstrap",
  ],
  cards: null,
  createIdWithTech: function (tech) {
    return tech + parseInt(Math.random() * 1000);
  },
  createPairFromTech: function (tech) {
    return [
      { id: this.createIdWithTech(tech), icon: tech, flipped: false },
      { id: this.createIdWithTech(tech), icon: tech, flipped: false },
    ];
  },
  createCardsFromTechs: function (techs) {
    this.cards = [];
    console.log(this.cards);
    this.techs.forEach((tech) => {
      this.cards.push(this.createPairFromTech(tech));
    });

    this.cards = this.cards.flatMap((pair) => pair);
    this.shuffleCards();
    return this.cards;
  },
  shuffleCards: function (cards) {
    let currentIndex = this.cards.length;
    let randomIndex = 0;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [this.cards[randomIndex], this.cards[currentIndex]] = [
        this.cards[currentIndex],
        this.cards[randomIndex],
      ];
    }
  },
};
