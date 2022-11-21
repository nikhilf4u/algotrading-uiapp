import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from 'apollo-angular';


export const QUERY_TO_GET_OPTION_CHAIN_DATA_FOR_STRIKE_PRICE: DocumentNode = gql`query($strikePrice:Int){
  getOptionChainDataForStrikePrice(strikePrice:$strikePrice)
  {
    callPriceList
    callOpenInterestList
    callTimeList
    putPriceList
    putOpenInterestList
    putTimeList
    overallChangeInOIList
  }
}`

export const QUERY_TO_GET_Change_IN_OI: DocumentNode=gql`query($index:String){
  getChangeInOIForIndex(index:$index)
  {
    oiChangeList
    timeList
  }
}`

export const QUERY_TO_GET__DATA_FOR_STRIKE_PRICE_SELECTION: DocumentNode=gql`query($indexType:String,$actionType:String,$optionType:String){
  getDataForStrikePriceSelection(indexType:$indexType,actionType:$actionType,optionType:$optionType)
  {
    strikePrice
    delta
    theta
    gamma
    vega
    volume
  }
}`