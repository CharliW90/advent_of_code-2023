var fs = require('fs')
const ashMirrorMaps = fs.readFileSync('./ash_and_mirrors.txt', 'utf8')
const mirrorMaps = ashMirrorMaps.split(/\n\n/)
const test_mirror = mirrorMaps[0]
let sum = 0
mirrorMaps.forEach(map => {
    const rows = map.split(/\n/)
    const columns = produceColumns(map.split(/\n/))
    const xValueForward = assessReflection(rows, "rows", 1)
    const xValueReverse =  assessReflection(rows.reverse(), "rows reversed", 1)
    const yValueForward = assessReflection(columns, "columns", 1)
    const yValueReverse = assessReflection(columns.reverse(), "columns reversed", 1)
    let value = 0
    if(xValueForward + xValueReverse !== 0){
        if(xValueForward > xValueReverse){
            const rowsOutsideMatch = rows.length - xValueForward
            value = Number(((xValueForward/2)+rowsOutsideMatch)*100)
        } else {
            value = Number(((xValueReverse/2))*100)
        }
    } else if(yValueForward + yValueReverse !== 0){
        if(yValueForward > yValueReverse){
            const colsOutsideMatch = columns.length - yValueForward
            value = Number(((yValueForward/2)+colsOutsideMatch))
        } else {
            value = Number(((yValueReverse/2)))
        }
    } else {
        console.log(`Error evaluating\n${map}`)
    }
    sum += value
})
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
function assessReflection(lines, type, layer){
    const assessment = []
    lines.forEach(x => {assessment.push(x)})
    let thisLine = assessment.shift()
    while(thisLine !== assessment[assessment.length - 1]){
        if(assessment.length <= 1){
            return 0
        } else {
            thisLine = assessment.shift()
        }
    }
    assessment.unshift(thisLine)
    if(assessment.length <= 1){
        return 0
    }
    let match = true
    for(let i = 0; i < assessment.length; i++){
        if(assessment[i] !== assessment[(assessment.length - i) - 1]){
            match = false
            break
        }
    }
    if (match){
        if(assessment.length % 2 !== 0){
            return 0
        } else {
            return Number(assessment.length)
        }
    } else {
        assessment.shift()
        return assessReflection(assessment, type, layer + 1)
    }
}
console.log(sum)