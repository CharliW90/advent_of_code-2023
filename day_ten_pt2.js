var fs = require('fs')
const surfacePipes = fs.readFileSync('./surface_pipes.txt', 'utf8')
const rowsOfPipes = surfacePipes.split(/\n/)
const pipeLayout = []
rowsOfPipes.forEach(row => {
    pipeLayout.push(row.split(''))
})
class Pipe{
    constructor(shape, here, previousStep){
        this.previousStep = previousStep
        this.shape = shape
        this.coOrdinates = here
        this.nextStep = nextStep(this.shape, this.coOrdinates, this.previousStep)
    }
}
const mapOfPipe = []
var startingPoint
for(let y = 0; y < pipeLayout.length; y++){     //find 'S' and make this the starting point
    for(let x = 0; x < pipeLayout.length; x++){
        if(pipeLayout[y][x] === "S"){
            startingPoint = [y,x]
        }
    }
}

function nextStep(shape, here, prev){
    let y = here[0]
    let x = here[1]
    var possA = []
    var possB = []
    if(shape === "S"){
        //starting by trying to travel left-to-right (Easterly) and top-to-bottom (Southerly), find the first connectable pipe
        if(pipeLayout[y][x+1] === "-" || pipeLayout[y][x+1] === "J" || pipeLayout[y][x+1] === "7" ){            //if, to the east, is a connectable pipe
            return [y, x+1]
        } else if(pipeLayout[y+1][x] === "|" || pipeLayout[y+1][x] === "J" || pipeLayout[y+1][x] === "L" ){     //if, to the south, is a connectable pipe
            return [y+1, x]
        } else if(pipeLayout[y][x-1] === "-" || pipeLayout[y][x-1] === "L" || pipeLayout[y][x-1] === "F" ){     //if, to the west, is a connectable pipe
            return [y, x-1]
        } else if(pipeLayout[y-1][x] === "|" || pipeLayout[y-1][x] === "F" || pipeLayout[y-1][x] === "7" ){     //if, to the north, is a connectable pipe
            return [y-1, x]
        } else {console.log(`Error: Starting shape ${shape} at ${here} could not find any connectable pipes`)}
        return []
    } else {
        switch(shape) {
            case "|":
                possA = [y-1, x]    //North
                possB = [y+1, x]    //South
                break
            case "-":
                possA = [y, x+1]    //East
                possB = [y, x-1]    //West
                break
            case "L":
                possA = [y, x+1]    //East
                possB = [y-1, x]    //North
                break
            case "J":
                possA = [y, x-1]    //West
                possB = [y-1, x]    //North
                break
            case "7":
                possA = [y+1, x]    //South
                possB = [y, x-1]    //West
                break
            case "F":
                possA = [y+1, x]    //South
                possB = [y, x+1]    //East
        }
        if(possA.toString() === prev.toString() && possB.toString() !== prev.toString()){         // if taking possibility A takes us back to where we were, and possibility B does not, then  take possibility B
            return possB
        } else if(possB.toString() === prev.toString() && possA.toString() !== prev.toString()){  // if taking possibility B takes us back to where we were, and possibility A does not, then take possibility A
            return possA
        } else {console.log(`Error:  Shape ${shape} at ${here} calculated Possibility A: ${possA.toString()} or Possibility B: ${possB.toString()} which were compared with previous step ${prev.toString()}`)}
    }
}
const start = new Pipe("S", startingPoint, "")
mapOfPipe.push(start)
let position = start
while(position.nextStep.toString() !== startingPoint.toString()){
    //console.log(`${position.nextStep} is not the start: ${startingPoint}`)
    //console.log(`Generating new pipe with ${pipeLayout[position.nextStep[0]][position.nextStep[1]]}, ${position.nextStep}, ${position.coOrdinates}`)
    const newPosition = new Pipe(pipeLayout[position.nextStep[0]][position.nextStep[1]], position.nextStep, position.coOrdinates)
    //console.log(newPosition)
    mapOfPipe.push(newPosition)
    position = newPosition
}
const pipePieceLocations = []
mapOfPipe.forEach(pieceOfPipe => {
    pipePieceLocations.push(pieceOfPipe.coOrdinates)
})
function shoelaceFormula(array){
    const openedArray = []
    array.forEach(piece => {
        openedArray.push(piece[0])
        openedArray.push(piece[1])
    })
    let sum = 0;
    for(let i = 0; i < openedArray.length; i += 2){
        sum += openedArray[i] * openedArray[(i + 3) % openedArray.length]
            - openedArray[i+1] * openedArray[(i + 2) % openedArray.length]
    }
    return Math.abs(sum) * 0.5
}
const internalArea = shoelaceFormula(pipePieceLocations)
function picksTheorem(A, b){
    const i = A - (b/2) + 1
    return i
}
const insidePoints = picksTheorem(internalArea, pipePieceLocations.length)
console.log(insidePoints)