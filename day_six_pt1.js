var fs = require('fs')
const raceData = fs.readFileSync('./race_data.txt', 'utf8')
console.log(raceData)