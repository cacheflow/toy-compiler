
const patterns = {
  whitespaceRegEx: /\s/,
  numberRegex: /[0-9]/,
  alphabet: /[a-z]/i,
}

const regexer = {
  isWhiteSpace: (char) => {
    return patterms.whitespaceRegEx.test(char);
  },

  isNumber: (char) => {
    return patterns.numberRegex.test(char);
  },

  isLetters: (char) => {
    return patterns.alphabet.test(char);
  }
}


class Tokenizer {
  constructor(input) {
    if(!input) {
      throw new Error('Must pass initial code')
    }
    this.input = input;
    this.tokens = [];
    this.current = 0;
    return this.init()
  }

  init() {
    const {input, current, tokens} = this;
    while(current < input.length) {
      let char = input[current];

      if(char === '(') {
        tokens.push({
          type: 'paren',
          value: '('
        })
        current++
        continue;
      }

      if(char === ')') {
        tokens.push({
          type: 'paren',
          value: ')',
        })
        current++
        continue;
      }

      if(regexer.isWhiteSpace(char)) {
        current++
        continue;
      }

      if(regexer.isNumber(char)) {
        let value = '';

        while (regexer.isNumber(char)) {
          value += char;
          char = input[++current];
        }
        tokens.push({
          type: 'number',
          value
        })
        continue;
      }


      if(char === '"') {
        let value = '';
        char = input[++current];

        while(char !== '"') {
          value += char;
          char = input[++current];
        }

        char = input[++current];

        tokens.push({
          type: 'string',
          value
        })
        continue;
      }

      if(regexer.isLetters(char)) {
        let value = '';

        while(regexer.isLetters(char)) {
          value += char;
          char = input[++current];
        }
        tokens.push({
          type: 'name',
          value
        })
        continue;
      }
      throw new TypeError(`This is an invalid character ${char}`)
    }
    return tokens;
  }
}

let n = new Tokenizer('(add 2 (subtract 4 2))')


module.exports = Tokenizer