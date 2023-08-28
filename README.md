# Lain Syntax for Web

This library provides a lexer and parser that aids in generating an AST (Abstract Syntax Tree) 
representation that can then be used to create a syntax highlighting or other
code-analysis tools.


## Grammar

```
<sign>               ::= + | - 
<digit>              ::= 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 
<digits>             ::= <digit> <digits> | <digit>
<integer>            ::= [<sign>] <digits> 
<float>              ::= <integer> . <digits> 
<number>             ::= <integer> | <float>

<any-char>           ::= /* any-character */

<upper-char>         ::= A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V | W | X | Y | Z
<lower-char>         ::= a | b | c | d | e | f | g | h | i | j | k | l | m | n | o | p | q | r | s | t | u | v | w | x | y | z 
<space>              ::= _
<string>             ::= <lower-char> <string> | <upper-char> <string> | <space> <string> | ε

<name-rest>          ::= <name> | <digit> <name> | - <name-rest> | _ <name-rest> | ε
<name>               ::= <upper-char> <name-rest> | <lower-char> <name-rest>

# Lang Features:
<quoted-string>      ::= " <any-char> "

<if-body>            ::= if <expression> <expression> [<expression>]

<binding-expression> ::= ( <name> <expression> ) [binding-expression]
<let-name-bindings>  ::= ( binding-expression )
<let-body>           ::= let <let-name-bindings> <expression>

<params-list>        ::= <name> [<name>]
<params>             ::= ( [<param-list>] )

<lambda-body>        ::= lambda <params-list> <expression> 

<def-body>           ::= def <name> <expression>

<defn-body>          ::= defn <name> <params-list> <expression>

<single-item>        ::= <name> 
                       | <quoted-string> 
                       | <number>

<arg-list>           ::= <single-item> [<arg-list>]
                       | <name> [<arg-list>]
                       | <expression> [<arg-list>]

<function-invoke>    ::= <name> [<args-list>]

<list-body>          ::= <if-body> 
                       | <let-body> 
                       | <lambda-body> 
                       | <defn-body> 
                       | <def-body> 
                       | <function-invoke>
                       | <single-item> 
                       | <single-item> <list-body>

<reference>          ::= <name> 
                       | <name> : <name> 
                       | <name> : <integer>

<expression-body>    ::= <list-body> 
                       | <expression>

<expression>         ::= ( <expression-body> ) [<expression>] 
                       | <reference>

```


