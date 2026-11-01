import { HttpClient } from '@angular/common/http';

// models
import { Page } from '../models/page';

import { Injectable } from '@angular/core';

import { baseServer } from '../../settings';


@Injectable()
export class PageService {

   // public pagesBS = new BehaviorSubject<string>(null);

    constructor(protected  httpClient: HttpClient) { }

    getPages() {
        return this.httpClient.get(`${baseServer}/pages`);
    }

    getPagesByPhase(phase: number) {
        return this.httpClient.get(`${baseServer}/pages/by_phase/${phase}`);
    }

    public addPage(page) {
        return this.httpClient.post(`${baseServer}/pages/add-page`, page);
    }

    public getPage(micrositeId, index: number, phase: number) {
        return this.httpClient.get(`${baseServer}/pages/${micrositeId}/${index}/${phase}`);
    }

    public getPageById(id: string) {
        return this.httpClient.get<Page>(`${baseServer}/pages/${id}`);
    }

    /*postAddPage(value) {
        return this.http.post(`${baseServer}/pages/add-page`, value)
            .map(res => res.json());
    }*/

    getEditPage(id: string) {
        return this.httpClient.get(`${baseServer}/pages/edit-page/${id}`);
    }

    editPage(id, page) {
        return this.httpClient.post(`${baseServer}/pages/edit-page/${id}`, page);           
    }

    deletePage(id :string) {
        return this.httpClient.get(`${baseServer}/pages/delete-page/${id}`);
    }

}