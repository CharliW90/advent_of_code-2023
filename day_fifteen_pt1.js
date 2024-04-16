var fs = require('fs')
const startupSequence = fs.readFileSync('./startup_sequence.txt', 'utf8').split(',')
const testSequence = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7".split(',')
const hashed = step => {
  const chars = step.split('');
  let value = 0;
  chars.forEach(char => {
    value = ((value + char.charCodeAt(0))*17)%256;
  });
  return value;
}

let result = 0
startupSequence.forEach(step => {
  result += hashed(step);
})

console.log(result)