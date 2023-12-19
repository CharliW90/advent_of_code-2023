var fs = require('fs')
const galaxyImage = fs.readFileSync('./galaxy_image.txt', 'utf8')
const galaxyMap = []
// build array of arrays
const initialImage = []
const rows = galaxyImage.split(/\n/)
rows.forEach(row => {
    initialImage.push(row.split(''))
})
// find y values of empty columns - build array of y values
const emptyColumns = []
for(let y = 0; y < initialImage[0].length; y++){
    let x = 0
    if(initialImage[x][y] === "."){
        let empty = true
        while(empty && x<initialImage.length-1){
            x++
            if(initialImage[x][y] === "#"){
                empty = false
            }
        }
        if(empty){
            emptyColumns.push(y)
        }
    }
}
// find x values of empty rows - build array of x values
const emptyRows = []
for(let x = 0; x < initialImage.length; x++){
    let y = 0
    if(initialImage[x][y] === "."){
        let empty = true
        while(empty && y<initialImage[0].length-1){
            y++
            if(initialImage[x][y] === "#"){
                empty = false
            }
        }
        if(empty){
            emptyRows.push(x)
        }
    }
}
// iterate over each row, pushing each array item into new row array
// with a +1 each time y is .includes() in the list of empty columns (just push value twice?)
// +1 row each time the row is .includes() in the list of empty columns (just push the row twice?)
const newImage = []
for(let x = 0; x < initialImage.length; x++){
    const newRow = []
    for(let y = 0; y < initialImage[x].length; y++){
        newRow.push(initialImage[x][y])
        if(emptyColumns.includes(y)){
            newRow.push(initialImage[x][y])
        }
    }
    newImage.push(newRow)
    if(emptyRows.includes(x)){
        newImage.push(newRow)
    }
}
const galaxies = []
for(let x = 0; x < newImage.length; x++){
    for(let y = 0; y < newImage[x].length; y++){
        if(newImage[x][y] === "#"){
            galaxies.push([x,y])
        }
    }
}
// for each galaxy we can calculate distance to another galaxy just from their co-ordinates (5, 5) to (10,10) is +5 steps y, +5 steps x = 10 steps (aka y2-y1 + x2-x1)
const distances = []
let pairsConsidered = 0
let sumOfDistances = 0
while(galaxies.length>0){
    const thisGalaxy = galaxies.shift() // we only have to consider pairs once (i.e. half the galaxies) so use .shift() to not consider this galaxy again
    const xHere = thisGalaxy[0]
    const yHere = thisGalaxy[1]
    galaxies.forEach(galaxy => {
        const xNeighbour = galaxy[0]
        const yNeighbour = galaxy[1]
        const xDistance = Math.abs(xNeighbour - xHere)
        const yDistance = Math.abs(yNeighbour - yHere)
        const thisDistance = Number(xDistance + yDistance)
        distances.push(thisDistance)
        pairsConsidered++
        sumOfDistances += thisDistance
    })
}
console.log(pairsConsidered)
console.log(sumOfDistances)