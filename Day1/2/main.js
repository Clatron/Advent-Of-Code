const fs = require('fs')
const path = require('path')

const text = fs.readFileSync('../../Inputs/input1.txt', { encoding: 'utf-8' })

const digits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

function find(array) {
  let numbers = [];
  let result = 0;
  let digitWithIndexes = []

  for (let i = 0; i < array.length; i++) {
    digitWithIndexes = []
    numbers = []
    for (let k = 0; k < digits.length; k++) {
      let page = array[i].indexOf(digits[k]);
      while (page !== -1) {
        digitWithIndexes.push({ value: String(digits.indexOf(digits[k]) + 1), index: page });
        page = array[i].indexOf(digits[k], page + 1);
      }
    }
    digitWithIndexes.sort((a, b) => a.index - b.index)
    let last = {}
    for (let j = 0; j < array[i].length; j++) {
      if (!numbers[i] && Number(array[i][j])) {
        numbers[i] = array[i][j]
        last.value = array[i][j]
        last.index = j

        if (digitWithIndexes[0] && digitWithIndexes[0].index < j) {
          numbers[i] = digitWithIndexes[0].value
        }
      } else if (Number(array[i][j]) || array[i][j] == 0) {
        last.value = array[i][j]
        last.index = j
      }

      if (!last.index) {
        last.index = 0
      }

      if (digitWithIndexes[digitWithIndexes.length - 1] && digitWithIndexes[digitWithIndexes.length - 1].index > last.index) {
        last.value = digitWithIndexes[digitWithIndexes.length - 1].value
      }
    }
    if (!numbers[i] && digitWithIndexes[0]) {
      numbers[i] = digitWithIndexes[0].value
    }
    if (numbers[i]) {
      if (!last.value) {
        numbers[i] += numbers[i]
      } else {
        numbers[i] += last.value
      }
      result += Number(numbers[i])
    }
  }

  return result;
}
const input = text.split(/\s+/).map(line => line.trim())
const result = find(input)
console.log(result)