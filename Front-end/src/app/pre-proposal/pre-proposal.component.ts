import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
//import { FileUploader } from 'ng2-file-upload';
import { saveAs as importedSaveAs } from "file-saver";
import { DialogComponent } from '../dialog/dialog.component';

import { ProposalService } from '../services/proposal.service';

//import { baseServer } from 'settings'

@Component({
  selector: 'app-pre-proposal',
  templateUrl: './pre-proposal.component.html',
  styleUrls: ['./pre-proposal.component.scss']
})
export class PreProposalComponent implements OnInit {

  public email = new FormControl('', [Validators.required, Validators.email]);
  public edit = false;
 // public uploader: FileUploader = new FileUploader({url: `${baseServer}/upload`} );
  public fileName;
  public proposals;

  constructor(public dialogRef: MatDialogRef<PreProposalComponent>, private proposalService: ProposalService,public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
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
    this.dialogRef.close(results)
  }

  getFile() {
    var name = this.data.file.slice(14, this.data.file.length);
    this.fileName = "proposata" + this.data.index + name;
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

    selectProposal(item) {
      
      item.checked = !item.checked;
      //console.log("clicked");
      if(item.checked) {
        if(item.selectedProposals === 3) {
          this.openWarning('Atenciò', 'Només es poden seleccionar 3 propostes!');
          item.checked = !item.checked;
        } else {
          item.selectedProposals ++;
        }
      } else {
        item.selectedProposals --;
      }
      item.icon = (item.checked) ? "check_circle" : "radio_button_unchecked";
     
      
      
            
  }


}
