const fs = require('fs')
const performance = require('perf_hooks').performance

const file = fs.readFileSync('../../Inputs/input8.txt', { encoding: 'utf8' })

const chars = ["J", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"]

function checkMoves(lines) {
  const moves = lines[0]
  let found = false
  let moveCount = 0
  let nextIndex;

  for (let i = 2; i < lines.length; i++) {
    if (lines[i].length !== 0) {
      lines[i] = lines[i].match(/([A-Z]+)/g)
      if (lines[i][0] === "AAA") {
        nextIndex = i
      }
    }
  }

  while (!found) {
    for (let i = 0; i < moves.length; i++) {
      let find = (moves[i] === "L") ? 1 : 2;

      if (lines[nextIndex][find] === "ZZZ") {
        found = true
        moveCount++
        break
      } else {
        nextIndex = lines.indexOf(lines.find(element => element[0] === lines[nextIndex][find])) 
      }
      moveCount++
    }
  }
  
  console.log(moveCount)
}

let start = performance.now()
const input = file.split(/\n/g)
//console.log(input)
checkMoves(input)
//["LLR", "", "AAA = (BBB, BBB)","BBB = (AAA, ZZZ)","ZZZ = (ZZZ, ZZZ)"]
let end = performance.now()

console.log("Execution time:", end - start, "ms")