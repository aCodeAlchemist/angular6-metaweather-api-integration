import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import {Observable} from 'rxjs/Rx';
import {WeatherData} from '../data-types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: WeatherData[] = [];
  inProgress = true;
  defaultCities = [
    'Istanbul',
    'Berlin',
    'London',
    'Helsinki',
    'Dublin',
    'Vancouver'
  ];

  constructor(private api: WeatherService) { }

  ngOnInit() {
    let reqArray = [];

    this.defaultCities.forEach((c: String) => {
      reqArray.push(this.api.get({command: 'search', keyword: c}));
    });

    Observable.forkJoin(reqArray).subscribe(res => {
      res.forEach(r => {
        this.data.push(r[0]);
      });
      this.inProgress = false;
    });
  }

}
