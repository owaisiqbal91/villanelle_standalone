import * as antlr4 from 'antlr4';
import { VillanelleGrammarLexer } from './VillanelleGrammarLexer';
import { VillanelleGrammarParser } from './VillanelleGrammarParser';
import { VillanelleGrammarVisitorImpl } from './VillanelleGrammarVisitorImpl';

let visitor = new VillanelleGrammarVisitorImpl();

export function parseEffects(str: string): () => {} {
    let parser = getParser(str);
    let tree = parser.prog();
    let lambdas = visitor.visitProg(tree);

    return () => lambdas.forEach(lambda => lambda());
}

export function parseCondition(str: string): () => boolean {
    let parser = getParser(str);
    let tree = parser.stat();
    let visitor = new VillanelleGrammarVisitorImpl();
    let lambda = visitor.visitStat(tree);

    return lambda;
}

function getParser(str: string) {
    let is = new antlr4.InputStream(str);
    let lexer = new VillanelleGrammarLexer(is);
    let tokens = new antlr4.CommonTokenStream(lexer);
    let parser = new VillanelleGrammarParser(tokens);

    return parser;
}