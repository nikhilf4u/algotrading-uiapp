import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { GraphqlService } from 'src/app/services/graphql.service';
@Component({
  selector: 'app-atp-details',
  templateUrl: './atp-details.component.html',
  styleUrls: ['./atp-details.component.css'],
})
export class AtpDetailsComponent implements OnInit {

  rowData = [
  ];
 
  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: "strikePrice" },
    { field: "optionType" },
    { field: "lastPrice" },
    { field: "atp3" },
    {field:"atp1"},
    {field:"time"}
  ];
  constructor(private service: GraphqlService) { 
    this.getAtpData();
  }

  ngOnInit(): void {
    console.log("loadeddddddddddddddddddddddddddddddddddd")
    setInterval(() =>{
      this.getAtpData();
    },150000)
  }

  getAtpData() {
    this.service.getAtpData().subscribe((data) => {
      this.rowData=data?.data?.getAtpData
    },(error) => console.log(error))
  }
}
