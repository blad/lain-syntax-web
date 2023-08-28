import { Result, fail, success } from "../../common/result";
import { Stream } from "../../common/stream";
import { isWhitespace, toChar } from "../../common/char";

export class LainKeywordToken {
  target: string;
  minSize: number;
  targetChars: number[];

  constructor(expected: string) {
    this.target = expected;
    this.minSize = expected.length;
    this.targetChars = expected.split('').map(toChar);
  }

  tokenize(stream: Stream): Result<string, LainKeywordToken> {
    const buffer: number[] = [];
    let index = 0;
    while (stream.hasNext() && buffer.length < this.minSize) {
      const next = stream.next();
      const target = this.targetChars[index++];
      if (target == next) {
        buffer.push(next);
      } else {
        buffer.push(next);
        stream.pushBackAll(buffer);
        return fail('Not a match for ' + this.target);
      }
      if (buffer.length == this.minSize && stream.hasNext() && !isWhitespace(stream.peek())) {
        // We matched the keyword, but not the end of the word in the stream.
        stream.pushBackAll(buffer);
        return fail('Not a match for ' + this.target);
      }
    }
    return success(this);
  }
}

export const Keywords = {
  If: new LainKeywordToken("if"),
  Lambda: new LainKeywordToken("λ"),
  Def: new LainKeywordToken("def"),
  Defn: new LainKeywordToken("defn"),
  Let: new LainKeywordToken("let"),
  Null: new LainKeywordToken("null"),
  True: new LainKeywordToken("true"),
  False: new LainKeywordToken("false")
}