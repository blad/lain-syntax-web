import { Result, fail, success } from "../../common/result";
import { Stream } from "../../common/stream";
import { isWhitespace, toChar } from "../../common/char";

export class LainSymbolToken {
  target: string;
  minSize: number;
  targetChars: number[];

  constructor(expected: string) {
    this.target = expected;
    this.minSize = expected.length;
    this.targetChars = expected.split('').map(toChar);
  }

  tokenize(stream: Stream): Result<string, LainSymbolToken> {
    const buffer: number[] = [];
    for (let i = 0; i < this.minSize; i++) {
      if (!stream.hasNext()) {
          stream.pushBackAll(buffer);
          return fail('Not a match for ' + this.target);
      }

      const next = stream.next();
      buffer.push(next);

      if (next !== this.targetChars[i]) {
          stream.pushBackAll(buffer);
          return fail('Not a match for ' + this.target);
      }
    }
    
    return success(this);
  }
}

export const Symbols = {
  AT: new LainSymbolToken(":"),
  PAREN_OPEN: new LainSymbolToken("("),
  PAREN_CLOSE: new LainSymbolToken(")"),
  COMMENT: new LainSymbolToken(";")
}
