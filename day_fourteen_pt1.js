var fs = require('fs')
const controlPanelRocks = fs.readFileSync('./control_panel.txt', 'utf8')
const rowsOfRocks = controlPanelRocks.split(/\n/)
const cache = {}
const columnsOfRocks = produceColumns(rowsOfRocks)
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
    if(cache[cluster]){
        return cache[cluster]
    }
    let rolledRocks = ''
    const countRocks =  cluster.split('O').length - 1
    const countSpace = cluster.split('.').length - 1
    if(cluster.length === countRocks + countSpace){
        rolledRocks += 'O'.repeat(countRocks)
        rolledRocks += '.'.repeat(countSpace)
    }
    cache[cluster] = rolledRocks
    return rolledRocks
}
const tippedColumns = []
columnsOfRocks.forEach(column => {
    tippedColumns.push(tipRowOfRocks(column))
})
const rowsToColumns = produceColumns(tippedColumns)
let sum = 0
for(let i = 0; i < rowsToColumns.length; i++){
    const value = rowsToColumns.length - i
    const countRocks =  rowsToColumns[i].split('O').length - 1
    const score = value * countRocks
    sum += score
}
console.log(sum)