import { Result, Success, success } from '../common/result';
import { Stream, StreamFromString } from '../common/stream';
import { LainInvalidToken, LainCommentToken, LainNameToken, LainWhiteSpaceToken} from './language/language'
import { LainStringToken, LainNumberToken} from './language/primitives'
import { Symbols} from './language/symbols'
import { Keywords } from './language/keywords'

function tap(f) {
    return (s) => {
        console.log("next: "+ String.fromCharCode(s.peek()));
        const res = f(s)
        console.log("result: "+ JSON.stringify(res));
        return res;
    }
} 
export function tokenize(input: string): Result<string, any[]> {
    const stream = new StreamFromString(input);
    const precedence = [
        (s: Stream) => LainWhiteSpaceToken.tokenize(s),
        ...Object.values(Symbols).map((tokenizer) => (s: Stream) => tokenizer.tokenize(s)),
        ...Object.values(Keywords).map((tokenizer) => (s: Stream) => tokenizer.tokenize(s)),
        (s: Stream) => LainCommentToken.tokenize(s),
        (s: Stream) => LainNameToken.tokenize(s),
        (s: Stream) => LainStringToken.tokenize(s),
        (s: Stream) => LainNumberToken.tokenize(s),
        (s: Stream) => LainInvalidToken.tokenize(s),
    ] 

    const tokens: any[] = [];
    while (stream.hasNext()) {
        for (let i = 0; i < precedence.length && stream.hasNext(); i++) {
            const result = precedence[i](stream);
            if (result instanceof Success) {
                tokens.push(result.value);
                break;
            }
        }
    }

    return success(tokens);
}