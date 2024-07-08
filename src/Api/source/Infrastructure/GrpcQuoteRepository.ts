import {Quote} from "../Domain/Quote";
import {QuoteRepositoryInterface} from "../Domain/QuoteRepositoryInterface";
import {QuoteClient} from "./QuoteClient";

export class GrpcQuoteRepository implements QuoteRepositoryInterface {

    private readonly client: QuoteClient;

    constructor() {
        this.client = new QuoteClient();
    }

    async getQuote(category: string | null): Promise<Quote> {
        return this.client.getQuote();
    }
}