import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from  '../services/auth.service';

import { QueryService } from '../services/query.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  proposalMode = false;
  queryMode = false;
  constructor(public auth: AuthService, private router: Router, private queryService: QueryService) { }
  columnNum = 3;
  rowHeight = 100;
  gutterSize = 15;
  queryItems;
  ngOnInit() {
    this.queryService.getQueries().subscribe(queries => {
    this.queryItems = queries;
    });
  }

  logout() {
    this.auth.logout().then(() => {
      this.router.navigate(['/']);
     });
  }

  activate(mode) {
    if(mode === 'proposals') {
      this.proposalMode = true;
      this.queryMode = false;
    } else {
      this.proposalMode = false;
      this.queryMode = true;
    }
    console.log('queryMode', this.queryMode)
  }

  navigateToQuery(item){
    if(!item.closed) {
      this.router.navigate(['/admin', item._id]);
    }
  }

}
