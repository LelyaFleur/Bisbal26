import { Component,  Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MediaChange, MediaObserver  } from "@angular/flex-layout";

export interface DialogData {
  button: string;
  url: string;
  file: string;
}

@Component({
  selector: 'app-historial-dialog',
  templateUrl: './historial-dialog.component.html',
  styleUrls: ['./historial-dialog.component.scss']
})
export class HistorialDialogComponent {
  public responsive: string;
  urls  = ['/acceptades', '/valides', '/ja_previstes', '/descartades', '/descartades_o_ja_previstes', '/prioritzades', '/repetides', '/resultats'];
  constructor(
    private media: MediaObserver,
    public dialogRef: MatDialogRef<HistorialDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      media.media$
      .subscribe((change: MediaChange) => {
        // alert(change.mqAlias);
        console.log(change.mqAlias);
        if(change.mqAlias == 'xs'){
         // var widthString = (window.parent.innerWidth.toFixed(0)).toString() + 'px';
          //console.log("widthString", widthString)
          this.responsive = 'xs';
          this.dialogRef.updateSize(`100%`, `100%`);
        }
        else if(change.mqAlias == 'md'){
          this.responsive = 'md';
          this.dialogRef.updateSize(`100%`, `100%`);
        } else if(change.mqAlias == 'sm'){
          this.responsive = 'sm';
          this.dialogRef.updateSize(`100%`, `100%`);
        }
        else{
          this.responsive = 'xl';
          this.dialogRef.updateSize(`768px`, `630px`);
          
        }
      });
    }

  selectionChanged(url) { 
    this.data.file = 'assets/docs/' + url.slice(1) + '.pdf';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
