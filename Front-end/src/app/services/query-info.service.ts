import { HttpClient } from '@angular/common/http';

// models
import { QueryInfo } from '../models/queryInfo';

import { Injectable } from '@angular/core';

import { baseServer } from '../../settings';

@Injectable({
  providedIn: 'root'
})
export class QueryInfoService {
  
  constructor(protected  httpClient: HttpClient) { }
 
    getQueryInfos() {
        return this.httpClient.get(`${baseServer}/query-info`);
    }

    getQueryInfoByQueryId(id: string) {
        return this.httpClient.get<QueryInfo>(`${baseServer}/query-info/${id}`);
    }

    addQueryInfo(queryInfo) {
        return this.httpClient.post(`${baseServer}/query-info/add-info`, queryInfo);
    }
   

    editQueryInfo(id: string, queryInfo) {
        return this.httpClient.post(`${baseServer}/query-info/edit-query-info/${id}`, queryInfo);
    }   

    deleteQueryInfo(id :string) {
        return this.httpClient.get(`${baseServer}/query-info/delete-query-info/${id}`);
    }
}



