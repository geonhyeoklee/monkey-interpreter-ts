import { Token, TokenType, lookupIdent } from "./token";

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
          tok = new Token(TokenType.Eq, literal);
        } else {
          tok = new Token(TokenType.Assign, this.ch);
        }
        break;
      case "!".charCodeAt(0):
        if (this.peekChar() == "=".charCodeAt(0)) {
          const ch = this.ch;
          this.readChar();
          const literal =
            String.fromCharCode(ch) + String.fromCharCode(this.ch);
          tok = new Token(TokenType.NotEq, literal);
        } else {
          tok = new Token(TokenType.Bang, this.ch);
        }
        break;
      case "+".charCodeAt(0):
        tok = new Token(TokenType.Plus, this.ch);
        break;
      case "-".charCodeAt(0):
        tok = new Token(TokenType.Minus, this.ch);
        break;
      case "/".charCodeAt(0):
        tok = new Token(TokenType.Slash, this.ch);
        break;
      case "*".charCodeAt(0):
        tok = new Token(TokenType.Asterisk, this.ch);
        break;
      case "<".charCodeAt(0):
        tok = new Token(TokenType.Lt, this.ch);
        break;
      case ">".charCodeAt(0):
        tok = new Token(TokenType.Gt, this.ch);
        break;
      case "(".charCodeAt(0):
        tok = new Token(TokenType.LParen, this.ch);
        break;
      case ")".charCodeAt(0):
        tok = new Token(TokenType.RParen, this.ch);
        break;
      case ";".charCodeAt(0):
        tok = new Token(TokenType.Semicolon, this.ch);
        break;
      case ",".charCodeAt(0):
        tok = new Token(TokenType.Comma, this.ch);
        break;
      case "{".charCodeAt(0):
        tok = new Token(TokenType.LBrace, this.ch);
        break;
      case "}".charCodeAt(0):
        tok = new Token(TokenType.RBrace, this.ch);
        break;
      case 0:
        tok = new Token(TokenType.Eof, "");
        break;
      default:
        if (this.isLetter(this.ch)) {
          const literal = this.readIdentifier();
          tok = new Token(lookupIdent(literal), literal);
        } else if (this.isDigit(this.ch)) {
          tok = new Token(TokenType.Int, this.readNumber());
        } else {
          tok = new Token(TokenType.Illegal, this.ch);
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
