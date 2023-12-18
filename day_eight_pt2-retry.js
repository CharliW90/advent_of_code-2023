var fs = require('fs')
const mapOfNodes = fs.readFileSync('./nodes_map.txt', 'utf8')
const mapParts = mapOfNodes.split(/\n\n/)
const directions = mapParts[0].trim().split('')
const nodes = mapParts[1].split(/\n/)
const mappedNodes = []
const startingNodes = []
const endingNodes = []
const stepsPerNode = []
class Node {
    constructor(here, left, right){
        this.here = here
        this.L = left
        this.R = right
    }
}
const reg = /(?<here>\w{3})(?:\ \=\ )(?:\((?<left>\w{3}))(?:\,\ )(?:(?<right>\w{3})\))/
const start = /.{2}A/
const end = /.{2}Z/
nodes.forEach(node => {
    const nodeParts = reg.exec(node)
    const here = nodeParts.groups.here
    const left = nodeParts.groups.left
    const right = nodeParts.groups.right
    const mappedNode = new Node(here, left, right)
    mappedNodes.push(mappedNode)
    if(start.test(here)){
        startingNodes.push(here)
    } else if(end.test(here)){
        endingNodes.push(here)
    }
})
startingNodes.forEach(node => {
    let step = 0
    let here = node
    let stepsTaken = 0
    while(!endingNodes.includes(here)){
        const thisNode = mappedNodes.find(location => location.here === here)
        const nextStep = directions[step]
        const nextNode = thisNode[nextStep]
        if(step < directions.length - 1){
            step++
        } else {
            step = 0
        }
        stepsTaken++
        here = nextNode
    }
    stepsPerNode.push(stepsTaken)
})
const gcd = (a, b) => a ? gcd(b % a, a) : b;    // taken from https://stackoverflow.com/questions/47047682/least-common-multiple-of-an-array-values-using-euclidean-algorithm
const lcm = (a, b) => a * b / gcd(a, b)         // 
const lowestCommon = stepsPerNode.reduce(lcm)   // 
console.log(lowestCommon)