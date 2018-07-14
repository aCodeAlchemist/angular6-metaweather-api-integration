import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private api: ApiService
  ) { }

  get(params) {
    return this.api.get(params);
  }
}
