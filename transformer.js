class Transformer {
  constructor(ast) {
    if(!ast) throw new Error('Must pass an AST')''
    this.ast = ast;
    this.newAst = {
      type: 'Program',
      body: [],
    }
    this.ast._context = this.newAst.body;
  }

  traverser(ast, {

    NumberLiteral: {
      enter: (node, parent) => {

      }

    }
  })
}