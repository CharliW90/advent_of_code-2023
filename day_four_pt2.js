var fs = require('fs')
const scratchcards = fs.readFileSync('./scratchcards.txt', 'utf8')
const cards = scratchcards.split('\n')
const reg = /(?:.*\s+)(?<cardNumber>\d+)(?:\:\s)(?<winningNumbers>.+)(?:\s\|\s)(?<ourNumbers>.+)/
const results = []
for(let i = 0; i<cards.length-1; i++){
    const card = reg.exec(cards[i])
    results.push({
        "cardNumber": Number(card.groups.cardNumber),
        "winningNumbers": card.groups.winningNumbers.split(/\s+/).map(Number),
        "ourNumbers": card.groups.ourNumbers.split(/\s+/).map(Number),
        "copies": 1
    })
}
const scores = []
for(let thisCard = 0; thisCard < results.length; thisCard++){
    const matches = results[thisCard].winningNumbers.filter(result => results[thisCard].ourNumbers.includes(result))
    const lastCardToAffect = thisCard + matches.length
    const copiesToRun = results[thisCard].copies
    for(let copy = 0; copy < copiesToRun; copy++){ //trigger this once per copy of thisCard
        for(let nextCard = thisCard + 1; nextCard <= lastCardToAffect; nextCard++){ //nextCard is thisCard+1, and onwards until reaching the lastCardToAffect
            if(nextCard < results.length){ //as long as the nextCard is not higher than the last card in the pile
                results[nextCard].copies++
            }
        }
    }
}
let sum = 0
results.forEach((copy) => sum += copy.copies)
console.log(sum)