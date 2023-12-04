const fs = require('fs')

const file = fs.readFileSync('../../Inputs/input4.txt', { encoding: 'utf8' })

function checkNumbers(lines) {
  let sum = 0

  lines.forEach(line => {
    console.log(line)
    let text = line.split(':')[1].split('|')
    let winnings = text[0].match(/\d+/g)
    let checks = text[1].match(/\d+/g)

    let result = 0
    for (let i = 0; i < checks.length; i++) {
      if (winnings.includes(checks[i])) {
        (result == 0) ? result = 1 : result *= 2
      }
    }

    sum += result
    console.log(result)
  })

  console.log("Result:", sum)
}

const input = file.split(/\n/g).map(line => line.trim())
//console.log(input[0].split(':')[1].split('|')[0].match(/\d+/g))
checkNumbers(input)