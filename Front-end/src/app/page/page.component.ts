import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MicrositeService } from '../services/microsite.service';
import { PageService } from '../services/page.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  pageIndex;
  phaseNumber;
  adminMode = false;
 // page = {index : undefined}
  private param: any;
  public page: any;
  public pages: any;
  microsite;

  phases = [
      
    {   date : 'del 10 d’abril al 7 de juny de 2020',
        name: 'FASE 1',
        description: `<p style ='margin-top: 0px;'>Del 10 d’abril al 7 de juny qualsevol persona ens pot fer arribar les seves propostes a través del 
        qüestionari d’aquesta plana web.</p>`
    },
    {   date : 'juny-juliol de 2020',
        name: 'FASE 2',
        description: `<p style ='margin-top: 0px;'>Validació tècnica de les propostes rebudes (juny-juliol).</p>`
    },
    {   date : 'setembre de 2020',
        name: 'FASE 3',
        description: `<p style ='margin-top: 0px;'>Taller TOP 10! Jornada participativa per escollir les 10 propostes que passaran a la fase final de votació (setembre).</p> `
    },
    {   date : 'octubre-novembre de 2020',
        name: 'FASE 4',
        description: `<p style ='margin-top: 0px;'>Votació final. Podran votar online o de forma física les persones de 16 i més anys empadronades al municipi (octubre-novembre).</p>`
    },
    {   date : 'any 2022-2026',
        name: 'FASE 5',
        description: `<p style ='margin-top: 0px;'>Execució de les propostes guanyadores (any 2022-2026).</p>`
}

  ]
  

    constructor(
        private route: ActivatedRoute,
        private router: Router, 
        private micrositeService: MicrositeService,       
        private pageService: PageService
       
    ) { }

    ngOnInit() {

      
      this.route.params.forEach((params: Params) => {this.pageIndex = params['index'];
          var href = this.router.url;
          var n = href.search("microsite");        
          if(n !== -1) {
            this.adminMode = true
            this.phaseNumber = params['phaseNumber'];
          }
      
     });
   //   console.log("Page index: " + this.pageIndex); 
      
   /*   if(this.pageIndex === 6) {
        this.page.index = 6;
      } else {
        this.page.index = 0; 
      }*/
      this.micrositeService.getMicrosite('5ec97d156049740c9869f15f').subscribe(data => {
        if(data) {
          this.microsite = data;
           
          if(!this.adminMode) {
            this.phaseNumber = this.microsite.activePhase.number;
          }
          this.pageService.getPage(this.microsite._id, this.pageIndex, this.phaseNumber).subscribe(page => {
            if (page == null) {
                this.router.navigateByUrl('');
            }
            this.page = page;

        /* if (page.sidebar === "yes") {
                this.hasSidebar = true;
                this.sidebarService.getSidebar().subscribe(sidebar => {
                    this.sidebar = sidebar.content;
                });
            } else {
                this.hasSidebar = false;
            }*/
          });
        }
      })
      
  }
     
      checkPageSize() {
         
          if(this.pageIndex == 1 || this.pageIndex == 2) {
              console.log("true");
              return true;
          }
          else {
              console.log("false");
              return false;
          }
      }
      
      navigateBack() {
       
        if(!this.adminMode) {
          this.router.navigate(['/pressupostos-participatius']);
        } else {          
          this.router.navigate(['/microsite-fase', this.phaseNumber]);
        }
        
      }

      navigateDocViewer(url) {
        this.router.navigate([url]);
      }
}
