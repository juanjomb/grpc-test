import {Quote} from "./Quote";

export interface QuoteRepositoryInterface {
    getQuote(category: string|null): Promise<Quote>;
}