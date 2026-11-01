import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MediaChange, MediaObserver  } from "@angular/flex-layout";
//import { FileUploader } from 'ng2-file-upload';
//import { ShareButtons } from '@ngx-share/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { PageService } from '../services/page.service';
import { ProposalService } from '../services/proposal.service';
import { QueryService } from '../services/query.service';
import { DialogComponent } from '../dialog/dialog.component';

declare var CKEDITOR: any;

import { baseServer } from '../../settings'

@Component({
  selector: 'app-add-proposal',
  templateUrl: './add-proposal.component.html',
  styleUrls: ['./add-proposal.component.scss']
})
export class AddProposalComponent implements OnInit {

  public text = `Moltes gràcies! Hem rebut la teva proposta. Els serveis tècnics
analitzaran si s’ajusta a les condicions del procés. Recorda que
durant el mes juny o juliol es durà a terme el taller TOP 10 amb
l’objectiu d’escollir (d’entre totes les propostes vàlides rebudes) els
10-15 projectes que passaran a la fase de votació final. Ens
posarem en contacte amb tu per informar-te del dia, l’hora i el lloc.
T’hi esperem! Et garantim que t’ho passaràs bé!`
      
  public file: string;
  public responsive: string;
  public successMsg: boolean = false;
  public errorMsg: boolean = false;
  public title: string;
  public content: string;
  public email = new FormControl('', [Validators.required, Validators.email]);
  public howOptions =  [ "Individualment", "En grup (família, amics, etc.)",
  "Amb els membres d’una entitat."];
  public newProposal = {

      name: "",
      surname: "",
      email: "",
      dni: "",
      direction: "",
      phone: undefined,        
      title: "",
      file: "",
      object: "",
      description: "",
      location: "",
      how : "",
      howEntity: ""
  };

  pages;
  page;

  public newBudget = {        
      order: 0,
      title: "",
      file: "",        
      description: "",
      location: "",
      cost: 0
  };
//  public uploader: FileUploader = new FileUploader({url: `${baseServer}/upload`} );

  constructor(
      private media: MediaObserver,
      private route: ActivatedRoute,
      private router: Router,      
      private pageService: PageService,  
      private proposalService: ProposalService,
      private queryService: QueryService,
      public dialog: MatDialog
               
  ) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      media.media$
  .subscribe((change: MediaChange) => {
    // alert(change.mqAlias);
    console.log(change.mqAlias);
    if(change.mqAlias == 'xs'){
      this.responsive = 'xs';
    }
    else if(change.mqAlias == 'md'){
      this.responsive = 'md';
    } else if(change.mqAlias == 'sm'){
      this.responsive = 'sm';
    }
    else{
      this.responsive = 'xl';
    }
  });
   }

  ngOnInit() {
      this.pageService.getPages().subscribe(pages =>{
          this.pages = pages;
          this.pages.forEach(element => {
              if(element.type.type === 'form') {
                  this.page = element;
              }
              
          });
      })
  }

  getErrorMessage() {
      return this.email.hasError('required') ? "Heu d'introduir un valor" :
          this.email.hasError('email') ? 'Email invàlid' :
              '';
  }

  addProposal({form, value, valid}) {
     
      
      if (valid) {
         // value.content = CKEDITOR.instances.content.getData();
      //   value.email = this.email.value;
     /*    if(this.uploader.queue[0]) {
                      value.file = this.uploader.queue[0].file.name;
          }*/
         
       //  this.email = new FormControl('', [Validators.required, Validators.email]);
         //console.log('value  author:' + value.file);
          this.proposalService.postAddProposal(value).subscribe(res => {
              if (res == 'proposalExists') {
                  console.log('proposalExists');
                  this.openDialog('Atenció!', 'Ja hi ha una proposta amb aquest títol', false);   
                  this.errorMsg = true;
                  setTimeout(function() {
                      this.errorMsg = false;
                  }.bind(this), 5000);
              } else {
                  //console.log("result:" + res);
                  this.successMsg = true;
               /*   if(this.uploader.queue[0]) {
                      this.uploader.queue[0].upload();
                  }*/
                  
                  this.openDialog('Gràcies per fer-nos arribar la teva proposta', this.text, true);                 
                  
                   
                  setTimeout(function() {
                      this.successMsg = false;
                      this.router.navigateByUrl('/');
                  }.bind(this), 5000);

              //    CKEDITOR.instances.content.setData('');

                   /*   this.proposalService.getProposals().subscribe(proposals => {
                      
                  })*/
              }
          });
      } else {
          //console.log('Form is not valid.');
      }
  }

  addProposalToQuery({form, value, valid}) {
     
      
      if (valid) {
         // value.content = CKEDITOR.instances.content.getData();
         
      /*   if(this.uploader.queue[0]) {
                      value.file = this.uploader.queue[0].file.name;
          }*/
         
         
          this.queryService.addProposalToQuery("59f08889fc267a000e46e3b5", value).subscribe(res => {
              if (res == 'proposalExists') {
                  this.errorMsg = true;
                  this.openDialog('Atenció!', 'Ja hi ha una proposta amb aquest títol', true);   
                  setTimeout(function() {
                      this.errorMsg = false;
                  }.bind(this), 2000);
              } else {
                  this.successMsg = true;
               /*   if(this.uploader.queue[0]) {
                      this.uploader.queue[0].upload();
                  }*/
                  
                  this.openDialog('Gràcies per fer-nos arribar la teva proposta', this.text, true);                 
                  
                   
                  setTimeout(function() {
                      this.successMsg = false;
                      this.router.navigateByUrl('/');
                  }.bind(this), 2000);

              //    CKEDITOR.instances.content.setData('');

                    
              }
          });
      } else {
          //console.log('Form is not valid.');
      }
  }


  
  openDialog(title, text, social) {
      
//  innerWidth = window.innerWidth;
  //let width = innerWidth * 0.4;
  //let height = width * 0.82;  
  
    if(this.responsive === 'xs' || this.responsive === 'md' || this.responsive === 'sm') {
          let dialogRef = this.dialog.open(DialogComponent, {
              maxWidth: '100vw',
              maxHeight: '100vh',
              height: '100%',
              width: '100%',
              data: { title: title, text: text, social : social }
              });
              dialogRef.afterClosed().subscribe(result => {
              //console.log('The dialog was closed');
             // this.text = result;
          });
      } else if(this.responsive === 'xl') {
          
        //  var widthString = (width.toFixed(0)).toString() + 'px';
         // var heightString = (height.toFixed(0)).toString() + 'px';
        //  console.log(widthString);
          let dialogRef = this.dialog.open(DialogComponent, {
              height: '768px',
              width: '630px',
             
              data: { title: title, text: text, social : social }
              });
              dialogRef.afterClosed().subscribe(result => {
              console.log('The dialog was closed, inner width', innerWidth);
             
          });
      } else if(this.responsive === 'lg') {
          
     //   var widthString = (width.toFixed(0)).toString() + 'px';
      //  var heightString = (height.toFixed(0)).toString() + 'px';
     //   console.log(widthString);
        let dialogRef = this.dialog.open(DialogComponent, {
            height: '680px',
            width: '558px',
            data: { title: title, text: text, social : social }
            });
            dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed, inner width', innerWidth);
           
        });
    }
     
     
      
}

navigateBack() {
  this.router.navigate(['/pressupostos-participatius']);
}

}