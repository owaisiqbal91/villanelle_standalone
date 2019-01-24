// Generated from c:\Projects\Webstorm\electron-react-villanelle\src\parsing\todo.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by todoParser.
function todoListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

todoListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
todoListener.prototype.constructor = todoListener;

// Enter a parse tree produced by todoParser#elements.
todoListener.prototype.enterElements = function(ctx) {
};

// Exit a parse tree produced by todoParser#elements.
todoListener.prototype.exitElements = function(ctx) {
};


// Enter a parse tree produced by todoParser#element.
todoListener.prototype.enterElement = function(ctx) {
};

// Exit a parse tree produced by todoParser#element.
todoListener.prototype.exitElement = function(ctx) {
};


// Enter a parse tree produced by todoParser#emptyLine.
todoListener.prototype.enterEmptyLine = function(ctx) {
};

// Exit a parse tree produced by todoParser#emptyLine.
todoListener.prototype.exitEmptyLine = function(ctx) {
};



exports.todoListener = todoListener;