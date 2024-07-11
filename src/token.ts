export enum TokenType {
    Illegal,
    Eof,
    Ident,
    Int,
    Assign,
    Plus,
    Minus,
    Bang,
    Asterisk,
    Slash,
    Comma,
    Semicolon,
    Lt,
    Gt,
    LParen,
    RParen,
    LBrace,
    RBrace,
    Function,
    Let,
    True,
    False,
    If,
    Else,
    Return,
    Eq,
    NotEq,
}

const KEYWORDS = new Map<string, TokenType>();

{
  KEYWORDS.set('fn', TokenType.Function);
  KEYWORDS.set("let", TokenType.Let);
  KEYWORDS.set("true", TokenType.True);
  KEYWORDS.set("false", TokenType.False);
  KEYWORDS.set("if", TokenType.If);
  KEYWORDS.set("else", TokenType.Else);
  KEYWORDS.set("return", TokenType.Return);
}

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

export const lookupIdent = (ident: string) => {
  if (KEYWORDS.has(ident)) {
    return KEYWORDS.get(ident) as TokenType;
  } else {
    return TokenType.Ident;
  }
};
