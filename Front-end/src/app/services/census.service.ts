import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { baseServer } from '../../settings';


@Injectable()
export class CensusService {
  
  constructor(private http: HttpClient) { }

  getCensus() {
    return this.http.get(`${baseServer}/census`);    
  }

}
