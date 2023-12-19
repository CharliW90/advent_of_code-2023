var fs = require('fs')
const engineSchematic = fs.readFileSync('./engine_schematic.txt', 'utf8')
const arrayOfEngine = engineSchematic.split('\n')
const reg = /\d+/g
const engineParts = []
function checkForSymbol(gridTop, gridBottom, gridLeft, gridRight){
    for(let start = gridTop; start < gridBottom + 1; start++){
        for(let left = gridLeft; left < gridRight + 1; left++){
            if(/[!"#$%&'()*+,\-\/:;<=>?@[\]^_`{|}~]/.test(arrayOfEngine[start][left])){
                return true
            }
        }
    }
}
for(let row = 0; row < arrayOfEngine.length; row++){
    console.log(`We are now looking at row ${row}`)
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
        console.log(`Result ${match[0]} would have a grid of ${gridTop},${gridL} and ${gridBottom},${gridR}`)
        const touchesSymbol = checkForSymbol(gridTop, gridBottom, gridL, gridR)
        if(touchesSymbol){
            engineParts.push(match[0])
        }
    }
}
console.log(engineParts)
let sum = 0
for(let i = 0; i<engineParts.length; i++){
    sum += Number(engineParts[i])
}
console.log(sum)
