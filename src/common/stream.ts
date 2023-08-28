import { Char, toChar } from "./char"

export interface Stream {
    /**
     * hasNext
     * 
     * Returns true if there are more words to consome.
     */
    hasNext(): boolean

    /**
     * pushBack
     * 
     * @param char character to push back to the stream.
     */
    pushBack(char: Char): void

    pushBackAll(char: Char[]): void

    /**
     * peek
     * 
     * Retrieve the next input word, but do not consume it.
     */
    peek(): Char

    /**
     * next
     * 
     * Retrieve and consume the next input word.
     */
    next(): Char

    /**
     * advance
     * 
     * Consume the next input word, and advance to the position.
     */
    advance(): void

    /**
     * rest
     * 
     * Retrieve all of the remaining words up to the next line break.
     */
    rest(): string
}

export class StreamFromString implements Stream {
    pointer: number;
    source: number[];

    constructor(source: string) {
        this.pointer = 0;
        this.source = source.split('').map(toChar);
    }

    hasNext(): boolean {
        return this.pointer < this.source.length;
    }

    pushBack(char: number): void {
        this.pointer -= 1;
        this.source[this.pointer] = char;
    }

    pushBackAll(chars: number[]): void {
        [...chars].reverse().forEach(x => {
            this.pushBack(x);
        })
    }

    peek(): number {
        return this.source[this.pointer];
    }

    next(): number {
        const next = this.peek()
        this.advance();
        return next;
    }

    advance(): void {
        this.pointer++;
    }

    rest(): string {
        throw new Error("Method not implemented.")
    }
}