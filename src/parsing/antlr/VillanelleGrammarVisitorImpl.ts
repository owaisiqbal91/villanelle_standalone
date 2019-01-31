import { VillanelleGrammarVisitor } from './VillanelleGrammarVisitor';
import * as scripting from '../../scripting';

export class VillanelleGrammarVisitorImpl extends VillanelleGrammarVisitor {

    constructor() {
        super();
    }

    visitProg = (ctx) => {
        return super.visitProg(ctx);
    }

    visitAssign = (ctx) => {
        let id = ctx.left.text;
        let value = this.visitExpr(ctx.right);

        return () => scripting.setVariable(id, value());
    }

    visitStat = (ctx) => {
        return super.visitStat(ctx)[0];
    }

    visitExpr = (ctx) => {
        if (ctx.op !== null) {
            let exprResults = super.visitExpr(ctx);
            switch (ctx.op.text) {
                case '+': {
                    return () => exprResults[0]() + exprResults[2]();
                }
                case '-': {
                    return () => exprResults[0]() - exprResults[2]();
                }
                case '*': {
                    return () => exprResults[0]() * exprResults[2]();
                }
                case '/': {
                    return () => exprResults[0]() / exprResults[2]();
                }
                case 'and': {
                    return () => exprResults[0]() && exprResults[2]();
                }
                case 'or': {
                    return () => exprResults[0]() || exprResults[2]();
                }
                case 'not': {
                    return () => !exprResults[1]();
                }
                case '<': {
                    return () => exprResults[0]() < exprResults[2]();
                }
                case '>': {
                    return () => exprResults[0]() > exprResults[2]();
                }
                case '>=': {
                    return () => exprResults[0]() >= exprResults[2]();
                }
                case '<=': {
                    return () => exprResults[0]() <= exprResults[2]();
                }
                case '!=': {
                    return () => exprResults[0]() != exprResults[2]();
                }
                case '==': {
                    return () => exprResults[0]() == exprResults[2]();
                }
            }
        } else {
            return super.visitExpr(ctx)[0]; //TODO cant be zero, we wont be able to parse a + b
        }
    }

    visitParenthesisexpr = (ctx) => {
        return this.visitExpr(ctx.children[1]);
    }

    //this will be used for right hand side of assignment
    visitId = (ctx) => {
        return () => scripting.getVariable(ctx.children[0].symbol.text);
    }

    visitInteger = (ctx) => {
        return () => parseInt(ctx.children[0].symbol.text);
    }

    visitBool = (ctx) => {
        return () => ctx.children[0].symbol.text.toLowerCase() === 'true';
    }

    visitString = (ctx) => {
        return () => ctx.children.length > 2 ? ctx.children[1].symbol.text : '';
    }
}