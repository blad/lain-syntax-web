import { StreamFromString } from "./stream";

test('Stream state is consistent', () => {
    const stream = new StreamFromString("abcdef");
    expect(stream.hasNext()).toEqual(true);
    expect(stream.next()).toEqual('a'.charCodeAt(0)); 
    expect(stream.next()).toEqual('b'.charCodeAt(0)); 
    expect(stream.next()).toEqual('c'.charCodeAt(0)); 
    expect(stream.next()).toEqual('d'.charCodeAt(0)); 
    expect(stream.next()).toEqual('e'.charCodeAt(0)); 
    expect(stream.next()).toEqual('f'.charCodeAt(0));
    expect(stream.hasNext()).toEqual(false);

    stream.pushBackAll('abcdef'.split('').map(x => x.charCodeAt(0)))
    expect(stream.hasNext()).toEqual(true);
    expect(stream.next()).toEqual('a'.charCodeAt(0)); 
    stream.pushBack('a'.charCodeAt(0));
    expect(stream.next()).toEqual('a'.charCodeAt(0)); 
    expect(stream.next()).toEqual('b'.charCodeAt(0)); 
    expect(stream.next()).toEqual('c'.charCodeAt(0)); 
    expect(stream.next()).toEqual('d'.charCodeAt(0)); 
    expect(stream.next()).toEqual('e'.charCodeAt(0)); 
    expect(stream.next()).toEqual('f'.charCodeAt(0));
    expect(stream.hasNext()).toEqual(false);
});