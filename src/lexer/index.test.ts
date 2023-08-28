import {StreamFromString} from '../common/stream';
import { tokenize } from '.';
import { success } from '../common/result';
import { LainSymbolToken } from './language/symbols';
import { LainKeywordToken } from './language/keywords';
import { LainInvalidToken, LainNameToken, LainWhiteSpaceToken } from './language/language';
import { LainNumberToken, LainStringToken } from './language/primitives';

test('Test Lain Parsing', () => {
    const source = '(defn name (a b c) "a" 1234.0 +123 -123 1.2 1.2.3.4)';
    const result = tokenize(source);
    const expected = success([
        new LainSymbolToken('('),
        new LainKeywordToken('defn'),
        new LainWhiteSpaceToken(' '),
        new LainNameToken('name'),
        new LainWhiteSpaceToken(' '),
        new LainSymbolToken('('),
        new LainNameToken('a'),
        new LainWhiteSpaceToken(' '),
        new LainNameToken('b'),
        new LainWhiteSpaceToken(' '),
        new LainNameToken('c'),
        new LainSymbolToken(')'),
        new LainWhiteSpaceToken(' '),
        new LainStringToken('"a"'),
        new LainWhiteSpaceToken(' '),
        new LainNumberToken('1234.0'),
        new LainWhiteSpaceToken(' '),
        new LainNumberToken('+123'),
        new LainWhiteSpaceToken(' '),
        new LainNumberToken('-123'),
        new LainWhiteSpaceToken(' '),
        new LainNumberToken('1.2'),
        new LainWhiteSpaceToken(' '),
        new LainInvalidToken('1.2.3.4', 'Unknown word. Check format.'),
        new LainSymbolToken(')'),
    ]);
    expect(result).toEqual(expected);
});