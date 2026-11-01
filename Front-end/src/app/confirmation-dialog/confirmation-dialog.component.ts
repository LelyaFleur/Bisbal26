import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MediaChange, MediaObserver  } from "@angular/flex-layout";

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  public responsive: string;
  constructor(private media: MediaObserver,
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      
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
          this.dialogRef.updateSize(`568px`, `330px`);
          
        }
      });
     }

    ngOnInit() {
    
    }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

}
