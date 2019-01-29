grammar VillanelleGrammar;

//FRAGMENTS
fragment T : ('T'|'t') ;
fragment F : ('F'|'f');
fragment R : ('R'|'r');
fragment U : ('U'|'u');
fragment E : ('E'|'e');
fragment A : ('A'|'a');
fragment L : ('L'|'l');
fragment S : ('S'|'s');

//TOKENS
BOOL : (T R U E | F A L S E);
ID : [a-zA-Z]+ ; // match identifiers
INT : [0-9]+ ; // match integers
NEWLINE:'\r'? '\n' ; // return newlines to parser (end-statement signal)
WS : [ \t]+ -> skip ; // toss out whitespace

MUL : '*' ;
DIV : '/' ;
ADD : '+' ;
SUB : '-' ;

// AND        : (A N D) ;
// OR         : (O R) ;
// NOT        : N O T;
// GT         : '>' ;
// GE         : '>=' ;
// LT         : '<' ;
// LE         : '<=' ;
// EQ         : '==' ;

//RULES
prog: stat+ ;

stat: expr NEWLINE
| assign
| NEWLINE
;

assign: left=ID '=' right=expr NEWLINE;

bool: BOOL;

integer: INT;

string: ('\'') .*? ('\'');

id: ID;

expr: parenthesisexpr
| expr op=('*'|'/') expr
| expr op=('+'|'-') expr
| expr op=('<'|'>'|'=='|'>='|'<='|'!=') expr
| expr op='and' expr
| expr op='or' expr
| op='not' expr
| integer                          
| bool
| string                       
| id         
;

// condexpr: condparenthesisexpr
// | NOT condexpr
// ;

parenthesisexpr: '(' expr ')';

// condparenthesisexpr: '(' condexpr ')';