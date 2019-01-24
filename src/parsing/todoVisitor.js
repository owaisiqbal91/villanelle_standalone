// Generated from c:\Projects\Webstorm\electron-react-villanelle\src\parsing\todo.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete generic visitor for a parse tree produced by todoParser.

function todoVisitor() {
	antlr4.tree.ParseTreeVisitor.call(this);
	return this;
}

todoVisitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
todoVisitor.prototype.constructor = todoVisitor;

// Visit a parse tree produced by todoParser#elements.
todoVisitor.prototype.visitElements = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by todoParser#element.
todoVisitor.prototype.visitElement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by todoParser#emptyLine.
todoVisitor.prototype.visitEmptyLine = function(ctx) {
  return this.visitChildren(ctx);
};



exports.todoVisitor = todoVisitor;