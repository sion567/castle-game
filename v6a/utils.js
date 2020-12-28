function getWorldRatio () {
  return 1 / 1920 * window.innerWidth
}

function getLastPlayedCard(player) {
  return cards[player.lastPlayedCardId]
}

function drawCard () {
  if (getDrawPileCount() === 0) {
    refillPile()
  }

  const choice = Math.round(Math.random() * (getDrawPileCount() - 1)) + 1

  let	accumulation = 0
  for (let k in state.drawPile) {
    accumulation += state.drawPile[k]
    if (choice <= accumulation) {
      // Draw the card from the pile
      state.drawPile[k] --
      return {
        id: k,
        uid: cardUid++,
        def: cards[k],
      }
    }
  }
}
function refillPile () {
  Object.assign(state.drawPile, state.discardPile)
  state.discardPile = {}
}
function getDrawPileCount () {
  let result = 0
  for (let k in state.drawPile) {
    result += state.drawPile[k]
  }
  return result
}
function drawInitialHand(player) {
  for (let i = 0; i < handSize; i++) {
    player.hand.push(drawCard())
  }
}
