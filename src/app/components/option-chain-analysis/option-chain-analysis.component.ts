import { Component, OnInit } from '@angular/core';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { GraphqlService } from 'src/app/services/graphql.service';
import { OptionChainInputDto, StrikePriceAndVolume } from 'src/app/models/OptionChain';
import moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { StrikePriceSelectionComponent } from '../strike-price-selection/strike-price-selection.component';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};


export type LineChartOptions = {
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


export type LinesChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle;
  labels: string[];
  stroke: any; // ApexStroke;
  dataLabels: any; // ApexDataLabels;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-option-chain-analysis',
  templateUrl: './option-chain-analysis.component.html',
  styleUrls: ['./option-chain-analysis.component.css']
})
export class OptionChainAnalysisComponent implements OnInit {
  public OIChart: Partial<ChartOptions> | any;
  public overAllOIChart: Partial<ChartOptions> | any;
  public strikePriceOpenInterestChangeLineChart: Partial<LineChartOptions> | any;
  public lineChartForCallPriceAndOI: Partial<LinesChartOptions> | any;
  public lineChartForPutPriceAndOI: Partial<LinesChartOptions> | any;
  public callPutOITrendLineChart: Partial<LineChartOptions> | any;
  strikePriceList: number[] = [];
  niftyStrikePriceList: number[] = [];
  bankNiftyStrikePriceList: number[] = [];
  selectedIndex: string = "nifty";
  isChangeInOIEnabled: boolean = true;
  isCallPutTrendEnabled: boolean = false;
  selectedStrikePrice: number = 0;
  niftyOpeningPrice: number = 18400;
  bankNiftyOpeningPrice: number = 44100;
  daysLeftToExpiry: number = 3;
  niftyPCR:string="";
  bnfPCR:string="";
  constructor(private service: GraphqlService, private snackBar: MatSnackBar, public dialog: MatDialog) {
    this.getNiftyDataAndPlotChart();
    this.getOptionChainDataAndSaveToBackend();
  }

  ngOnInit(): void {
    setInterval(() => {
      this.getOptionChainDataAndSaveToBackend();
    }, 60000) //
    setInterval(() => {
      if (this.selectedIndex == 'nifty') {
        this.getNiftyDataAndPlotChart();
      }
      else {
        this.getNiftyBankDataAndPlotChart();
      }
    }, 60000)

  }
  getOptionChainDataAndSaveToBackend() {
    this.service.getNiftyOptionChainData().subscribe((data) => {
      this.niftyPCR=(Math.round((data.filtered.PE.totOI/data.filtered.CE.totOI)*100)/100).toFixed(2);
      console.log(this.niftyPCR);
      this.prepareOptionChainDtoListAndSave(data, 'nifty');
    });
    this.service.getNiftyBankOptionChainData().subscribe((data) => {
      this.bnfPCR=(Math.round((data.filtered.PE.totOI/data.filtered.CE.totOI)*100)/100).toFixed(2);
      console.log(this.bnfPCR)
      this.prepareOptionChainDtoListAndSave(data, 'niftybank');
    })
  }

  prepareOptionChainDtoListAndSave(data: any, indexType: string) {
    console.log(data);
    let time = moment().format("HH:mm");
    let range = 500;
    let roundValue = 50;
    let lotSize = 50;
    let openingPrice = this.niftyOpeningPrice;
    if (indexType == 'niftybank') {
      range = 1000;
      roundValue = 100;
      lotSize = 25;
      openingPrice = this.bankNiftyOpeningPrice
    }
    let optionChainData: OptionChainInputDto[] = [];

    for (let index = 0; index < data.filtered.data.length; index++) {
      if (Math.abs(data.filtered.data[index].strikePrice - openingPrice) <= range) {
        let ceOIDAta: OptionChainInputDto = new OptionChainInputDto();
        ceOIDAta.openInterest = data.filtered.data[index].CE.changeinOpenInterest * lotSize;
        ceOIDAta.price = data.filtered.data[index].CE.lastPrice;
        ceOIDAta.strikePrice = data.filtered.data[index].CE.strikePrice + "CE";
        ceOIDAta.impliedVolatility = data.filtered.data[index].CE.impliedVolatility;
        ceOIDAta.time = time;
        ceOIDAta.index = indexType;
        ceOIDAta.underlyingValue = parseInt(data.filtered.data[index].CE.underlyingValue);
        ceOIDAta.daysLeftToExpire = this.daysLeftToExpiry;
        ceOIDAta.totalTradedVolume = data.filtered.data[index].CE.totalTradedVolume;
        optionChainData.push(ceOIDAta);
        let peOIDAta: OptionChainInputDto = new OptionChainInputDto();
        peOIDAta.openInterest = data.filtered.data[index].PE.changeinOpenInterest * lotSize;
        peOIDAta.price = data.filtered.data[index].PE.lastPrice;
        peOIDAta.impliedVolatility = data.filtered.data[index].PE.impliedVolatility;
        peOIDAta.strikePrice = data.filtered.data[index].PE.strikePrice + "PE";
        peOIDAta.time = time;
        peOIDAta.index = indexType;
        peOIDAta.underlyingValue = parseInt(data.filtered.data[index].PE.underlyingValue);
        peOIDAta.daysLeftToExpire = this.daysLeftToExpiry;
        peOIDAta.totalTradedVolume = data.filtered.data[index].PE.totalTradedVolume;
        optionChainData.push(peOIDAta);
      }
    }
    this.service.saveOIData(optionChainData).subscribe((response) => {
      console.log(response);
    }, (err) => {
      this.snackBar.open("Some Error Occured while saving data to bacend", "X");
      setTimeout(() => { this.snackBar.dismiss() }, 10000); console.error(err)
    })
  }

  getNiftyDataAndPlotChart() {
    this.service.getNiftyOptionChainData().subscribe((data) => {
      this.getStrikePriceForARange(data, "nifty");
    }, (error) => {
      this.snackBar.open("Some Error Occured", "X");
      setTimeout(() => { this.snackBar.dismiss() }, 10000)
    })
  }

  getNiftyBankDataAndPlotChart() {
    this.service.getNiftyBankOptionChainData().subscribe((data) => {
      this.getStrikePriceForARange(data, "niftybank");
    }, (error) => {
      this.snackBar.open("Some Error Occured", "X"); setTimeout(() => { this.snackBar.dismiss() }, 10000)
    })
  }
  getStrikePriceForARange(data: any, indexType: string) {

    let strikePrice = [];
    let callOIChange = [];
    let putOIChange = [];
    let callVolume = [];
    let putVolume = [];
    let range = 500;
    let roundValue = 50;
    let lotSize = 50;
    let openingPrice = this.niftyOpeningPrice;
    if (this.selectedIndex == 'niftybank') {
      range = 1000;
      roundValue = 100;
      lotSize = 25;
      openingPrice = this.bankNiftyOpeningPrice;
    }
    let insertStrikePrice = true;
    if (indexType == 'nifty' && this.niftyStrikePriceList.length != 0) {
      insertStrikePrice = false;
    }
    if (indexType == 'niftybank' && this.bankNiftyStrikePriceList.length != 0) {
      insertStrikePrice = false;
    }
    for (let index = 0; index < data.filtered.data.length; index++) {
      if (Math.abs(data.filtered.data[index].strikePrice - openingPrice) <= range) {
        strikePrice.push(data.filtered.data[index].strikePrice);
        if (this.isChangeInOIEnabled) {
          callOIChange.push(data.filtered.data[index].CE.changeinOpenInterest * lotSize);
          putOIChange.push(data.filtered.data[index].PE.changeinOpenInterest * lotSize)
        }
        else {
          callOIChange.push(data.filtered.data[index].CE.openInterest * lotSize);
          putOIChange.push(data.filtered.data[index].PE.openInterest * lotSize)
        }
        callVolume.push(data.filtered.data[index].CE.totalTradedVolume)
        putVolume.push(data.filtered.data[index].PE.totalTradedVolume)
        if (indexType == 'nifty' && insertStrikePrice) {
          this.niftyStrikePriceList.push(data.filtered.data[index].CE.strikePrice);
        }
        else if (indexType == 'niftybank' && insertStrikePrice) {
          this.bankNiftyStrikePriceList.push(data.filtered.data[index].CE.strikePrice);
        }
      }

    };
    this.plotNiftyOiAndVolume(callOIChange, putOIChange, callVolume, putVolume, strikePrice);
  }

  plotNiftyOiAndVolume(callOIChange: number[], putOIChange: number[], callVolume: number[], putVolume: number[], strikePrice: number[]) {
    this.overAllOIChart = {
      series: [
        {
          name: "CALL",
          data: [Math.ceil(this.sum(callOIChange) / callOIChange.length)]
        },
        {
          name: "PUT",
          data: [Math.ceil(this.sum(putOIChange) / putOIChange.length)]
        },
      ],
      chart: {
        type: "bar",
        height: 500
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: ["Call", "PUT"]
      },
      fill: {
        opacity: 1,
        colors: ['#FF0000', '#72CC50']
      },
    };
    this.OIChart = {
      series: [
        {
          name: "CALL",
          data: callOIChange
        },
        {
          name: "PUT",
          data: putOIChange
        },
      ],
      chart: {
        type: "bar",
        height: 500
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: strikePrice
      },
      fill: {
        opacity: 1,
        colors: ['#FF0000', '#72CC50']
      },
    };
  }
  changeIndexData() {
    if (this.selectedIndex == 'nifty') {
      this.strikePriceList = this.niftyStrikePriceList;
      this.getNiftyDataAndPlotChart();
    }
    else {
      this.strikePriceList = this.bankNiftyStrikePriceList;
      this.getNiftyBankDataAndPlotChart()
    }
  }
  changeOIType(event: any) {
    if (event.value == 'overallOITrend') {
      this.isCallPutTrendEnabled = true;
      this.service.getChangeInOIForIndex(this.selectedIndex).subscribe((response) => {
        this.callPutOITrendLineChart = {
          series: [
            {
              name: "OI Change",
              data: response.data.getChangeInOIForIndex.oiChangeList
            },
          ],
          chart: {
            height: 350,
            type: "line",
            dropShadow: {
              enabled: true,
              color: "#000",
              top: 18,
              left: 7,
              blur: 10,
              opacity: 0.2
            },
            toolbar: {
              show: false
            }
          },
          colors: ["#77B6EA", "#545454"],
          // dataLabels: {
          //   enabled: true
          // },
          stroke: {
            curve: "smooth"
          },
          title: {
            text: "Call OI VS Put OI",
            align: "left"
          },
          grid: {
            borderColor: "#e7e7e7",
            row: {
              colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
              opacity: 0.5
            }
          },
          markers: {
            size: 1
          },
          xaxis: {
            categories: response.data.getChangeInOIForIndex.timeList
          },
          yaxis: {
          },
          legend: {
            position: "top",
            horizontalAlign: "right",
            floating: true,
            offsetY: -25,
            offsetX: -5
          }
        };
      }, (err) => console.error(err))
    }
    else {
      this.isCallPutTrendEnabled = false;
      if (event.value == 'overallOI') {
        this.isChangeInOIEnabled = false;
      }
      else {
        this.isChangeInOIEnabled = true;
      }
      if (this.selectedIndex == 'nifty') {
        this.getNiftyDataAndPlotChart();
      }
      else {
        this.getNiftyBankDataAndPlotChart()
      }
    }
  }
  strikePriceChange() {
    this.service.getOptionChainDataForStrikePrice(this.selectedStrikePrice).subscribe((response) => {
      this.lineChartForCallPriceAndOI = {
        series: [
          {
            name: "Price",
            type: "line",
            data: response.data.getOptionChainDataForStrikePrice.callPriceList
          },
          {
            name: "Open Interest",
            type: "line",
            data: response.data.getOptionChainDataForStrikePrice.callOpenInterestList
          }
        ],
        chart: {
          height: 350,
          type: "line",
        },
        stroke: {
          width: [3, 3]
        },
        title: {
          text: "Call Price VS Open Interest"
        },
        // dataLabels: {
        //   // enabled: true,
        //   enabledOnSeries: [1]
        // },
        labels: response.data.getOptionChainDataForStrikePrice.callTimeList,
        xaxis: {
          type: "Time",

        },
        yaxis: [
          {
            title: {
              text: "Price"
            }
          },
          {
            opposite: true,
            title: {
              text: "Open Interest"
            }
          }
        ]
      };
      this.lineChartForPutPriceAndOI = {
        series: [
          {
            name: "Price",
            type: "line",
            data: response.data.getOptionChainDataForStrikePrice.putPriceList
          },
          {
            name: "Open Interest",
            type: "line",
            data: response.data.getOptionChainDataForStrikePrice.putOpenInterestList
          }
        ],
        chart: {
          height: 350,
          type: "line"
        },
        stroke: {
          width: [3, 3]
        },
        title: {
          text: "Put Price VS Open Interest"
        },
        // dataLabels: {
        //   // enabled: true,
        //   enabledOnSeries: [1]
        // },
        labels: response.data.getOptionChainDataForStrikePrice.putTimeList,
        xaxis: {
          type: "Time"
        },
        yaxis: [
          {
            title: {
              text: "Price"
            }
          },
          {
            opposite: true,
            title: {
              text: "Open Interest"
            }
          }
        ]
      };
      // this.strikePriceOpenInterestChangeLineChart = {
      //   series: [
      //     {
      //       name: "OI Change",
      //       data: response.data.getOptionChainDataForStrikePrice.overallChangeInOIList
      //     },
      //   ],
      //   chart: {
      //     height: 350,
      //     type: "line",
      //     dropShadow: {
      //       enabled: true,
      //       color: "#000",
      //       top: 18,
      //       left: 7,
      //       blur: 10,
      //       opacity: 0.2
      //     },
      //     toolbar: {
      //       show: false
      //     }
      //   },
      //   colors: ["#77B6EA", "#545454"],
      //   // dataLabels: {
      //   //   enabled: true
      //   // },
      //   stroke: {
      //     curve: "smooth"
      //   },
      //   title: {
      //     text: "Call OI VS Put OI",
      //     align: "left"
      //   },
      //   grid: {
      //     borderColor: "#e7e7e7",
      //     row: {
      //       colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
      //       opacity: 0.5
      //     }
      //   },
      //   markers: {
      //     size: 1
      //   },
      //   xaxis: {
      //     categories: response.data.getOptionChainDataForStrikePrice.callTimeList
      //   },
      //   yaxis: {
      //   },
      //   legend: {
      //     position: "top",
      //     horizontalAlign: "right",
      //     floating: true,
      //     offsetY: -25,
      //     offsetX: -5
      //   }
      // };
    }, (err) => console.error(err))
  }
  sum(array: any[]) {
    let totalSum = 0;
    for (let index = 0; index < array.length; index++) {
      totalSum += array[index];
    }
    return totalSum;
  }
  openStrikePriceSelectionDialog() {
    this.dialog.open(StrikePriceSelectionComponent, {
      minWidth: 1250,
      minHeight: 600,
      data: {
        selectedIndex: this.selectedIndex
      }
    })
  }
}
