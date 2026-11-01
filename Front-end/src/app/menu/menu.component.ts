import { Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver  } from "@angular/flex-layout";
import { Router } from '@angular/router';
import { MicrositeService } from '../services/microsite.service';
import { PageService } from '../services/page.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  microsite : any;
  menuItems : any;
  columnNum = 2;
  rowHeight = 443;
  gutterSize = 32;
  innerWidth = window.innerWidth;

constructor(media: MediaObserver, public micrositeService: MicrositeService, public pageService: PageService, private router: Router) {
  media.media$
    .subscribe((change: MediaChange) => {
      // alert(change.mqAlias);
      console.log(change.mqAlias);
      if(change.mqAlias == 'xs'){
        this.columnNum = 1;
        this.rowHeight = 194;
        this.gutterSize = 16;
      }
      else if(change.mqAlias == 'md'){
        this.columnNum = 2;
        this.rowHeight = 304;
        this.gutterSize = 28;

      } else if(change.mqAlias == 'sm'){
        this.columnNum = 2;
        this.rowHeight = 234;
        this.gutterSize = 21;
      }
      else if(change.mqAlias == 'lg'){
        this.columnNum = 3;
        this.rowHeight = 256;
      //  this.rowHeight = 320;
        this.gutterSize = 32;
      } else {
        this.columnNum = 3;
        //this.rowHeight = 443;        
        this.rowHeight = 256;
      //  this.rowHeight = 320;
        this.gutterSize = 32;
      }
    });
}

  ngOnInit() {
    console.log("width:", this.innerWidth);
    this.micrositeService.getMicrosite('5ec97d156049740c9869f15f').subscribe(data => {
      this.microsite = data;
      if(this.microsite) {
        this.microsite.phases.forEach(element => {
          if(element.number === this.microsite.activePhase.number) {
            element.active = true;
          }
          else {
            element.active = false;
          }
        });
        this.pageService.getPagesByPhase(this.microsite.activePhase.number).subscribe(data =>
          { this.menuItems = data},
          err => console.error(err),
            () => console.log('done loading menuItems')
          );
      }
      }
    );

  }
  
    //5ec97d156049740c9869f15f
    //Customize menu
    

    navigateToPage(index, type) {
      
      if(type === 'form') {
        this.router.navigate(['/envia-la-teva-proposta']);
      } else if (type === 'voting'){
        this.router.navigate(['/vota']);
      } else {       
        this.router.navigate(['/pressupostos-participatius', index]);
      }
      
    }
}
