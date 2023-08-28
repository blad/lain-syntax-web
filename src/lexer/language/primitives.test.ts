import { fail, success } from "../../common/Result";
import { StreamFromString } from "../../common/Stream";
import { LainNumberToken, LainStringToken } from "./primitives";
import { Symbols } from "./symbols";

test('Test Successfully Parsing of string', () => {
    [
        { input: "'test'", expected: "'test'" },
        { input: "'test''''''", expected: "'test'" },
        { input: '"test"', expected: '"test"' },
        { input: '"test""""""', expected: '"test"' },
    ].forEach(example => {
        const stream = new StreamFromString(example.input)
        const result = LainStringToken.tokenize(stream)
        const expected = success(new LainStringToken(example.expected))
        expect(result).toEqual(expected);
    });
});

test('Test Failed Parsing: Non quoted strings.', () => {
    [
        "1234",
        "variables",
        ":hello",
        "world"
    ].forEach(example => {
        const stream = new StreamFromString(example)
        const result = LainStringToken.tokenize(stream)
        const expected = fail("Not a string.")
        expect(result).toEqual(expected);
    });
});

test('Test Successfully Parsing Numbers', () => {
    [
        { input: "1", expected: "1" },
        { input: "12", expected: "12" },
        { input: "123", expected: "123" },
        { input: "1.0", expected: "1.0" },
        { input: ".1", expected: ".1" },
        { input: "-1", expected: "-1" },
        { input: "+1", expected: "+1" }
    ].forEach(example => {
        const stream = new StreamFromString(example.input)
        const result = LainNumberToken.tokenize(stream)
        const expected = success(new LainNumberToken(example.expected))
        expect(result).toEqual(expected);
    });
});

test('Test Failed Parsing: Invalid numbers.', () => {
    [
        "1.2.34",
        "..123",
        "0.-1",
        "--1"
    ].forEach(example => {
        const stream = new StreamFromString(example)
        const result = LainNumberToken.tokenize(stream)
        const expected = fail("Not a valid number.")
        expect(result).toEqual(expected);
    });
});