var fs = require('fs')
function replace_words_with_digits(lineOfText){
    lineOfText = lineOfText.replace(/one/g, "o1e")
    lineOfText = lineOfText.replace(/two/g, "t2o")
    lineOfText = lineOfText.replace(/three/g, "t3e")
    lineOfText = lineOfText.replace(/four/g, "f4r")
    lineOfText = lineOfText.replace(/five/g, "f5e")
    lineOfText = lineOfText.replace(/six/g, "s6x")
    lineOfText = lineOfText.replace(/seven/g, "s7n")
    lineOfText = lineOfText.replace(/eight/g, "e8t")
    lineOfText = lineOfText.replace(/nine/g, "n9e")
    return lineOfText
}
function find_digits(calibration_document){
    const lines = calibration_document.split('\n')
    const reg = /(?:^\D*(?<first>\d{1}))\w*(?:(?<last>\d{1})\D*$)|(?:^\D*(?<only>\d{1})\w*$)/m
    const matches = []
    for(let i = 0; i < lines.length-1; i++){
        const reWorded = replace_words_with_digits(lines[i])
        console.log(reWorded)
        const resultsArray = reg.exec(reWorded)
        const first = resultsArray.groups.first
        const last = resultsArray.groups.last
        const only = resultsArray.groups.only
        if(only === undefined){
            let twoDigitResult = first + last
            matches.push(Number(twoDigitResult))
            console.log(`${first} is the first number, and ${last} is the last!`)
        } else {
            let twoDigitResult = only + only
            matches.push(Number(twoDigitResult))
            console.log(`${only} is the only result`)
        }
    }
    return matches
}
function day_one(digits){
    const answer = digits.reduce((sum, value) => {
        return sum + value
    },0)
    return answer
}
    const calibration_document = fs.readFileSync('./calibration_document.txt', 'utf8')
    //const replacedWords = replace_words_with_digits(calibration_document)
    const digits = find_digits(calibration_document)
    const answer = day_one(digits)
    console.log(answer)