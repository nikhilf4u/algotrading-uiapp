import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
//import { Hub } from 'aws-amplify';

import { ApolloQueryResult } from '@apollo/client/core';


import { not } from '@angular/compiler/src/output/output_ast';
import { HttpClient } from '@angular/common/http';
import {  OptionChainInputDto } from '../models/OptionChain';
import { MUTATION_TO_SAVE_OI_DATA } from '../graphql-mutations';
import { QUERY_TO_GET_CONTRACT_DATA_FOR_INDEX_AND_STRIKE_PRICE, QUERY_TO_GET_CONTRACT_SUMMARY, QUERY_TO_GET_Change_IN_OI, QUERY_TO_GET_OPTION_CHAIN_DATA_FOR_STRIKE_PRICE, QUERY_TO_GET_STRIKE_PRICE_LIST } from '../graphql-queries';

@Injectable({
  providedIn: 'root'
})

export class GraphqlService {

  constructor(private apollo: Apollo,private http:HttpClient) { }
  getNiftyOptionChainData()
  {
    let url="https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY"
    return this.http.get<any>(url);
  }
  getNiftyBankOptionChainData()
  {
    let url="https://www.nseindia.com/api/option-chain-indices?symbol=BANKNIFTY"
    return this.http.get<any>(url);
  }
  // getTop20Contracts() {
  //   let url = "https://www.nseindia.com//api/liveEquity-derivatives?index=nse50_opt";
  //   return this.http.get<any>(url);
  // }  
  saveOIData(optionChainData: OptionChainInputDto[]): Observable<any> {
    return this.apollo.mutate(
      {
        mutation: MUTATION_TO_SAVE_OI_DATA,
        variables: {
          input: optionChainData,
        }
      });
  }

  getOptionChainDataForStrikePrice(strikePrice:number): Observable<ApolloQueryResult<any>>{
    return this.apollo
      .watchQuery<any>({
        query: QUERY_TO_GET_OPTION_CHAIN_DATA_FOR_STRIKE_PRICE,
        variables:{
          strikePrice:strikePrice
        },
        fetchPolicy: 'network-only',
      }).valueChanges;
  }

  getContractDataForIndexAndStrikePrice(strikePrice:string,index:string,displayDataForSelectedStrikePrice:boolean): Observable<ApolloQueryResult<any>>{
    return this.apollo
      .watchQuery<any>({
        query: QUERY_TO_GET_CONTRACT_DATA_FOR_INDEX_AND_STRIKE_PRICE,
        variables:{
          indexType:index,
          strikePrice:strikePrice,
          displayDataForSelectedStrikePrice:displayDataForSelectedStrikePrice
        },
        fetchPolicy: 'network-only',
      }).valueChanges;
  }

  getStrikePriceList(indexType:string) : Observable<ApolloQueryResult<any>> {
    return this.apollo.watchQuery<any>({
      query :QUERY_TO_GET_STRIKE_PRICE_LIST,
      variables: {
        indexType:indexType
      } ,
      fetchPolicy:'network-only'
    }).valueChanges;
  }

  getContractSummary():Observable<ApolloQueryResult<any>> {
    return this.apollo.watchQuery<any>({
      query :QUERY_TO_GET_CONTRACT_SUMMARY,
      fetchPolicy:'network-only',
      variables:{}
    }).valueChanges;
  }
  // getChangeInOIForIndex(index:string):Observable<ApolloQueryResult<any>>{
  //   return this.apollo
  //     .watchQuery<any>({
  //       query: QUERY_TO_GET_Change_IN_OI,
  //       variables:{
  //         index:index
  //       },
  //       fetchPolicy: 'network-only',
  //     }).valueChanges;
  // }
  // getDataForStrikePriceSelection(indexType:string,actionType:string,optionType:string):Observable<ApolloQueryResult<any>>{
  //   return this.apollo
  //     .watchQuery<any>({
  //       query: QUERY_TO_GET__DATA_FOR_STRIKE_PRICE_SELECTION,
  //       variables:{
  //         indexType:indexType,
  //         actionType:actionType,
  //         optionType:optionType
  //       },
  //       fetchPolicy: 'network-only',
  //     }).valueChanges;
  // }
}