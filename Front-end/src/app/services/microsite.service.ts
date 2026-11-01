import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { baseServer } from '../../settings';

// models
import { Microsite } from '../models/microsite';


@Injectable({
  providedIn: 'root'
})
export class MicrositeService {

  constructor(private http: HttpClient) {
  }

  getMicrosites() {
      return this.http.get(`${baseServer}/microsite`);
  }

  getMicrosite(id) {
    
    return this.http.get<Microsite>(`${baseServer}/microsite/${id}`);
  }

  updateWhoWeAre(id, value){
    return this.http.put(`${baseServer}/microsite/update-who-we-are/${id}`, value);
  }

  addPhaseToMicrosite(id, value) {
    return this.http.post(`${baseServer}/microsite/add_phase/${id}`, value);      
  }

  updatePhase(id, phaseNumber, value) {
    return this.http.put(`${baseServer}/microsite/update-phase/${id}/${phaseNumber}`, value);      
  }

  updatePhases(id, value) {
    return this.http.put(`${baseServer}/microsite/update-phases/${id}`, value);      
  }


  activatePhase(id, value) {
    return this.http.put(`${baseServer}/microsite/activate-phase/${id}`, value);      
  }

  updateHistorial(id, value) {
    return this.http.put(`${baseServer}/microsite/update-historial/${id}`, value);      
  }







}
