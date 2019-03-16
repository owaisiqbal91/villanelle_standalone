// Generated from c:\Projects\Webstorm\villanelle_standalone\src\parsing\antlr\VillanelleGrammar.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');
var VillanelleGrammarListener = require('./VillanelleGrammarListener').VillanelleGrammarListener;
var VillanelleGrammarVisitor = require('./VillanelleGrammarVisitor').VillanelleGrammarVisitor;

var grammarFileName = "VillanelleGrammar.g4";

var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003\u0018W\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004",
    "\b\t\b\u0004\t\t\t\u0004\n\t\n\u0003\u0002\u0006\u0002\u0016\n\u0002",
    "\r\u0002\u000e\u0002\u0017\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0005\u0003\u001f\n\u0003\u0003\u0004\u0003\u0004",
    "\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0005\u0003\u0005\u0003\u0006",
    "\u0003\u0006\u0003\u0007\u0003\u0007\u0007\u0007,\n\u0007\f\u0007\u000e",
    "\u0007/\u000b\u0007\u0003\u0007\u0003\u0007\u0003\b\u0003\b\u0003\t",
    "\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0005\t=\n",
    "\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003",
    "\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0007\tN\n\t\f\t",
    "\u000e\tQ\u000b\t\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003-\u0003",
    "\u0010\u000b\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0002\u0005\u0003",
    "\u0002\u0015\u0016\u0003\u0002\u0017\u0018\u0003\u0002\u0005\n\u0002",
    "[\u0002\u0015\u0003\u0002\u0002\u0002\u0004\u001e\u0003\u0002\u0002",
    "\u0002\u0006 \u0003\u0002\u0002\u0002\b%\u0003\u0002\u0002\u0002\n\'",
    "\u0003\u0002\u0002\u0002\f)\u0003\u0002\u0002\u0002\u000e2\u0003\u0002",
    "\u0002\u0002\u0010<\u0003\u0002\u0002\u0002\u0012R\u0003\u0002\u0002",
    "\u0002\u0014\u0016\u0005\u0004\u0003\u0002\u0015\u0014\u0003\u0002\u0002",
    "\u0002\u0016\u0017\u0003\u0002\u0002\u0002\u0017\u0015\u0003\u0002\u0002",
    "\u0002\u0017\u0018\u0003\u0002\u0002\u0002\u0018\u0003\u0003\u0002\u0002",
    "\u0002\u0019\u001a\u0005\u0010\t\u0002\u001a\u001b\u0007\u0013\u0002",
    "\u0002\u001b\u001f\u0003\u0002\u0002\u0002\u001c\u001f\u0005\u0006\u0004",
    "\u0002\u001d\u001f\u0007\u0013\u0002\u0002\u001e\u0019\u0003\u0002\u0002",
    "\u0002\u001e\u001c\u0003\u0002\u0002\u0002\u001e\u001d\u0003\u0002\u0002",
    "\u0002\u001f\u0005\u0003\u0002\u0002\u0002 !\u0007\u0012\u0002\u0002",
    "!\"\u0007\u0003\u0002\u0002\"#\u0005\u0010\t\u0002#$\u0007\u0013\u0002",
    "\u0002$\u0007\u0003\u0002\u0002\u0002%&\u0007\u0010\u0002\u0002&\t\u0003",
    "\u0002\u0002\u0002\'(\u0007\u0011\u0002\u0002(\u000b\u0003\u0002\u0002",
    "\u0002)-\u0007\u0004\u0002\u0002*,\u000b\u0002\u0002\u0002+*\u0003\u0002",
    "\u0002\u0002,/\u0003\u0002\u0002\u0002-.\u0003\u0002\u0002\u0002-+\u0003",
    "\u0002\u0002\u0002.0\u0003\u0002\u0002\u0002/-\u0003\u0002\u0002\u0002",
    "01\u0007\u0004\u0002\u00021\r\u0003\u0002\u0002\u000223\u0007\u0012",
    "\u0002\u00023\u000f\u0003\u0002\u0002\u000245\b\t\u0001\u00025=\u0005",
    "\u0012\n\u000267\u0007\r\u0002\u00027=\u0005\u0010\t\u00078=\u0005\n",
    "\u0006\u00029=\u0005\b\u0005\u0002:=\u0005\f\u0007\u0002;=\u0005\u000e",
    "\b\u0002<4\u0003\u0002\u0002\u0002<6\u0003\u0002\u0002\u0002<8\u0003",
    "\u0002\u0002\u0002<9\u0003\u0002\u0002\u0002<:\u0003\u0002\u0002\u0002",
    "<;\u0003\u0002\u0002\u0002=O\u0003\u0002\u0002\u0002>?\f\f\u0002\u0002",
    "?@\t\u0002\u0002\u0002@N\u0005\u0010\t\rAB\f\u000b\u0002\u0002BC\t\u0003",
    "\u0002\u0002CN\u0005\u0010\t\fDE\f\n\u0002\u0002EF\t\u0004\u0002\u0002",
    "FN\u0005\u0010\t\u000bGH\f\t\u0002\u0002HI\u0007\u000b\u0002\u0002I",
    "N\u0005\u0010\t\nJK\f\b\u0002\u0002KL\u0007\f\u0002\u0002LN\u0005\u0010",
    "\t\tM>\u0003\u0002\u0002\u0002MA\u0003\u0002\u0002\u0002MD\u0003\u0002",
    "\u0002\u0002MG\u0003\u0002\u0002\u0002MJ\u0003\u0002\u0002\u0002NQ\u0003",
    "\u0002\u0002\u0002OM\u0003\u0002\u0002\u0002OP\u0003\u0002\u0002\u0002",
    "P\u0011\u0003\u0002\u0002\u0002QO\u0003\u0002\u0002\u0002RS\u0007\u000e",
    "\u0002\u0002ST\u0005\u0010\t\u0002TU\u0007\u000f\u0002\u0002U\u0013",
    "\u0003\u0002\u0002\u0002\b\u0017\u001e-<MO"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "':='", "'''", "'<'", "'>'", "'=='", "'>='", 
                     "'<='", "'!='", "'and'", "'or'", "'not'", "'('", "')'", 
                     null, null, null, null, null, "'*'", "'/'", "'+'", 
                     "'-'" ];

var symbolicNames = [ null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, "BOOL", "INT", "ID", 
                      "NEWLINE", "WS", "MUL", "DIV", "ADD", "SUB" ];

var ruleNames =  [ "prog", "stat", "assign", "bool", "integer", "string", 
                   "id", "expr", "parenthesisexpr" ];

function VillanelleGrammarParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

VillanelleGrammarParser.prototype = Object.create(antlr4.Parser.prototype);
VillanelleGrammarParser.prototype.constructor = VillanelleGrammarParser;

Object.defineProperty(VillanelleGrammarParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

VillanelleGrammarParser.EOF = antlr4.Token.EOF;
VillanelleGrammarParser.T__0 = 1;
VillanelleGrammarParser.T__1 = 2;
VillanelleGrammarParser.T__2 = 3;
VillanelleGrammarParser.T__3 = 4;
VillanelleGrammarParser.T__4 = 5;
VillanelleGrammarParser.T__5 = 6;
VillanelleGrammarParser.T__6 = 7;
VillanelleGrammarParser.T__7 = 8;
VillanelleGrammarParser.T__8 = 9;
VillanelleGrammarParser.T__9 = 10;
VillanelleGrammarParser.T__10 = 11;
VillanelleGrammarParser.T__11 = 12;
VillanelleGrammarParser.T__12 = 13;
VillanelleGrammarParser.BOOL = 14;
VillanelleGrammarParser.INT = 15;
VillanelleGrammarParser.ID = 16;
VillanelleGrammarParser.NEWLINE = 17;
VillanelleGrammarParser.WS = 18;
VillanelleGrammarParser.MUL = 19;
VillanelleGrammarParser.DIV = 20;
VillanelleGrammarParser.ADD = 21;
VillanelleGrammarParser.SUB = 22;

VillanelleGrammarParser.RULE_prog = 0;
VillanelleGrammarParser.RULE_stat = 1;
VillanelleGrammarParser.RULE_assign = 2;
VillanelleGrammarParser.RULE_bool = 3;
VillanelleGrammarParser.RULE_integer = 4;
VillanelleGrammarParser.RULE_string = 5;
VillanelleGrammarParser.RULE_id = 6;
VillanelleGrammarParser.RULE_expr = 7;
VillanelleGrammarParser.RULE_parenthesisexpr = 8;

function ProgContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = VillanelleGrammarParser.RULE_prog;
    return this;
}

ProgContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ProgContext.prototype.constructor = ProgContext;

ProgContext.prototype.stat = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(StatContext);
    } else {
        return this.getTypedRuleContext(StatContext,i);
    }
};

ProgContext.prototype.enterRule = function(listener) {
    if(listener instanceof VillanelleGrammarListener ) {
        listener.enterProg(this);
	}
};

ProgContext.prototype.exitRule = function(listener) {
    if(listener instanceof VillanelleGrammarListener ) {
        listener.exitProg(this);
	}
};

ProgContext.prototype.accept = function(visitor) {
    if ( visitor instanceof VillanelleGrammarVisitor ) {
        return visitor.visitProg(this);
    } else {
        return visitor.visitChildren(this);
    }
};




VillanelleGrammarParser.ProgContext = ProgContext;

VillanelleGrammarParser.prototype.prog = function() {

    var localctx = new ProgContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, VillanelleGrammarParser.RULE_prog);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 19; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 18;
            this.stat();
            this.state = 21; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << VillanelleGrammarParser.T__1) | (1 << VillanelleGrammarParser.T__10) | (1 << VillanelleGrammarParser.T__11) | (1 << VillanelleGrammarParser.BOOL) | (1 << VillanelleGrammarParser.INT) | (1 << VillanelleGrammarParser.ID) | (1 << VillanelleGrammarParser.NEWLINE))) !== 0));
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function StatContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = VillanelleGrammarParser.RULE_stat;
    return this;
}

StatContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StatContext.prototype.constructor = StatContext;

StatContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

StatContext.prototype.NEWLINE = function() {
    return this.getToken(VillanelleGrammarParser.NEWLINE, 0);
};

StatContext.prototype.assign = function() {
    return this.getTypedRuleContext(AssignContext,0);
};

StatContext.prototype.enterRule = function(listener) {
    if(listener instanceof VillanelleGrammarListener ) {
        listener.enterStat(this);
	}
};

StatContext.prototype.exitRule = function(listener) {
    if(listener instanceof VillanelleGrammarListener ) {
        listener.exitStat(this);
	}
};

StatContext.prototype.accept = function(visitor) {
    if ( visitor instanceof VillanelleGrammarVisitor ) {
        return visitor.visitStat(this);
    } else {
        return visitor.visitChildren(this);
    }
};




VillanelleGrammarParser.StatContext = StatContext;

VillanelleGrammarParser.prototype.stat = function() {

    var localctx = new StatContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, VillanelleGrammarParser.RULE_stat);
    try {
        this.state = 28;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,1,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 23;
            this.expr(0);
            this.state = 24;
            this.match(VillanelleGrammarParser.NEWLINE);
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 26;
            this.assign();
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 27;
            this.match(VillanelleGrammarParser.NEWLINE);
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function AssignContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = VillanelleGrammarParser.RULE_assign;
    this.left = null; // Token
    this.right = null; // ExprContext
    return this;
}

AssignContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AssignContext.prototype.constructor = AssignContext;

AssignContext.prototype.NEWLINE = function() {
    return this.getToken(VillanelleGrammarParser.NEWLINE, 0);
};

AssignContext.prototype.ID = function() {
    return this.getToken(VillanelleGrammarParser.ID, 0);
};

AssignContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

AssignContext.prototype.enterRule = function(listener) {
    if(listener instanceof VillanelleGrammarListener ) {
        listener.enterAssign(this);
	}
};

AssignContext.prototype.exitRule = function(listener) {
    if(listener instanceof VillanelleGrammarListener ) {
        listener.exitAssign(this);
	}
};

AssignContext.prototype.accept = function(visitor) {
    if ( visitor instanceof VillanelleGrammarVisitor ) {
        return visitor.visitAssign(this);
    } else {
        return visitor.visitChildren(this);
    }
};




VillanelleGrammarParser.AssignContext = AssignContext;

VillanelleGrammarParser.prototype.assign = function() {

    var localctx = new AssignContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, VillanelleGrammarParser.RULE_assign);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 30;
        localctx.left = this.match(VillanelleGrammarParser.ID);
        this.state = 31;
        this.match(VillanelleGrammarParser.T__0);
        this.state = 32;
        localctx.right = this.expr(0);
        this.state = 33;
        this.match(VillanelleGrammarParser.NEWLINE);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function BoolContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = VillanelleGrammarParser.RULE_bool;
    return this;
}

BoolContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
BoolContext.prototype.constructor = BoolContext;

BoolContext.prototype.BOOL = function() {
    return this.getToken(VillanelleGrammarParser.BOOL, 0);
};

BoolContext.prototype.enterRule = function(listener) {
    if(listener instanceof VillanelleGrammarListener ) {
        listener.enterBool(this);
	}
};

BoolContext.prototype.exitRule = function(listener) {
    if(listener instanceof VillanelleGrammarListener ) {
        listener.exitBool(this);
	}
};

BoolContext.prototype.accept = function(visitor) {
    if ( visitor instanceof VillanelleGrammarVisitor ) {
        return visitor.visitBool(this);
    } else {
        return visitor.visitChildren(this);
    }
};




VillanelleGrammarParser.BoolContext = BoolContext;

VillanelleGrammarParser.prototype.bool = function() {

    var localctx = new BoolContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, VillanelleGrammarParser.RULE_bool);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 35;
        this.match(VillanelleGrammarParser.BOOL);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function IntegerContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = VillanelleGrammarParser.RULE_integer;
    return this;
}

IntegerContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
IntegerContext.prototype.constructor = IntegerContext;

IntegerContext.prototype.INT = function() {
    return this.getToken(VillanelleGrammarParser.INT, 0);
};

IntegerContext.prototype.enterRule = function(listener) {
    if(listener instanceof VillanelleGrammarListener ) {
        listener.enterInteger(this);
	}
};

IntegerContext.prototype.exitRule = function(listener) {
    if(listener instanceof VillanelleGrammarListener ) {
        listener.exitInteger(this);
	}
};

IntegerContext.prototype.accept = function(visitor) {
    if ( visitor instanceof VillanelleGrammarVisitor ) {
        return visitor.visitInteger(this);
    } else {
        return visitor.visitChildren(this);
    }
};




VillanelleGrammarParser.IntegerContext = IntegerContext;

VillanelleGrammarParser.prototype.integer = function() {

    var localctx = new IntegerContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, VillanelleGrammarParser.RULE_integer);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 37;
        this.match(VillanelleGrammarParser.INT);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function StringContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = VillanelleGrammarParser.RULE_string;
    return this;
}

StringContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StringContext.prototype.constructor = StringContext;


StringContext.prototype.enterRule = function(listener) {
    if(listener instanceof VillanelleGrammarListener ) {
        listener.enterString(this);
	}
};

StringContext.prototype.exitRule = function(listener) {
    if(listener instanceof VillanelleGrammarListener ) {
        listener.exitString(this);
	}
};

StringContext.prototype.accept = function(visitor) {
    if ( visitor instanceof VillanelleGrammarVisitor ) {
        return visitor.visitString(this);
    } else {
        return visitor.visitChildren(this);
    }
};




VillanelleGrammarParser.StringContext = StringContext;

VillanelleGrammarParser.prototype.string = function() {

    var localctx = new StringContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, VillanelleGrammarParser.RULE_string);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 39;
        this.match(VillanelleGrammarParser.T__1);
        this.state = 43;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,2,this._ctx)
        while(_alt!=1 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1+1) {
                this.state = 40;
                this.matchWildcard(); 
            }
            this.state = 45;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,2,this._ctx);
        }

        this.state = 46;
        this.match(VillanelleGrammarParser.T__1);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function IdContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = VillanelleGrammarParser.RULE_id;
    return this;
}

IdContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
IdContext.prototype.constructor = IdContext;

IdContext.prototype.ID = function() {
    return this.getToken(VillanelleGrammarParser.ID, 0);
};

IdContext.prototype.enterRule = function(listener) {
    if(listener instanceof VillanelleGrammarListener ) {
        listener.enterId(this);
	}
};

IdContext.prototype.exitRule = function(listener) {
    if(listener instanceof VillanelleGrammarListener ) {
        listener.exitId(this);
	}
};

IdContext.prototype.accept = function(visitor) {
    if ( visitor instanceof VillanelleGrammarVisitor ) {
        return visitor.visitId(this);
    } else {
        return visitor.visitChildren(this);
    }
};




VillanelleGrammarParser.IdContext = IdContext;

VillanelleGrammarParser.prototype.id = function() {

    var localctx = new IdContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, VillanelleGrammarParser.RULE_id);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 48;
        this.match(VillanelleGrammarParser.ID);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ExprContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = VillanelleGrammarParser.RULE_expr;
    this.op = null; // Token
    return this;
}

ExprContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ExprContext.prototype.constructor = ExprContext;

ExprContext.prototype.parenthesisexpr = function() {
    return this.getTypedRuleContext(ParenthesisexprContext,0);
};

ExprContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};

ExprContext.prototype.integer = function() {
    return this.getTypedRuleContext(IntegerContext,0);
};

ExprContext.prototype.bool = function() {
    return this.getTypedRuleContext(BoolContext,0);
};

ExprContext.prototype.string = function() {
    return this.getTypedRuleContext(StringContext,0);
};

ExprContext.prototype.id = function() {
    return this.getTypedRuleContext(IdContext,0);
};

ExprContext.prototype.enterRule = function(listener) {
    if(listener instanceof VillanelleGrammarListener ) {
        listener.enterExpr(this);
	}
};

ExprContext.prototype.exitRule = function(listener) {
    if(listener instanceof VillanelleGrammarListener ) {
        listener.exitExpr(this);
	}
};

ExprContext.prototype.accept = function(visitor) {
    if ( visitor instanceof VillanelleGrammarVisitor ) {
        return visitor.visitExpr(this);
    } else {
        return visitor.visitChildren(this);
    }
};



VillanelleGrammarParser.prototype.expr = function(_p) {
	if(_p===undefined) {
	    _p = 0;
	}
    var _parentctx = this._ctx;
    var _parentState = this.state;
    var localctx = new ExprContext(this, this._ctx, _parentState);
    var _prevctx = localctx;
    var _startState = 14;
    this.enterRecursionRule(localctx, 14, VillanelleGrammarParser.RULE_expr, _p);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 58;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case VillanelleGrammarParser.T__11:
            this.state = 51;
            this.parenthesisexpr();
            break;
        case VillanelleGrammarParser.T__10:
            this.state = 52;
            localctx.op = this.match(VillanelleGrammarParser.T__10);
            this.state = 53;
            this.expr(5);
            break;
        case VillanelleGrammarParser.INT:
            this.state = 54;
            this.integer();
            break;
        case VillanelleGrammarParser.BOOL:
            this.state = 55;
            this.bool();
            break;
        case VillanelleGrammarParser.T__1:
            this.state = 56;
            this.string();
            break;
        case VillanelleGrammarParser.ID:
            this.state = 57;
            this.id();
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 77;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,5,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                this.state = 75;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input,4,this._ctx);
                switch(la_) {
                case 1:
                    localctx = new ExprContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, VillanelleGrammarParser.RULE_expr);
                    this.state = 60;
                    if (!( this.precpred(this._ctx, 10))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 10)");
                    }
                    this.state = 61;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(_la===VillanelleGrammarParser.MUL || _la===VillanelleGrammarParser.DIV)) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 62;
                    this.expr(11);
                    break;

                case 2:
                    localctx = new ExprContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, VillanelleGrammarParser.RULE_expr);
                    this.state = 63;
                    if (!( this.precpred(this._ctx, 9))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 9)");
                    }
                    this.state = 64;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(_la===VillanelleGrammarParser.ADD || _la===VillanelleGrammarParser.SUB)) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 65;
                    this.expr(10);
                    break;

                case 3:
                    localctx = new ExprContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, VillanelleGrammarParser.RULE_expr);
                    this.state = 66;
                    if (!( this.precpred(this._ctx, 8))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 8)");
                    }
                    this.state = 67;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << VillanelleGrammarParser.T__2) | (1 << VillanelleGrammarParser.T__3) | (1 << VillanelleGrammarParser.T__4) | (1 << VillanelleGrammarParser.T__5) | (1 << VillanelleGrammarParser.T__6) | (1 << VillanelleGrammarParser.T__7))) !== 0))) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 68;
                    this.expr(9);
                    break;

                case 4:
                    localctx = new ExprContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, VillanelleGrammarParser.RULE_expr);
                    this.state = 69;
                    if (!( this.precpred(this._ctx, 7))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
                    }
                    this.state = 70;
                    localctx.op = this.match(VillanelleGrammarParser.T__8);
                    this.state = 71;
                    this.expr(8);
                    break;

                case 5:
                    localctx = new ExprContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, VillanelleGrammarParser.RULE_expr);
                    this.state = 72;
                    if (!( this.precpred(this._ctx, 6))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
                    }
                    this.state = 73;
                    localctx.op = this.match(VillanelleGrammarParser.T__9);
                    this.state = 74;
                    this.expr(7);
                    break;

                } 
            }
            this.state = 79;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,5,this._ctx);
        }

    } catch( error) {
        if(error instanceof antlr4.error.RecognitionException) {
	        localctx.exception = error;
	        this._errHandler.reportError(this, error);
	        this._errHandler.recover(this, error);
	    } else {
	    	throw error;
	    }
    } finally {
        this.unrollRecursionContexts(_parentctx)
    }
    return localctx;
};

function ParenthesisexprContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = VillanelleGrammarParser.RULE_parenthesisexpr;
    return this;
}

ParenthesisexprContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ParenthesisexprContext.prototype.constructor = ParenthesisexprContext;

ParenthesisexprContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

ParenthesisexprContext.prototype.enterRule = function(listener) {
    if(listener instanceof VillanelleGrammarListener ) {
        listener.enterParenthesisexpr(this);
	}
};

ParenthesisexprContext.prototype.exitRule = function(listener) {
    if(listener instanceof VillanelleGrammarListener ) {
        listener.exitParenthesisexpr(this);
	}
};

ParenthesisexprContext.prototype.accept = function(visitor) {
    if ( visitor instanceof VillanelleGrammarVisitor ) {
        return visitor.visitParenthesisexpr(this);
    } else {
        return visitor.visitChildren(this);
    }
};




VillanelleGrammarParser.ParenthesisexprContext = ParenthesisexprContext;

VillanelleGrammarParser.prototype.parenthesisexpr = function() {

    var localctx = new ParenthesisexprContext(this, this._ctx, this.state);
    this.enterRule(localctx, 16, VillanelleGrammarParser.RULE_parenthesisexpr);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 80;
        this.match(VillanelleGrammarParser.T__11);
        this.state = 81;
        this.expr(0);
        this.state = 82;
        this.match(VillanelleGrammarParser.T__12);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


VillanelleGrammarParser.prototype.sempred = function(localctx, ruleIndex, predIndex) {
	switch(ruleIndex) {
	case 7:
			return this.expr_sempred(localctx, predIndex);
    default:
        throw "No predicate with index:" + ruleIndex;
   }
};

VillanelleGrammarParser.prototype.expr_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 0:
			return this.precpred(this._ctx, 10);
		case 1:
			return this.precpred(this._ctx, 9);
		case 2:
			return this.precpred(this._ctx, 8);
		case 3:
			return this.precpred(this._ctx, 7);
		case 4:
			return this.precpred(this._ctx, 6);
		default:
			throw "No predicate with index:" + predIndex;
	}
};


exports.VillanelleGrammarParser = VillanelleGrammarParser;
