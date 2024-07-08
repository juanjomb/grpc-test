import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import {QuoteServiceHandlers} from "./protos/QuoteService";
import {GetQuoteRequest} from "./protos/GetQuoteRequest";
import {GetQuoteResponse} from "./protos/GetQuoteResponse";
import {ProtoGrpcType} from './protos/quote';
import * as https from "https";
import {IncomingMessage} from "node:http";
const express = require('express');
const app = express();

const host: string = '0.0.0.0:5000';

const quoteServer: QuoteServiceHandlers = {
    retrieve(
        call: grpc.ServerUnaryCall<GetQuoteRequest, GetQuoteResponse>,
        callback: grpc.sendUnaryData<GetQuoteResponse>
    ) {
        callback(null, {
            quote: 'Grpc rocks!',
            author: 'Nobody'
        }
        );
        return;
        https.get(`https://api.gameofthronesquotes.xyz/v1/random`, (res: IncomingMessage) => {
            let data = '';
            res.on('data', (chunk: string) => {
                data += chunk;
            });
            res.on('end', () => {
                const quote = JSON.parse(data);
                let response: GetQuoteResponse = {
                    quote: quote.sentence,
                    author: quote.character.name,
                };
                callback(null, response);
            });
        });
    }
};

function getServer(): grpc.Server {
    const packageDefinition = protoLoader.loadSync('./quote.proto', {
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    });
    const proto = grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType;
    const server = new grpc.Server();
    server.addService(proto.QuoteService.service, quoteServer);
    return server;
}

if (require.main === module) {
    const server:grpc.Server = getServer();
    server.bindAsync(host, grpc.ServerCredentials.createInsecure(), (err: Error | null, port: number) => {
        if (err) {
            console.error(`Server error: ${err.message}`);
        } else {
            console.log(`Server bound on port: ${port}`);
            server.start();
        }
    });
}

app.get('/quote', async (_req: any, _res: any) => {
    _res.send({
        quote: 'Http rules!',
        author: 'Boomer'
    });
    return;
    https.get(`https://api.gameofthronesquotes.xyz/v1/random`, (res: IncomingMessage) => {
        let data = '';
        res.on('data', (chunk: string) => {
            data += chunk;
        });
        res.on('end', () => {
            const quote = JSON.parse(data);
            let response: GetQuoteResponse = {
                quote: quote.sentence,
                author: quote.character.name,
            };
            _res.send({
                quote: response.quote,
                author: response.author
            });
        });
    });
});

app.listen(3001, () => {
    console.log(`Server running on port 3001`);
});