import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import NormalDistribution from 'normal-distribution';
import { GraphqlService } from 'src/app/services/graphql.service';
@Component({
  selector: 'app-strike-price-selection',
  templateUrl: './strike-price-selection.component.html',
  styleUrls: ['./strike-price-selection.component.css']
})
export class StrikePriceSelectionComponent implements OnInit {

  constructor(private matdialogref:MatDialogRef<any>,@Inject(MAT_DIALOG_DATA) private incomingData: any,private service:GraphqlService) { }
  rowData = [{strikePrice:11,delta:1,theta:1,gamma:1,vega:1,profit:1}];
  actionType:string='buying';
  columnDefs: ColDef[] = [];
  gridApi: GridApi | undefined;
  optionType:string="%CE";
  ngOnInit(): void {
    this.columnDefs = [
      { headerName: 'Strike Price', field: 'strikePrice', sortable: true, filter: true, unSortIcon:true},
      { headerName: 'Delta', field: 'delta', sortable: true, filter: true, unSortIcon:true},
      { headerName: 'Theta', field: 'theta', sortable: true, filter: true, unSortIcon:true},
      { headerName: 'Gamma', field: 'gamma', sortable: true, filter: true, unSortIcon:true},
      { headerName: 'Vega', field: 'vega', sortable: true, filter: true, unSortIcon:true},
      { headerName:'Volume', field:'volume',sortable: true, filter: true, unSortIcon:true}
  ]
  this.getApiData();
}
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
  close()
  {
    this.matdialogref.close();
  }
  changeActionType()
  {
    console.log(this.actionType);
  }
  changeOptionType()
  {
    this.getApiData();
  }
  getApiData()
  {
    // this.service.getDataForStrikePriceSelection(this.incomingData.selectedIndex,this.actionType,this.optionType).subscribe((response)=>{
    //   if(response?.data?.getDataForStrikePriceSelection)
    //   {
    //     this.rowData=response?.data?.getDataForStrikePriceSelection;
    //   }
    // })
  }
}