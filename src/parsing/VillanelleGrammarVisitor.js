// Generated from c:\Projects\Webstorm\villanelle_standalone\src\parsing\VillanelleGrammar.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete generic visitor for a parse tree produced by VillanelleGrammarParser.

function VillanelleGrammarVisitor() {
	antlr4.tree.ParseTreeVisitor.call(this);
	return this;
}

VillanelleGrammarVisitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
VillanelleGrammarVisitor.prototype.constructor = VillanelleGrammarVisitor;

// Visit a parse tree produced by VillanelleGrammarParser#prog.
VillanelleGrammarVisitor.prototype.visitProg = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by VillanelleGrammarParser#stat.
VillanelleGrammarVisitor.prototype.visitStat = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by VillanelleGrammarParser#assign.
VillanelleGrammarVisitor.prototype.visitAssign = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by VillanelleGrammarParser#bool.
VillanelleGrammarVisitor.prototype.visitBool = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by VillanelleGrammarParser#integer.
VillanelleGrammarVisitor.prototype.visitInteger = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by VillanelleGrammarParser#string.
VillanelleGrammarVisitor.prototype.visitString = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by VillanelleGrammarParser#id.
VillanelleGrammarVisitor.prototype.visitId = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by VillanelleGrammarParser#expr.
VillanelleGrammarVisitor.prototype.visitExpr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by VillanelleGrammarParser#parenthesisexpr.
VillanelleGrammarVisitor.prototype.visitParenthesisexpr = function(ctx) {
  return this.visitChildren(ctx);
};



exports.VillanelleGrammarVisitor = VillanelleGrammarVisitor;