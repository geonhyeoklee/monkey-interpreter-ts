import { describe, expect, it } from "vitest";
import { Lexer } from "./lexer";
import { token } from "./token";

describe("lexer", () => {
  const input = `
    let five = 5;
		let ten = 10;
		let add = fn(x, y) {
			x + y;
		};

		let result = add(five, ten);
		!-/*5;
		5 < 10 > 5;

		if (5 < 10) {
			return true;
		} else {
			return false; 
		}

		10 == 10;
		10 != 9;
	`;

  const lexer = new Lexer(input);

  it("let token", () => {
    const letToken = lexer.nextToken();
    expect(letToken.getType()).toBe(token.LET);
    expect(letToken.getLiteral()).toBe("let");
  });

  it("ident token", () => {
    const identToken = lexer.nextToken();
    expect(identToken.getType()).toBe(token.IDENT);
    expect(identToken.getLiteral()).toBe("five");
  });

  it("assign token", () => {
    const assignToken = lexer.nextToken();
    expect(assignToken.getType()).toBe(token.ASSIGN);
    expect(assignToken.getLiteral()).toBe("=");
  });

  it("eof token", () => {
    const tokens = [];

    while (!lexer.isDone()) {
      tokens.push(lexer.nextToken());
    }

    const eofToken = tokens[tokens.length - 1];

    expect(eofToken.getType()).toBe(token.EOF);
    expect(eofToken.getLiteral()).toBe("");
  });
});
