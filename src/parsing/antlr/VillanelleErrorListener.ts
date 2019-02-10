import * as antlr4 from 'antlr4';

export class VillanelleErrorListener extends antlr4.error.ErrorListener {
    errors = [];

    syntaxError(recognizer, symbol, line, column, message, payload) {
        this.errors.push({dataPath: line, message: message});
    }
}