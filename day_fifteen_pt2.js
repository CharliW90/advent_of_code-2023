var fs = require('fs')
const startupSequence = fs.readFileSync('./startup_sequence.txt', 'utf8').split(',')
const testSequence = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7".split(',')
const hashed = step => {
  let value = 0;
  step.forEach(char => value = ((value + char.charCodeAt(0))*17)%256);
  return value;
}

const boxes = {}
const lenses = []

startupSequence.forEach(step => {
  const chars = step.split('');
  const action = step.endsWith("-") ? chars.pop() : "="
  const focalLength = step.endsWith("-") ? undefined : chars.pop()
  if(!step.endsWith("-")){
    chars.pop(); // get rid of the '=' that is now hanging around
  }
  const label = chars.join('')
  lenses.push(label)
  const lense = [label, focalLength]
  const box = hashed(chars)
  if(action === "-"){
    if(boxes[box] !== undefined){
      boxes[box].forEach((boxInside) => {
        if(boxInside[0] === label){
          boxes[box].splice(boxes[box].indexOf(boxInside), 1)
        }
      })
    }
  } else if(action === "="){
    if(boxes[box] === undefined){
      boxes[box] = [lense]
    } else {
      let push = true;
      boxes[box].forEach((boxInside) => {
        if(boxInside[0] === lense[0]){
          boxInside[1] = lense[1]
          push = false;
        }
      })
      if(push){
        boxes[box].push(lense)
      }
    }
  }
})

const allLenses = new Set(lenses)
let focusingPower = 0

allLenses.forEach((lenseCode) => {
  const boxToCheck = hashed(lenseCode.split(''))
  const details = []
  if(boxes[boxToCheck] !== undefined){
    boxes[boxToCheck].forEach((lenseSlot, index) => {
      if(lenseSlot[0] === lenseCode){
        details.push(index + 1)
        details.push(lenseSlot[1])
      }
    })
    const value = ((1 + boxToCheck) * details[0]) * details[1]
    if(!isNaN(value)){
      focusingPower += value;
    }
  }
})

console.log(focusingPower)