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
  strikePriceList:string[] = [];
  selectedStrikePrice:string = ""
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
      this.selectedStrikePrice = data?.data?.getContractsForIndexAndStrikePrice?.selectedStrikePrice;
      this.callATPAndValueLineChart = {
                series: [
                  {
                    name: "ATP Val",
                    type: "line",
                    data: data?.data?.getContractsForIndexAndStrikePrice?.callValueList,
                  },
                  {
                    name: "Price Val",
                    type: "line",
                    data: data?.data?.getContractsForIndexAndStrikePrice?.callOpenInterestList
                  }
                ],
                colors:["#495057","#20c997"],
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
                  width: [3, 3]
                },
                title: {
                  text: "CALL ATP VS Price Value"
                },
                xaxis: {
                  title: "Time",
                  categories:data?.data?.getContractsForIndexAndStrikePrice?.callTimeList,
                },
                yaxis: [
                  {
                    min:0,
                    max:2000000000,
                    tickAmount:5,
                  },
                  {
                    min:0,
                    max:2000000000,
                    tickAmount:5,
                    opposite: true,                   
                  }
                ]
              };

              this.putATPAndValueLineChart = {
                series: [
                  {
                    name: "ATP Val",
                    type: "line",
                    data: data?.data?.getContractsForIndexAndStrikePrice?.putValueList
                  },
                  {
                    name: "Price Val",
                    type: "line",
                    data: data?.data?.getContractsForIndexAndStrikePrice?.putOpenInterestList
                  }
                ],
                colors:["#495057","#dc3545"],
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
                  width: [3, 3]
                },
                title: {
                  text: "PUT ATP VS Price Value"
                },
                xaxis: {
                  title: "Time",
                  categories:data?.data?.getContractsForIndexAndStrikePrice?.putTimeList,
                },
                yaxis: [
                  {
                    min:0,
                    max:2000000000,
                    tickAmount:5,
                    // title: {
                    //   text: "ATP"
                    // }
                  },
                  {
                    min:0,
                    max:2000000000,
                    tickAmount:5,
                    opposite: true,
                    // title: {
                    //   text: "Value"
                    // }
                  }
                ]
              };    
              this.callPriceAndOILineChart = {
                series: [
                  {
                    name: "Call ATP Val",
                    type: "line",
                    data: data?.data?.getContractsForIndexAndStrikePrice?.callValueList
                  },
                  {
                    name: "Put ATP Val",
                    type: "line",
                    data: data?.data?.getContractsForIndexAndStrikePrice?.putValueList
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
                  categories:data?.data?.getContractsForIndexAndStrikePrice?.callTimeList,
                },
                yaxis: [
                  {
                    min:0,
                    max:2000000000,
                    tickAmount:5,
                    // title: {
                    //   text: "Price"
                    // }
                  },
                  {
                    min:0,
                    max:2000000000,
                    tickAmount:5,
                    opposite: true,
                    // title: {
                    //   text: "OI"
                    // }
                  }
                ]
              };    
              
              this.putPriceAndOILineChart = {
                series: [
                  {
                    name: "CALL Price Val",
                    type: "line",
                    data: data?.data?.getContractsForIndexAndStrikePrice?.callOpenInterestList
                  },
                  {
                    name: "PUT Price Val",
                    type: "line",
                    data: data?.data?.getContractsForIndexAndStrikePrice?.putOpenInterestList
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
                  categories:data?.data?.getContractsForIndexAndStrikePrice?.putTimeList,
                },
                yaxis: [
                  {
                    min:0,
                    max:2000000000,
                    tickAmount:5,
                    // title: {
                    //   text: "Price"
                    // }
                  },
                  {
                    min:0,
                    max:2000000000,
                    tickAmount:5,
                    opposite: true,
                    // title: {
                    //   text: "OI"
                    // }
                  }
                ]
              };    

              this.callPriceAndATPLineChart = {
                series: [
                  {
                    name: "Price",
                    type: "line",
                    data: data?.data?.getContractsForIndexAndStrikePrice?.callPriceList
                  },
                  {
                    name: "ATP",
                    type: "line",
                    data: data?.data?.getContractsForIndexAndStrikePrice?.callAtpList
                  }
                ],
                colors:["#20c997","#495057"],
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
                  text: "CALL Price VS ATP"
                },
              
                xaxis: {
                  title: "Time",
                  categories:data?.data?.getContractsForIndexAndStrikePrice?.callTimeList,
                },
                yaxis: [
                  {
                    // title: {
                    //   text: "Price"
                      
                    // }
                  },
                  {
                    opposite: true,
                    // title: {
                    //   text: "ATP"
                    // }
                  }
                ]
              };    
              
              this.putPriceAndATPLineChart = {
                series: [
                  {
                    name: "Price",
                    type: "line",
                    data: data?.data?.getContractsForIndexAndStrikePrice?.putPriceList
                  },
                  {
                    name: "ATP",
                    type: "line",
                    data: data?.data?.getContractsForIndexAndStrikePrice?.putAtpList
                  }
                ],
                colors:["#dc3545","#495057"],
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
                  text: "PUT Price VS ATP"
                },
                xaxis: {
                  title: "Time",
                  categories:data?.data?.getContractsForIndexAndStrikePrice?.putTimeList,
                  
                },
                yaxis: [
                  {
                    // title: {
                    //   text: "Price"
                    // }
                  },
                  {
                    opposite: true,
                    // title: {
                    //   text: "ATP"
                    // }
                  }
                ]
              };    
    })

    this.service.getContractSummary().subscribe((data)=> {
      console.log(data.data.getContractSummary)
      this.overallSummaryChart = {
        series: [
          {
            name: "Call Atp Sum",
            type: "line",
            data: data?.data?.getContractSummary?.callAtpSumList
          },
          {
            name: "Put Atp Sum",
            type: "line",
            data: data?.data?.getContractSummary?.putAtpSumList
          }
        ],
        chart: {
          height: 1000,
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
          width: [3, 3]
        },
        title: {
          text: "Call ATP Sum VS Put ATP Sum"
        },
        xaxis: {
          title: "Time",
          categories:data?.data?.getContractSummary?.timeList,
        },
        yaxis: [
          {
            min:400,
            max:1500,
            tickAmount:6,
            title: {
              text: "Price"
            }
          },
          {
            min:100,
            max:1500,
            tickAmount:6,
            opposite: true,
            title: {
              text: "ATP"
            }
          }
        ]
      };    
    })
  }

  getStrikePrices() {
    this.service.getStrikePriceList(this.selectedIndex).subscribe((data) => {
      this.strikePriceList = data?.data?.getStrikePriceList;
      this.selectedStrikePrice = this.strikePriceList.length>1 ? this.strikePriceList[0] : "";
      this.getTopContracts();
    },(err) => console.log("error while fetching strike price",err))
  }

  changeIndexData() {
    this.getStrikePrices();
  }

}
