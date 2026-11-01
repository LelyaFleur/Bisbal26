import { Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver  } from "@angular/flex-layout";
import { ActivatedRoute, Router, Params } from '@angular/router';
import { QueryService } from '../services/query.service';
//import { NeighbourComponent } from './../../components/neighbour/neighbour.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Proposal2019Component } from './../proposal-2019/proposal-2019.component';
import { Results2019Component } from './../results-2019/results-2019.component';

//import { DialogComponent } from './../../components/dialog/dialog.component';
//import { InstructionsComponent } from './../../components/instructions/instructions.component';
//import { FaqsComponent } from './../../components/faqs/faqs.component';
//import { ResultsComponent } from './../../components/results/results.component';

var shuffleArray = function(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

var compare = function(a, b) {
  // Use toUpperCase() to ignore character casing
  const votesA = a.votes;
  const votesB = b.votes;

  let comparison = 0;
  if (votesA > votesB) {
    comparison = -1;
  } else if (votesA < votesB) {
    comparison = 1;
  }
  return comparison;
}

@Component({
  selector: 'voting-2019',
  templateUrl: './voting-2019.component.html',
  styleUrls: ['./voting-2019.component.css']
})
export class Voting2019Component implements OnInit {
  queryId;
  phase;
  columnNum = 2;
  selectedProposals = 0;
  proposalItems;  
  canVote = false;
  
  query: any;
  param: any;
  constructor( private route: ActivatedRoute, private router: Router, private queryService: QueryService, media: MediaObserver, public dialog: MatDialog) { 
          
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
      else if(change.mqAlias == 'xl'){
        this.columnNum = 4;
      }
      else{
        this.columnNum = 3;
      }
    });
          }
  

  ngOnInit() {
    //this.route.params.forEach((params: Params) => this.queryId = params['id']);
      //  console.log("Page index: " + this.queryId); 
      this.queryService.getQuery('59f08889fc267a000e46e3b5').subscribe(query => {
                    
                    this.query = query;
                    let winnerProposals = [];
                    let filteredProposals = [];
                    let totalVotesProposal = 0;
                    this.proposalItems = shuffleArray(this.query.proposals);
                   
                    for (let i = 0; i < query.phases.length; i++) {
                            
                             if(query.phases[i].number === query.phase.number){
                               this.phase = query.phases[i];                             
                             }
                    }

                 //   this.query.proposals.sort(compare);

                    this.proposalItems.forEach(function(item) {
                      item.icon = "radio_button_unchecked";
                      item.checked = false;
                      item.images.forEach(function(image) {                      
                        
                        item.color = "whitesmoke";
                          if(image.name === null) {
                            image.name = undefined;
                          }
                            if(image.name !== undefined) {
                              image.name = "assets/images/" + image.name;                           
                            } 
                            
                      });
                      totalVotesProposal += item.votes;
                   /*   if(item.winner) {
                        winnerProposals.push(item);
                      } else {
                        filteredProposals.push(item);
                      }*/
                        
                    });

                  /*     this.query.proposals = [];
                    this.query.proposals = winnerProposals;
                 filteredProposals.forEach(function(pr)  {
                      this.query.proposals.push(pr);
                   });

                   for (let i = 0; i < filteredProposals.length; i++) {
                      this.query.proposals.push(filteredProposals[i]);
                      
                    }*/
                   
                    this.query.totalVotesProposal = totalVotesProposal;   
          });
    }

    

 /*   openWarning(title, text) {
      let dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: { title: title, text: text }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

  openInstructions() {
      
    let dialogRef = this.dialog.open(InstructionsComponent, {
      height: '80hv',
      maxWidth: '100vw'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

  openFAQS() {
      
    let dialogRef = this.dialog.open(FaqsComponent, {
      height: '80hv',
      maxWidth: '100vw'     
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }*/

  openDialog(item, index, admin) {
      
    let dialogRef = this.dialog.open(Proposal2019Component, {     
      height: '70hv',
      maxWidth: '100vw',      
      data: { index: index, id: item._id, title: item.title, description: item.description, location:item.location, images: item.images, cost: item.cost, checked: item.checked, selectedProposals : this.selectedProposals, icon: item.icon, admin: admin }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(result, 'The dialog was closed');
      this.selectedProposals = result.selectedProposals;
      item.checked = result.checked;
      if(item.checked) {
        item.icon = "check_circle";
      }
        else {
          item.icon = "radio_button_unchecked";
      }   
    });
  }

openResults() {
      
    let dialogRef = this.dialog.open(Results2019Component, {
      height: '80hv',
      maxWidth: '100vw',      
      data: { query: this.query}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

    optionSelected = function() {
      var numChecked = 0;
      if(this.query) {
        this.query.proposals.forEach(function(proposal){
            if(proposal.checked) {
              numChecked ++;
            }
        });
      }
      if(numChecked > 3) {
        return false;
      } 
     
      return numChecked ? true : false;
    };

  /*  showDNICheckerDialog() {
     
      let dialogRef = this.dialog.open(NeighbourComponent, {
        width: '360px',
        data: { query : this.query }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        
      });
    }
  
    selectProposal(item, index) {
      
        item.checked = !item.checked;
        if(item.checked) {
          if(this.selectedProposals === 3) {
            this.openWarning('Atenció', 'Només es poden seleccionar 3 propostes!'); 
            item.checked = !item.checked;  
          } else {
            this.selectedProposals ++;
          }        
        } else {
          this.selectedProposals --;
        }

        if(item.checked) {
          item.icon = "check_circle";
        }
          else {
            item.icon = "radio_button_unchecked";
        }       
    }*/

}
