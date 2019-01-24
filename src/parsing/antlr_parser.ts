import * as antlr4 from 'antlr4';
import * as TodoLexer from './todoLexer';
import * as TodoParser from './todoParser';

export function parse() {
    console.log('antlr parsing')
    var str = '* play with antlr4\n';
    var is = new antlr4.InputStream(str);
    var lexer = new TodoLexer.todoLexer(is);
    var tokens = new antlr4.CommonTokenStream(lexer);
    var parser = new TodoParser.todoParser(tokens);
    var tree: antlr4.ElementsContext = parser.elements();
    console.log(tree.children); //.children[0].children[2].getText()
}