import { LainKeywordToken, Keywords } from "./keywords";
import { fail, success } from "../../common/result";
import { StreamFromString } from "../../common/stream";

test('Test Successfully Parsing from exact match', () => {
    Object
        .keys(Keywords)
        .map((key) => Keywords[key])
        .forEach(next => {
            const stream = new StreamFromString(next.value)
            const result = next.tokenize(stream)
            const expected = success(next)
            expect(result).toEqual(expected);
        });
});

test('Test Failed Parsing: keyword with a partial match at start of string', () => {
    Object
        .keys(Keywords)
        .map((key) => Keywords[key])
        .forEach(next => {
            const stream = new StreamFromString(next.value + 'suffix')
            const result = next.tokenize(stream)
            const expected = fail('Not a match for ' + next.value)
            expect(result).toEqual(expected);
        });
});

test('Test Failed Parsing: keyword with a partial match within a string', () => {
    Object
        .keys(Keywords)
        .map((key) => Keywords[key])
        .forEach(next => {
            const stream = new StreamFromString('prefix' + next.value + 'suffix')
            const result = next.tokenize(stream)
            const expected = fail('Not a match for ' + next.value)
            expect(result).toEqual(expected);
        });
});