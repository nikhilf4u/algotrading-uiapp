import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GraphqlService } from './services/graphql.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'algotrading';
  constructor(private router:Router)
  {
  }
  navigation(navigatoTo:string)
  {
    this.router.navigate([navigatoTo])
  }
}
