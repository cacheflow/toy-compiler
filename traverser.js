class Traverser {
  constructor(ast, visitor) {
    if (!ast) throw new Error('Ast is required');
    if (!visitor) throw new Error('Visitor is required');

  }

  traverseArray(array, parent) {
    array.forEach(child => traverseNode(child, parent));
  }

  traverseNode(node, parent) {
    let methods = visitor[node.type];

    if(methods && methods.enter) {
      methods.enter(node, parent);
    }

    switch(node.type) {
      case 'Program':
        traverseArray(node.body, node);
        break;

      case 'CallExpression':
        traverseArray(node.params, node);
        break;

      case 'NumberLiteral':
      case 'StringLiteral':
        break;

      default:
        throw new TypeError(node.type);
    }

    if(methods && methods.exit) {
      methods.exit(node, parent);
    }

    traverseNode(ast, null);
  }
}

module.exports = Traverser;