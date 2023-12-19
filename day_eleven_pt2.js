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
// map the galaxies
const galaxies = []
for(let x = 0; x < initialImage.length; x++){
    for(let y = 0; y < initialImage[x].length; y++){
        if(initialImage[x][y] === "#"){
            galaxies.push([x,y])
        }
    }
}
// for each galaxy, create an 'adjusted' galaxy location depending on how many expanded rows and columns need to be accounted for
const adjustedGalaxies = []
galaxies.forEach(galaxy =>{
    const xHere = galaxy[0]
    const yHere = galaxy[1]
    let expandedRows = 0
    for(let i = 0; i<emptyRows.length; i++){
        if(emptyRows[i] < xHere){
            expandedRows += (1000000 - 1)
        } else {
            break
        }
    }
    let expandedCols = 0
    for(let i = 0; i<emptyColumns.length; i++){
        if(emptyColumns[i] < yHere){
            expandedCols += (1000000 - 1)
        } else {
            break
        }
    }
    const adjustedX = Number(xHere + expandedRows)
    const adjustedY = Number(yHere + expandedCols)
    adjustedGalaxies.push([adjustedX,adjustedY])
})
// calculate the distances, as before
const distances = []
let pairsConsidered = 0
let sumOfDistances = 0
while(adjustedGalaxies.length>0){
    const thisGalaxy = adjustedGalaxies.shift() // we only have to consider pairs once (i.e. half the galaxies) so use .shift() to not consider this galaxy again
    const xHere = thisGalaxy[0]
    const yHere = thisGalaxy[1]
    adjustedGalaxies.forEach(galaxy => {
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