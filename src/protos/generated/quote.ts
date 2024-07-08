import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { QuoteServiceClient as _QuoteServiceClient, QuoteServiceDefinition as _QuoteServiceDefinition } from './QuoteService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  GetQuoteRequest: MessageTypeDefinition
  GetQuoteResponse: MessageTypeDefinition
  QuoteService: SubtypeConstructor<typeof grpc.Client, _QuoteServiceClient> & { service: _QuoteServiceDefinition }
}

