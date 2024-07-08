import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from '../protos/quote';
import {QuoteServiceClient} from "../protos/QuoteService";
import {Quote} from "../Domain/Quote";
import {GetQuoteResponse} from "../protos/GetQuoteResponse";

export class QuoteClient {
    private client: QuoteServiceClient;

    constructor() {
        const host:string = 'quotes-service:5000';

        const packageDefinition = protoLoader.loadSync('./quote.proto', {
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
        });
        const proto :ProtoGrpcType = grpc.loadPackageDefinition(
            packageDefinition
        ) as unknown as ProtoGrpcType;

        this.client = new proto.QuoteService(
            host,
            grpc.credentials.createInsecure()
        );
    }

    async getQuote(category: string | null = null): Promise<Quote> {
        return new Promise<Quote>((resolve, reject) => {
            this.client.retrieve(
                {
                    category: category ?? '',
                },
                (error?: grpc.ServiceError | null, response?: GetQuoteResponse) => {
                    if (error) {
                        reject(error);
                    } else if (response) {
                        resolve(new Quote(response.quote ?? '', response.author  ?? ''));
                    }
                }
            );
        });
    }
}