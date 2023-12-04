const fs = require('fs')

const file = fs.readFileSync('../../Inputs/input4.txt', { encoding: 'utf8' })

function checkNumbers(lines) {
  let sum = 0
  let db = new Array(lines.length).fill(1)

  let count = 0
  lines.forEach(line => {
    let text = line.split(':')[1].split('|')
    let winnings = text[0].match(/\d+/g)
    let checks = text[1].match(/\d+/g)

    let match = 0
    for (let i = 0; i < checks.length; i++) {
      if (winnings.includes(checks[i])) {
        match++
      }
    }

    for (let i = 0; i < match; i++) {
      if (db[count + i + 1] === undefined) db[count + i + 1] = 0
      db[count + i + 1] += 1 * db[count]
    }

    count++
  })

  db.forEach(value => {
    sum += value
  })

  console.log("Result:", sum)
}

const input = file.split(/\n/g).map(line => line.trim())
//console.log(input[0].split(':')[1].split('|')[0].match(/\d+/g))
let start = new Date().getTime()
checkNumbers(input)
let end = new Date().getTime()

console.log("Execution time:", end - start,"ms")