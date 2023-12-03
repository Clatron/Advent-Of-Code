const fs = require('fs')

const file = fs.readFileSync('../../Inputs/input3.txt', {encoding: 'utf8'})

function processSchema(lines) {
  let sum = 0;

  let progress = 0;
  lines.forEach(line => {
    let start;
    let end;
    let valid = false;
    let space;
    let isAtStart = false
    for (let i = 0; i < line.length; i++) {
      if (isNaN(start) && Number(line[i])) {
        start = i-1
      } else if (!isNaN(start) && isNaN(line[i])) {
        end = i
      } else if (!isNaN(start) && !isNaN(line[i]) && i == line.length - 1) {
        end = i + 1
      }

      if (!isNaN(start) && !isNaN(end)) {
        if (start == -1) {
          start = 0
          isAtStart = true
        }
        space = (end - start) + 1
        if (end == 140) {
          space = ((end - 1) - start) + 1
        }
        //if (progress < 25 ) console.log('found', progress, start, end, line.slice(start, end))
        if (progress != 0) {
          //if (progress == 12 && start == 137) console.log(lines[progress - 1].slice(start, end + 1).match(/[.\d]/g).length, space)
          if (lines[progress - 1].slice(start, end + 1).match(/[.\d]/g).length < space ) {
            valid = true
          }
        }
        if (line.slice(start, end + 1).match(/[.\d]/g).length < space ) {
          //if (progress == 12 && start == 137) console.log("1")
          valid = true
        }

        if (progress != lines.length - 1) {
          if (lines[progress + 1].slice(start, end + 1).match(/[.\d]/g).length < space ) {
            //if (progress == 12 && start == 137) console.log("1")
            valid = true
          }
        }

        if (valid) {
          let number
          if (isAtStart) {
            //console.log("at start")
            number = Number(line.slice(start, end))
          } else {
            number = Number(line.slice(start + 1, end))
          }
          if (progress < 50)console.log(number)
          sum += number
          valid = false
        }

        isAtStart = false

        if (!isNaN(start) && !isNaN(end)) {
          start = undefined
          end = undefined
        }
      }
    }
    progress++
    console.log(`-------------${progress + 1}------------------`)
  });

  console.log("Result:", sum)
}


const input = file.split(/\n/g).map(line => line.trim())
//console.log(input)
processSchema(input)