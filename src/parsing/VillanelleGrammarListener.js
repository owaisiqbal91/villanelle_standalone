// Generated from c:\Projects\Webstorm\villanelle_standalone\src\parsing\VillanelleGrammar.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by VillanelleGrammarParser.
function VillanelleGrammarListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

VillanelleGrammarListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
VillanelleGrammarListener.prototype.constructor = VillanelleGrammarListener;

// Enter a parse tree produced by VillanelleGrammarParser#prog.
VillanelleGrammarListener.prototype.enterProg = function(ctx) {
};

// Exit a parse tree produced by VillanelleGrammarParser#prog.
VillanelleGrammarListener.prototype.exitProg = function(ctx) {
};


// Enter a parse tree produced by VillanelleGrammarParser#stat.
VillanelleGrammarListener.prototype.enterStat = function(ctx) {
};

// Exit a parse tree produced by VillanelleGrammarParser#stat.
VillanelleGrammarListener.prototype.exitStat = function(ctx) {
};


// Enter a parse tree produced by VillanelleGrammarParser#assign.
VillanelleGrammarListener.prototype.enterAssign = function(ctx) {
};

// Exit a parse tree produced by VillanelleGrammarParser#assign.
VillanelleGrammarListener.prototype.exitAssign = function(ctx) {
};


// Enter a parse tree produced by VillanelleGrammarParser#bool.
VillanelleGrammarListener.prototype.enterBool = function(ctx) {
};

// Exit a parse tree produced by VillanelleGrammarParser#bool.
VillanelleGrammarListener.prototype.exitBool = function(ctx) {
};


// Enter a parse tree produced by VillanelleGrammarParser#integer.
VillanelleGrammarListener.prototype.enterInteger = function(ctx) {
};

// Exit a parse tree produced by VillanelleGrammarParser#integer.
VillanelleGrammarListener.prototype.exitInteger = function(ctx) {
};


// Enter a parse tree produced by VillanelleGrammarParser#string.
VillanelleGrammarListener.prototype.enterString = function(ctx) {
};

// Exit a parse tree produced by VillanelleGrammarParser#string.
VillanelleGrammarListener.prototype.exitString = function(ctx) {
};


// Enter a parse tree produced by VillanelleGrammarParser#id.
VillanelleGrammarListener.prototype.enterId = function(ctx) {
};

// Exit a parse tree produced by VillanelleGrammarParser#id.
VillanelleGrammarListener.prototype.exitId = function(ctx) {
};


// Enter a parse tree produced by VillanelleGrammarParser#expr.
VillanelleGrammarListener.prototype.enterExpr = function(ctx) {
};

// Exit a parse tree produced by VillanelleGrammarParser#expr.
VillanelleGrammarListener.prototype.exitExpr = function(ctx) {
};


// Enter a parse tree produced by VillanelleGrammarParser#parenthesisexpr.
VillanelleGrammarListener.prototype.enterParenthesisexpr = function(ctx) {
};

// Exit a parse tree produced by VillanelleGrammarParser#parenthesisexpr.
VillanelleGrammarListener.prototype.exitParenthesisexpr = function(ctx) {
};



exports.VillanelleGrammarListener = VillanelleGrammarListener;