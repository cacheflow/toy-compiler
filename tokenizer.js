
const patterns = {
  whitespaceRegEx: /\s/,
  numberRegex: /[0-9]/,
}

const regexer = {
  isWhiteSpace: (char) => {
    return patterms.whitespaceRegEx.test(char)
  },

  isNumber: (char) => {
    return patterns.numberRegex.test(char)
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
  }

  init() {
    const {input, current} = this;
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
    }
  }
}