var fs = require('fs')
const mapOfNodes = fs.readFileSync('./nodes_map.txt', 'utf8')
const mapParts = mapOfNodes.split(/\n\n/)
const directions = mapParts[0].trim().split('')
const nodes = mapParts[1].split(/\n/)
const mappedNodes = []
class Node {
    constructor(here, left, right){
        this.here = here
        this.L = left
        this.R = right
    }
}
const reg = /(?<here>\w{3})(?:\ \=\ )(?:\((?<left>\w{3}))(?:\,\ )(?:(?<right>\w{3})\))/
nodes.forEach(node => {
    const nodeParts = reg.exec(node)
    const here = nodeParts.groups.here
    const left = nodeParts.groups.left
    const right = nodeParts.groups.right
    const mappedNode = new Node(here, left, right)
    mappedNodes.push(mappedNode)
})
let step = 0
let here = "AAA"
let stepsTaken = 0
while(here !== "ZZZ"){
    const thisNode = mappedNodes.find(node => node.here === here)
    const nextStep = directions[step]
    const nextNode = thisNode[nextStep]
    if(nextNode === here){
        console.log(`Error attempting step ${step}: ${thisNode.here} to ${here}. [${stepsTaken}]`)
        return
    }
    if(step < directions.length - 1){
        step++
    } else {
        step = 0
    }
    stepsTaken++
    here = nextNode
}
console.log(stepsTaken)