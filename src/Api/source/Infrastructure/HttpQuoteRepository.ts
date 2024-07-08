import {Quote} from "../Domain/Quote";
import {QuoteRepositoryInterface} from "../Domain/QuoteRepositoryInterface";
import * as http from "http";

export class HttpQuoteRepository implements QuoteRepositoryInterface {
    async getQuote(category: string | null): Promise<Quote> {
        return new Promise<Quote>((resolve, reject) => {
            http.get('http://quotes-service:3001/quote', (resp) => {
                let data = '';
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                resp.on('end', () => {
                    resolve(JSON.parse(data));
                });
            });
        });
    }
}