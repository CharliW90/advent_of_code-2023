var fs = require('fs')
const damagedConditionRecords = fs.readFileSync('./test_damaged_condition_records.txt', 'utf8')
const rowsOfRecords = damagedConditionRecords.split(/\n/)
const cache = {}
const records = []
class Record{
    constructor(damagedRecord, contiguousGroups){
        this.damagedRecord = unfoldRecord(damagedRecord)
        this.contiguousGroups = unfoldRecord(contiguousGroups)
        this.possibleRecords = assessPossibles(this.damagedRecord, this.contiguousGroups)
    }
}
/*rowsOfRecords.forEach(row => {
    const damagedRecord = getRelevant(row.split(' ')[0])
    const contiguousGroups = row.split(' ')[1]
    const record = new Record(damagedRecord, contiguousGroups)
    console.log(record)
    records.push(record)
})*/
function getRelevant(fullRecord){
    while(fullRecord.includes('..')){
        fullRecord = fullRecord.replaceAll('..','.')
    }
    return fullRecord
}
function unfoldRecord(record){
    const unfolded = []
    if(record.includes(',')){
        for(let i = 0; i < 4; i++){
            unfolded.push(record)
        }
        return unfolded.join(',')
    } else {
        for(let i = 0; i < 4; i++){
            unfolded.push(record)
        }
        return unfolded.join('?')
    }
}
function assessPatterns(damagedRecord, contiguousGroups){
    if(damagedRecord[0] === '.'){
        damagedRecord = damagedRecord.substring(1)
    }
    if(damagedRecord[damagedRecord.length-1] === '.'){
        damagedRecord = damagedRecord.substring(0,damagedRecord.length - 1)
    }
    const pattern = damagedRecord.split('.')
    const patternBlocks = []
    pattern.forEach(block => {
        getPossibleGroupings(block)
        patternBlocks.push(getPossibleGroupings(block))
    })
    const rule = contiguousGroups.split(',')
    console.log(rule.length + ' ' + patternBlocks.length)
    if(patternBlocks.length < rule.length){
        return(`The pattern ${patternBlocks} does not contain enough variables for ${rule}`)
    }
    return(patternBlocks)
}
function getPossibleGroupings(block){
    const possibilities = []
    if(block.includes('?')){
        const possibles = []
        const knownWorking = Number(block.replace(/[^\#]/g, "").length)
        const unknowns = Number(block.replace(/[^\?]/g, "").length)
        for(let i = 0; i <= unknowns; i++){
            possibilities.push(Number(knownWorking + i))
        }
        if(block.length === 3){
            if(block === "#??"|block === "??#"){
                possibilities.push([1,1])
            }
        }
        if(block.length === 4){
            if(block === "??#?")
        }
            switch(block){
                case "#??":
                case "??#":
                   
                    break
                case 
            }

        }
        possibles.push(possibilities)
        cache[block] = possibilities
    } else {
        cache[block] = block.length
        return block.length
    }
}
console.log(assessPatterns(".????.######.#####.", "1,6,5"))




function extrapolatePossibles(damagedRecord){
    const possibles = []
    if(cache[damagedRecord]){
        return cache[damagedRecord]
    } else if(damagedRecord.includes("?")){
        const ifBroken = damagedRecord.replace('?','#')
        const broken = extrapolatePossibles(ifBroken)
        const ifWorking = damagedRecord.replace('?','.')
        const working = extrapolatePossibles(ifWorking.replace('..','.'))
        if(broken !== 'stop'){
            broken.forEach(record => {possibles.push(record)})
        } else {
            cache[damagedRecord] = 'stop'
        }
        if(working !== 'stop'){
            working.forEach(record => {possibles.push(record)})
        } else {
            cache[damagedRecord] = 'stop'
        }
    } else {
        possibles.push(damagedRecord)
    }
    cache[damagedRecord] = possibles
    return possibles
}
function assessPossibles(damagedRecord, contiguousGroups){
    const numberOfGroups = contiguousGroups.split(',').length
    const possibles = extrapolatePossibles(damagedRecord, numberOfGroups)
    let count = 0
    possibles.forEach(possibility => {
        const lumps = possibility.split('.')
        const contigs = []
        lumps.forEach(lump => {
            if(lump !== ''){
                contigs.push(lump.length)
            }
        })
        if(contigs.join(',') === contiguousGroups){
            count++
        }
    })
    return count
}
//console.log(records)
/*
let sum = 0
records.forEach(record => {
    sum += record.possibleRecords
})
console.log(sum)
*/