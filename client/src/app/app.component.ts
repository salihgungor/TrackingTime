import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {Test,TestService } from './core/services/test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  testValue: Observable<Test> = this.service.getTest();
  constructor(private service: TestService){

  }
}
