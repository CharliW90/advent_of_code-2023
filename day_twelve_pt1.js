var fs = require('fs')
const damagedConditionRecords = fs.readFileSync('./damaged_condition_records.txt', 'utf8')
const rowsOfRecords = damagedConditionRecords.split(/\n/)
const cache = {}
const records = []
class Record{
    constructor(damagedRecord, contiguousGroups){
        this.damagedRecord = damagedRecord
        this.contiguousGroups = contiguousGroups
        this.possibleRecords = assessPossibles(this.damagedRecord, this.contiguousGroups)
    }
}
rowsOfRecords.forEach(row => {
    const damagedRecord = row.split(' ')[0]
    const contiguousGroups = row.split(' ')[1]
    const record = new Record(damagedRecord, contiguousGroups)
    records.push(record)
})
function extrapolatePossibles(damagedRecord){
    const possibles = []
    if(cache[damagedRecord]){
        return cache[damagedRecord]
    } else if(damagedRecord.includes("?")){
        const ifBroken = damagedRecord.replace('?','#')
        const broken = extrapolatePossibles(ifBroken)
        const ifWorking = damagedRecord.replace('?','.')
        const working = extrapolatePossibles(ifWorking)
        broken.forEach(record => {possibles.push(record)})
        working.forEach(record => {possibles.push(record)})
    } else {
        possibles.push(damagedRecord)
    }
    cache[damagedRecord] = possibles
    return possibles
}
function assessPossibles(damagedRecord, contiguousGroups){
    const possibles = extrapolatePossibles(damagedRecord)
    let count = 0
    possibles.forEach(possibility => {
        const lumps = possibility.split(/\.+/)
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
let sum = 0
records.forEach(record => {
    sum += record.possibleRecords
})
console.log(sum)