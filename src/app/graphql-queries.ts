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

export const QUERY_TO_GET_CONTRACT_DATA_FOR_INDEX_AND_STRIKE_PRICE: DocumentNode = gql`query($indexType:String,$strikePrice:Int,$displayDataForSelectedStrikePrice:Boolean){
  getContractDataForIndexAndStrikePrice(indexType:$indexType,strikePrice:$strikePrice,displayDataForSelectedStrikePrice:$displayDataForSelectedStrikePrice)
  {
    callLastPriceList
    callMarketPriceValueList
    callTimeList
    putLastPriceList
    putMarketPriceValueList
    putTimeList
    callATP1List
    putATP1List
    callAtp1ValueList
    putAtp1ValueList
    callATP3List
    putATP3List
    callAtp3ValueList
    putAtp3ValueList
    selectedStrikePrice
  }
}`


export const QUERY_TO_GET_Change_IN_OI: DocumentNode=gql`query($index:String){
  getChangeInOIForIndex(index:$index)
  {
    oiChangeList
    timeList
  }
}`

export const QUERY_TO_GET_STRIKE_PRICE_LIST: DocumentNode=gql`query($indexType:String){
  getContractDataStrikePriceList(indexType:$indexType)
}`

export const QUERY_TO_GET_CONTRACT_SUMMARY: DocumentNode=gql`query {
  getContractSummary {
    callAtpSumList
    timeList
    putAtpSumList
  }
}`

export const QUERY_TO_GET_ATP_DATA: DocumentNode=gql`query {
  getAtpData {
    strikePrice
    optionType
    lastPrice
    atp3
    atp1
    time
  }
}`