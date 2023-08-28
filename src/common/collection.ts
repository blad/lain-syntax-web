type Pair = [any, any]

function zip(xs: any[], ys: any[]): Pair[] {
    const result: Pair[] = [];
    const minLength = Math.min(xs.length, ys.length);
    for (let i = 0; i < minLength; i++) {
        result.push([xs[i], ys[i]])
    }
    return result;
}