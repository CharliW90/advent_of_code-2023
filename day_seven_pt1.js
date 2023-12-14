var fs = require('fs')
const handsOfCards = fs.readFileSync('./hands_of_cards.txt', 'utf8')
class Hand {
    constructor(cards, bid){
        this.cards = cards
        this.bid = bid
        this.type = calculateType(this.cards)
        this.strength = getStrength(this.type, this.cards)
        this.rank = 0
        this.payOut = 0
    }
}
const regexPatterns = {
    "fiveOfAKind": /(.)\1{4}/,
    "fourOfAKind": /(.)\1{3}/,
    "fullHouse": /(.)\1{2}(.)\2|(.)\3(.)\4{2}/,
    "threeOfAKind": /(.)\1{2}/,
    "twoPair": /(.)\1(.?)(.)\3/,
    "onePair": /(.)\1/
}
function calculateType(handOfCards){
    const cards = handOfCards.split('').sort().join('')
    let type = "High card"
    switch (true) {
        case regexPatterns.fiveOfAKind.test(cards):
            type = "Five of a kind"
            break;
        case regexPatterns.fourOfAKind.test(cards):
            type = "Four of a kind"
            break;
        case regexPatterns.fullHouse.test(cards):
            type = "Full house"
            break;
        case regexPatterns.threeOfAKind.test(cards):
            type = "Three of a kind"
            break;
        case regexPatterns.twoPair.test(cards):
            type = "Two pair"
            break;
        case regexPatterns.onePair.test(cards):
            type = "One pair"
    }
    return type
}
function getStrength(type, handOfCards){
    const strength = []
    let rank = 0
    switch (type) {
        case "Five of a kind":
            rank = 7
            break;
        case "Four of a kind":
            rank = 6
            break;
        case "Full house":
            rank = 5
            break;
        case "Three of a kind":
            rank = 4
            break;
        case "Two pair":
            rank = 3
            break;
        case "One pair":
            rank = 2
            break;
        case "High card":
            rank = 1
    }
    strength.push(rank)
    const cards = handOfCards.split('')
    cards.forEach(card => {
        switch(card){
            case "A":
                strength.push(14)
                break;
            case "K":
                strength.push(13)
                break;
            case "Q":
                strength.push(12)
                break;
            case "J":
                strength.push(11)
                break;
            case "T":
                strength.push(10)
                break;
            default:
                strength.push(Number(card))
        }
    })
    return strength
}
const hands = handsOfCards.split(/\n/)
const handsToPlay = []
hands.forEach(hand => {
     const cards = hand.split(' ')[0]
     const bid = hand.split(' ')[1]
     const thisHand = new Hand(cards, bid)
     handsToPlay.push(thisHand)
})
handsToPlay.sort(function(a, b) {
    for(let i = 0; i < 6; i++){
        if(a.strength[i] > b.strength[i]){
            return 1
        } else if(a.strength[i] < b.strength[i]){
            return -1
        }
    }
    return 0
})
for(let i = 0; i < handsToPlay.length; i++){
    handsToPlay[i].rank = Number(i + 1)
    handsToPlay[i].payOut = Number((i + 1)*handsToPlay[i].bid)
}
let sum = 0
handsToPlay.forEach(hand => {
    sum += hand.payOut
})
console.log(sum)