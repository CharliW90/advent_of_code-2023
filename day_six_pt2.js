var fs = require('fs')
const raceData = fs.readFileSync('./race_data.txt', 'utf8')
const data = raceData.split('\n')
const race = {}
data.forEach(line => {
    const dataItem = line.split(':')
    const name = dataItem.shift().replace(':','').toLowerCase()
    const result = Number(dataItem.shift().replace(/ /g,''))
    race[name] = result
})
let lowerBound = 1
let upperBound = Number(race.time - 1)
while((lowerBound*(race.time - lowerBound)) <= race.distance){
    lowerBound++
}
while(upperBound*(race.time - upperBound) <= race.distance){
    upperBound--
}
const numberOfWaysToWin = upperBound - lowerBound +1
console.log(numberOfWaysToWin)