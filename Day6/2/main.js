const fs = require('fs')
const performance = require('perf_hooks').performance

const file = fs.readFileSync('../../Inputs/input6.txt', { encoding: 'utf8' })

function checkNumbers(input) {
  let result;
  let Time = Number(input[0].match(/\d+/g).join(''))
  let Distance = Number(input[1].match(/\d+/g).join(''))
  console.log(Time, Distance)

  let start
  let end
  let progress = Math.floor(Time / 2)
  console.log(progress)
  while (!start) {
    let duration = Time - progress
    if (duration * progress <= Distance) {
      for (let i = progress; i > 0; i++) {
        let duration = Time - i
        console.log(duration * i, Distance)
        if (duration * i > Distance) {
          start = i
          break
        }
      }
    }
    progress -= 500
    console.log(progress)
  }
  progress = Math.floor(Time / 2)
  console.log("-----------------------------------------------")
  while (!end) {
    let duration = Time - progress
    if (duration * progress <= Distance) {
      for (let i = progress; i > 0; i--) {
        let duration = Time - i
        console.log(duration * i, Distance)
        if (duration * i > Distance) {
          end = i
          break
        }
      }
    }
    progress += 500
    console.log(progress)
  }
  
  let options = (end - start) + 1
  console.log("Start-End-Options:", start, end, options)
  result = options

  console.log("Result:", result)
}

let start = performance.now()
const input = file.split(/\n/g)
//console.log(input)
checkNumbers(input)
let end = performance.now()

console.log("Execution time:", end - start, "ms")