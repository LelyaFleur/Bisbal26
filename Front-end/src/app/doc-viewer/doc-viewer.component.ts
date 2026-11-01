import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'doc-viewer',
  templateUrl: './doc-viewer.component.html',
  styleUrls: ['./doc-viewer.component.scss']
})
export class DocViewerComponent implements OnInit {

  public href: string = "";
    url: string = "asdf";

    constructor(private router : Router) {
      
    }

    ngOnInit() {
        this.href = this.router.url;
        console.log(this.router.url);
    }
    
    navigateBack() {
      this.router.navigate(['/pressupostos-participatius']);
    }

}

