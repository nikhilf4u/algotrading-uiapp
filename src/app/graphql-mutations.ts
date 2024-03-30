import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from 'apollo-angular';

export const MUTATION_TO_SAVE_OI_DATA: DocumentNode = gql`mutation($input: [OptionChainInputDto]) {
  saveOptionChainData(optionChainInputDtos: $input)
}`;


export const MUTATION_TO_SAVE_CONTRACT_DATA: DocumentNode = gql`mutation($input: [ContractInputDto]) {
  saveContracts(contractInputDtos: $input)
}`;
