import * as antlr4 from 'antlr4';
import { VillanelleGrammarLexer } from './VillanelleGrammarLexer';
import { VillanelleGrammarParser } from './VillanelleGrammarParser';
import { VillanelleGrammarVisitorImpl } from './VillanelleGrammarVisitorImpl';
import { VillanelleErrorListener } from './VillanelleErrorListener';

let visitor = new VillanelleGrammarVisitorImpl();

export function parseEffects(str: string) {
    let parserAndErrorListener = getParserAndErrorListener(str);
    let parser = parserAndErrorListener.parser;
    let errorListener = parserAndErrorListener.errorListener;
    let tree = parser.prog();
    if (errorListener.errors.length == 0) {
        let lambdas = visitor.visitProg(tree);
        return { lambdas: lambdas };
    }
    return { errors: errorListener.errors };
}

export function parseCondition(str: string): { lambda?: () => boolean, errors?: any[] } {
    let parserAndErrorListener = getParserAndErrorListener(str);
    let parser = parserAndErrorListener.parser;
    let errorListener = parserAndErrorListener.errorListener;
    let tree = parser.stat();
    if (errorListener.errors.length == 0) {
        let lambda = visitor.visitStat(tree);
        return { lambda: lambda };
    }
    return { errors: errorListener.errors };
}

function getParserAndErrorListener(str: string) {
    let is = new antlr4.InputStream(str);
    let lexer = new VillanelleGrammarLexer(is);
    let tokens = new antlr4.CommonTokenStream(lexer);
    let parser: antlr4.Parser = new VillanelleGrammarParser(tokens);
    let errorListener = new VillanelleErrorListener();

    parser.removeErrorListeners(); // Remove default ConsoleErrorListener
    parser.addErrorListener(errorListener); // Add custom error listener

    return {parser: parser, errorListener: errorListener};
}