import { Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver  } from "@angular/flex-layout";
import { ActivatedRoute, Router, Params } from '@angular/router';
import { QueryService } from '../services/query.service';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { InstructionsComponent } from './../instructions/instructions.component';
import { FaqsComponent } from './../faqs/faqs.component';
import { QueryInfoService } from '../services/query-info.service';
import { NeighbourComponent } from './../neighbour/neighbour.component';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ProposalComponent } from './../proposal/proposal.component';
import { DialogComponent } from './../dialog/dialog.component';
import { ResultsComponent } from './../results/results.component';

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
  selector: 'voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss']
})
export class VotingComponent implements OnInit {
 
  queryId;
  phase;
  columnNum = 2;
  selectedProposals = 0;
  proposalItems;
  canVote = false;
  rowHeight;
  rowHeightResult;
  gutterSize;
  innerWidth = window.innerWidth;
  maxSelection = 3;
  responsive;
  query: any;
  adminMode;
  phaseNumber;
  queryInfo;
  private param: any;
  constructor( private route: ActivatedRoute, private router: Router, private queryService: QueryService, private queryInfoService: QueryInfoService,
    private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, media: MediaObserver, public dialog: MatDialog) { 
      this.route.params.forEach((params: Params) => {
      var href = this.router.url;
      var n = href.search("microsite");        
      if(n !== -1) {
        this.adminMode = true
        this.phaseNumber = params['phaseNumber'];
      }
  
 });    
    media.media$
    .subscribe((change: MediaChange) => {
      // alert(change.mqAlias);
      console.log(change.mqAlias);
      if(change.mqAlias == 'xs'){
        this.columnNum = 1;
        this.rowHeight = 306;  
        this.rowHeightResult = 395;     
        this.gutterSize = 16;
        this.responsive = 'xs';
      }
      else if(change.mqAlias == 'md'){
        this.columnNum = 2;
        this.rowHeight = 485;  
        this.rowHeightResult = 632;       
        this.gutterSize = 36;
        this.responsive = 'md';

      } else if(change.mqAlias == 'sm'){
        this.columnNum = 2;
        this.rowHeight = 363;  
        this.rowHeightResult = 473;      
        this.gutterSize = 32;
        this.responsive = 'sm';
      }
      else{
        this.columnNum = 3;
        this.rowHeight = 461;
        this.rowHeightResult = 584; 
        //this.rowHeight = 483;
        this.gutterSize = 31;
        this.responsive = 'xl';
      }
    });
          }
    ngOnInit(): void {  
    //this.route.params.forEach((params: Params) => this.queryId = params['id']);
      //  console.log("Page index: " + this.queryId);
      this.queryService.getQuery('5edbdc21f2a89440b63dabe2').subscribe(query => {

                    this.query = query;
                    let winnerProposals = [];
                    let filteredProposals = [];
                    let totalVotesProposal = 0;
                    this.proposalItems = shuffleArray(this.query.proposals);

                    this.proposalItems.forEach(function(item) {
                      item.icon = "icon";
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
                    });
                    this.query.totalVotesProposal = totalVotesProposal;
                    this.queryInfoService.getQueryInfoByQueryId(this.query._id).subscribe(queryInfo => {
                      this.queryInfo = queryInfo;   
                      this.maxSelection =  this.queryInfo.maxSelection;                 
                    })
          });
    }



   openWarning(title, text) {
      let dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: { title: title, text: text }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  openFAQS() {

    let dialogRef = this.dialog.open(FaqsComponent, {
      height: '80hv',
      maxWidth: '100vw',
      data: { info: this.queryInfo.faqs }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  openInstructions() {

    let dialogRef = this.dialog.open(InstructionsComponent, {
      height: '80hv',
      maxWidth: '100vw',
      data: { info: this.queryInfo.instructions }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  openDialog(item, index, admin) {

    let dialogRef = this.dialog.open(ProposalComponent, {
      height: '70hv',
      maxWidth: '100vw',
      minWidth: '60vw',
      data: { index: index, id: item._id, title: item.title, description: item.description, location:item.location, images: item.images, cost: item.cost, checked: item.checked, selectedProposals : this.selectedProposals, icon: item.icon, admin: admin, maxSelection: this.maxSelection }
    });

    dialogRef.afterClosed().subscribe(result => {
    //  console.log(result, 'The dialog was closed');
      this.selectedProposals = result.selectedProposals;
      item.checked = result.checked;
    //  console.log('icon:', item.checked);
    /*  this.matIconRegistry.addSvgIcon(
        "icon-checked",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/icons/icon-checked.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "icon",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/icons/icon.svg")
      );*/
      if(item.checked) {
        item.icon = "icon-checked";
      }
        else {
          item.icon = "icon";
      }
    });
  }

  openResults() {

    let dialogRef = this.dialog.open(ResultsComponent, {
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
     if(numChecked > this.maxSelection) {
        return false;
      }

      return numChecked ? true : false;
    };

    showDNICheckerDialog() {

      let dialogRef = this.dialog.open(NeighbourComponent, {
        width: '360px',
        data: { query : this.query }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if(result.closed === 'ok' || result.closed === 'error') {
            
            this.selectedProposals = 0;
        
            for (let i = 0; i < this.proposalItems.length; i++) {
              this.proposalItems[i].icon = "icon";
              this.proposalItems[i].checked = false;
            }
        }
      });
    }

    selectProposal(item) {

        item.checked = !item.checked;
        if(item.checked) {
          if(this.selectedProposals >= this.maxSelection) {
            this.openWarning('Atenció', 'Només es poden seleccionar ' + this.maxSelection +'  propostes!');
            item.checked = !item.checked;
          } else {
            this.selectedProposals ++;
          }
        } else {
          this.selectedProposals --;
        }

        if(item.checked) {
          item.icon = "icon-checked";
        }
          else {
            item.icon = "icon";
        }
    }

    detectColor(item) {
      /* if (item.checked) {
         return (item.order === 1) ? '#B93D25' : '#f44336';
       } else {
         return '#F3F3F3';
       }*/
       if (item.checked) {
         return  '#B93D25';
       } else {
         return '#F3F3F3';
       }
     } 
  
     detectColorResult(item) {
    
      return (item.winner) ? '#B93D25' : '#333333';
   
  }

  detectOpacity(item) {
    return (item.checked) ? '1' : '0.5';
  }

  navigateBack() {
       
    if(!this.adminMode) {
      this.router.navigate(['/pressupostos-participatius']);
    } else {          
      this.router.navigate(['/microsite-fase', this.phaseNumber]);
    }
    
  }
 

}
