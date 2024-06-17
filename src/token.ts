type TokenType = string;

export class Token {
  constructor(protected type: TokenType, protected literal: string | number) {
    if (typeof literal === "number") {
      this.literal = String.fromCharCode(literal);
    }
  }
}

export const token: Record<string, string> = {
  ILLEGAL: "ILLEGAL",
  EOF: "EOF",
  IDENT: "IDENT",
  INT: "INT",
  ASSIGN: "=",
  PLUS: "+",
  MINUS: "-",
  BANG: "!",
  ASTERISK: "*",
  SLASH: "/",
  COMMA: ",",
  SEMICOLON: ";",
  LT: "<",
  GT: ">",
  LPAREN: "(",
  RPAREN: ")",
  LBRACE: "{",
  RBRACE: "}",
  FUNCTION: "FUNCTION",
  LET: "LET",
  TRUE: "TRUE",
  FALSE: "FALSE",
  IF: "IF",
  ELSE: "ELSE",
  RETURN: "RETURN",
  EQ: "==",
  NOT_EQ: "!=",
} as const;

export const keywords: Record<string, keyof typeof token> = {
  fn: token.FUNCTION,
  let: token.LET,
  true: token.TRUE,
  false: token.FALSE,
  if: token.IF,
  else: token.ELSE,
  return: token.RETURN,
} as const;

type Ident = keyof typeof keywords;

export const lookupIdent = (ident: Ident) => {
  return keywords[ident];
};
