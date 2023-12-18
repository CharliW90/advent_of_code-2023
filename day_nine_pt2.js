var fs = require('fs')
const oasisReport = fs.readFileSync('./oasis_report.txt', 'utf8')
const variables = []
const variable = oasisReport.split(/\n/)
class valueHistory{
    constructor(values){
        this.historicValues = numArray(values)
        this.historicChanges = history(this.historicValues)
        this.nextValue = nextValue(this.historicChanges)
        this.prevValue = prevValue(this.historicChanges)
        this.totalData = totals(this.prevValue, this.historicValues, this.nextValue)
    }
}
variable.forEach(variable => {
    const variableArray = []
    const values = variable.split(' ')
    values.forEach(value => {
        value.trim()
        variableArray.push(value)
    })
    const thisVariable = new valueHistory(variableArray)
    variables.push(thisVariable)
})
function numArray(values){
    const newArray = []
    values.forEach(val => {
        newArray.push(Number(val))
    })
    return newArray
}
function history(values){
    const history = [values]
    while(!history[history.length-1].every(item => item === 0)){
        const differences = []
        for(let i = 0; i < history[history.length-1].length -1; i++){
            const diff = history[history.length-1][i+1] - history[history.length-1][i]
            differences.push(diff)
        }
        history.push(differences)
    }
    return history
}
function nextValue(values){
    let sum = 0
    values.forEach(value => {
        sum += Number(value[value.length-1])
    })
    return sum
}
function prevValue(values){
    let sum = 0
    for(let i = values.length - 1; i >=0; i--){
        sum = Number(values[i][0]) - sum
    }
    return sum
}
function totals(a, b, c){
    const finalArray = []
    finalArray.push(Number(a))
    b.forEach(item => {
        finalArray.push(Number(item))
    })
    finalArray.push(Number(c))
    return finalArray
}
let sum = 0
variables.forEach(vari => {
    sum += vari.prevValue
})
console.log(`Answer is: ${sum}`)

