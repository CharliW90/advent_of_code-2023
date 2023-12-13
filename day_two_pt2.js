var fs = require('fs')
const bagOfCubes = fs.readFileSync('./cubes.txt', 'utf8')
maxReds = 12
maxGreens = 13
maxBlues = 14
const possibleGames = []
const games = bagOfCubes.split('\n')
const cubes = []
for(let i = 0; i < games.length; i++){
    cubes.push(games[i].split(/\; |\: /))
}
const dataSets = []
for(let i = 0; i< cubes.length; i++){
    const game = cubes[i]
    let redsMin = 0
    let greensMin = 0
    let bluesMin = 0
    for(let j = 1; j<game.length; j++){
        const pulls = game[j].split(', ')
        for(let k = 0; k<pulls.length; k++){
            const key = pulls[k].split(' ')[1]
            const value = Number(pulls[k].split(' ')[0])
            switch(key){
                case "red":
                    if(value > redsMin){
                        redsMin = value
                    }
                    break
                case "green":
                    if(value > greensMin){
                        greensMin = value
                    }
                    break
                case "blue":
                    if(value > bluesMin){
                        bluesMin = value
                    }
            }
        }
    }
    const powerOfCubes = redsMin * greensMin * bluesMin
    dataSets[i] = {
        reds: redsMin,
        greens: greensMin,
        blues: bluesMin,
        power: powerOfCubes
    }
}
console.log(dataSets[0])
let sum = 0
for(let i = 0; i<dataSets.length; i++){
    sum += dataSets[i].power
}
console.log(sum)
