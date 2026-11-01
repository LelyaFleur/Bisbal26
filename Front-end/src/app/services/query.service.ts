import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { baseServer } from '../../settings';

// models
import { Query } from '../models/query';
import { Proposal } from '../models/proposal';

export interface Validation { 
  result: string;
  message: string; 
}

@Injectable()
export class QueryService {
    
    constructor(private http: HttpClient) {
    }

    getCensus() {
      return this.http.get(`${baseServer}/queries/query/census/census_count`)      
    }

    getQueries() {
      return this.http.get(`${baseServer}/queries`);
    }

    getQuery(id) {
      return this.http.get<Query>(`${baseServer}/queries/${id}`);
    }

    getProposal(id, proposalId) {
      return this.http.get<Proposal>(`${baseServer}/queries/${id}/${proposalId}`);
    }

    createQuery(value) {
      return this.http.post<Query>(`${baseServer}/queries/create`, value)      
    }

    removeQuery(id) {
      return this.http.delete(`${baseServer}/queries/remove/${id}`)      
    }

    addProposalToQuery(id, value) {
      return this.http.put(`${baseServer}/queries/${id}`, value)      
    }

    saveProposal(id, proposalId, value) {
      return this.http.put(`${baseServer}/queries/update-proposal/${id}/${proposalId}`, value)
    }

    removeProposal(id, proposalId) {
      return this.http.get<Query>(`${baseServer}/queries/remove-proposal/${id}/${proposalId}`)  
    }

    validateUser(data){
      return this.http.post(`${baseServer}/queries/validation`, data)      
    }

    vote(queryObj) {      
      return this.http.put(`${baseServer}/queries/query/vote`, queryObj)      
    }

    clearVotes(id) {      
      return this.http.put<Query>(`${baseServer}/queries/query/clear_votes/${id}`, id)  
    }

    checkWinner(pollId, value) {
      return this.http.put<Query>(`${baseServer}/queries/query/check_winner/${pollId}`, value)
    }
     
		changePhase(values) {      
      return this.http.put<Query>(`${baseServer}/queries/query/change_phase`, values)  
    }
    
    saveText(values) {      
      return this.http.put<Query>(`${baseServer}/queries/query/save_text`, values)  
    }
    
    updatePhase(id, phaseNumber, value) {
      return this.http.put(`${baseServer}/queries/update-phase/${id}/${phaseNumber}`, value);      
    }
    
}
