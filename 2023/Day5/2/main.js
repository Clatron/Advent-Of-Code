const fs = require('fs')

const file = fs.readFileSync('../../Inputs/input5.txt', { encoding: 'utf8' })

function checkNumbers(lines) {
  let locationNumbers = []

  let entries = lines[0].match(/\d+/g)
  entries.forEach(entry => {
    let found = false;
    let value = entry;
    let line = 3;

    while (line < lines.length - 1) {

      if (!found && lines[line].length != 0) {
        console.log(lines[line])
        let numbers = lines[line].match(/\d+/g).map(number => Number(number))
        let start = (numbers[1])
        let end = numbers[2] + start - 1

        if (value >= start && value <= end) {
          found = true
          value = numbers[0] + (value - start)
        }
      }

      if (lines[line].length == 0) {
        found = false
        line += 2
        continue;
      }
      line++
    }

    locationNumbers.push(value)
  });
  let result = locationNumbers.sort((a, b) => a - b)

  console.log("Result:", result[0])
}

const input = file.split(/\n/g)
//console.log(input)
let start = new Date().getTime()
checkNumbers(input)
let end = new Date().getTime()

console.log("Execution time:", end - start,"ms")