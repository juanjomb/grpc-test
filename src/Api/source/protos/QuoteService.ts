// Original file: src/protos/quote.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { GetQuoteRequest as _GetQuoteRequest, GetQuoteRequest__Output as _GetQuoteRequest__Output } from './GetQuoteRequest';
import type { GetQuoteResponse as _GetQuoteResponse, GetQuoteResponse__Output as _GetQuoteResponse__Output } from './GetQuoteResponse';

export interface QuoteServiceClient extends grpc.Client {
  retrieve(argument: _GetQuoteRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_GetQuoteResponse__Output>): grpc.ClientUnaryCall;
  retrieve(argument: _GetQuoteRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_GetQuoteResponse__Output>): grpc.ClientUnaryCall;
  retrieve(argument: _GetQuoteRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_GetQuoteResponse__Output>): grpc.ClientUnaryCall;
  retrieve(argument: _GetQuoteRequest, callback: grpc.requestCallback<_GetQuoteResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface QuoteServiceHandlers extends grpc.UntypedServiceImplementation {
  retrieve: grpc.handleUnaryCall<_GetQuoteRequest__Output, _GetQuoteResponse>;
  
}

export interface QuoteServiceDefinition extends grpc.ServiceDefinition {
  retrieve: MethodDefinition<_GetQuoteRequest, _GetQuoteResponse, _GetQuoteRequest__Output, _GetQuoteResponse__Output>
}
