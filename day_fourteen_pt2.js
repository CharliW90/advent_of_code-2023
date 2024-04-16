var fs = require('fs')
const controlPanelRocks = fs.readFileSync('./control_panel.txt', 'utf8')
const rowsOfRocks = controlPanelRocks.split(/\n/)
const cycleCache = {}
const gridCache = {}
let hundreds = 0
function produceColumns(rows){
    const columns = []
    rows.forEach(row => {
        for(let i = 0; i < row.length; i++){
            if(columns[i]){
                columns[i] += row[i]
            } else {
                columns[i] = row[i]
            }
        }
    })
    return columns
}
function tipRowOfRocks(row){
    rocksToRoll = row.split('')
    const allRocks = []
    const roundRocks= []
    const flatRocks = []
    for(let i = 0; i < rocksToRoll.length; i++){
        thisRock = rocksToRoll[i]
        nextRock = rocksToRoll[i+1]
        if(thisRock === '#'){
            if(nextRock === '#'){
                flatRocks.push(thisRock)
            } else {
                flatRocks.push(thisRock)
                allRocks.push(flatRocks.join(''))
                flatRocks.length = 0
            }
        } else if(thisRock === '.' | thisRock === 'O'){
            if(nextRock === '.' | nextRock === 'O'){
                roundRocks.push(thisRock)
            } else {
                roundRocks.push(thisRock)
                allRocks.push(roundRocks.join(''))
                roundRocks.length = 0
            }
        }
    }
    const rolledRocks = []
    allRocks.forEach(cluster => {
        if(cluster.includes('O')){
            rolledRocks.push(rollRocks(cluster))
        } else {
            rolledRocks.push(cluster)
        }
    })
    return rolledRocks.join('')
}
function rollRocks(cluster){
    let rolledRocks = ''
    const countRocks =  cluster.split('O').length - 1
    const countSpace = cluster.split('.').length - 1
    if(cluster.length === countRocks + countSpace){
        rolledRocks += 'O'.repeat(countRocks)
        rolledRocks += '.'.repeat(countSpace)
    }
    return rolledRocks
}
var patternFound
var patternStart = 0
var patternEnd = 0
let patternLength = 0
function cycle (grid){
    //tip north
    var nGrid
    const nAligned = produceColumns(grid)
    const nResult = []
    nAligned.forEach(row => {
        nResult.push(tipRowOfRocks(row))
    })
    //re-align grid
    nGrid = produceColumns(nResult)
    //tip west
    var wGrid
    wGrid = []
    nGrid.forEach(row => {
        wGrid.push(tipRowOfRocks(row))
    })
    //tip south
    var sGrid
    const sAligned = produceColumns(wGrid.reverse())
    const sResult = []
    sAligned.forEach(row => {
        sResult.push(tipRowOfRocks(row))
    })
    //re-align grid
    sGrid = produceColumns(sResult).reverse()
    //tip east
    var eGrid
    const eAligned = produceColumns(produceColumns(sGrid).reverse())
    const eResult = []
    eAligned.forEach(row => {
        eResult.push(tipRowOfRocks(row))
    })
    eGrid = produceColumns(produceColumns(eResult).reverse())

    cycleCache[grid.join('')] = eGrid
    return eGrid
}
function iterateHundred(rowsOfRocks){
    let grid = rowsOfRocks
    let sum = 0
    let basePoint= 0
    for(let i = 1; i <= 10000; i++){
        const newGrid = cycle(grid)
        if(gridCache[newGrid.join(',')]){
            //console.log(gridCache)
            console.log(`this grid previously seen at ${gridCache[newGrid.join(',')]}`)
            const patternLength = i - gridCache[newGrid.join(',')]
            console.log(`cycle ${i} is a repeat, and is first seen at ${gridCache[newGrid.join(',')]} giving a pattern length of ${patternLength} \n`)
            basePoint = gridCache[newGrid.join(',')] - 1
            for(let j = 100; j <= 1000000000; j *= 10){
                console.log(`to get from ${basePoint} to ${j} we need to do ${j - basePoint} more cycles`)
                let patternIterations = (j - basePoint) % patternLength
                console.log(`${patternLength} goes into ${j - basePoint} with a remainder of ${patternIterations}`)
                if(patternIterations === 0){
                    patternIterations = patternLength + basePoint
                }
                for(const key in gridCache){
                    if(gridCache[key] === (patternIterations)){
                        let grid = key.split(',')
                        grid.forEach(x => console.log(x))
                        console.log(`This has a load on the beam of ${sumString(key)} \n`)
                    }
                }
            }
        break
        } else {
            gridCache[newGrid.join(',')] = i
        }
        sum = sumRocks(newGrid)
        grid = newGrid
    }
    return sum
}
function sumRocks(grid){
    let sum = 0
    for(let i = 0; i < grid.length; i++){
        const value = grid.length - i
        const countRocks =  grid[i].split('O').length - 1
        const score = value * countRocks
        sum += score
    }
    return sum
}
function sumString(stringy){
    const grid = stringy.split(',')
    return sumRocks(grid)
}
function findPattern(list){
    const originalList = []
    list.forEach(x => {originalList.push(x)})
    const positions = {}
    while(list.length > 1){
        let thisChar = list.shift()
        if(list.includes(thisChar)){
            if(!distances[thisChar]){
                distances[thisChar] = []
            } else {                                        //using else to skip the first match
            const distance = list.indexOf(thisChar)+1
            distances[thisChar].push(distance)
            }
        }
    }
    const repeatingDistances = []
    for(const [character, distanceMeasurements] of Object.entries(distances)){
        let sum = 0
        let portion = Math.ceil(distanceMeasurements.length / 2)
        if(portion % 2 !== 0){
            portion++
        }
        console.log(portion)
        for(let i = 0; i < portion; i++){
            const measurement = distanceMeasurements[i]
            sum += measurement
        }
        let repeatingDistance = sum / portion
        while(!Number.isInteger(repeatingDistance)){
            repeatingDistance *= 2
        }
        console.log(character + ' ' + repeatingDistance)
     
        repeatingDistances.push(repeatingDistance)
    }
    let unique_values = [...new Set(repeatingDistances)]
    let patternLength = 0
    if(unique_values.length === 1){
        patternLength = Number(unique_values.pop())
    } else {
        console.log("Error - unique values had more than one value")
    }
    endChar = originalList.length
    startChar = originalList.length - patternLength
    console.log(`Pattern will be found at chars ${startChar+1}, ${endChar}`)
    const patternThatRepeats = originalList.slice(startChar, endChar)
    console.log(patternThatRepeats)
    // when we get to character x we will have used the pattern y times
    let y = (1000+patternLength) % patternLength
    let x = 1000 - y
    console.log(patternThatRepeats[y])
    const testNumber = 100000001
    console.log(`Pattern Length is ${patternLength} long, and occurs in the first ${hundreds * 100} cycles`)
    console.log(`character ${(hundreds * 100) + 1} will be the first character in the pattern`)
    console.log(`to got to character ${testNumber} we need to calculate ${testNumber - (hundreds * 100)} more iterations`)
    const furtherIterations = testNumber - (hundreds * 100)
    console.log(`the pattern goes into ${furtherIterations} cycles ${Math.floor(furtherIterations / patternLength)} times, with a remainder of ${furtherIterations % patternLength}`)
    var pointInPattern
    if((furtherIterations % patternLength) - 1 < 0){
        pointInPattern = 6
    } else {
        pointInPattern = (furtherIterations % patternLength) - 1
    }
    console.log(`this would make character ${testNumber} = ${patternThatRepeats[pointInPattern]}`)
}
iterateHundred(rowsOfRocks)