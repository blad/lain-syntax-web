interface Range {
    start: number,
    end: number
}

export type Char = number;

const Ranges = {
    Digit: range('0', '9'),
    AlphaLower: range('a', 'z'),
    AlphaUpper: range('A', 'Z'),
} as const;

export const SymbolPairs = {
    Parenthesis: range('(', ')'),
    DoubleQuote: range('"', '"'),
    SingleQuote: range("'", "'"),
} as const;

export const UnarySumbols = {
    Colon: charCode(':'),
    SemiColon: charCode(';'),
    Negative: charCode('-'),
    Positive: charCode('+'),
    Space: charCode(' '),
    Tab: charCode("\t"),
    Newline: charCode("\n"),
    Period: charCode('.')
} as const;

function range(startChar: string, endChar: string): Range {
    return {
        start: charCode(startChar),
        end: charCode(endChar)
    }
}

function charCode(input: string): Char {
    return input.charCodeAt(0);
}

function isInRange(charCode: number, range: Range): boolean {
    return charCode >= range.start && charCode <= range.end;
}

export function isQuote(char: number): boolean {
    return char == SymbolPairs.DoubleQuote.start || char == SymbolPairs.SingleQuote.start;
}

export function isNewline(char: Char): boolean {
    return char == UnarySumbols.Newline;
}

export function isKnownSymbol(char: Char): boolean {
    return char == UnarySumbols.Colon 
        || char == UnarySumbols.SemiColon 
        || char == SymbolPairs.Parenthesis.start
        || char == SymbolPairs.Parenthesis.end
        || char == SymbolPairs.DoubleQuote.start
        || char == SymbolPairs.DoubleQuote.end
        || char == SymbolPairs.SingleQuote.start
        || char == SymbolPairs.SingleQuote.end
}

export function isWhitespace(char: Char): boolean {
    return char == UnarySumbols.Space || char == UnarySumbols.Tab || char == UnarySumbols.Newline;
}

export function isChar(input: Char, other: string): boolean {
    return input == charCode(other);
}

export function toChar(input: string): Char {
    return charCode(input);
}

export function isDigit(char: Char): boolean {
    return isInRange(char, Ranges.Digit);
}

export function isAlpha(char: Char): boolean {
    return isInRange(char, Ranges.AlphaLower) || isInRange(char, Ranges.AlphaUpper);
}
