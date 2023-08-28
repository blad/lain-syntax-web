import { fail, success } from "../../common/result";
import { StreamFromString } from "../../common/stream";
import { Symbols } from "./symbols";

test('Test Successfully Parsing from exact match', () => {
    Object
        .keys(Symbols)
        .map((key) => Symbols[key])
        .forEach(next => {
            const stream = new StreamFromString(next.target)
            const result = next.tokenize(stream)
            const expected = fail(next)
            expect(result).toEqual(expected);
        });
});

test('Test Successfully Parsing: keyword with a partial match at start of string', () => {
    Object
        .keys(Symbols)
        .map((key) => Symbols[key])
        .forEach(next => {
            const stream = new StreamFromString(next.target + 'suffix')
            const result = next.tokenize(stream)
            const expected = success(next)
            expect(result).toEqual(expected);
        });
});

test('Test Failed Parsing: keyword with a partial match within a string', () => {
    Object
        .keys(Symbols)
        .map((key) => Symbols[key])
        .forEach(next => {
            const stream = new StreamFromString('prefix' + next.target + 'suffix')
            const result = next.tokenize(stream)
            const expected = fail('Not a match for ' + next.target)
            expect(result).toEqual(expected);
        });
});