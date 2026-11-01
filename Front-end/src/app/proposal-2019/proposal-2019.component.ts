import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { MediaChange, MediaObserver  } from "@angular/flex-layout";

import { saveAs as importedSaveAs } from "file-saver";
//import { DialogComponent } from './../../components/dialog/dialog.component';

import { ProposalService } from '../services/proposal.service';



@Component({
  selector: 'app-proposal',
  templateUrl: './proposal-2019.component.html',
  styleUrls: ['./proposal-2019.component.css']
})
export class Proposal2019Component implements OnInit {

  public email = new FormControl('', [Validators.required, Validators.email]);
  public edit = false;
  
  public fileName;
  public proposals;

  constructor(public dialogRef: MatDialogRef<Proposal2019Component>, private proposalService: ProposalService,public dialog: MatDialog, private media: MediaObserver,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      media.media$
      .subscribe((change: MediaChange) => {
        // alert(change.mqAlias);
        console.log(change.mqAlias);
        if(change.mqAlias == 'xs'){
         // var widthString = (window.parent.innerWidth.toFixed(0)).toString() + 'px';
          //console.log("widthString", widthString)
          
          this.dialogRef.updateSize(`100%`, `90%`);
        }
        else if(change.mqAlias == 'md'){
          
          this.dialogRef.updateSize(`100%`, `90%`);
        } else if(change.mqAlias == 'sm'){
          
          this.dialogRef.updateSize(`100%`, `90%`);
        }/*
        else{
          
          this.dialogRef.updateSize(`968px`, `830px`);
          
        }*/
      });
     }

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

  filterImage(name) {
    var regex = "Portada";
    var found = name.match(regex);
    if(found) {
      return false;
    } else {
      return true;
    }
  }

 
 /* openWarning(title, text) {
      let dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: { title: title, text: text }
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');

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




  }*/


}
