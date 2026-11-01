import { HttpClient } from '@angular/common/http';
// rxjs
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { baseServer } from '../../settings';

@Injectable()
export class ProposalService {

    constructor(private http: HttpClient) { }
    
    downloadFile(): Observable<Blob> {
      //  let options = new RequestOptions({responseType: ResponseContentType.Blob });
        return this.http.get(`${baseServer}/import`, {responseType: 'blob'}); 
    }

    getFile(id): Observable<Blob> {
     //   let options = new RequestOptions({responseType: ResponseContentType.Blob });
        return this.http.get(`${baseServer}/proposals/file/${id}`, {responseType: 'blob'});
    }

    getProposals() {
        return this.http.get(`${baseServer}/proposals`);
    }

    getSelectedProposals() {
        return this.http.get(`${baseServer}/proposals/selected`);
    }

    getProposal(id) {
        return this.http.get(`${baseServer}/proposal/${id}`);
    }

    postAddProposal(value) {
        return this.http.post(`${baseServer}/proposals/add-proposal`, value);
    }

    putSaveProposal(value) {
        return this.http.put(`${baseServer}/proposals/update-proposal`, value)
    }

    putSelectProposal(value) {
        return this.http.put(`${baseServer}/proposals/select-proposal`, value)
    }
    deleteProposals() {
        return this.http.delete(`${baseServer}/proposals/delete-all`);
    }

  /*  getEditPage(id) {
        return this.http.get('http://46.101.159.166:7500/pages/edit-page/' + id)
    }

    postEditPage(value) {
        return this.http.post('http://46.101.159.166:7500/pages/edit-page/'+value.id, value)
            .map(res => res.json());
    }

    deletePage(id) {
        return this.http.get('http://46.101.159.166:7500/pages/delete-page/' + id)
            .map(res => res.json());
    }*/

}
