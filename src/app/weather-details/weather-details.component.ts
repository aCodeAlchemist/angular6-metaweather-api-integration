import { Component, OnInit } from '@angular/core';
import { WeatherData } from '../data-types';
import { WeatherService } from '../weather.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent implements OnInit {
  woeid: String;
  data: WeatherData[];
  inProgress = true;
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  constructor(
    private api: WeatherService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.woeid = params.woeid;
      this.api.get({command: 'location', woeid: this.woeid}).subscribe((res: any) => {
        res.consolidated_weather.forEach(r => {
          let tmp = new Date(r.applicable_date);
          r.date = tmp.getDate();
          r.day = this.days[tmp.getDay()];
          r.max_temp = parseInt(r.max_temp, 10);
          r.min_temp = parseInt(r.min_temp, 10);
          r.the_temp = parseInt(r.the_temp, 10);
        });

        this.data = res;
        this.inProgress = false;
      });
    });

  }

  ngOnInit() {
  }

}
