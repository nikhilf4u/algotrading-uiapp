import { Component, OnInit } from '@angular/core';
import { ContractInputDto } from 'src/app/models/Contract';
import { GraphqlService } from 'src/app/services/graphql.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexGrid,
  ApexTitleSubtitle,
  ApexMarkers,
} from "ng-apexcharts";
import { animation } from '@angular/animations';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  
};

@Component({
  selector: 'app-top-contracts',
  templateUrl: './top-contracts.component.html',
  styleUrls: ['./top-contracts.component.css']
})
export class TopContractsComponent implements OnInit {
  selectedIndex:string = "NIFTY";
  callATPAndValueLineChart: Partial<ChartOptions> | any;
  putATPAndValueLineChart: Partial<ChartOptions> | any;
  callPriceAndOILineChart: Partial<ChartOptions> | any;
  putPriceAndOILineChart: Partial<ChartOptions> | any;
  callPriceAndATPLineChart: Partial<ChartOptions> | any;
  putPriceAndATPLineChart: Partial<ChartOptions> | any;
  overallSummaryChart: Partial<ChartOptions> | any;
  niftyExpiryDate:string="18";
  strikePriceList:number[] = [];
  selectedStrikePrice:number = 0;
  callStrike:number = 0;
  putStrike:number = 0;
  displayDataForSelectedStrikePrice:boolean = false;
  constructor(private service: GraphqlService) { }

  ngOnInit(): void {
this.getStrikePrices();
    setInterval(() =>{
      this.getTopContracts();
    },150000)
  }
  strikePriceChange() {
    this.getTopContracts();
  }


  updateCheckBoxChange(event:any) {
    this.displayDataForSelectedStrikePrice=event;
  }

  getTopContracts() {
    this.service.getContractDataForIndexAndStrikePrice(this.selectedStrikePrice,this.selectedIndex,this.displayDataForSelectedStrikePrice).subscribe((data) => {
      this.selectedStrikePrice = data?.data?.getContractDataForIndexAndStrikePrice?.selectedStrikePrice;
      this.callStrike = this.selectedStrikePrice-300;
      this.putStrike = this.selectedStrikePrice+200;
      this.callATPAndValueLineChart = {
                series: [
                  {
                    name: "ATP 1 Value",
                    type: "line",
                    data: data?.data?.getContractDataForIndexAndStrikePrice?.callAtp1ValueList,
                  },
                  {
                    name: "ATP 3 Value",
                    type: "line",
                    data: data?.data?.getContractDataForIndexAndStrikePrice?.callAtp3ValueList,
                  },
                  {
                    name: "Market Price Val",
                    type: "line",
                    data: data?.data?.getContractDataForIndexAndStrikePrice?.callMarketPriceValueList
                  }
                ],
                colors:["#495057","#0000FF","#20c997"],
                chart: {
                  height: 350,
                  animations :{
                    enabled: false,
                    animateGradually: {
                      enabled: false,
                    
                  },
                  dynamicAnimation: {
                      enabled: false,
                     
                  }
                  },
                  type: "line",
                },
                stroke: {
                  width: [3, 3, 3]
                },
                title: {
                  text: "CALL ATP VS Price Value"
                },
                xaxis: {
                  title: "Time",
                  categories:data?.data?.getContractDataForIndexAndStrikePrice?.callTimeList,
                },
                // yaxis: [
                //   {
                //     min:0,
                //     max:3000000000,
                //     tickAmount:5,
                //   },
                //   {
                //     min:0,
                //     max:3000000000,
                //     tickAmount:5,
                    
                //   },
                  
                //   {
                //     min:0,
                //     max:3000000000,
                //     tickAmount:5,
                //     opposite: true,                   
                //   }
                // ]
              };

              this.putATPAndValueLineChart = {
                series: [
                  {
                    name: "ATP 1 Val",
                    type: "line",
                    data: data?.data?.getContractDataForIndexAndStrikePrice?.putAtp1ValueList
                  },
                  {
                    name: "ATP 3 Val",
                    type: "line",
                    data: data?.data?.getContractDataForIndexAndStrikePrice?.putAtp3ValueList
                  },
                  {
                    name: "Price Val",
                    type: "line",
                    data: data?.data?.getContractDataForIndexAndStrikePrice?.putMarketPriceValueList
                  }
                ],
                colors:["#495057","#0000FF","#dc3545"],
                chart: {
                  height: 350, 
                  animations :{
                    enabled: false,
                    animateGradually: {
                      enabled: false,
                    
                  },
                  dynamicAnimation: {
                      enabled: false,
                     
                  }
                  },
                     
                  type: "line",
                },
                stroke: {
                  width: [3, 3, 3]
                },
                title: {
                  text: "PUT ATP VS Price Value"
                },
                xaxis: {
                  title: "Time",
                  categories:data?.data?.getContractDataForIndexAndStrikePrice?.putTimeList,
                },
                // yaxis: [
                //   {
                //     min:0,
                //     max:3000000000,
                //     tickAmount:5,
                //     // title: {
                //     //   text: "ATP"
                //     // }
                //   },
                //   {
                //     min:0,
                //     max:3000000000,
                //     tickAmount:5,
                //     // title: {
                //     //   text: "ATP"
                //     // }
                //   },
                //   {
                //     min:0,
                //     max:3000000000,
                //     tickAmount:5,
                //     opposite: true,
                //     // title: {
                //     //   text: "Value"
                //     // }
                //   }
                // ]
              };    


              this.callPriceAndOILineChart = {
                series: [
                  {
                    name: "Call ATP 3 Val",
                    type: "line",
                    data: data?.data?.getContractDataForIndexAndStrikePrice?.callAtp3ValueList
                  },
                  {
                    name: "Put ATP 3 Val",
                    type: "line",
                    data: data?.data?.getContractDataForIndexAndStrikePrice?.putAtp3ValueList
                  }
                ],
                colors:["#20c997","#dc3545"],
                chart: {
                  height: 350,
                  type: "line",
                  animations :{
                    enabled: false,
                    animateGradually: {
                      enabled: false,
                    
                  },
                  dynamicAnimation: {
                      enabled: false,
                     
                  }
                  },
                },
                stroke: {
                  width: [3, 3]
                },
                title: {
                  text: "CALL VS PUT ATP Value"
                },
                xaxis: {
                  title: "Time",
                  categories:data?.data?.getContractDataForIndexAndStrikePrice?.callTimeList,
                },
                // yaxis: [
                //   {
                //     min:0,
                //     max:3000000000,
                //     tickAmount:5,
                //     // title: {
                //     //   text: "Price"
                //     // }
                //   },
                 
                //   {
                //     min:0,
                //     max:3000000000,
                //     tickAmount:5,
                //     opposite: true,
                //     // title: {
                //     //   text: "OI"
                //     // }
                //   }
                // ]
              };    
              
              this.putPriceAndOILineChart = {
                series: [
                  {
                    name: "CALL Price Val",
                    type: "line",
                    data: data?.data?.getContractDataForIndexAndStrikePrice?.callMarketPriceValueList
                  },
                  {
                    name: "PUT Price Val",
                    type: "line",
                    data: data?.data?.getContractDataForIndexAndStrikePrice?.putMarketPriceValueList
                  }
                ],
                colors:["#20c997","#dc3545"],
                chart: {
                  height: 350,
                  type: "line",
                  animations :{
                    enabled: false,
                    animateGradually: {
                      enabled: false,
                    
                  },
                  dynamicAnimation: {
                      enabled: false,
                     
                  }
                  },
                },
                stroke: {
                  width: [3, 3]
                },
                title: {
                  text: "CALL VS PUT Price Value"
                },
                xaxis: {
                  title: "Time",
                  categories:data?.data?.getContractDataForIndexAndStrikePrice?.putTimeList,
                },
                // yaxis: [
                //   {
                //     min:0,
                //     max:3000000000,
                //     tickAmount:5,
                //     // title: {
                //     //   text: "Price"
                //     // }
                //   },
                //   {
                //     min:0,
                //     max:3000000000,
                //     tickAmount:5,
                //     opposite: true,
                //     // title: {
                //     //   text: "OI"
                //     // }
                //   }
                // ]
              };    

              this.callPriceAndATPLineChart = {
                series: [
                  {
                    name: "ATP1",
                    type: "line",
                    data: data?.data?.getContractDataForIndexAndStrikePrice?.callATP1List
                  },
                  {
                    name: "ATP3",
                    type: "line",
                    data: data?.data?.getContractDataForIndexAndStrikePrice?.callATP3List
                  },
                  {
                    name: "Price",
                    type: "line",
                    data: data?.data?.getContractDataForIndexAndStrikePrice?.callLastPriceList
                  }                  
                ],
                colors:["#495057","#0000FF","#20c997"],
                chart: {
                  height: 350,
                  type: "line",
                  animations :{
                    enabled: false,
                    animateGradually: {
                      enabled: false,
                    
                  },
                  dynamicAnimation: {
                      enabled: false,
                     
                  }
                  },
                },
                stroke: {
                  width: [3, 3, 3]
                },
                title: {
                  text: "CALL Price VS ATP"
                },
              
                xaxis: {
                  title: "Time",
                  categories:data?.data?.getContractDataForIndexAndStrikePrice?.callTimeList,
                },
                // yaxis: [
                //   {
                //     // title: {
                //     //   text: "Price"
                      
                //     // }
                //     min:0,
                //     max:700,
                //     tickAmount:7
                //   },
                //   {
                //     min:0,
                //     max:700,
                //     tickAmount:7,
                //     // title: {
                //     //   text: "ATP"
                //     // }
                //   },
                //   {
                //     opposite: true,
                //     // title: {
                //     //   text: "ATP"
                //     // }
                //     min:0,
                //     max:700,
                //     tickAmount:7
                //   }
                // ]
              };    
              
              this.putPriceAndATPLineChart = {
                series: [
                  {
                    name: "ATP1",
                    type: "line",
                    data: data?.data?.getContractDataForIndexAndStrikePrice?.putATP1List
                  },
                  {
                    name: "ATP3",
                    type: "line",
                    data: data?.data?.getContractDataForIndexAndStrikePrice?.putATP3List
                  },
                  {
                    name: "Price",
                    type: "line",
                    data: data?.data?.getContractDataForIndexAndStrikePrice?.putLastPriceList
                  },
                  
                ],
                colors:["#495057","#0000FF","#dc3545"],
                chart: {
                  height: 350,
                  type: "line",
                  animations :{
                    enabled: false,
                    animateGradually: {
                      enabled: false,
                    
                  },
                  dynamicAnimation: {
                      enabled: false,
                     
                  }
                  },
                },
                stroke: {
                  width: [3, 3, 3]
                },
                title: {
                  text: "PUT Price VS ATP"
                },
                xaxis: {
                  title: "Time",
                  categories:data?.data?.getContractDataForIndexAndStrikePrice?.putTimeList,
                  
                },
                // yaxis: [
                //   {
                //     // title: {
                //     //   text: "Price"
                //     // }
                //     min:0,
                //     max:700,
                //     tickAmount:7
                //   },
                //   {
                //     min:0,
                //     max:700,
                //     tickAmount:7,
                //     // title: {
                //     //   text: "ATP"
                //     // }
                //   },
                //   {
                //     opposite: true,
                //     // title: {
                //     //   text: "ATP"
                //     // }
                //     min:0,
                //     max:700,
                //     tickAmount:7
                //   }
                // ]
              };    
    })

    // this.service.getContractSummary().subscribe((data)=> {
    //   console.log(data.data.getContractSummary)
    //   this.overallSummaryChart = {
    //     series: [
    //       {
    //         name: "Call Atp Sum",
    //         type: "line",
    //         data: data?.data?.getContractSummary?.callAtpSumList
    //       },
    //       {
    //         name: "Put Atp Sum",
    //         type: "line",
    //         data: data?.data?.getContractSummary?.putAtpSumList
    //       }
    //     ],
    //     chart: {
    //       height: 1000,
    //       animations :{
    //         enabled: false,
    //         animateGradually: {
    //           enabled: false,
            
    //       },
    //       dynamicAnimation: {
    //           enabled: false,
             
    //       }
    //       },
    //       type: "line",
    //     },
    //     stroke: {
    //       width: [3, 3]
    //     },
    //     title: {
    //       text: "Call ATP Sum VS Put ATP Sum"
    //     },
    //     xaxis: {
    //       title: "Time",
    //       categories:data?.data?.getContractSummary?.timeList,
    //     },
    //     yaxis: [
    //       {
    //         min:400,
    //         max:1500,
    //         tickAmount:6,
    //         title: {
    //           text: "Price"
    //         }
    //       },
    //       {
    //         min:100,
    //         max:1500,
    //         tickAmount:6,
    //         opposite: true,
    //         title: {
    //           text: "ATP"
    //         }
    //       }
    //     ]
    //   };    
    // })
  }

  getStrikePrices() {
    this.service.getStrikePriceList(this.selectedIndex).subscribe((data) => {
      this.strikePriceList = data?.data?.getContractDataStrikePriceList;
      this.selectedStrikePrice = this.strikePriceList.length>1 ? this.strikePriceList[0] : 0;
      this.getTopContracts();
    },(err) => console.log("error while fetching strike price",err))
  }

  changeIndexData() {
    this.getStrikePrices();
  }

}
