import { Result, fail, success } from "../../common/result";
import { Stream } from "../../common/stream";
import { isAlpha, isChar, isDigit, isNewline, isWhitespace, isKnownSymbol } from "../../common/char";
import { Keywords } from "./keywords";
import { Symbols } from "./symbols";
import { Token } from "../token";

type Reason = string;

export class LainInvalidToken implements Token {
    tag: string = "InvalidToken";
    value: string;
    reason: string;
    
    constructor(value: string, reason: string) {
        this.value = value;
        this.reason = reason;
    }

    static tokenize(stream: Stream): Result<Reason, LainInvalidToken> {
        const buffer: number[] = [];
        while(stream.hasNext()) {
            const next = stream.next();
            if (!isWhitespace(next) && !isKnownSymbol(next)) {                
                buffer.push(next);
            } else {
                stream.pushBack(next);
                break;
            }
        }
        
        if (buffer.length == 0) {
            return fail('No invalid token found.');
        }
        return success(new LainInvalidToken(buffer.map(x => String.fromCharCode(x)).join(""), "Unknown word. Check format."))
    }
}

export class LainWhiteSpaceToken implements Token {
    tag: string =  "Whitespace";
    value: string;
    isEmpty: boolean;

    constructor(initialValue: string) {
        this.value = initialValue;
        this.isEmpty = initialValue.length == 0;
    }

    static tokenize(stream: Stream): Result<Reason, LainNameToken> {
        const buffer: number[] = [];
        while(stream.hasNext()) {
            const next = stream.next();
            if (isWhitespace(next)) {
                buffer.push(next);
            } else {
                stream.pushBack(next);
                break;
            }
        }

        if (buffer.length == 0) {
            return fail('No whitespace');
        }
        
        return success(new LainWhiteSpaceToken(buffer.map(x => String.fromCharCode(x)).join('')));
    }
}

/**
 * LainName
 * 
 * A variable, function name, or other non-keyword reference.
 */
export class LainNameToken implements Token {
    tag: string = "Name";
    value: string;

    constructor(initialValue: string) {
        this.value = initialValue;
    }

    static tokenize(stream: Stream): Result<Reason, LainNameToken> {
        const buffer: number[] = [];
        const isValidInitialChar = (char: number): boolean => {
            return isAlpha(char) || isChar(char, '_');
        }
        const isValidChar = (char: number): boolean => {
            return isAlpha(char) || isDigit(char) || isChar(char, '_') || isChar(char, '-');
        }

        let index = 0;
        while(stream.hasNext()) {
            const next = stream.next();
            if (index == 0 && !isValidInitialChar(next)) {
                stream.pushBack(next);
                return fail("Not a name.");
            } else if (index == 0 && isValidInitialChar(next)) {
                buffer.push(next);
            } else if (isValidChar(next)) {
                buffer.push(next);
            } else {
                // No longer a part of the name
                stream.pushBack(next);
                break;
            }
            index++;
        }
        if (buffer.length == 0) {
            return fail("Not a name.");
        }
        return success(new LainNameToken(buffer.map(x => String.fromCharCode(x)).join('')));
    }
}

/**
 * LainComment
 * 
 * A comment within Lain
 */
export class LainCommentToken implements Token {
    tag: string = "Comment";
    value: string;
    
    constructor(initialValue: string) {
        this.value = initialValue;
    }

    static tokenize(stream: Stream): Result<Reason, LainNameToken> {
        const buffer: number[] = [];
        let openComment = false;
        let index = 0;
        while(stream.hasNext()) {
            const next = stream.next();
            if (index == 0 && !isChar(next, ';')) {
                stream.pushBack(next);
                return fail('Not a comment.')
            } else if (index == 0 && isChar(next, ';')) {
                openComment = true;
                buffer.push(next);
            } else if (openComment && isNewline(next)) {
                stream.pushBack(next);
                return success(new LainCommentToken(buffer.map(x => String.fromCharCode(x)).join("")))
            } else if (openComment && !isNewline(next)) {
                buffer.push(next);
            }
            index++;
        }

        if (openComment) {
            return success(new LainCommentToken(buffer.map(x => String.fromCharCode(x)).join("")))
        } else {
            return fail("Not a comment.");
        }
    }
}