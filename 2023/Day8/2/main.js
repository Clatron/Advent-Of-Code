const fs = require('fs')
const performance = require('perf_hooks').performance

const file = fs.readFileSync('../../Inputs/input8.txt', { encoding: 'utf8' })

const chars = ["J", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"]

function findLeastCommonMultiple(arr) {
  const maxNumber = Math.max(...arr);

  let lcm = maxNumber;

  while (true) {
    if (arr.every(num => lcm % num === 0)) {
      return lcm;
    }
    lcm += maxNumber;
  }
}

function checkMoves(lines) {
  const moves = lines[0]
  const nodes = []
  let finds = [];

  for (let i = 2; i < lines.length; i++) {
    if (lines[i].length !== 0) {
      lines[i] = lines[i].match(/([A-Z]+)/g)
      if (lines[i][0].endsWith("A")) {
        nodes.push(i)
      }
    }
  }
  
  for (let j = 0; j < nodes.length; j++) {
    let moveCount = 0
    let found = false
    while (!found) {
      for (let i = 0; i < moves.length; i++) {
        let find = (moves[i] === "L") ? 1 : 2;
  
        if (lines[nodes[j]][find].endsWith("Z")) {
          moveCount++
          finds.push(moveCount)
          found = true
          break
        } else {
          nodes[j] = lines.indexOf(lines.find(element => element[0] === lines[nodes[j]][find]))
          moveCount++
        }
      }
    }
  }

  let result = findLeastCommonMultiple(finds)

  console.log("Result:", result)
}

let start = performance.now()
const input = file.split(/\n/g)
//console.log(input)
checkMoves(input)
//["LR","","CCA = (CCB, XXX)","CCB = (XXX, CCZ)","CCZ = (CCB, XXX)","DDA = (DDB, XXX)","DDB = (DDC, DDC)","DDC = (DDZ, DDZ)","DDZ = (DDB, DDB)","XXX = (XXX, XXX)"]
let end = performance.now()

console.log("Execution time:", end - start, "ms")