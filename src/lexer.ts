import { Token, lookupIdent, token } from "./token";

export class Lexer {
  private input: string;
  private position: number;
  private readPosition: number;
  private ch: number;

  constructor(input: string) {
    this.input = input;
    this.position = 0;
    this.readPosition = 0;
    this.ch = 0;

    this.readChar();
  }

  isDone() {
    return this.position > this.input.length;
  }

  nextToken() {
    let tok: Token;

    this.skipWhitespace();

    switch (this.ch) {
      case "=".charCodeAt(0):
        if (this.peekChar() == "=".charCodeAt(0)) {
          const ch = this.ch;

          this.readChar();

          const literal =
            String.fromCharCode(ch) + String.fromCharCode(this.ch);
          tok = new Token(token.EQ, literal);
        } else {
          tok = new Token(token.ASSIGN, this.ch);
        }
        break;
      case "!".charCodeAt(0):
        if (this.peekChar() == "=".charCodeAt(0)) {
          const ch = this.ch;
          this.readChar();
          const literal =
            String.fromCharCode(ch) + String.fromCharCode(this.ch);
          tok = new Token(token.NOT_EQ, literal);
        } else {
          tok = new Token(token.BANG, this.ch);
        }
        break;
      case "+".charCodeAt(0):
        tok = new Token(token.PLUS, this.ch);
        break;
      case "-".charCodeAt(0):
        tok = new Token(token.MINUS, this.ch);
        break;
      case "/".charCodeAt(0):
        tok = new Token(token.SLASH, this.ch);
        break;
      case "*".charCodeAt(0):
        tok = new Token(token.ASTERISK, this.ch);
        break;
      case "<".charCodeAt(0):
        tok = new Token(token.LT, this.ch);
        break;
      case ">".charCodeAt(0):
        tok = new Token(token.GT, this.ch);
        break;
      case "(".charCodeAt(0):
        tok = new Token(token.LPAREN, this.ch);
        break;
      case ")".charCodeAt(0):
        tok = new Token(token.RPAREN, this.ch);
        break;
      case ";".charCodeAt(0):
        tok = new Token(token.SEMICOLON, this.ch);
        break;
      case ",".charCodeAt(0):
        tok = new Token(token.COMMA, this.ch);
        break;
      case "{".charCodeAt(0):
        tok = new Token(token.LBRACE, this.ch);
        break;
      case "}".charCodeAt(0):
        tok = new Token(token.RBRACE, this.ch);
        break;
      case 0:
        tok = new Token(token.EOF, "");
        break;
      default:
        if (this.isLetter(this.ch)) {
          const literal = this.readIdentifier();
          tok = new Token(lookupIdent(literal), literal);
        } else if (this.isDigit(this.ch)) {
          tok = new Token(token.INT, this.readNumber());
        } else {
          tok = new Token(token.ILLEGAL, this.ch);
        }
    }

    this.readChar();
    return tok;
  }

  private peekChar() {
    if (this.readPosition >= this.input.length) {
      return 0;
    } else {
      return this.input[this.readPosition].charCodeAt(0);
    }
  }

  private readNumber() {
    const position = this.position;
    while (this.isDigit(this.ch)) {
      this.readChar();
    }

    return this.input.slice(position, this.position);
  }

  private isDigit(ch: number) {
    return "0".charCodeAt(0) <= ch && ch <= "9".charCodeAt(0);
  }

  private skipWhitespace() {
    while (
      this.ch === " ".charCodeAt(0) ||
      this.ch === "\t".charCodeAt(0) ||
      this.ch === "\n".charCodeAt(0) ||
      this.ch === "\r".charCodeAt(0)
    ) {
      this.readChar();
    }
  }

  private readIdentifier() {
    const position = this.position;
    while (this.isLetter(this.ch)) {
      this.readChar();
    }

    return this.input.slice(position, this.position);
  }

  private isLetter(ch: number) {
    return (
      ("a".charCodeAt(0) <= ch && ch <= "z".charCodeAt(0)) ||
      ("A".charCodeAt(0) <= ch && ch <= "Z".charCodeAt(0)) ||
      ch === "_".charCodeAt(0)
    );
  }

  private readChar() {
    if (this.readPosition >= this.input.length) {
      this.ch = 0;
    } else {
      this.ch = this.input[this.readPosition].charCodeAt(0);
    }

    this.position = this.readPosition;
    this.readPosition += 1;
  }
}
