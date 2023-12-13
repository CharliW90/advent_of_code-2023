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
    redsMax = 0
    greensMax = 0
    bluesMax = 0
    for(let j = 1; j<game.length; j++){
        const pulls = game[j].split(', ')
        for(let k = 0; k<pulls.length; k++){
            const key = pulls[k].split(' ')[1]
            const value = Number(pulls[k].split(' ')[0])
            switch(key){
                case "red":
                    if(value > redsMax){
                        redsMax = value
                    }
                    break
                case "green":
                    if(value > greensMax){
                        greensMax = value
                    }
                    break
                case "blue":
                    if(value > bluesMax){
                        bluesMax = value
                    }
            }
        }
        dataSets[i] = {
            reds: redsMax,
            greens: greensMax,
            blues: bluesMax,
        }
    }
}
for(let i = 0; i<dataSets.length; i++){
    let possible = true
    if(dataSets[i].reds > maxReds){
        possible = false
    } else if(dataSets[i].greens > maxGreens){
        possible = false
    } else if(dataSets[i].blues > maxBlues){
        possible = false
    }
    if(possible){
        possibleGames.push(i+1)
    }
}
let sum = 0
for(let i = 0; i<possibleGames.length; i++){
    sum += possibleGames[i]
}
console.log(sum)
