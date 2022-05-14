import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignalRService } from './services/signal-r.service';
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = "123";
  constructor() {
  }

  ngOnInit() {
  }
}
