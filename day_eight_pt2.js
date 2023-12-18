var fs = require('fs')
const mapOfNodes = fs.readFileSync('./nodes_map.txt', 'utf8')
const mapParts = mapOfNodes.split(/\n\n/)
const directions = mapParts[0].trim().split('')
const nodes = mapParts[1].split(/\n/)
const mappedNodes = []
const startNodes = []
const exitNodes = []
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
    if(here.split('')[2] === "A"){
        startNodes.push(here)
    }
    if(here.split('')[2] === "Z"){
        exitNodes.push(here)
    }
})
let step = 0
let currentNodes = startNodes
let stepsTaken = 0
while(!(currentNodes.every(item => exitNodes.includes(item)))){
    const nextStep = directions[step]
    const nextNodes = []
    exit = true
    currentNodes.forEach(currentNode => {
        const thisNode = mappedNodes.find(node => node.here === currentNode)
        const nextNode = thisNode[nextStep]
        nextNodes.push(nextNode)
        if(nextNode.split('')[2] !== "Z"){
            exit = false
        }
    })
    if(step < directions.length - 1){
        step++
    } else {
        step = 0
    }
    stepsTaken++
    currentNodes = nextNodes
}
console.log(stepsTaken)