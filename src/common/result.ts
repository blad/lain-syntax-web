export type Result<E, T> = Fail<E, T> | Success<E, T>

abstract class BaseResult<E, T> {
    abstract map<U>(f: (x: T) => U): Result<E, U>
    abstract flatMap<U>(f: (x: T) => Result<E,U>): Result<E, U>
}

export class Success<E, T> extends BaseResult<E, T> {

    readonly value: T;

    constructor(value: T) {
        super();
        this.value = value;
    }

    map<U>(f: (value: T) => U): Result<E, U> {
        return new Success(f(this.value));
    }
    
    flatMap<U>(f: (value: T) => Result<E, U>): Result<E, U> {
        return f(this.value);
    }
}

export class Fail<E, T> extends BaseResult<E, T> {
    readonly value: E;

    constructor(value: E) {
        super();
        this.value = value;
    }

    map<U>(_: (value: T) => U): Result<E, U> {
        return this as any;
    }
    
    flatMap<U>(_: (value: T) => Result<E, U>): Result<E, U> {
        return this as any;
    }
}

export const fail = <L, R>(value: L): Result<L, R> => new Fail(value);
export const success = <L, R>(value: R): Result<L, R> => new Success(value);