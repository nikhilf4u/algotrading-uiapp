export class OptionChainInputDto {
    price:number | undefined;
    openInterest:number | undefined;
    time:string | undefined;
    strikePrice:string | undefined;
    index:string | undefined;
    impliedVolatility:number | undefined;
    daysLeftToExpire:number | undefined;
    underlyingValue:number | undefined;
    totalTradedVolume:number | undefined;
}

export class StrikePriceAndVolume {
    strikePrice:string | any;
    volume:string | any;
}