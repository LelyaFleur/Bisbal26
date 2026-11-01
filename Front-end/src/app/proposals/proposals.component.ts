import { Component, OnInit, Input } from '@angular/core';
import { MediaChange, MediaObserver  } from "@angular/flex-layout";
import { ProposalService } from './../services/proposal.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PreProposalComponent } from '../pre-proposal/pre-proposal.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { saveAs as importedSaveAs } from "file-saver";


@Component({
  selector: 'proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.css']
})
export class ProposalsComponent implements OnInit {
  proposalItems : any; 
  selectedProposals = 0;
  fileName = "propostes_Bisbal_2026";
  proposals;
  
  @Input() process: string;
  
  
  columnNum = 2;  
  rowHeight = 100;
  gutterSize = 15;
  

constructor(media: MediaObserver, private proposalService: ProposalService, public dialog: MatDialog) {
  media.media$
    .subscribe((change: MediaChange) => {
      // alert(change.mqAlias);
      console.log(change.mqAlias);
      
      if(change.mqAlias == 'xs'){
        this.columnNum = 1;
      }
      else if(change.mqAlias == 'sm'){
        this.columnNum = 2;
      }
      else{
        this.columnNum = 3;
      }
    });
}

  ngOnInit() {
   
    this.proposalService.getProposals().subscribe(proposals => {
            this.proposals = proposals;
            var totalSelectedProposals = 0;
            this.proposals.forEach(function(item) {
              if(item.checked) {
                item.color = "#9fd08e";
                totalSelectedProposals ++;
              } else{
                item.color = "whitesmoke";
              }
              
              if(item.file === null) {
                item.file = undefined;
              }
                if(item.file !== undefined) {
                  item.file = "assets/" + item.file;
                
                }
              
                    
            });
              this.selectedProposals = totalSelectedProposals;
              this.proposalItems = this.proposals;
           
    });
  }

  importToWord() {
    this.proposalService.downloadFile().subscribe(blob => {
      console.log("download file", blob);
            importedSaveAs(blob, this.fileName);            
        }
    )
  }

  openDialog(item, index, admin) {
    var edit = false;
    if(this.process === 'selection') {
      edit = true;
    }
      let dialogRef = this.dialog.open(PreProposalComponent, {
      width: '85vw',
      height: '100hv',
      data: { edit: edit, index: index, id: item._id, name: item.author.name, surname: item.author.surname, dni: item.author.dni,  direction: item.author.direction, phone: item.author.phone, email: item.author.email, location: item.location, how: item.how, howEntity: item.howEntity, title: item.title, description: item.description, object: item.object, file: item.file, cost: item.cost, author: item.author, admin: admin }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

  removeProposals(){
    this.proposalService.deleteProposals().subscribe(res => {
    //  console.log("delete page res:", res);
      if(res === 'ok') {
        this.proposalService.getProposals().subscribe(data =>
          { this.proposals = data;
            this.proposalItems = this.proposals;
          },
          err => console.error(err),
            () => console.log('done loading menuItems')
          );
      }
    })
  }
  
  openConfirmDialog() {
    let title = "Atenció!"
    let text = "Estàs segur que vols eliminar les propostes?"
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { title: title, text: text }
    });
   
  
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.removeProposals();
      }
    });
  }
  

  selectProposal(item, index) {
    
    if(this.process === "selection") {
      item.checked = !item.checked;
      if(item.checked) {
        this.selectedProposals ++;
      } else {
        this.selectedProposals --;
      }
      var value = {
        id: item._id,
        checked: item.checked
      }
   /*   this.proposalService.putSelectProposal(value).subscribe(res => {
        if(res === "ok") {
          item.color = (item.checked) ? "#9fd08e" : "whitesmoke";
        }
        
      });*/
      
      
    } else {
      this.openDialog(item, index, true);
    }
    
  }

  
    

}

  
