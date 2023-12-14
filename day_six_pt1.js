var fs = require('fs')
const raceData = fs.readFileSync('./race_data.txt', 'utf8')
const data = raceData.split('\n')
const races = []
class Race {
    constructor(time, distance){
        this.time = time
        this.record = distance
        this.possibleWins = calculatePossibleWins(this.time, this.record)
        this.countOfWins = Number(this.possibleWins.length)
    }
}
const input = {"times": [], "distances": []}
data.forEach(line => {
    const dataItem = line.split(' ')
    const name = dataItem.shift().replace(':','s').toLowerCase()
    dataItem.forEach(item => {
        if(item !== ''){
            input[name].push(Number(item))
        }

    })
})
if(input.times.length === input.distances.length){
    for(let i = 0; i < input.times.length; i++){
        races.push(new Race(input.times[i], input.distances[i]))
    }
} else {
    console.log("The number of times and distances do not match")
}
function calculatePossibleWins(timeAvailable, distanceToBeat){
    const wins = []
    for(let timeUsed = 1; timeUsed < timeAvailable; timeUsed++){  //will always use at least 1 of timeAvailable (to travel more than 0), and will always leave 1 of timeAvailable (to have more than 0 time left to travel)
        if((timeUsed * (timeAvailable - timeUsed)) > distanceToBeat){
            wins.push({"holdButton": timeUsed, "distanceTravelled": timeUsed * (timeAvailable - timeUsed)})
        }
    }
    return wins
}
let numberOfWaysToWin = 1
races.forEach(race => {
    numberOfWaysToWin = numberOfWaysToWin * race.countOfWins
})
console.log(numberOfWaysToWin)