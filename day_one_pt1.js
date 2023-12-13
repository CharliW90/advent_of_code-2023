var fs = require('fs')
function find_digits(calibration_document){
    const lines = calibration_document.split('\n')
    const reg = /(?:^\D*(?<first>\d{1}))\w*(?:(?<last>\d{1})\D*$)|(?:^\D*(?<only>\d{1})\w*$)/m
    const matches = []
    for(let i = 0; i < lines.length-1; i++){
        const resultsArray = reg.exec(lines[i])
        const first = resultsArray.groups.first
        const last = resultsArray.groups.last
        const only = resultsArray.groups.only
        if(only === undefined){
            let twoDigitResult = first + last
            matches.push(Number(twoDigitResult))
            //console.log(`${first} is the first number, and ${last} is the last!`)
        } else {
            let twoDigitResult = only + only
            matches.push(Number(twoDigitResult))
            //console.log(`${only} is the only result`)
        }
    }
    console.log(matches)
    return matches
}
function day_one(digits){
    const answer = digits.reduce((sum, value) => {
        return sum + value
    },0)
    return answer
}
    const calibration_document = fs.readFileSync('./calibration_document.txt', 'utf8')
    const digits = find_digits(calibration_document)
    const answer = day_one(digits)
    console.log(answer)