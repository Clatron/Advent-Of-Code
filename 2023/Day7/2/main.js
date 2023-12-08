const fs = require('fs')
const performance = require('perf_hooks').performance

const file = fs.readFileSync('../../Inputs/input7.txt', { encoding: 'utf8' })

const chars = ["J", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"]

function checkCards(input) {
  let result = 0
  let categories = [
    [], //High
    [],
    [],
    [],
    [],
    [],
    [], //Five
  ]

  input.forEach((card) => {
    const value = card.split(' ')[0]
    let countArray = new Array(chars.length).fill(0)

    for (let i = 0; i < value.length; i++) {
      const index = chars.indexOf(value[i])
      countArray[index]++
    }

    if (card.includes('J')) {
      let JCount = countArray[0]
      if (JCount !== 5) {
        let biggest = 1
        for (let i = 1; i < countArray.length; i++) {
          if (!biggest) {
            biggest = i
          } else if (countArray[i] > countArray[biggest]) {
            biggest = i
          }
        }
        countArray[biggest] += JCount
        countArray[0] = 0
      }
    }


    countArray = countArray.sort((a, b) => b - a).filter((x) => x > 0)
    //console.log(countArray)

    if (countArray.length === 1) {
      categories[6].push(card)
    } else if (countArray.includes(4)) {
      categories[5].push(card)
    } else if (countArray.includes(3) && countArray.includes(2)) {
      categories[4].push(card)
    } else if (countArray.includes(3)) {
      categories[3].push(card)
    } else if (countArray.includes(2)) {
      if (countArray.length === 3) {
        categories[2].push(card)
      } else {
        categories[1].push(card)
      }
    } else if (countArray.length === 5) {
      categories[0].push(card)
    }
  })

  let rank = 1;
  categories.forEach((category) => {
    category = category.sort((a, b) => {
      const aVal = a.split(' ')[0]
      const bVal = b.split(' ')[0]

      for (let i = 0; i < 5; i++) {
        let aSort = chars.indexOf(aVal[i])
        let bSort = chars.indexOf(bVal[i])

        if (aSort !== bSort) {
          return aSort - bSort
        }
      }
      return 0
    })

    for (let i = 0; i < category.length; i++) {
      const bid = category[i].split(' ')[1]
      result += bid * rank
      rank++
    }
  })

  console.log(categories)
  console.log(result)
}

let start = performance.now()
const input = file.split(/\n/g)
//console.log(input)
checkCards(input)
//['342QK 491', '245TK 177']
let end = performance.now()

console.log("Execution time:", end - start, "ms")