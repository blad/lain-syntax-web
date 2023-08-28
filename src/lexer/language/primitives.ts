import { Result, fail, success } from "../../common/result";
import { Stream } from "../../common/stream";
import { SymbolPairs, isChar, isDigit, isQuote, toChar } from "../../common/char";
import { Keywords } from "./keywords";
import { Symbols } from "./symbols";
import { Token } from "../token";

/**
 * LainNumberToken
 * 
 * A number value.
 */
export class LainNumberToken implements Token {
    tag: string = 'Number';
    value: string;
    
    constructor(parsedValue: string) {
        this.value = parsedValue;
    }

    static tokenize(stream: Stream): Result<string, LainStringToken> {
        const buffer: number[] = [];
        let index = 0;
        let alreadySeenDecimal = false;
        const isValidStartChar = (x: number): boolean => {
            return isDigit(x) || isChar(x, '-') || isChar(x, '+') || isChar(x, '.');
        }
        const isValidRestChar = (x: number): boolean => {
            const isDecimal = isChar(x, '.');
            if (alreadySeenDecimal && isDecimal) {
                return false;
            }
            return isDigit(x) || isDecimal;
        }
        let invalidNumber = false;
        while (stream.hasNext()) {
            const next = stream.next();

            if (index == 0 && !isValidStartChar(next)) {
                stream.pushBack(next);
                return fail("Not a number.");
            }

            if (index == 0 && isValidStartChar(next)) {
                buffer.push(next);
            } else if (index > 0 && isValidRestChar(next)) {
                buffer.push(next);
            } else if (!isValidRestChar(next) && isValidStartChar(next)) {
                buffer.push(next);
                invalidNumber = true;
            } else if (!invalidNumber && !isValidRestChar(next) && !isValidStartChar(next)) {
                stream.pushBack(next);
                break;
            } else if (invalidNumber && !isValidRestChar(next) && !isValidStartChar(next)) {
                buffer.push(next);
                break;
            }
            
            alreadySeenDecimal = alreadySeenDecimal || isChar(next, '.');
            index++;
        }
        const finalString = buffer.map(x => String.fromCharCode(x)).join('');

        if (invalidNumber) {
            stream.pushBackAll(buffer);
            return fail("Not a valid number.");
        }

        return success(new LainNumberToken(finalString));
    }
}

/**
 * LainStringToken
 * 
 * A quoted string.
 */
export class LainStringToken implements Token {
    tag: string = 'String';
    value: string;
    
    constructor(parsedValue: string) {
        this.value = parsedValue;
    }

    static tokenize(stream: Stream): Result<string, LainStringToken> {
        const buffer: number[] = [];
        let index = 0;
        let open = false;

        while (stream.hasNext()) {
            const next = stream.next();

            if (index == 0 && !isQuote(next)) {
                stream.pushBack(next);
                return fail('Not a string.');
            }

            if (!open && isQuote(next)) {
                // Start of the string.
                open = true;
                buffer.push(next);
            } else if (open && isQuote(next)) {
                // end of string has been reached.
                open = false;
                buffer.push(next);
                break;
            } else if (open) {
                buffer.push(next);
            }
            index++;
        }

        if (buffer.length == 0) {
            return fail("Not a string.");
        }
        
        const finalString = buffer.map(x => String.fromCharCode(x)).join('');
        return success(new LainStringToken(finalString));
    }
}