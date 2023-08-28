import type { Token } from "./lexer/token";
import { tokenize } from "./lexer/index";
import { Success, Fail } from "./common/result";

function withPrefix(prefix: string) {
    return (suffix) => `${prefix}-${suffix}`;
}

function getTokenTypeClass(tag: string): string {
    const prefixed = withPrefix('token')
    switch (tag) {
        case '(': 
        case ')': 
            return prefixed('parenthesis')
        case ':': 
            return prefixed('access')
        default: 
            return prefixed(tag.toLowerCase());
    }
}

function renderToken(token: Token) {
    const tokenType = getTokenTypeClass(token.tag);
    return `<span class="${tokenType}">${token.value}</span>`;
}

export function renderHighlightHtml(input: string): string {
    const tokens = tokenize(input)
    if (tokens instanceof Success) {
        return tokens.value.map(renderToken).join('')
    } else {
        // Return un altered input.
        return input; 
    }
}