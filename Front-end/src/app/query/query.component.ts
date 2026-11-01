import { Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver  } from "@angular/flex-layout";
import { ActivatedRoute, Router, Params } from '@angular/router';
import { QueryService } from '../services/query.service';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { InstructionsComponent } from './../instructions/instructions.component';
import { FaqsComponent } from './../faqs/faqs.component';
import { NeighbourComponent } from './../neighbour/neighbour.component';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { QueryInfoService } from '../services/query-info.service';
import { ProposalComponent } from './../proposal/proposal.component';
import { DialogComponent } from './../dialog/dialog.component';
import { ResultsComponent } from './../results/results.component';
import { ExportService } from '../services/export.service';
import { ConfirmationDialogComponent } from './../confirmation-dialog/confirmation-dialog.component';
import * as DocumentEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/ca.js';
//import { DialogComponent } from './../../components/dialog/dialog.component';
//import { InstructionsComponent } from './../../components/instructions/instructions.component';
//import { FaqsComponent } from './../../components/faqs/faqs.component';
//import { ResultsComponent } from './../../components/results/results.component';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnInit {
  queryId;
  phase;
  columnNum = 2;
  selectedProposals = 0;
  proposalItems;
  rowHeight;
  rowHeightResult;
  gutterSize
  canVote = false;
  maxSelection = 3;
  responsive;
  oldMessage;  
  editMessageMode = false;
  query: any;
  queryInfo;
  param: any;
  public Editor1; 
  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );    
  } 
  constructor( private route: ActivatedRoute, private router: Router, private queryService: QueryService, private queryInfoService: QueryInfoService, private exportService: ExportService,
    private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, media: MediaObserver, public dialog: MatDialog) { 
      this.Editor1 = DocumentEditor;   

      DocumentEditor.defaultConfig = {
        toolbar: {
            items: [
                'heading',
                '|',
                'bold',
                'italic',
                'fontSize',
                'fontColor',
                'fontBackgroundColor',               
                'link',
                'alignment',
                'bulletedList',
                'numberedList',                           
                'blockQuote',
                'indent',
                'outdent',
                'insertTable',
                'undo',
                'redo'
            ]
        },
        fontColor: {
          columns: 10,
          documentColors: 200,
          colors: [
        /* {color:'rgb(152, 146, 52)' ,label:' '},*/ {color: 'hsl(6, 54%, 95%)', label:' '}, {color: 'hsl(6, 54%, 89%)', label:' '}, {color: 'hsl(6, 54%, 78%)', label:' '}, {color: 'hsl(6, 54%, 68%)', label:' '}, {color: 'hsl(6, 54%, 57%)', label:' '}, {color: 'hsl(6, 63%, 46%)', label:' '}, {color: 'hsl(6, 63%, 41%)', label:' '}, {color: 'hsl(6, 63%, 35%)', label:' '}, {color: 'hsl(6, 63%, 29%)', label:' '}, {color: 'hsl(6, 63%, 24%)', label:' '}, {color: 'hsl(6, 78%, 96%)', label:' '}, {color: 'hsl(6, 78%, 91%)', label:' '}, {color: 'hsl(6, 78%, 83%)', label:' '}, {color: 'hsl(6, 78%, 74%)', label:' '}, {color: 'hsl(6, 78%, 66%)', label:' '}, {color: 'hsl(6, 78%, 57%)', label:' '}, {color: 'hsl(6, 59%, 50%)', label:' '}, {color: 'hsl(6, 59%, 43%)', label:' '}, {color: 'hsl(6, 59%, 37%)', label:' '}, {color: 'hsl(6, 59%, 30%)', label:' '}, {color: 'hsl(283, 39%, 95%)', label:' '}, {color: 'hsl(283, 39%, 91%)', label:' '}, {color: 'hsl(283, 39%, 81%)', label:' '}, {color: 'hsl(283, 39%, 72%)', label:' '}, {color: 'hsl(283, 39%, 63%)', label:' '}, {color: 'hsl(283, 39%, 53%)', label:' '}, {color: 'hsl(283, 34%, 47%)', label:' '}, {color: 'hsl(283, 34%, 40%)', label:' '}, {color: 'hsl(283, 34%, 34%)', label:' '}, {color: 'hsl(283, 34%, 28%)', label:' '}, {color: 'hsl(282, 39%, 95%)', label:' '}, {color: 'hsl(282, 39%, 89%)', label:' '}, {color: 'hsl(282, 39%, 79%)', label:' '}, {color: 'hsl(282, 39%, 68%)', label:' '}, {color: 'hsl(282, 39%, 58%)', label:' '}, {color: 'hsl(282, 44%, 47%)', label:' '}, {color: 'hsl(282, 44%, 42%)', label:' '}, {color: 'hsl(282, 44%, 36%)', label:' '}, {color: 'hsl(282, 44%, 30%)', label:' '}, {color: 'hsl(282, 44%, 25%)', label:' '}, {color: 'hsl(204, 51%, 94%)', label:' '}, {color: 'hsl(204, 51%, 89%)', label:' '}, {color: 'hsl(204, 51%, 78%)', label:' '}, {color: 'hsl(204, 51%, 67%)', label:' '}, {color: 'hsl(204, 51%, 55%)', label:' '}, {color: 'hsl(204, 64%, 44%)', label:' '}, {color: 'hsl(204, 64%, 39%)', label:' '}, {color: 'hsl(204, 64%, 34%)', label:' '}, {color: 'hsl(204, 64%, 28%)', label:' '}, {color: 'hsl(204, 64%, 23%)', label:' '}, {color: 'hsl(204, 70%, 95%)', label:' '}, {color: 'hsl(204, 70%, 91%)', label:' '}, {color: 'hsl(204, 70%, 81%)', label:' '}, {color: 'hsl(204, 70%, 72%)', label:' '}, {color: 'hsl(204, 70%, 63%)', label:' '}, {color: 'hsl(204, 70%, 53%)', label:' '}, {color: 'hsl(204, 62%, 47%)', label:' '}, {color: 'hsl(204, 62%, 40%)', label:' '}, {color: 'hsl(204, 62%, 34%)', label:' '}, {color: 'hsl(204, 62%, 28%)', label:' '}, {color: 'hsl(168, 55%, 94%)', label:' '}, {color: 'hsl(168, 55%, 88%)', label:' '}, {color: 'hsl(168, 55%, 77%)', label:' '}, {color: 'hsl(168, 55%, 65%)', label:' '}, {color: 'hsl(168, 55%, 54%)', label:' '}, {color: 'hsl(168, 76%, 42%)', label:' '}, {color: 'hsl(168, 76%, 37%)', label:' '}, {color: 'hsl(168, 76%, 32%)', label:' '}, {color: 'hsl(168, 76%, 27%)', label:' '}, {color: 'hsl(168, 76%, 22%)', label:' '}, {color: 'hsl(168, 42%, 94%)', label:' '}, {color: 'hsl(168, 42%, 87%)', label:' '}, {color: 'hsl(168, 42%, 74%)', label:' '}, {color: 'hsl(168, 42%, 61%)', label:' '}, {color: 'hsl(168, 45%, 49%)', label:' '}, {color: 'hsl(168, 76%, 36%)', label:' '}, {color: 'hsl(168, 76%, 31%)', label:' '}, {color: 'hsl(168, 76%, 27%)', label:' '}, {color: 'hsl(168, 76%, 23%)', label:' '}, {color: 'hsl(168, 76%, 19%)', label:' '}, {color: 'hsl(145, 45%, 94%)', label:' '}, {color: 'hsl(145, 45%, 88%)', label:' '}, {color: 'hsl(145, 45%, 77%)', label:' '}, {color: 'hsl(145, 45%, 65%)', label:' '}, {color: 'hsl(145, 45%, 53%)', label:' '}, {color: 'hsl(145, 63%, 42%)', label:' '}, {color: 'hsl(145, 63%, 37%)', label:' '}, {color: 'hsl(145, 63%, 32%)', label:' '}, {color: 'hsl(145, 63%, 27%)', label:' '}, {color: 'hsl(145, 63%, 22%)', label:' '}, {color: 'hsl(145, 61%, 95%)', label:' '}, {color: 'hsl(145, 61%, 90%)', label:' '}, {color: 'hsl(145, 61%, 80%)', label:' '}, {color: 'hsl(145, 61%, 69%)', label:' '}, {color: 'hsl(145, 61%, 59%)', label:' '}, {color: 'hsl(145, 63%, 49%)', label:' '}, {color: 'hsl(145, 63%, 43%)', label:' '}, {color: 'hsl(145, 63%, 37%)', label:' '}, {color: 'hsl(145, 63%, 31%)', label:' '}, {color: 'hsl(145, 63%, 25%)', label:' '}, {color: 'hsl(48, 89%, 95%)', label:' '}, {color: 'hsl(48, 89%, 90%)', label:' '}, {color: 'hsl(48, 89%, 80%)', label:' '}, {color: 'hsl(48, 89%, 70%)', label:' '}, {color: 'hsl(48, 89%, 60%)', label:' '}, {color: 'hsl(48, 89%, 50%)', label:' '}, {color: 'hsl(48, 88%, 44%)', label:' '}, {color: 'hsl(48, 88%, 38%)', label:' '}, {color: 'hsl(48, 88%, 32%)', label:' '}, {color: 'hsl(48, 88%, 26%)', label:' '}, {color: 'hsl(37, 90%, 95%)', label:' '}, {color: 'hsl(37, 90%, 90%)', label:' '}, {color: 'hsl(37, 90%, 80%)', label:' '}, {color: 'hsl(37, 90%, 71%)', label:' '}, {color: 'hsl(37, 90%, 61%)', label:' '}, {color: 'hsl(37, 90%, 51%)', label:' '}, {color: 'hsl(37, 86%, 45%)', label:' '}, {color: 'hsl(37, 86%, 39%)', label:' '}, {color: 'hsl(37, 86%, 33%)', label:' '}, {color: 'hsl(37, 86%, 27%)', label:' '}, {color: 'hsl(28, 80%, 95%)', label:' '}, {color: 'hsl(28, 80%, 90%)', label:' '}, {color: 'hsl(28, 80%, 81%)', label:' '}, {color: 'hsl(28, 80%, 71%)', label:' '}, {color: 'hsl(28, 80%, 61%)', label:' '}, {color: 'hsl(28, 80%, 52%)', label:' '}, {color: 'hsl(28, 74%, 46%)', label:' '}, {color: 'hsl(28, 74%, 39%)', label:' '}, {color: 'hsl(28, 74%, 33%)', label:' '}, {color: 'hsl(28, 74%, 27%)', label:' '}, {color: 'hsl(24, 71%, 94%)', label:' '}, {color: 'hsl(24, 71%, 88%)', label:' '}, {color: 'hsl(24, 71%, 77%)', label:' '}, {color: 'hsl(24, 71%, 65%)', label:' '}, {color: 'hsl(24, 71%, 53%)', label:' '}, {color: 'hsl(24, 100%, 41%)', label:' '}, {color: 'hsl(24, 100%, 36%)', label:' '}, {color: 'hsl(24, 100%, 31%)', label:' '}, {color: 'hsl(24, 100%, 26%)', label:' '}, {color: 'hsl(24, 100%, 22%)', label:' '}, {color: 'hsl(192, 15%, 99%)', label:' '}, {color: 'hsl(192, 15%, 99%)', label:' '}, {color: 'hsl(192, 15%, 97%)', label:' '}, {color: 'hsl(192, 15%, 96%)', label:' '}, {color: 'hsl(192, 15%, 95%)', label:' '}, {color: 'hsl(192, 15%, 94%)', label:' '}, {color: 'hsl(192, 5%, 82%)', label:' '}, {color: 'hsl(192, 3%, 71%)', label:' '}, {color: 'hsl(192, 2%, 60%)', label:' '}, {color: 'hsl(192, 1%, 49%)', label:' '}, {color: 'hsl(204, 8%, 98%)', label:' '}, {color: 'hsl(204, 8%, 95%)', label:' '}, {color: 'hsl(204, 8%, 90%)', label:' '}, {color: 'hsl(204, 8%, 86%)', label:' '}, {color: 'hsl(204, 8%, 81%)', label:' '}, {color: 'hsl(204, 8%, 76%)', label:' '}, {color: 'hsl(204, 5%, 67%)', label:' '}, {color: 'hsl(204, 4%, 58%)', label:' '}, {color: 'hsl(204, 3%, 49%)', label:' '}, {color: 'hsl(204, 3%, 40%)', label:' '}, {color: 'hsl(184, 9%, 96%)', label:' '}, {color: 'hsl(184, 9%, 92%)', label:' '}, {color: 'hsl(184, 9%, 85%)', label:' '}, {color: 'hsl(184, 9%, 77%)', label:' '}, {color: 'hsl(184, 9%, 69%)', label:' '}, {color: 'hsl(184, 9%, 62%)', label:' '}, {color: 'hsl(184, 6%, 54%)', label:' '}, {color: 'hsl(184, 5%, 47%)', label:' '}, {color: 'hsl(184, 5%, 40%)', label:' '}, {color: 'hsl(184, 5%, 32%)', label:' '}, {color: 'hsl(184, 6%, 95%)', label:' '}, {color: 'hsl(184, 6%, 91%)', label:' '}, {color: 'hsl(184, 6%, 81%)', label:' '}, {color: 'hsl(184, 6%, 72%)', label:' '}, {color: 'hsl(184, 6%, 62%)', label:' '}, {color: 'hsl(184, 6%, 53%)', label:' '}, {color: 'hsl(184, 5%, 46%)', label:' '}, {color: 'hsl(184, 5%, 40%)', label:' '}, {color: 'hsl(184, 5%, 34%)', label:' '}, {color: 'hsl(184, 5%, 27%)', label:' '}, {color: 'hsl(210, 12%, 93%)', label:' '}, {color: 'hsl(210, 12%, 86%)', label:' '}, {color: 'hsl(210, 12%, 71%)', label:' '}, {color: 'hsl(210, 12%, 57%)', label:' '}, {color: 'hsl(210, 15%, 43%)', label:' '}, {color: 'hsl(210, 29%, 29%)', label:' '}, {color: 'hsl(210, 29%, 25%)', label:' '}, {color: 'hsl(210, 29%, 22%)', label:' '}, {color: 'hsl(210, 29%, 18%)', label:' '}, {color: 'hsl(210, 29%, 15%)', label:' '}, {color: 'hsl(210, 9%, 92%)', label:' '}, {color: 'hsl(210, 9%, 85%)', label:' '}, {color: 'hsl(210, 9%, 70%)', label:' '}, {color: 'hsl(210, 9%, 55%)', label:' '}, {color: 'hsl(210, 14%, 39%)', label:' '}, {color: 'hsl(210, 29%, 24%)', label:' '}, {color: 'hsl(210, 29%, 21%)', label:' '}, {color: 'hsl(210, 29%, 18%)', label:' '}, {color: 'hsl(210, 29%, 16%)', label:' '}, {color: 'hsl(210, 29%, 13%)', label:' '}
          ]
          },
          fontBackgroundColor: {
            columns: 10,
            documentColors: 200,
            colors: [
            {color: 'hsl(6, 54%, 95%)', label:' '}, {color: 'hsl(6, 54%, 89%)', label:' '}, {color: 'hsl(6, 54%, 78%)', label:' '}, {color: 'hsl(6, 54%, 68%)', label:' '}, {color: 'hsl(6, 54%, 57%)', label:' '}, {color: 'hsl(6, 63%, 46%)', label:' '}, {color: 'hsl(6, 63%, 41%)', label:' '}, {color: 'hsl(6, 63%, 35%)', label:' '}, {color: 'hsl(6, 63%, 29%)', label:' '}, {color: 'hsl(6, 63%, 24%)', label:' '}, {color: 'hsl(6, 78%, 96%)', label:' '}, {color: 'hsl(6, 78%, 91%)', label:' '}, {color: 'hsl(6, 78%, 83%)', label:' '}, {color: 'hsl(6, 78%, 74%)', label:' '}, {color: 'hsl(6, 78%, 66%)', label:' '}, {color: 'hsl(6, 78%, 57%)', label:' '}, {color: 'hsl(6, 59%, 50%)', label:' '}, {color: 'hsl(6, 59%, 43%)', label:' '}, {color: 'hsl(6, 59%, 37%)', label:' '}, {color: 'hsl(6, 59%, 30%)', label:' '}, {color: 'hsl(283, 39%, 95%)', label:' '}, {color: 'hsl(283, 39%, 91%)', label:' '}, {color: 'hsl(283, 39%, 81%)', label:' '}, {color: 'hsl(283, 39%, 72%)', label:' '}, {color: 'hsl(283, 39%, 63%)', label:' '}, {color: 'hsl(283, 39%, 53%)', label:' '}, {color: 'hsl(283, 34%, 47%)', label:' '}, {color: 'hsl(283, 34%, 40%)', label:' '}, {color: 'hsl(283, 34%, 34%)', label:' '}, {color: 'hsl(283, 34%, 28%)', label:' '}, {color: 'hsl(282, 39%, 95%)', label:' '}, {color: 'hsl(282, 39%, 89%)', label:' '}, {color: 'hsl(282, 39%, 79%)', label:' '}, {color: 'hsl(282, 39%, 68%)', label:' '}, {color: 'hsl(282, 39%, 58%)', label:' '}, {color: 'hsl(282, 44%, 47%)', label:' '}, {color: 'hsl(282, 44%, 42%)', label:' '}, {color: 'hsl(282, 44%, 36%)', label:' '}, {color: 'hsl(282, 44%, 30%)', label:' '}, {color: 'hsl(282, 44%, 25%)', label:' '}, {color: 'hsl(204, 51%, 94%)', label:' '}, {color: 'hsl(204, 51%, 89%)', label:' '}, {color: 'hsl(204, 51%, 78%)', label:' '}, {color: 'hsl(204, 51%, 67%)', label:' '}, {color: 'hsl(204, 51%, 55%)', label:' '}, {color: 'hsl(204, 64%, 44%)', label:' '}, {color: 'hsl(204, 64%, 39%)', label:' '}, {color: 'hsl(204, 64%, 34%)', label:' '}, {color: 'hsl(204, 64%, 28%)', label:' '}, {color: 'hsl(204, 64%, 23%)', label:' '}, {color: 'hsl(204, 70%, 95%)', label:' '}, {color: 'hsl(204, 70%, 91%)', label:' '}, {color: 'hsl(204, 70%, 81%)', label:' '}, {color: 'hsl(204, 70%, 72%)', label:' '}, {color: 'hsl(204, 70%, 63%)', label:' '}, {color: 'hsl(204, 70%, 53%)', label:' '}, {color: 'hsl(204, 62%, 47%)', label:' '}, {color: 'hsl(204, 62%, 40%)', label:' '}, {color: 'hsl(204, 62%, 34%)', label:' '}, {color: 'hsl(204, 62%, 28%)', label:' '}, {color: 'hsl(168, 55%, 94%)', label:' '}, {color: 'hsl(168, 55%, 88%)', label:' '}, {color: 'hsl(168, 55%, 77%)', label:' '}, {color: 'hsl(168, 55%, 65%)', label:' '}, {color: 'hsl(168, 55%, 54%)', label:' '}, {color: 'hsl(168, 76%, 42%)', label:' '}, {color: 'hsl(168, 76%, 37%)', label:' '}, {color: 'hsl(168, 76%, 32%)', label:' '}, {color: 'hsl(168, 76%, 27%)', label:' '}, {color: 'hsl(168, 76%, 22%)', label:' '}, {color: 'hsl(168, 42%, 94%)', label:' '}, {color: 'hsl(168, 42%, 87%)', label:' '}, {color: 'hsl(168, 42%, 74%)', label:' '}, {color: 'hsl(168, 42%, 61%)', label:' '}, {color: 'hsl(168, 45%, 49%)', label:' '}, {color: 'hsl(168, 76%, 36%)', label:' '}, {color: 'hsl(168, 76%, 31%)', label:' '}, {color: 'hsl(168, 76%, 27%)', label:' '}, {color: 'hsl(168, 76%, 23%)', label:' '}, {color: 'hsl(168, 76%, 19%)', label:' '}, {color: 'hsl(145, 45%, 94%)', label:' '}, {color: 'hsl(145, 45%, 88%)', label:' '}, {color: 'hsl(145, 45%, 77%)', label:' '}, {color: 'hsl(145, 45%, 65%)', label:' '}, {color: 'hsl(145, 45%, 53%)', label:' '}, {color: 'hsl(145, 63%, 42%)', label:' '}, {color: 'hsl(145, 63%, 37%)', label:' '}, {color: 'hsl(145, 63%, 32%)', label:' '}, {color: 'hsl(145, 63%, 27%)', label:' '}, {color: 'hsl(145, 63%, 22%)', label:' '}, {color: 'hsl(145, 61%, 95%)', label:' '}, {color: 'hsl(145, 61%, 90%)', label:' '}, {color: 'hsl(145, 61%, 80%)', label:' '}, {color: 'hsl(145, 61%, 69%)', label:' '}, {color: 'hsl(145, 61%, 59%)', label:' '}, {color: 'hsl(145, 63%, 49%)', label:' '}, {color: 'hsl(145, 63%, 43%)', label:' '}, {color: 'hsl(145, 63%, 37%)', label:' '}, {color: 'hsl(145, 63%, 31%)', label:' '}, {color: 'hsl(145, 63%, 25%)', label:' '}, {color: 'hsl(48, 89%, 95%)', label:' '}, {color: 'hsl(48, 89%, 90%)', label:' '}, {color: 'hsl(48, 89%, 80%)', label:' '}, {color: 'hsl(48, 89%, 70%)', label:' '}, {color: 'hsl(48, 89%, 60%)', label:' '}, {color: 'hsl(48, 89%, 50%)', label:' '}, {color: 'hsl(48, 88%, 44%)', label:' '}, {color: 'hsl(48, 88%, 38%)', label:' '}, {color: 'hsl(48, 88%, 32%)', label:' '}, {color: 'hsl(48, 88%, 26%)', label:' '}, {color: 'hsl(37, 90%, 95%)', label:' '}, {color: 'hsl(37, 90%, 90%)', label:' '}, {color: 'hsl(37, 90%, 80%)', label:' '}, {color: 'hsl(37, 90%, 71%)', label:' '}, {color: 'hsl(37, 90%, 61%)', label:' '}, {color: 'hsl(37, 90%, 51%)', label:' '}, {color: 'hsl(37, 86%, 45%)', label:' '}, {color: 'hsl(37, 86%, 39%)', label:' '}, {color: 'hsl(37, 86%, 33%)', label:' '}, {color: 'hsl(37, 86%, 27%)', label:' '}, {color: 'hsl(28, 80%, 95%)', label:' '}, {color: 'hsl(28, 80%, 90%)', label:' '}, {color: 'hsl(28, 80%, 81%)', label:' '}, {color: 'hsl(28, 80%, 71%)', label:' '}, {color: 'hsl(28, 80%, 61%)', label:' '}, {color: 'hsl(28, 80%, 52%)', label:' '}, {color: 'hsl(28, 74%, 46%)', label:' '}, {color: 'hsl(28, 74%, 39%)', label:' '}, {color: 'hsl(28, 74%, 33%)', label:' '}, {color: 'hsl(28, 74%, 27%)', label:' '}, {color: 'hsl(24, 71%, 94%)', label:' '}, {color: 'hsl(24, 71%, 88%)', label:' '}, {color: 'hsl(24, 71%, 77%)', label:' '}, {color: 'hsl(24, 71%, 65%)', label:' '}, {color: 'hsl(24, 71%, 53%)', label:' '}, {color: 'hsl(24, 100%, 41%)', label:' '}, {color: 'hsl(24, 100%, 36%)', label:' '}, {color: 'hsl(24, 100%, 31%)', label:' '}, {color: 'hsl(24, 100%, 26%)', label:' '}, {color: 'hsl(24, 100%, 22%)', label:' '}, {color: 'hsl(192, 15%, 99%)', label:' '}, {color: 'hsl(192, 15%, 99%)', label:' '}, {color: 'hsl(192, 15%, 97%)', label:' '}, {color: 'hsl(192, 15%, 96%)', label:' '}, {color: 'hsl(192, 15%, 95%)', label:' '}, {color: 'hsl(192, 15%, 94%)', label:' '}, {color: 'hsl(192, 5%, 82%)', label:' '}, {color: 'hsl(192, 3%, 71%)', label:' '}, {color: 'hsl(192, 2%, 60%)', label:' '}, {color: 'hsl(192, 1%, 49%)', label:' '}, {color: 'hsl(204, 8%, 98%)', label:' '}, {color: 'hsl(204, 8%, 95%)', label:' '}, {color: 'hsl(204, 8%, 90%)', label:' '}, {color: 'hsl(204, 8%, 86%)', label:' '}, {color: 'hsl(204, 8%, 81%)', label:' '}, {color: 'hsl(204, 8%, 76%)', label:' '}, {color: 'hsl(204, 5%, 67%)', label:' '}, {color: 'hsl(204, 4%, 58%)', label:' '}, {color: 'hsl(204, 3%, 49%)', label:' '}, {color: 'hsl(204, 3%, 40%)', label:' '}, {color: 'hsl(184, 9%, 96%)', label:' '}, {color: 'hsl(184, 9%, 92%)', label:' '}, {color: 'hsl(184, 9%, 85%)', label:' '}, {color: 'hsl(184, 9%, 77%)', label:' '}, {color: 'hsl(184, 9%, 69%)', label:' '}, {color: 'hsl(184, 9%, 62%)', label:' '}, {color: 'hsl(184, 6%, 54%)', label:' '}, {color: 'hsl(184, 5%, 47%)', label:' '}, {color: 'hsl(184, 5%, 40%)', label:' '}, {color: 'hsl(184, 5%, 32%)', label:' '}, {color: 'hsl(184, 6%, 95%)', label:' '}, {color: 'hsl(184, 6%, 91%)', label:' '}, {color: 'hsl(184, 6%, 81%)', label:' '}, {color: 'hsl(184, 6%, 72%)', label:' '}, {color: 'hsl(184, 6%, 62%)', label:' '}, {color: 'hsl(184, 6%, 53%)', label:' '}, {color: 'hsl(184, 5%, 46%)', label:' '}, {color: 'hsl(184, 5%, 40%)', label:' '}, {color: 'hsl(184, 5%, 34%)', label:' '}, {color: 'hsl(184, 5%, 27%)', label:' '}, {color: 'hsl(210, 12%, 93%)', label:' '}, {color: 'hsl(210, 12%, 86%)', label:' '}, {color: 'hsl(210, 12%, 71%)', label:' '}, {color: 'hsl(210, 12%, 57%)', label:' '}, {color: 'hsl(210, 15%, 43%)', label:' '}, {color: 'hsl(210, 29%, 29%)', label:' '}, {color: 'hsl(210, 29%, 25%)', label:' '}, {color: 'hsl(210, 29%, 22%)', label:' '}, {color: 'hsl(210, 29%, 18%)', label:' '}, {color: 'hsl(210, 29%, 15%)', label:' '}, {color: 'hsl(210, 9%, 92%)', label:' '}, {color: 'hsl(210, 9%, 85%)', label:' '}, {color: 'hsl(210, 9%, 70%)', label:' '}, {color: 'hsl(210, 9%, 55%)', label:' '}, {color: 'hsl(210, 14%, 39%)', label:' '}, {color: 'hsl(210, 29%, 24%)', label:' '}, {color: 'hsl(210, 29%, 21%)', label:' '}, {color: 'hsl(210, 29%, 18%)', label:' '}, {color: 'hsl(210, 29%, 16%)', label:' '}, {color: 'hsl(210, 29%, 13%)', label:' '}
            ]
            },
        language: 'ca'
    };
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


  ngOnInit() {
    this.route.params.forEach((params: Params) => this.queryId = params['id']);
        //console.log("Page index: " + this.queryId);
        this.queryService.getQuery(this.queryId).subscribe(query => {

                    this.query = query;
                    this.oldMessage = JSON.parse(JSON.stringify(this.query.phase.message));
                   
                    this.proposalItems = this.query.proposals;
                    this.query.totalVotesProposal = 0;
                    this.queryInfoService.getQueryInfoByQueryId(this.query._id).subscribe(queryInfo => {
                      this.queryInfo = queryInfo;   
                      this.maxSelection =  this.queryInfo.maxSelection;                 
                    })
                    //console.log('query:' + query.title);
                  /*  for (let i = 0; i < query.phases.length; i++) {
                             //console.log(query.phases[i]);
                             if(query.phases[i].number === query.phase){
                               this.phase = query.phases[i];
                             }
                    }*/
                    
                    for (let i = 0; i < this.proposalItems.length; i++) {
                      this.proposalItems[i].icon = "icon";
                      this.proposalItems[i].checked = false;
                    //  this.proposalItems[i].winner = false;
                      this.query.totalVotesProposal += this.proposalItems[i].votes;
                      
                      for (let j = 0; j < this.proposalItems[i].images.length; j++) {
                          if(this.proposalItems[i].images[j].name === null) {
                            this.proposalItems[i].images[j].name = undefined;
                          }
                          if(this.proposalItems[i].images[j].name !== undefined) {
                              this.proposalItems[i].images[j].name = "assets/images/" + this.proposalItems[i].images[j].name;

                          }
                      }
                    }
                   
          });


    }

   openWarning(title, text) {
      let dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: { title: title, text: text }
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');

    });
  }

  openConfirmDialog() {
    let title = "Atenció!"
    let text = "Esteu segurs que voleu esborrar tots els resultats de la votació?"
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { title: title, text: text }
    });
   
  
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.clearVotes();
      }
    });
  }

  exportExcel() {
    var headers = {
      document: 'Document', // remove commas to avoid errors
      birhdate: "Data de naixement",
      postalCode: "Codi postal",
      gender: "Sexe", 
      data: "Data"
     
  };
    var votes = [];
    var submissions = [];
    
    votes = [...this.query.submissions];
    votes.forEach(function(vote) {      
      submissions.push({Document: vote.document, Codi_postal: vote.postalCode, Data_de_naixement: vote.birthdate, Sexe: vote.gender,Data: vote.submissionDate })
    })
    this.exportService.exportExcel(submissions, 'vots_Bisbal_2026');
  }


  convertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

/*exportCSVFile(headers, items, fileTitle) {
    if (headers) {
        items.unshift(headers);
    }

    // Convert Object to JSON
    var jsonObject = JSON.stringify(items);

    var csv = this.convertToCSV(jsonObject);

    var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}*/


/*export() {
    var headers = {
      dni: 'DNI', // remove commas to avoid errors
      birhdate: "Data de naixement"
     
  };
  
    var fileTitle = 'submissions'; // or 'my-unique-title'
    var votes = [];



    this.exportCSVFile(headers, this.query.submissions, fileTitle); // call the exportCSVFile() function to process the JSON and trigger the download

//    this.exportToCsv('submissions.csv', this.query.submissions);
  }

  exportToCsv(filename, rows) {
    var processRow = function (row) {
        var finalVal = '';
        for (var j = 0; j < row.length; j++) {
            var innerValue = row[j] === null ? '' : row[j].toString();
            if (row[j] instanceof Date) {
                innerValue = row[j].toLocaleString();
            };
            var result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0)
                result = '"' + result + '"';
            if (j > 0)
                finalVal += ',';
            finalVal += result;
        }
        return finalVal + '\n';
    };

    var csvFile = '';
    for (var i = 0; i < rows.length; i++) {
        csvFile += processRow(rows[i]);
    }

    var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}*/

  openInstructions() {

    let dialogRef = this.dialog.open(InstructionsComponent, {
      height: '80hv',
      maxWidth: '100vw',
      data: { info: this.queryInfo.instrucions }
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');

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

  openDialog(item, index, admin) {

    let dialogRef = this.dialog.open(ProposalComponent, {
      height: '70hv',
      maxWidth: '100vw',
      minWidth: '60vw',
      data: { index: index, id: item._id, title: item.title, shortTitle: item.shortTitle,  object: item.object, description: item.description, location:item.location, images: item.images, times: item.times, cost: item.cost, checked: item.checked, selectedProposals : this.selectedProposals, icon: item.icon, admin: admin, maxSelection: this.maxSelection }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result, 'The dialog was closed');
      this.selectedProposals = result.selectedProposals;
      item.checked = result.checked;
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
        console.log("result:", result);
        if(result.closed === 'ok') {
          this.queryService.getQuery(this.queryId).subscribe(query => {

            this.query = query;
            this.oldMessage = JSON.parse(JSON.stringify(this.query.phase.message));
            this.proposalItems = this.query.proposals;
            this.query.totalVotesProposal = 0;
            this.selectedProposals = 0;
            //console.log('query:' + query.title);
         /*   for (let i = 0; i < query.phases.length; i++) {
                     //console.log(query.phases[i]);
                     if(query.phases[i].number === query.phase){
                       this.phase = query.phases[i];
                     }
            }*/
            
            for (let i = 0; i < this.proposalItems.length; i++) {
              this.proposalItems[i].icon = "icon";
            //  this.proposalItems[i].checked = false;
            //  this.proposalItems[i].winner = false;
              this.query.totalVotesProposal += this.proposalItems[i].votes;
              
              for (let j = 0; j < this.proposalItems[i].images.length; j++) {
                  if(this.proposalItems[i].images[j].name === null) {
                    this.proposalItems[i].images[j].name = undefined;
                  }
                  if(this.proposalItems[i].images[j].name !== undefined) {
                      this.proposalItems[i].images[j].name = "assets/images/" + this.proposalItems[i].images[j].name;
  
                  }
              }
            }
          });
  
        }
        
      });
    }

    selectProposal(item) {

      item.checked = !item.checked;
      if(item.checked) {
        if(this.selectedProposals === this.maxSelection) {
          this.openWarning('Atenció', 'Només es poden seleccionar ' + this.maxSelection + ' propostes!');
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

  ActivePhaseColor(item) {
    
    return (item.number === this.query.phase.number) ? '#B93D25': 'white';
  }

  ActivePhaseBorder(item) {
    return (item.number === this.query.phase.number) ? '#B93D25 2px solid': '#FFFFFF 1.5px solid';
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
 


  /*  logout() {
      this.auth.logout().then(() => {
        this.router.navigate(['/']);
     });
    }*/

    checkWinner(item) {

      //item.winner = !item.winner;
      var value = {id : item._id, winner : !item.winner};
      this.queryService.checkWinner(this.queryId, value).subscribe(query => {
        this.query = query;
        this.oldMessage = JSON.parse(JSON.stringify(this.query.phase.message));
        this.proposalItems = this.query.proposals;
        this.query.totalVotesProposal = 0;
        //console.log('query:' + query.title);
      /*  for (let i = 0; i < query.phases.length; i++) {
                 //console.log(query.phases[i]);
                 if(query.phases[i].number === query.phase){
                   this.phase = query.phases[i];
                 }
        }*/
        for (let i = 0; i < this.proposalItems.length; i++) {
          this.proposalItems[i].checked = false;
          
          this.query.totalVotesProposal += this.proposalItems[i].votes;
          this.proposalItems[i].color = "whitesmoke";
          for (let j = 0; j < this.proposalItems[i].images.length; j++) {
              if(this.proposalItems[i].images[j].name === null) {
                this.proposalItems[i].images[j].name = undefined;
              }
              if(this.proposalItems[i].images[j].name !== undefined) {
                  this.proposalItems[i].images[j].name = "assets/images/" + this.proposalItems[i].images[j].name;

              }
          }
        }
       
      });

    }

    changePhase(state) {
      console.log("phase number", state);
    /*  this.matIconRegistry.addSvgIcon(
        "icon-checked",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/icons/icon-checked.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "icon",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/icons/icon.svg")
      );*/
      let values = { id : this.queryId, state: state};
      this.queryService.changePhase(values).subscribe(query => {
        this.query = query;
        this.oldMessage = JSON.parse(JSON.stringify(this.query.phase.message));
        this.proposalItems = this.query.proposals;
        this.query.totalVotesProposal = 0;

     /*   for (let i = 0; i < query.phases.length; i++) {
                 if(query.phases[i].number === query.phase){
                   this.phase = query.phases[i];
                 }
        }*/
        for (let i = 0; i < this.proposalItems.length; i++) {
          this.proposalItems[i].icon = "icon";
        //  this.proposalItems[i].false = true;
          this.proposalItems[i].checked = false;
          this.query.totalVotesProposal += this.proposalItems[i].votes;

          for (let j = 0; j < this.proposalItems[i].images.length; j++) {
              if(this.proposalItems[i].images[j].name === null) {
                this.proposalItems[i].images[j].name = undefined;
              }
              if(this.proposalItems[i].images[j].name !== undefined) {
                  this.proposalItems[i].images[j].name = "assets/images/" + this.proposalItems[i].images[j].name;

              }
          }
        }
        
      });
    }
    saveTitle(text) {
      let values = {
        id: this.queryId,
        text: text,
        phase_number: this.phase.number
      }
      this.queryService.saveText(values).subscribe(query => {
        this.query = query;
        this.oldMessage = JSON.parse(JSON.stringify(this.query.phase.message));
        this.proposalItems = this.query.proposals;
        this.query.totalVotesProposal = 0;
        //console.log('query:' + query.title);
     /*   for (let i = 0; i < query.phases.length; i++) {
                 //console.log(query.phases[i]);
                 if(query.phases[i].number === query.phase){
                   this.phase = query.phases[i];
                 }
        }*/
        for (let i = 0; i < this.proposalItems.length; i++) {
          this.proposalItems[i].checked = false;
          this.query.totalVotesProposal += this.proposalItems[i].votes;

          for (let j = 0; j < this.proposalItems[i].images.length; j++) {
              if(this.proposalItems[i].images[j].name === null) {
                this.proposalItems[i].images[j].name = undefined;
              }
              if(this.proposalItems[i].images[j].name !== undefined) {
                  this.proposalItems[i].images[j].name = "assets/images/" + this.proposalItems[i].images[j].name;

              }
          }
        }
      });
    };

    editMessage(){
      this.editMessageMode = true;
    }
    
    saveMessage({form, value, valid}){
      if (valid) {
        this.queryService.updatePhase(this.queryId, this.query.phase.number, this.query.phase).subscribe(res => {
          if (res === 'ok') {
            this.editMessageMode = false;
            this.oldMessage = JSON.parse(JSON.stringify(this.query.phase.message));
          } else {
            console.log(res);
          }
        })
      } else {
        console.log('Form is not valid.');
      }
      
    }

    cancelEditMessage() {
      this.editMessageMode = false;
      this.query.phase.message =  JSON.parse(JSON.stringify(this.oldMessage)); 
    }


    clearVotes() {
      this.queryService.clearVotes(this.queryId).subscribe(query => {
        this.query = query;
        this.oldMessage = JSON.parse(JSON.stringify(this.query.phase.message));
        this.proposalItems = this.query.proposals;
        this.query.totalVotesProposal = 0;
        //console.log('query:' + query.title);
    /*    for (let i = 0; i < query.phases.length; i++) {
                 //console.log(query.phases[i]);
                 if(query.phases[i].number === query.phase){
                   this.phase = query.phases[i];
                 }
        }*/
        for (let i = 0; i < this.proposalItems.length; i++) {
          this.proposalItems[i].checked = false;
          this.proposalItems[i].icon = "icon";
          this.selectedProposals = 0;
          this.query.totalVotesProposal += this.proposalItems[i].votes;

          for (let j = 0; j < this.proposalItems[i].images.length; j++) {
              if(this.proposalItems[i].images[j].name === null) {
                this.proposalItems[i].images[j].name = undefined;
              }
              if(this.proposalItems[i].images[j].name !== undefined) {
                  this.proposalItems[i].images[j].name = "assets/images/" + this.proposalItems[i].images[j].name;

              }
          }
        }
      });
    };

}



