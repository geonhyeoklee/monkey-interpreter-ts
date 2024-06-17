type TokenType = string;

export class Token {
  constructor(protected type: TokenType, protected literal: string | number) {
    if (typeof literal === "number") {
      this.literal = String.fromCharCode(literal);
    }
  }

  getType() {
    return this.type;
  }

  getLiteral() {
    return this.literal;
  }
}

export const token = {
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

const keywords: Record<string, keyof typeof token> = {
  fn: token.FUNCTION,
  let: token.LET,
  true: token.TRUE,
  false: token.FALSE,
  if: token.IF,
  else: token.ELSE,
  return: token.RETURN,
} as const;

export const lookupIdent = (ident: string) => {
  if (ident in keywords) {
    return keywords[ident];
  } else {
    return token.IDENT;
  }
};
