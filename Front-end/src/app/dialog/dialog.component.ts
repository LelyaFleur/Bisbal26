import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MediaChange, MediaObserver  } from "@angular/flex-layout";
//import { FaIconComponent } from '@fortawesome/angular-fontawesome';
//import { faTwitter } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  public responsive: string;
  constructor(private media: MediaObserver,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
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
        else { 
          
          if(this.data.type === 'undefined') {
            this.data.type = 'short'
          }
          this.responsive = 'xl';
          console.log(this.data.type);
          if(this.data.type === 'short') {
            this.dialogRef.updateSize(`768px`, `630px`);
          } else {
            this.dialogRef.updateSize(`1000px`, `930px`);
          }
         
         // 
          
          
        }
      });
     }

    ngOnInit() {
    
    }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
