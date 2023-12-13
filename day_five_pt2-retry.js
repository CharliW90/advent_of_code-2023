var fs = require('fs')
const almanac = fs.readFileSync('./almanac.txt', 'utf8')
class SeedRange {
    constructor(firstSeed, lastSeed) {
        this.range = [{"first": firstSeed, "last": lastSeed}]
        this.soil = converter(this.range, "seed-to-soil-map")
        this.fertilizer = converter(this.soil, "soil-to-fertilizer-map")
        this.water = converter(this.fertilizer, "fertilizer-to-water-map")
        this.light = converter(this.water, "water-to-light-map")
        this.temperature = converter(this.light, "light-to-temperature-map")
        this.humidity = converter(this.temperature, "temperature-to-humidity-map")
        this.location = converter(this.humidity, "humidity-to-location-map")
    }
}
class sourceToDestination {
    constructor(destination, source, range){
        this.rangeStart = Number(source)
        this.rangeEnd = Number(source) + Number(range)-1
        this.calculation = Number(destination) - Number(source)
    }
}

function converter(ranges, mapName){
    const result = []
    ranges.every(range => {
        var start
        var end
        const amendments = []
        maps[mapName].forEach(entry => {
            if(range.first >= entry.rangeStart && range.first <= entry.rangeEnd){   //if our range starts inside the range to compare against
                start = range.first                                                 //then we set our start position as our range's start
                if(range.last > entry.rangeEnd){            //if it ends outside the range to compare against
                    end = entry.rangeEnd                    //we set our end position as the comparison's end
                    result.push({"first": Number(Number(start) + Number(entry.calculation)), "last": Number(Number(end) + Number(entry.calculation))})
                    amendments.push({"first": Number(start), "last": Number(end)})
                } else {
                    end = range.last                        //else we set our end position as our range's end (i.e. our range is wholly within the range to compare against)
                    result.push({"first": Number(Number(start) + Number(entry.calculation)), "last": Number(Number(end) + Number(entry.calculation))})
                    amendments.push({"first": Number(start), "last": Number(end)})
                }
            } else if(range.last >= entry.rangeStart && range.last <= entry.rangeEnd){  //if our range ends inside the range to compare against
                start = entry.rangeStart                //we set our start position as the comparison's start
                end = range.last                        //and set our end position as our range's end
                result.push({"first": Number(Number(start) + Number(entry.calculation)), "last": Number(Number(end) + Number(entry.calculation))})
                amendments.push({"first": Number(start), "last": Number(end)})
                range.last = Number(start - 1)
            } else if (range.first < entry.rangeStart && range.last > entry.rangeEnd){ //if our range entirely encompasses the range to compare against
                start = entry.rangeStart                //we set our start position as the comparison's start
                end = entry.rangeEnd                    //and set our end position as the comparison's end
                result.push({"first": Number(Number(start) + Number(entry.calculation)), "last": Number(Number(end) + Number(entry.calculation))})
                amendments.push({"first": Number(start), "last": Number(end)})
            }
        });
        const sorted = amendments.sort((a, b) => a[1] - b[1]);
        let startingPos = range.first
        let endingPos = range.last
        for(let i = 0; i < sorted.length; i++){
            if(startingPos < sorted[i].first){
                if(endingPos < sorted[i].first){
                    result.push({"first": Number(startingPos), "last": Number(endingPos)})
                } else {
                    result.push({"first": Number(startingPos), "last": Number(sorted[i].first - 1)})
                }
            }
            startingPos = Number(sorted[i].last + 1)
        }
        if(startingPos < endingPos){
            result.push({"first": Number(startingPos), "last": Number(endingPos)})
        }
    })
    return result
}

const maps = []
const almanacParts = almanac.split(/(?:\n\n)/)
const seedsData = almanacParts[0]
for(let i = 1; i < almanacParts.length; i++){
    const parts = almanacParts[i].split(/(?:\:\n)/)
    const map_name = parts[0].replace(' ', '-')
    maps[map_name] = []
    const ranges = parts[1].split(/\n/)
    for(let j = 0; j < ranges.length; j++){
        const coOrds = ranges[j].split(' ')
        const thisMap = new sourceToDestination(coOrds[0], coOrds[1], coOrds[2])
        maps[map_name].push(thisMap)
    }
}
const seedsList = seedsData.split(' ')
const seeds = []
for(let i = 1; i < seedsList.length; i++){
    if(i % 2 !== 0){
        const firstSeed = Number(seedsList[i])
        const range = Number(seedsList[i+1])
        const lastSeed = Number(firstSeed +range - 1)
        const thisRange = new SeedRange(firstSeed, lastSeed)
        seeds.push(thisRange)
    }
}
let nearestLocation = {"seed": [],"soil": [],"fertilizer": [],"water": [],"light": [],"temperature": [],"humidity": [], "location": 10000000000}
seeds.forEach(seed => {
    seed.location.forEach(location => {
        if(location.first < nearestLocation.location){
            nearestLocation.seed = seed.range[0].first
            nearestLocation.soil = seed.soil[0].first
            nearestLocation.fertilizer = seed.soil[0].first
            nearestLocation.water = seed.fertilizer[0].first
            nearestLocation.light = seed.water[0].first
            nearestLocation.temperature = seed.light[0].first
            nearestLocation.humidity = seed.humidity[0].first
            nearestLocation.location = location.first
        }
    })
})
console.log(nearestLocation)