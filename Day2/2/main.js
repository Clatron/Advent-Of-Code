const fs = require('fs')

const file = fs.readFileSync('../../Inputs/input2.txt', {encoding: 'utf8'})

function isValid(games) {
  let sum = 0;
  
  for (let i = 0; i < games.length; i++) {
    let text = games[i].split(';')
    let minimas = [0, 0, 0];
    
    for (let j = 0; j < text.length; j++) {
      if (j == 0) {
        text[j] = text[j].slice(7, text[j].length)
      }

      if (text[j].indexOf('red')) {
        let index = text[j].indexOf('red')
        if (Number(text[j].slice(index - 3, index)) > minimas[0]) {
          minimas[0] = Number(text[j].slice(index - 3, index))
        }
      }
      if (text[j].indexOf('green')) {
        let index = text[j].indexOf('green')
        if (Number(text[j].slice(index - 3, index)) > minimas[1]) {
          minimas[1] = Number(text[j].slice(index - 3, index))
        }
      }
      if (text[j].indexOf('blue')) {
        let index = text[j].indexOf('blue')
        if (Number(text[j].slice(index - 3, index)) > minimas[2]) {
          minimas[2] = Number(text[j].slice(index - 3, index))
        }
      }
    }

    let multiplication = 1;
    for (let t = 0; t < minimas.length; t++) {
      multiplication *= minimas[t]
    }
    sum += multiplication;
  }

  console.log(sum)
}


const input = file.split(/\n/g).map(line => line.trim())
//console.log(input)
isValid(input)
//console.log(input[0].split(';'))
//['Game 99: 2 green, 20 blue; 12 blue; 3 red, 12 blue; 7 blue; 3 green, 10 blue, 2 red; 3 red, 2 green','Game 100: 2 blue, 8 green, 12 red; 2 green, 13 red; 2 red, 4 green; 2 green, 7 red; 10 green, 5 red, 1 blue']
//input[0].split(';')[0].slice(8)