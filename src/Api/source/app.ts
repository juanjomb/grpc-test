import {GetQuote} from "./Application/GetQuote";
import {GrpcQuoteRepository} from "./Infrastructure/GrpcQuoteRepository";
import {QuoteRepositoryInterface} from "./Domain/QuoteRepositoryInterface";
import {HttpQuoteRepository} from "./Infrastructure/HttpQuoteRepository";
import {randomUUID} from "node:crypto";

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (_req: any, res: any) => {
    let tag = _req.query.source + randomUUID().toString();
    console.time(tag)
    let repository : QuoteRepositoryInterface;

    if(_req.query.source === 'http') {
        repository = new HttpQuoteRepository();
    } else {
        repository = new GrpcQuoteRepository();
    }

    let useCase = new GetQuote(repository);
    let quote = await useCase.execute('inspire');
    console.timeEnd(tag)
    res.send(
        {
            quote: quote.quote,
            author: quote.author
        }
    );

});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});