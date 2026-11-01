import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MediaChange, MediaObserver  } from "@angular/flex-layout";
import { QueryService } from '../services/query.service';
import { QueryInfoService } from '../services/query-info.service';
import { DialogComponent } from './../dialog/dialog.component';

@Component({
  selector: 'app-neighbour',
  templateUrl: './neighbour.component.html',
  styleUrls: ['./neighbour.component.scss']

})
export class NeighbourComponent implements OnInit {
  message;
  color;
  startDate = new Date(1990, 0, 1);
  genders = [
    {value: 'male', viewValue: 'Home'},
    {value: 'female', viewValue: 'Dona'}
  ];

  position = "below";
  /*public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy'
    //editableDateField : false
  };*/
  public user = {
    document : '',
   // birthdate: { date: { year: 2018, month: 10, day: 9 } },
    birthdate: new Date(),
    //gender: "",
    //street: ""
  };

  private locale:string = 'ca';
  public responsive: string;
  queryInfo;
  constructor(public dialogRef: MatDialogRef<NeighbourComponent>, private queryService: QueryService, private queryInfoService: QueryInfoService,
     private media: MediaObserver, public dialog: MatDialog,
    
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
          this.dialogRef.updateSize(`761px`, `636px`);
          
        }
      });
     }

  ngOnInit() {
    
    this.queryInfoService.getQueryInfoByQueryId(this.data.query._id).subscribe(queryInfo => {
      this.queryInfo = queryInfo;                         
    })
  }

  getWeekDay(){
    var d = new Date();
    var weekday = new Array(7);
    weekday[0]=  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var n = weekday[d.getDay()];
    return n;
  };

  generateSecretWord(){
    var secret = "Todayis" + this.getWeekDay() + ".Yeah!";
    return secret;
  };

  openDialog(title, text, close) {
    let dialogRef = this.dialog.open(DialogComponent, {
    width: '350px',
    data: { title: title, text: text }
  });
  dialogRef.afterClosed().subscribe(result => {
    //console.log('The dialog was closed');
    if(close) {
      var res = {
        closed: "ok"
      };
      this.dialogRef.close(res);
    } else {
      var res = {
        closed: "error"
      };
      this.dialogRef.close(res);
    }
    
  });
}

onNoClick(): void {
  var res = {
    closed: "cancel"
  };
  console.log("onSave()");
  this.dialogRef.close(res);
}

public onSave() {
    
  var res = {
    closed: "cancel"
  };
  console.log("onSave()");
  this.dialogRef.close(res)
}


transformDate(date){
  //console.log('value  bithdate:' + date);
  //console.log('day:' + date.getDate());
  //console.log('month:' + date.getMonth());
  var month_number = date.getMonth() + 1;

  var day = (date.getDate() >= 10) ? date.getDate() : "0" + date.getDate();
  var month = (month_number >= 10) ? month_number : "0" + month_number;
  var stringDate = day+ "/" + month + "/" + date.getFullYear();
  
  return stringDate;
}

  vote({form, value, valid}, query) {

    if (valid) {
       value.document = value.document.toUpperCase();
       //console.log('value  title:' + value.DNI);

       value.id = query.query._id;
       value.birthdate = this.transformDate(value.birthdate);
       
       //console.log('value  bithdate:' + value.birthdate);
       //console.log('value  id:' + value.id);
       var submissionDate = new Date(); // Current date and time
    //  var formattedDate = new Intl.DateTimeFormat("en-US", {
      //// timeZone: "Europe/Andorra",
      var submissionDateLocal =  new Date(submissionDate.getTime() - submissionDate.getTimezoneOffset()*60*1000)
//}).format(submissionDate)
       this.queryService.validateUser(value).subscribe(res => {
         //console.log(res);
            if (res == "0") {

                var pollObj = {/*gender : value.gender, street: value.street, */pollId: value.id, document: value.document, submissionDate: submissionDateLocal, submissions: []};

                query.query.proposals.forEach(function(proposal) {
                  if(proposal.checked) {
                    pollObj.submissions.push(proposal._id);
                  }
                });

                this.queryService.vote(pollObj).subscribe(result => {
                //  console.log(result);
                  if(result == "Updated!") {
                   // this.message = "Identificació realitzada correctament. El teu vot s'ha emès.";
                   // this.color = 'green';
                    this.openDialog('Correcte!', this.queryInfo.message1, true);
                    form.reset();
                  }

                });


    		} else if(res == "1") {
          this.message = "La data de naixement no coincideix amb la del padró.";
          this.color = 'red';
    			this.openDialog('Error!', this.queryInfo.message2, false);
    		} else if(res === "2") {
          this.message = "Ja existeix un vot per aquest usuari.";
          this.openDialog('Error!', this.queryInfo.message3, false);
          this.color = 'red';

    		//	this.openDialog('Error!', "Ja existeix un vot per aquest usuari.");

            } else {
              this.message = "Aquesta identificació d’usuari no es troba al padró. Assegura’t que has complert els 16 anys abans del 15 de gener de 2020 i que estiguin empadronades a Sant Gregori abans d’aquesta data, i que has entrat correctament la data de naixement (DD/MM/AAAA).";
              this.color = 'red';
              this.openDialog('Error!', this.queryInfo.message4, false);


               /*   this.proposalService.getProposals().subscribe(proposals => {
                  this.proposalService.proposalsBS.next(proposals);
                  proposals.forEach(function(item) {
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
                        console.log("file:" + item.file);
                        }


                 });
              });*/

            }
       });
    } else {
        //console.log('Form is not valid.');
    }
}

}
