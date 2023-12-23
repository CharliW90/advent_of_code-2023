var fs = require('fs')
const ashMirrorMaps = fs.readFileSync('./ash_and_mirrors.txt', 'utf8')
const mirrorMaps = ashMirrorMaps.split(/\n\n/)
const test_mirror = mirrorMaps[0]
let i = 1
let sum = 0
mirrorMaps.forEach(map => {
    const rows = map.split(/\n/)
    const columns = produceColumns(map.split(/\n/))
    const xValueForward = assessReflection(rows, "rows", 1)
    const xValueReverse =  assessReflection(rows.reverse(), "rows reversed", 1)
    const yValueForward = assessReflection(columns, "columns", 1)
    const yValueReverse = assessReflection(columns.reverse(), "columns reversed", 1)
    //console.log(xValueForward + ' ' + yValueForward + ' ' + xValueReverse + ' ' + yValueReverse)
    let value = 0
    if(xValueForward !== 0){
        value = Number((xValueForward/2)*100)
        //console.log(`Pattern ${i}: Top-to-Bottom symmetry, first ${xValueForward} rows. Mid-point is row ${xValueForward/2} so earns ${value}`)
    } else if(yValueForward !== 0){
        value = Number(yValueForward/2)
        //console.log(`Pattern ${i}: Left-to-Right symmetry, first ${yValueForward} columns. Mid-point is column ${yValueForward/2} so earns ${value}`)
    } else if(xValueReverse !== 0){
        const rowsOutsideMatch = rows.length - xValueReverse
        value = Number(((xValueReverse/2)+rowsOutsideMatch)*100)
        //console.log(`Pattern ${i}: Bottom-to-Top symmetry, last ${xValueReverse} rows. Mid-point is row ${xValueReverse/2}, plus the earlier ${rowsOutsideMatch} rows, so earns ${value}`)
    } else if(yValueReverse !== 0){
        const colsOutsideMatch = columns.length - yValueReverse
        value = Number((yValueReverse/2)+colsOutsideMatch)
        //console.log(`Pattern ${i}: Right-to-Left symmetry, last ${yValueReverse} columns. Mid-point is column ${yValueReverse/2}, plus the earlier ${colsOutsideMatch} columns, so earns ${value}`)
    } else {
        console.log(`Error evaluating\n${map}`)
    }
    sum += value
    i++
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
    if(lines.length < 2){
        return 0
    }
    const assessment = []
    lines.forEach(x => {assessment.push(x)})
    let thisLine = assessment.shift()
    for(let i = 0; i < assessment.length; i++){
        if(getDifference(thisLine, assessment[i]) < 2){
            if(checkSymmetry(thisLine, assessment.slice(0, i+1))){
                return i + 2    // +1 to move us from a 0-indexed array value, and +1 to account for the thisLine which was shifted out of the array
            }
        }
    }
    return 0
}
function checkSymmetry(line, lines){
    lines.unshift(line)
    if(lines.length % 2 !== 0){
        return false
    } else {
        let swapUsed = false
        for(let i = 0; i < lines.length / 2; i++){
            const diff = getDifference(lines[i], lines[(lines.length - i) - 1])
            if(diff > 1){
                return false
            } else if(diff === 1){
                if(swapUsed){
                    return false
                } else {
                    swapUsed = true
                }
            }
        }
        if(swapUsed){
            return true
        } else {
            return false
        }
    }
}

function getDifference(a, b){
    if(a.length == 0) return b.length
    if(b.length == 0) return a.length
  
    var matrix = []
  
    // increment along the first column of each row
    var i
    for(i = 0; i <= b.length; i++){
      matrix[i] = [i]
    }

    // increment each column in the first row
    var j
    for(j = 0; j <= a.length; j++){
      matrix[0][j] = j
    }
  
    // Fill in the rest of the matrix
    for(i = 1; i <= b.length; i++){
      for(j = 1; j <= a.length; j++){
        if(b.charAt(i-1) == a.charAt(j-1)){
          matrix[i][j] = matrix[i-1][j-1]
        } else {
          matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                  Math.min(matrix[i][j-1] + 1, // insertion
                                           matrix[i-1][j] + 1)) // deletion
        }
      }
    }
  
    return matrix[b.length][a.length]
}
console.log(sum)