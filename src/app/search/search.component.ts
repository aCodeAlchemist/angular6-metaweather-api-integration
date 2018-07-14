import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { WeatherService } from '../weather.service';
import { WeatherData } from '../data-types';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  keyword: String;
  data: WeatherData[];
  inProgress = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: WeatherService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.keyword = params.keyword;
      this.triggerSearch();
    });
  }

  ngOnInit() {
  }

  triggerSearch() {
    this.inProgress = false;
    this.api.get({ command: 'search', keyword: this.keyword }).subscribe((res: WeatherData[]) => {
      this.data = res;
    });
  }

}
