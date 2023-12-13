var fs = require('fs')
const almanac = fs.readFileSync('./almanac.txt', 'utf8')
class Seed {
    constructor(number) {
        this.number = number
        this.soil = seedToSoil(this.number)
        this.fertilizer = soilToFert(this.soil)
        this.water = fertToWater(this.fertilizer)
        this.light = waterToLight(this.water)
        this.temperature = lightToTemp(this.light)
        this.humidity = tempToHumidity(this.temperature)
        this.location = humidityToLocation(this.humidity)
    }
}
class sourceToDestination {
    constructor(destination, source, range){
        this.sourceStart = Number(source)
        this.sourceEnd = Number(source) + Number(range)-1
        this.calculation = Number(destination) - Number(source)
    }
}

function seedToSoil(seed){
    let soil = seed
    maps["seed-to-soil-map"].forEach(entry => {
        if(seed >= entry.sourceStart && seed <= entry.sourceEnd){
            soil = seed + entry.calculation
        }
    });
    return soil
}
function soilToFert(soil){
    let fert = soil
    maps["soil-to-fertilizer-map"].forEach(entry => {
        if(soil >= entry.sourceStart && soil <= entry.sourceEnd){
            fert = soil + entry.calculation
        }
    });
    return fert
}
function fertToWater(fert){
    let water = fert
    maps["fertilizer-to-water-map"].forEach(entry => {
        if(fert >= entry.sourceStart && fert <= entry.sourceEnd){
            water = fert + entry.calculation
        }
    });
    return water
}
function waterToLight(water){
    let light = water
    maps["water-to-light-map"].forEach(entry => {
        if(water >= entry.sourceStart && water <= entry.sourceEnd){
            light = water + entry.calculation
        }
    });
    return light
}
function lightToTemp(light){
    let temperature = light
    maps["light-to-temperature-map"].forEach(entry => {
        if(light >= entry.sourceStart && light <= entry.sourceEnd){
            temperature = light + entry.calculation
        }
    });
    return temperature
}
function tempToHumidity(temp){
    let humidity = temp
    maps["temperature-to-humidity-map"].forEach(entry => {
        if(temp >= entry.sourceStart && temp <= entry.sourceEnd){
            humidity = temp + entry.calculation
        }
    });
    return humidity
}
function humidityToLocation(humidity){
    let location = humidity
    maps["humidity-to-location-map"].forEach(entry => {
        if(humidity >= entry.sourceStart && humidity <= entry.sourceEnd){
            location = humidity + entry.calculation
        }
    });
    return location
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
seedsList.forEach(seed => {
    if(Number(seed)){
        const thisSeed = new Seed(Number(seed))
        seeds.push(thisSeed)
    }
})
let nearestLocation = seeds[0].location
seeds.forEach(seed => {
    if(seed.location < nearestLocation){
        nearestLocation = `Location: ${seed.location} from Seed Number ${seed.number}`
    }
})
console.log(nearestLocation)