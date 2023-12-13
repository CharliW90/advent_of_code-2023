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
        "ourNumbers": card.groups.ourNumbers.split(/\s+/).map(Number)
    })
}
const scores = []
for(let i = 0; i<results.length; i++){
    const matches = results[i].winningNumbers.filter(result => results[i].ourNumbers.includes(result))
    const matchesCount = matches.length
    if(matchesCount > 0){
        const score = (2 ** (matchesCount-1))
        scores.push(score)
    }
}
const answer = scores.reduce((sum, value) => {
    return sum + value
},0)
console.log(answer)