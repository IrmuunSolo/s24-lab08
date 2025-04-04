import { CardStatus } from '../../cards/cardstatus.js'
import { CardOrganizer } from '../cardorganizer.js'

function newRecentMistakesFirstSorter (): CardOrganizer {
  /**
   * Checks if the card's most recent response was incorrect
   * @param cardStatus The card status to check
   * @return true if last response was incorrect
   */
  function hasRecentMistake (cardStatus: CardStatus): boolean {
    const results = cardStatus.getResults()
    return results.length > 0 && !results[results.length - 1]
  }

  return {
    /**
     * Orders the cards by putting those with most recent incorrect answers first,
     * followed by cards with correct answers, maintaining their relative order
     *
     * @param cards The {@link CardStatus} objects to order.
     * @return The ordered cards.
     */
    reorganize: function (cards: CardStatus[]): CardStatus[] {
      const cardsWithRecentMistakes = []
      const cardsWithoutRecentMistakes = []
      for (const card of cards) {
        if (hasRecentMistake(card)) {
          cardsWithRecentMistakes.push(card)
        } else {
          cardsWithoutRecentMistakes.push(card)
        }
      }
      return [...cardsWithRecentMistakes, ...cardsWithoutRecentMistakes]
    }
  }
};

export { newRecentMistakesFirstSorter }
