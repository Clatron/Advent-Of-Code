const fs = require('fs')

const file = fs.readFileSync('../../Inputs/input6.txt', { encoding: 'utf8' })

function checkNumbers(input) {
  let result = 1;
  let Time = input[0].match(/\d+/g).map(item => parseInt(item))
  let Distance = input[1].match(/\d+/g).map(item => parseInt(item))
  console.log(Time, Distance)
  for (let i = 0; i < Time.length; i++) {
    let start
    let end
    let time = Time[i]
    let distance = Distance[i]
    for (let k = 1; k <= time; k++) {
      let duration = time - k
      if (duration * k > distance && !start) {
        start = k
      } else if (start && duration * k <= distance) {
        end = k - 1
        break
      }
    }
    let options = (end - start) + 1
    console.log(start, end, options)
    result *= options
  }

  console.log("Result:", result)
}

let start = new Date().getTime()
const input = file.split(/\n/g)
//console.log(input)
checkNumbers(input)
let end = new Date().getTime()

console.log("Execution time:", end - start,"ms")