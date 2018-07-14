import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  @Input()
  woeid: string;

  @Input()
  city: string;

  data: any;
  temp;
  inProgress = true;

  constructor(private api: WeatherService) { }

  ngOnInit() {
    this.api.get({command: 'location', woeid: this.woeid}).subscribe(res => {
      this.data = res;
      this.temp = this.data.consolidated_weather[0];
      this.temp.max_temp = parseInt(this.temp.max_temp, 10);
      this.temp.min_temp = parseInt(this.temp.min_temp, 10);
      this.temp.the_temp = parseInt(this.temp.the_temp, 10);
      this.inProgress = false;
    });
  }

}
