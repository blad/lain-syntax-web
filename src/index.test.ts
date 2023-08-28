import { renderHighlightHtml } from '.';

test('Test Lain Parsing to HTML String', () => {
    const source = '(defn name (a b c) "a" 1234.0 +123 -123 1.2 1.2.3.4)';
    const result = renderHighlightHtml(source);
    const expected = "<span class=\"token-parenthesis\">(</span><span class=\"token-defn\">defn</span><span class=\"token-whitespace\"> </span><span class=\"token-name\">name</span><span class=\"token-whitespace\"> </span><span class=\"token-parenthesis\">(</span><span class=\"token-name\">a</span><span class=\"token-whitespace\"> </span><span class=\"token-name\">b</span><span class=\"token-whitespace\"> </span><span class=\"token-name\">c</span><span class=\"token-parenthesis\">)</span><span class=\"token-whitespace\"> </span><span class=\"token-string\">\"a\"</span><span class=\"token-whitespace\"> </span><span class=\"token-number\">1234.0</span><span class=\"token-whitespace\"> </span><span class=\"token-number\">+123</span><span class=\"token-whitespace\"> </span><span class=\"token-number\">-123</span><span class=\"token-whitespace\"> </span><span class=\"token-number\">1.2</span><span class=\"token-whitespace\"> </span><span class=\"token-invalidtoken\">1.2.3.4</span><span class=\"token-parenthesis\">)</span>";
    expect(result).toEqual(expected);
});