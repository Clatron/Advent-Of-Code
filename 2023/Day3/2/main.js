const fs = require('fs')

const file = fs.readFileSync('../../Inputs/input3.txt', { encoding: 'utf8' })

function processSchema(lines) {
  let result = 0;
  let db = [{ lineIndex: 1, index: 2, numbers: [] }]

  let progress = 0;
  lines.forEach(line => {
    let start;
    let end;
    let valid = false;
    let space;
    let isAtStart = false
    for (let i = 0; i < line.length; i++) {
      if (isNaN(start) && Number(line[i])) {
        start = i - 1
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

        let lineToPut = [undefined, undefined, undefined];
        if (progress != 0) {
          let text = lines[progress - 1].slice(start, end + 1)
          let symbolIndex = text.indexOf('*')
          if (symbolIndex != -1) {
            lineToPut[0] = start + symbolIndex
            valid = true
          }
        }


        let text = line.slice(start, end + 1)
        let symbolIndex = text.indexOf('*')
        if (symbolIndex != -1) {
          lineToPut[1] = start + symbolIndex;
          valid = true
        }

        if (progress != lines.length - 1) {
          let text = lines[progress + 1].slice(start, end + 1)
          let symbolIndex = text.indexOf('*')
          if (symbolIndex != -1) {
            lineToPut[2] = start + symbolIndex
            valid = true
          }
        }

        if (valid) {
          let number
          if (isAtStart) {
            number = Number(line.slice(start, end))
          } else {
            number = Number(line.slice(start + 1, end))
          }

          for (let i = 0; i < lineToPut.length; i++) {
            if (lineToPut[i]) {
              let filter = db.filter((value) => value.lineIndex == progress + (i - 1) & value.index == lineToPut[i])
              if (filter.length > 0) {
                filter[0].numbers.push(Number(number))
              } else {
                db.push({ lineIndex: progress + (i - 1), index: lineToPut[i], numbers: [Number(number)] })
              }
            }
          }

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

  db.forEach(item => {
    if (item.numbers.length == 2) {
      let multiplication = item.numbers[0] * item.numbers[1]
      result += multiplication;
    }
  })
  console.log("DB:", db)
  console.log("Result:", result)
}


const input = file.split(/\n/g).map(line => line.trim())
//console.log(input[1].indexOf(input[1].match(/[*]/g)[1]) )
processSchema(input)