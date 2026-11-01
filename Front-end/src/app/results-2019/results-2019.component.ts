import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CensusService } from '../services/census.service';

@Component({
  selector: 'app-results',
  templateUrl: './results-2019.component.html',
  styleUrls: ['./results-2019.component.css']
})
export class Results2019Component implements OnInit {

  constructor(public dialogRef: MatDialogRef<Results2019Component>,private censusService: CensusService,  public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

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
