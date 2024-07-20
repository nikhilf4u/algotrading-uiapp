import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { GraphqlService } from './services/graphql.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import ApexCharts from 'apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';
// import { OptionChainAnalysisComponent } from './components/option-chain-analysis/option-chain-analysis.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StrikePriceSelectionComponent } from './components/strike-price-selection/strike-price-selection.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AgGridModule } from 'ag-grid-angular';
import { TopContractsComponent } from './components/top-contracts/top-contracts.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AtpDetailsComponent } from './components/atp-details/atp-details.component';
@NgModule({
  declarations: [
    AppComponent,
    // OptionChainAnalysisComponent,
    PlaceOrderComponent,
    StrikePriceSelectionComponent,
    TopContractsComponent,
    AtpDetailsComponent
  ],
  imports: [
    AppRoutingModule,
    GraphQLModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    HttpClientModule,
    MatRadioModule,
    MatSnackBarModule,
    MatCardModule,
    MatSelectModule,
    NgApexchartsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    AgGridModule,
    ],
  providers: [GraphqlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
