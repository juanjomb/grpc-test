export class Quote {
    private _quote: string;
    private _author: string;

    constructor(quote: string, author: string) {
        this._quote = quote;
        this._author = author;
    }

    get quote(): string {
        return this._quote;
    }

    get author(): string {
        return this._author;
    }
}