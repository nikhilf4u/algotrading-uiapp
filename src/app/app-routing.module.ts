import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { OptionChainAnalysisComponent } from './components/option-chain-analysis/option-chain-analysis.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { StrikePriceSelectionComponent } from './components/strike-price-selection/strike-price-selection.component';
import { TradingPlatformComponent } from './components/trading-platform/trading-platform.component';
import { TopContractsComponent } from './components/top-contracts/top-contracts.component';
import { AtpDetailsComponent } from './components/atp-details/atp-details.component';

const routes: Routes = [
  {
    path:'',
    component:TradingPlatformComponent
  },
  // {
  //   path:'oi-data-analysis',
  //   component:OptionChainAnalysisComponent
  // },
  {
    path:'place-order',
    component:PlaceOrderComponent
  },
  {
    path:'strike-price-selection',
    component:StrikePriceSelectionComponent
  },
  {
    path:'top-contracts',
    component:TopContractsComponent
  },
  {
    path:'atp-details',
    component:AtpDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
