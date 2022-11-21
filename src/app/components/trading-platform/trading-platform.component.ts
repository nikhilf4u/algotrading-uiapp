import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trading-platform',
  templateUrl: './trading-platform.component.html',
  styleUrls: ['./trading-platform.component.css']
})
export class TradingPlatformComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  navigation(navigatoTo:string)
  {
    this.router.navigate([navigatoTo])
  }

}
