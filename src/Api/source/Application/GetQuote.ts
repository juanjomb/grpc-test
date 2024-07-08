import {QuoteRepositoryInterface} from "../Domain/QuoteRepositoryInterface";
import {Quote} from "../Domain/Quote";

export class GetQuote {
    private quoteRepository: QuoteRepositoryInterface;

    constructor(quoteRepository: QuoteRepositoryInterface) {
        this.quoteRepository = quoteRepository;
    }

    public async execute(category: string|null): Promise<Quote> {
        return this.quoteRepository.getQuote(category);
    }
}