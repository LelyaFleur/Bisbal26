import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MediaChange, MediaObserver  } from "@angular/flex-layout";
import { FormControl, Validators } from '@angular/forms';
//import { MatIconRegistry } from "@angular/material/icon";
//import { FileUploader } from 'ng2-file-upload';
import { saveAs as importedSaveAs } from "file-saver";
import { DialogComponent } from './../dialog/dialog.component';
//import { DomSanitizer } from "@angular/platform-browser";
import { ProposalService } from './../services/proposal.service';

//import { baseServer } from 'settings'

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss']
})
export class ProposalComponent implements OnInit {

  public email = new FormControl('', [Validators.required, Validators.email]);
  public edit = false;
 // public uploader: FileUploader = new FileUploader({url: `${baseServer}/upload`} );
  public fileName;
  public proposals;
  public responsive: string;
  columnNum;
  rowHeight;
  gutterSize;

  constructor(public dialogRef: MatDialogRef<ProposalComponent>, private proposalService: ProposalService, public dialog: MatDialog, private media: MediaObserver, /*private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer,*/
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    /*  this.matIconRegistry.addSvgIcon(
        "icon-checked",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/icons/icon-black-checked.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "icon",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/icons/icon-black.svg")
      );
      this.matIconRegistry = data.iconRegisrty;*/
      if(data.checked) {
        data.icon = "icon-checked-black";
      }
        else {
          data.icon = "icon-black";
      }
      media.media$
      .subscribe((change: MediaChange) => {
        // alert(change.mqAlias);
        console.log(change.mqAlias);
        if(change.mqAlias == 'xs'){
         // var widthString = (window.parent.innerWidth.toFixed(0)).toString() + 'px';
          //console.log("widthString", widthString)
          this.responsive = 'xs';
          this.dialogRef.updateSize(`100%`, `100%`);
          this.columnNum = 1;
          this.rowHeight = 217;            
          this.gutterSize = 16;
        }
        else if(change.mqAlias == 'md'){
          this.responsive = 'md';
          this.columnNum = 2;
          this.rowHeight = 353; 
          this.gutterSize = 36;
          this.dialogRef.updateSize(`100%`, `100%`);
        } else if(change.mqAlias == 'sm'){
          this.responsive = 'sm';
          this.columnNum = 1;
          this.rowHeight = 338;               
          this.gutterSize = 32;
          this.dialogRef.updateSize(`100%`, `100%`);
        }
        else{
          this.responsive = 'xl';
          this.columnNum = 3;
          this.rowHeight = 398;
          this.gutterSize = 31;
          this.dialogRef.updateSize(`768px`, `930px`);
          
        }
      });

    }

  ngOnInit() {
  }

 public onNoClick(): void {
    var results = {
      checked : this.data.checked,
      selectedProposals: this.data.selectedProposals
    };
    this.dialogRef.close(results);
  }

 

  editProposal() {
    this.edit = !this.edit;
  }

  getErrorMessage() {
        return this.email.hasError('required') ? "Heu d'introduir un valor" :
            this.email.hasError('email') ? 'Email invàlid' :
                '';
  } 

  public onSave() {
    
    var results = {
      checked : this.data.checked,      
      selectedProposals: this.data.selectedProposals
    };
  //  console.log(results);
    this.dialogRef.close(results)
  }

  getFile() {
    var name = this.data.file.slice(14, this.data.file.length);
    this.fileName = "proposta" + this.data.index + name;
    this.proposalService.getFile(this.data.id).subscribe(blob => {
            importedSaveAs(blob, this.fileName);            
        }
    )
  }

  removeFile() {
    this.data.file = undefined;
  }

  getFileName () {
    var name = this.data.file.slice(14, this.data.file.length);
    return name;
  }

 /* saveProposal({form, value, valid}, proposal) {
        //console.log("data:" + proposal);
        if (valid) {
           // value.content = CKEDITOR.instances.content.getData();
           value.email = this.email.value;
           if(this.uploader.queue[0]) {
                        value.file = this.uploader.queue[0].file.name;
            }
           
           this.email = new FormControl('', [Validators.required, Validators.email]);
           value.id = proposal.id;
           //console.log('value  title:' + value.title);
           //console.log('value  id:' + value.id);
            this.proposalService.putSaveProposal(value).subscribe(res => {
                if (res == 'there is no such proposal') {
                    
                    setTimeout(function() {
                        this.errorMsg = false;
                    }.bind(this), 2000);
                } else {
                    
                 if(this.uploader.queue[0]) {
                        this.uploader.queue[0].upload();
                    }
                     
                    setTimeout(function() {
                        this.successMsg = false;
                        this.edit = false;
                        this.data.file =  "assets/images/" + value.file;
                    }.bind(this), 1000);

                //    CKEDITOR.instances.content.setData('');

                      this.proposalService.getProposals().subscribe(proposals => {
                      this.proposals = proposals;
                      this.proposals.forEach(function(item) {
                        if(item.checked) {
                          item.color = "#9fd08e";
                        } else{
                          item.color = "whitesmoke";
                        }
              
                        if(item.file === null) {
                          item.file = undefined;
                        }
                          if(item.file !== undefined) {
                            item.file = "assets/images/" + item.file;
                            //console.log("file:" + item.file);
                            }
                
                      
                     });  
                  });
 
                }
            });
        } else {
           // console.log('Form is not valid.');
        }
    }*/

    openWarning(title, text) {
      let dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: { title: title, text: text }
    });
    dialogRef.afterClosed().subscribe(result => {
     
      
    });
  }

    selectProposal() {
      
      this.data.checked = !this.data.checked;
      //console.log("clicked");
      if(this.data.checked) {
        if(this.data.selectedProposals >= this.data.maxSelection) {
          this.openWarning('Atenciò', 'Només es poden seleccionar ' + this.data.maxSelection + ' propostes!');
          this.data.checked = !this.data.checked;
        } else {
          this.data.selectedProposals ++;
        }
      } else {
        this.data.selectedProposals --;
      }

    this.data.icon = (this.data.checked) ? "icon-checked-black" : "icon-black";
            
  }

}
