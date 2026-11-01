import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MediaChange, MediaObserver  } from "@angular/flex-layout";
import { CensusService } from '../services/census.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  public responsive: string;
  constructor(public dialogRef: MatDialogRef<ResultsComponent>,private censusService: CensusService,  public dialog: MatDialog, private media: MediaObserver,
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
          this.dialogRef.updateSize(`868px`, `768px`);
          
        }
      });
    }

    censusCount;

  ngOnInit() {
    this.censusService.getCensus().subscribe(census => {
      console.log("Census count:" + census);
      this.censusCount = census;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
