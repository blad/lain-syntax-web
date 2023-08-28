import { fail, success } from "../../common/Result";
import { StreamFromString } from "../../common/Stream";
import { LainCommentToken, LainNameToken, LainWhiteSpaceToken } from "./language";
import { LainNumberToken, LainStringToken } from "./primitives";
import { Symbols } from "./symbols";

test('Test Successfully Parsing of string', () => {
    [
        { input: ";test", expected: ";test" },
        { input: ";test comment", expected: ";test comment" },
        { input: ";test comment\nHello World", expected: ";test comment" },
    ].forEach(example => {
        const stream = new StreamFromString(example.input)
        const result = LainCommentToken.tokenize(stream)
        const expected = success(new LainCommentToken(example.expected))
        expect(result).toEqual(expected);
    });
});

test('Test Failed Parsing: For non-comments strings.', () => {
    [
        "1234",
        "variables",
        ":hello",
        "world"
    ].forEach(example => {
        const stream = new StreamFromString(example)
        const result = LainCommentToken.tokenize(stream)
        const expected = fail("Not a comment.")
        expect(result).toEqual(expected);
    });
});

test('Test Successfully Parsing of Name Token', () => {
    [
        { input: "test", expected: "test" },
        { input: "Test", expected: "Test" },
        { input: "_test", expected: "_test" },
        { input: "test123", expected: "test123" },
        { input: "test123-abc", expected: "test123-abc" },
        { input: "test123_abc", expected: "test123_abc" },
    ].forEach(example => {
        const stream = new StreamFromString(example.input)
        const result = LainNameToken.tokenize(stream)
        const expected = success(new LainNameToken(example.expected))
        expect(result).toEqual(expected);
    });
});


test('Test Failed Parsing: For non-names.', () => {
    [
        "1234",
        "-variables",
        ":hello",
        "'test'"
    ].forEach(example => {
        const stream = new StreamFromString(example)
        const result = LainNameToken.tokenize(stream)
        const expected = fail("Not a name.")
        expect(result).toEqual(expected);
    });
});

test('Test Successfully Parsing of Whitespace Token', () => {
    [
        { input: " ", expected: " " },
        { input: "    ", expected: "    " },
        { input: "\n", expected: "\n" },
        { input: " \n", expected: " \n" },
        { input: "\t", expected: "\t" },
        { input: "\t\n", expected: "\t\n" },
    ].forEach(example => {
        const stream = new StreamFromString(example.input)
        const result = LainWhiteSpaceToken.tokenize(stream)
        const expected = success(new LainWhiteSpaceToken(example.expected))
        expect(result).toEqual(expected);
    });
});
