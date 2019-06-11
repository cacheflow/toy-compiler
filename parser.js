const types = {
  NUMBER_LITERAL = 'NumberLiteral'
}
class Parser {
  constructor(tokens) {
    if(!tokens) {
      throw new Error(`Parser requires tokens to be initialized with.`)
    }
    this.tokens = tokens;
    this.current = 0;
  }

  walk() {
    let token = tokens[current];

    if(token.type === 'number') {
      current++

      return {
        type: types.NUMBER_LITERAL,
        value: token.value,
      }
    }

    if(token.type === 'string') {
      current++
      return {
        type: 'StringLiteral',
        value: token.value,
      };
    }

    if(token.type === 'paren' && token.value === '(') {
      token = tokens[++current];

      let node = {
        type: 'CallExpression',
        name: token.value,
        params: [],
      };

      token = tokens[++current]

      while(
        (token.type !== 'paren') || (token.type === 'paren' && token.value !== ')')
      ) {
        node.params.push(walk())
        token = tokens[current];
      }
      current++
      return node;
    }

    throw new TypeError(token.type);

    let ast = {
      type: 'Program',
      body: [],
    };

    while(current < tokens.length) {
      ast.body.push(walk());
    }
    return ast;
  }
}

module.exports = Parser;