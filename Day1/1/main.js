const fs = require('fs')
const path = require('path')

const text = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf-8' })

function find(array) {
    let numbers = [];
    let result = 0;

    for (let i = 0; i < array.length; i++) {
        let last
        for (let j = 0; j < array[i].length; j++) {
            if (!numbers[i] && Number(array[i][j])) {
                numbers[i] = array[i][j]
            } else if (Number(array[i][j])) {
                last = array[i][j]
            }
        }
        if (numbers[i]) {
            if (!last) {
                numbers[i] += numbers[i]
            } else {
                numbers[i] += last
            }
            result += Number(numbers[i])
        }
    }

    return result;
}
const input = text.split(/\s+/).map(line => line.trim())
const result = find(input)
console.log(result)
