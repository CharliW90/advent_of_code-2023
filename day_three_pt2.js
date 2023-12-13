var fs = require('fs')
const engineSchematic = fs.readFileSync('./engineSchematic.txt', 'utf8')
const arrayOfEngine = engineSchematic.split('\n')
const reg = /\d+/g
const engineParts = []
const gears = {}
function checkForSymbol(gridTop, gridBottom, gridLeft, gridRight){
    let coOrds
    for(let start = gridTop; start < gridBottom + 1; start++){
        for(let left = gridLeft; left < gridRight + 1; left++){
            if(/[*]/.test(arrayOfEngine[start][left])){
                coOrds =  `${start},${left}`
            }
        }
    }
    return coOrds
}
for(let row = 0; row < arrayOfEngine.length; row++){
    while((match = reg.exec(arrayOfEngine[row])) !== null){
        let gridL 
        let gridR
        let gridTop
        let gridBottom
        if(match.index > 0) {   //set the furthest left we need to check (above, below and on-line, for a symbol)
            gridL = match.index - 1
        } else {
            gridL = 0
        }
        if(match.index + match[0].length < 140) {  //set the furthest right we need to check (above, below and on-line, for a symbol)
            gridR = match.index + match[0].length
        } else {
            gridR = 140
        }
        if(row > 0){
            gridTop = row - 1
        } else {
            gridTop = 0
        }
        if(row < 139){
            gridBottom = row + 1
        } else {
            gridBottom = 139
        }
        const touchesSymbol = checkForSymbol(gridTop, gridBottom, gridL, gridR)
        if(touchesSymbol){
            if(gears[touchesSymbol]){
                gears[touchesSymbol]["second"] = Number(match[0])
                gears[touchesSymbol]["pair"] = true
                gears[touchesSymbol]["ratio"] = Number(match[0])*gears[touchesSymbol].first
            } else {
                gears[touchesSymbol] = {}
                gears[touchesSymbol]["first"] = Number(match[0])
            }
        } 
    }
}
let sum = 0
for (const [gear, parts] of Object.entries(gears)) {
    if(parts.pair){
        sum += parts.ratio
    }
}
console.log(sum)