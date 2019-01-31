// Generated from c:\Projects\Webstorm\villanelle_standalone\src\parsing\antlr\VillanelleGrammar.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');


var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0002\u0018\u009d\b\u0001\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004",
    "\u0004\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t",
    "\u0007\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004",
    "\f\t\f\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010",
    "\t\u0010\u0004\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013",
    "\u0004\u0014\t\u0014\u0004\u0015\t\u0015\u0004\u0016\t\u0016\u0004\u0017",
    "\t\u0017\u0004\u0018\t\u0018\u0004\u0019\t\u0019\u0004\u001a\t\u001a",
    "\u0004\u001b\t\u001b\u0004\u001c\t\u001c\u0004\u001d\t\u001d\u0004\u001e",
    "\t\u001e\u0004\u001f\t\u001f\u0003\u0002\u0003\u0002\u0003\u0003\u0003",
    "\u0003\u0003\u0004\u0003\u0004\u0003\u0005\u0003\u0005\u0003\u0006\u0003",
    "\u0006\u0003\u0006\u0003\u0007\u0003\u0007\u0003\u0007\u0003\b\u0003",
    "\b\u0003\b\u0003\t\u0003\t\u0003\t\u0003\n\u0003\n\u0003\n\u0003\n\u0003",
    "\u000b\u0003\u000b\u0003\u000b\u0003\f\u0003\f\u0003\f\u0003\f\u0003",
    "\r\u0003\r\u0003\u000e\u0003\u000e\u0003\u000f\u0003\u000f\u0003\u0010",
    "\u0003\u0010\u0003\u0011\u0003\u0011\u0003\u0012\u0003\u0012\u0003\u0013",
    "\u0003\u0013\u0003\u0014\u0003\u0014\u0003\u0015\u0003\u0015\u0003\u0016",
    "\u0003\u0016\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017",
    "\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017",
    "\u0005\u0017~\n\u0017\u0003\u0018\u0006\u0018\u0081\n\u0018\r\u0018",
    "\u000e\u0018\u0082\u0003\u0019\u0006\u0019\u0086\n\u0019\r\u0019\u000e",
    "\u0019\u0087\u0003\u001a\u0005\u001a\u008b\n\u001a\u0003\u001a\u0003",
    "\u001a\u0003\u001b\u0006\u001b\u0090\n\u001b\r\u001b\u000e\u001b\u0091",
    "\u0003\u001b\u0003\u001b\u0003\u001c\u0003\u001c\u0003\u001d\u0003\u001d",
    "\u0003\u001e\u0003\u001e\u0003\u001f\u0003\u001f\u0002\u0002 \u0003",
    "\u0003\u0005\u0004\u0007\u0005\t\u0006\u000b\u0007\r\b\u000f\t\u0011",
    "\n\u0013\u000b\u0015\f\u0017\r\u0019\u000e\u001b\u000f\u001d\u0002\u001f",
    "\u0002!\u0002#\u0002%\u0002\'\u0002)\u0002+\u0002-\u0010/\u00111\u0012",
    "3\u00135\u00147\u00159\u0016;\u0017=\u0018\u0003\u0002\r\u0004\u0002",
    "VVvv\u0004\u0002HHhh\u0004\u0002TTtt\u0004\u0002WWww\u0004\u0002GGg",
    "g\u0004\u0002CCcc\u0004\u0002NNnn\u0004\u0002UUuu\u0004\u0002C\\c|\u0003",
    "\u00022;\u0004\u0002\u000b\u000b\"\"\u0002\u0099\u0002\u0003\u0003\u0002",
    "\u0002\u0002\u0002\u0005\u0003\u0002\u0002\u0002\u0002\u0007\u0003\u0002",
    "\u0002\u0002\u0002\t\u0003\u0002\u0002\u0002\u0002\u000b\u0003\u0002",
    "\u0002\u0002\u0002\r\u0003\u0002\u0002\u0002\u0002\u000f\u0003\u0002",
    "\u0002\u0002\u0002\u0011\u0003\u0002\u0002\u0002\u0002\u0013\u0003\u0002",
    "\u0002\u0002\u0002\u0015\u0003\u0002\u0002\u0002\u0002\u0017\u0003\u0002",
    "\u0002\u0002\u0002\u0019\u0003\u0002\u0002\u0002\u0002\u001b\u0003\u0002",
    "\u0002\u0002\u0002-\u0003\u0002\u0002\u0002\u0002/\u0003\u0002\u0002",
    "\u0002\u00021\u0003\u0002\u0002\u0002\u00023\u0003\u0002\u0002\u0002",
    "\u00025\u0003\u0002\u0002\u0002\u00027\u0003\u0002\u0002\u0002\u0002",
    "9\u0003\u0002\u0002\u0002\u0002;\u0003\u0002\u0002\u0002\u0002=\u0003",
    "\u0002\u0002\u0002\u0003?\u0003\u0002\u0002\u0002\u0005A\u0003\u0002",
    "\u0002\u0002\u0007C\u0003\u0002\u0002\u0002\tE\u0003\u0002\u0002\u0002",
    "\u000bG\u0003\u0002\u0002\u0002\rJ\u0003\u0002\u0002\u0002\u000fM\u0003",
    "\u0002\u0002\u0002\u0011P\u0003\u0002\u0002\u0002\u0013S\u0003\u0002",
    "\u0002\u0002\u0015W\u0003\u0002\u0002\u0002\u0017Z\u0003\u0002\u0002",
    "\u0002\u0019^\u0003\u0002\u0002\u0002\u001b`\u0003\u0002\u0002\u0002",
    "\u001db\u0003\u0002\u0002\u0002\u001fd\u0003\u0002\u0002\u0002!f\u0003",
    "\u0002\u0002\u0002#h\u0003\u0002\u0002\u0002%j\u0003\u0002\u0002\u0002",
    "\'l\u0003\u0002\u0002\u0002)n\u0003\u0002\u0002\u0002+p\u0003\u0002",
    "\u0002\u0002-}\u0003\u0002\u0002\u0002/\u0080\u0003\u0002\u0002\u0002",
    "1\u0085\u0003\u0002\u0002\u00023\u008a\u0003\u0002\u0002\u00025\u008f",
    "\u0003\u0002\u0002\u00027\u0095\u0003\u0002\u0002\u00029\u0097\u0003",
    "\u0002\u0002\u0002;\u0099\u0003\u0002\u0002\u0002=\u009b\u0003\u0002",
    "\u0002\u0002?@\u0007?\u0002\u0002@\u0004\u0003\u0002\u0002\u0002AB\u0007",
    ")\u0002\u0002B\u0006\u0003\u0002\u0002\u0002CD\u0007>\u0002\u0002D\b",
    "\u0003\u0002\u0002\u0002EF\u0007@\u0002\u0002F\n\u0003\u0002\u0002\u0002",
    "GH\u0007?\u0002\u0002HI\u0007?\u0002\u0002I\f\u0003\u0002\u0002\u0002",
    "JK\u0007@\u0002\u0002KL\u0007?\u0002\u0002L\u000e\u0003\u0002\u0002",
    "\u0002MN\u0007>\u0002\u0002NO\u0007?\u0002\u0002O\u0010\u0003\u0002",
    "\u0002\u0002PQ\u0007#\u0002\u0002QR\u0007?\u0002\u0002R\u0012\u0003",
    "\u0002\u0002\u0002ST\u0007c\u0002\u0002TU\u0007p\u0002\u0002UV\u0007",
    "f\u0002\u0002V\u0014\u0003\u0002\u0002\u0002WX\u0007q\u0002\u0002XY",
    "\u0007t\u0002\u0002Y\u0016\u0003\u0002\u0002\u0002Z[\u0007p\u0002\u0002",
    "[\\\u0007q\u0002\u0002\\]\u0007v\u0002\u0002]\u0018\u0003\u0002\u0002",
    "\u0002^_\u0007*\u0002\u0002_\u001a\u0003\u0002\u0002\u0002`a\u0007+",
    "\u0002\u0002a\u001c\u0003\u0002\u0002\u0002bc\t\u0002\u0002\u0002c\u001e",
    "\u0003\u0002\u0002\u0002de\t\u0003\u0002\u0002e \u0003\u0002\u0002\u0002",
    "fg\t\u0004\u0002\u0002g\"\u0003\u0002\u0002\u0002hi\t\u0005\u0002\u0002",
    "i$\u0003\u0002\u0002\u0002jk\t\u0006\u0002\u0002k&\u0003\u0002\u0002",
    "\u0002lm\t\u0007\u0002\u0002m(\u0003\u0002\u0002\u0002no\t\b\u0002\u0002",
    "o*\u0003\u0002\u0002\u0002pq\t\t\u0002\u0002q,\u0003\u0002\u0002\u0002",
    "rs\u0005\u001d\u000f\u0002st\u0005!\u0011\u0002tu\u0005#\u0012\u0002",
    "uv\u0005%\u0013\u0002v~\u0003\u0002\u0002\u0002wx\u0005\u001f\u0010",
    "\u0002xy\u0005\'\u0014\u0002yz\u0005)\u0015\u0002z{\u0005+\u0016\u0002",
    "{|\u0005%\u0013\u0002|~\u0003\u0002\u0002\u0002}r\u0003\u0002\u0002",
    "\u0002}w\u0003\u0002\u0002\u0002~.\u0003\u0002\u0002\u0002\u007f\u0081",
    "\t\n\u0002\u0002\u0080\u007f\u0003\u0002\u0002\u0002\u0081\u0082\u0003",
    "\u0002\u0002\u0002\u0082\u0080\u0003\u0002\u0002\u0002\u0082\u0083\u0003",
    "\u0002\u0002\u0002\u00830\u0003\u0002\u0002\u0002\u0084\u0086\t\u000b",
    "\u0002\u0002\u0085\u0084\u0003\u0002\u0002\u0002\u0086\u0087\u0003\u0002",
    "\u0002\u0002\u0087\u0085\u0003\u0002\u0002\u0002\u0087\u0088\u0003\u0002",
    "\u0002\u0002\u00882\u0003\u0002\u0002\u0002\u0089\u008b\u0007\u000f",
    "\u0002\u0002\u008a\u0089\u0003\u0002\u0002\u0002\u008a\u008b\u0003\u0002",
    "\u0002\u0002\u008b\u008c\u0003\u0002\u0002\u0002\u008c\u008d\u0007\f",
    "\u0002\u0002\u008d4\u0003\u0002\u0002\u0002\u008e\u0090\t\f\u0002\u0002",
    "\u008f\u008e\u0003\u0002\u0002\u0002\u0090\u0091\u0003\u0002\u0002\u0002",
    "\u0091\u008f\u0003\u0002\u0002\u0002\u0091\u0092\u0003\u0002\u0002\u0002",
    "\u0092\u0093\u0003\u0002\u0002\u0002\u0093\u0094\b\u001b\u0002\u0002",
    "\u00946\u0003\u0002\u0002\u0002\u0095\u0096\u0007,\u0002\u0002\u0096",
    "8\u0003\u0002\u0002\u0002\u0097\u0098\u00071\u0002\u0002\u0098:\u0003",
    "\u0002\u0002\u0002\u0099\u009a\u0007-\u0002\u0002\u009a<\u0003\u0002",
    "\u0002\u0002\u009b\u009c\u0007/\u0002\u0002\u009c>\u0003\u0002\u0002",
    "\u0002\b\u0002}\u0082\u0087\u008a\u0091\u0003\b\u0002\u0002"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

function VillanelleGrammarLexer(input) {
	antlr4.Lexer.call(this, input);
    this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.PredictionContextCache());
    return this;
}

VillanelleGrammarLexer.prototype = Object.create(antlr4.Lexer.prototype);
VillanelleGrammarLexer.prototype.constructor = VillanelleGrammarLexer;

Object.defineProperty(VillanelleGrammarLexer.prototype, "atn", {
        get : function() {
                return atn;
        }
});

VillanelleGrammarLexer.EOF = antlr4.Token.EOF;
VillanelleGrammarLexer.T__0 = 1;
VillanelleGrammarLexer.T__1 = 2;
VillanelleGrammarLexer.T__2 = 3;
VillanelleGrammarLexer.T__3 = 4;
VillanelleGrammarLexer.T__4 = 5;
VillanelleGrammarLexer.T__5 = 6;
VillanelleGrammarLexer.T__6 = 7;
VillanelleGrammarLexer.T__7 = 8;
VillanelleGrammarLexer.T__8 = 9;
VillanelleGrammarLexer.T__9 = 10;
VillanelleGrammarLexer.T__10 = 11;
VillanelleGrammarLexer.T__11 = 12;
VillanelleGrammarLexer.T__12 = 13;
VillanelleGrammarLexer.BOOL = 14;
VillanelleGrammarLexer.ID = 15;
VillanelleGrammarLexer.INT = 16;
VillanelleGrammarLexer.NEWLINE = 17;
VillanelleGrammarLexer.WS = 18;
VillanelleGrammarLexer.MUL = 19;
VillanelleGrammarLexer.DIV = 20;
VillanelleGrammarLexer.ADD = 21;
VillanelleGrammarLexer.SUB = 22;

VillanelleGrammarLexer.prototype.channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];

VillanelleGrammarLexer.prototype.modeNames = [ "DEFAULT_MODE" ];

VillanelleGrammarLexer.prototype.literalNames = [ null, "'='", "'''", "'<'", 
                                                  "'>'", "'=='", "'>='", 
                                                  "'<='", "'!='", "'and'", 
                                                  "'or'", "'not'", "'('", 
                                                  "')'", null, null, null, 
                                                  null, null, "'*'", "'/'", 
                                                  "'+'", "'-'" ];

VillanelleGrammarLexer.prototype.symbolicNames = [ null, null, null, null, 
                                                   null, null, null, null, 
                                                   null, null, null, null, 
                                                   null, null, "BOOL", "ID", 
                                                   "INT", "NEWLINE", "WS", 
                                                   "MUL", "DIV", "ADD", 
                                                   "SUB" ];

VillanelleGrammarLexer.prototype.ruleNames = [ "T__0", "T__1", "T__2", "T__3", 
                                               "T__4", "T__5", "T__6", "T__7", 
                                               "T__8", "T__9", "T__10", 
                                               "T__11", "T__12", "T", "F", 
                                               "R", "U", "E", "A", "L", 
                                               "S", "BOOL", "ID", "INT", 
                                               "NEWLINE", "WS", "MUL", "DIV", 
                                               "ADD", "SUB" ];

VillanelleGrammarLexer.prototype.grammarFileName = "VillanelleGrammar.g4";



exports.VillanelleGrammarLexer = VillanelleGrammarLexer;

