import * as antlr4 from 'antlr4';
import { VillanelleGrammarLexer } from './VillanelleGrammarLexer';
import { VillanelleGrammarParser } from './VillanelleGrammarParser';
import { VillanelleGrammarVisitorImpl } from './VillanelleGrammarVisitorImpl';

export function parse() {
    console.log('antlr parsing')
    let str = "b=2\na = b\nc= a==b\n";
    let is = new antlr4.InputStream(str);
    let lexer = new VillanelleGrammarLexer(is);
    let tokens = new antlr4.CommonTokenStream(lexer);
    let parser = new VillanelleGrammarParser(tokens);
    let tree = parser.prog();
    var visitor = new VillanelleGrammarVisitorImpl();
    //TODO change to prog
    let lambdas = visitor.visitProg(tree);
    lambdas[0]();
    lambdas[1]();
    lambdas[2]();
    console.log(visitor.variables);
}