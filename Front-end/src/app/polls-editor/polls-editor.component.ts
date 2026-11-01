import { Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver  } from "@angular/flex-layout";
import { ActivatedRoute, Router, Params } from '@angular/router';
import { QueryService } from '../services/query.service';
import { QueryInfoService } from '../services/query-info.service';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { InstructionsComponent } from './../instructions/instructions.component';
import { FaqsComponent } from './../faqs/faqs.component';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ProposalComponent } from '../proposal/proposal.component';
import { DialogComponent } from './../dialog/dialog.component';
import { ResultsComponent } from './../results/results.component';
import { CreateProposalComponent } from './../create-proposal/create-proposal.component';
import { ConfirmationDialogComponent } from './../confirmation-dialog/confirmation-dialog.component';
import * as DocumentEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/ca.js';


@Component({
  selector: 'polls-editor',
  templateUrl: './polls-editor.component.html',
  styleUrls: ['./polls-editor.component.scss']
})
export class PollsEditorComponent implements OnInit {
  queryId;
  phase;
  columnNum = 2;
  selectedProposalsMunicipality = 0;
  selectedProposalsNeighborhood = 0;
  selectedProposals = 0;
  proposalItems;
  canVote = false;
  rowHeight;
  rowHeightResult;
  gutterSize;
  innerWidth = window.innerWidth;
 
  maxSelection = 2;    
  text = 'En compliment del què disposa el Reglament 2016/679, del Parlament Europeu i del Consell, de 27 d’abril de 2016,  de protecció de dades de caràcter personal, us informem que les dades consignades a l’hora d’emetre el vot s’incorporaran en un fitxer creat per l’Ajuntament de Lloret de Mar amb la finalitat de recollir les votacions d’aquest procés participatiu. Les seves dades no seran cedides a tercers. Així mateix s’informa de la facultat d’exercitar els drets d’accés, rectificació, supressió, limitació del tractament, portabilitat i d’oposició de les seves dades d’acord amb allò que disposa la normativa en matèria de protecció de dades. Per exercir-les haurà de dirigir-se a l’e-adreça suport@tarsys.es, del delegat de protecció de dades de l’Ajuntament de Lloret de Mar (plaça de la vila, 1, 17310 Lloret de Mar (Girona).'
  message;
  color;
  startDate = new Date(1990, 0, 1);
  genders = [
    {value: 'male', viewValue: 'Home'},
    {value: 'female', viewValue: 'Dona'}
  ];
  queryInfoId;
  queryInfo = {
      _id: '',
      micrositeId: '',
      queryId: '',
      title: '',
      maxSelection: 3,
      instructions: '',
      faqs: '', 
      message1: '',    
      message2: '',
      message3: '',
      message4: ''
 
  };
  oldQueryInfo;
  editQueryInfoMode = false;
  

  position = "below";
  /*public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy'
    //editableDateField : false
  };*/
  public user = {
    DNI : '',
   // birthdate: { date: { year: 2018, month: 10, day: 9 } },
    birthdate: new Date(),
    //gender: "",
    //street: ""
  };

  private locale:string = 'ca';
  public responsive: string;  
  public Editor1;
  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
}

  query: any;
  private param: any;
  constructor( private route: ActivatedRoute, private router: Router, private queryService: QueryService, private queryInfoService: QueryInfoService,
    private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, media: MediaObserver, public dialog: MatDialog ) {
     /* this.matIconRegistry.addSvgIcon(
        "icon-checked",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/icons/icon-checked.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "icon",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/icons/icon.svg")
      );*/
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
    /*     this.Editor1
    .create( document.querySelector( '#editor' ), {
        toolbar: {
            items: [
                // ...
                'link'
            ],
        },
        link: {
            // Automatically add target="_blank" and rel="noopener noreferrer" to all external links.
            addTargetToExternalLinks: true,

            // Let the users control the "download" attribute of each link.
            decorators: [
                {
                    mode: 'manual',
                    label: 'Downloadable',
                    attributes: {
                        download: 'download'
                    }
                }
            ]
        }
    } );*/
    
    /*  media.media$
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
          this.dialogRef.updateSize(`968px`, `930px`);
          
        }
      });*/

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
  //  console.log(this.router.url);
    this.route.params.forEach((params: Params) => this.queryId = params['id']);
    this.queryService.getQuery(this.queryId).subscribe(query => {

      this.query = query;         
    
      this.proposalItems = this.query.proposals;        

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
      
      // totalVotesProposal += item.votes;
      });

      this.queryInfoService.getQueryInfoByQueryId(this.queryId).subscribe(queryInfo => {
        this.queryInfoId = queryInfo._id;
        this.queryInfo = queryInfo;  
      //  console.log(this.queryInfo);  
        this.oldQueryInfo = JSON.parse(JSON.stringify(this.queryInfo));     
      
      })
});   
      
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
    maxWidth: '100vw'
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

openDialog(item, index, admin) {

  
    let dialogRef = this.dialog.open(ProposalComponent, {
      height: '70hv',
      maxWidth: '100vw',
      minWidth: '60vw',
      data: { index: index, id: item._id, title: item.title, description: item.description, location:item.location,  images: item.images, cost: item.cost, checked: item.checked, selectedProposals : this.selectedProposals, icon: item.icon, admin: admin, maxSelection: this.queryInfo.maxSelection }
    });

    dialogRef.afterClosed().subscribe(result => {
   //   console.log(result, 'The dialog was closed');
     
      this.selectedProposals = result.selectedProposals;
      item.checked = result.checked;
    //  console.log('icon:', item.checked);
      this.matIconRegistry.addSvgIcon(
        "icon-checked",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/icons/icon-checked.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "icon",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/icons/icon.svg")
      );
      if(item.checked) {
        item.icon = "icon-checked";
      }
        else {
          item.icon = "icon";
      }
    });
 
}

openConfirmDialog(idProposal) {
  let title = "Atenció!"
  let text = "Estàs segur que vols eliminar la proposta? Potser els resultats de la votació no seran vàlids."
  let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    width: '350px',
    data: { title: title, text: text }
  });
 

  dialogRef.afterClosed().subscribe((confirmed: boolean) => {
    if (confirmed) {
      this.removeProposal(idProposal);
    }
  });
}

openResults() {

  let dialogRef = this.dialog.open(ResultsComponent, {
    height: '80hv',
    maxWidth: '100vw',
    data: { query: this.query }
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');

  });
}

openCreateProposal() {

  let dialogRef = this.dialog.open(CreateProposalComponent, {
    height: '80hv',
    maxWidth: '100vw',
    data: { query: this.query }
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');

  });
}
  

  
  detectColor(item) {
    if (item.checked) {
      return (item.order === 1) ? '#CD0030' : '#f44336';
    } else {
      return '#F3F3F3';
    }
  } 

  detectColorResult(item) {
    
      return (item.winner) ? '#CD0030' : '#333333';
   
  }

  openMessage(title, text, close) {
    let dialogRef = this.dialog.open(DialogComponent, {
    width: '350px',
    data: { title: title, text: text }
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}
 
openInfoDialog() {
      
  //  innerWidth = window.innerWidth;
   // let width = innerWidth * 0.4;
   // let height = width * 0.82;  
   // console.log('inner width', innerWidth);
   // console.log('outerWidth', window.outerWidth);
   console.log("dialog");
    
      if(this.responsive === 'xs' || this.responsive === 'md' || this.responsive === 'sm') {
            let dialogRef = this.dialog.open(DialogComponent, {
                maxWidth: '100vw',
                maxHeight: '100vh',
                height: '100%',
                width: '100%',
                data: { title: 'Condicions i protecció de dades', text: this.text, social : false }
                });
                dialogRef.afterClosed().subscribe(result => {
                  console.log('The dialog was closed, inner width', innerWidth);
               // this.text = result;
            });
        } else if(this.responsive === 'xl') {
            
        //    var widthString = (width.toFixed(0)).toString() + 'px';
          //  var heightString = (height.toFixed(0)).toString() + 'px';
           // console.log(widthString);
            let dialogRef = this.dialog.open(DialogComponent, {
                height: '768px',
                width: '630px',
               
                data: { title: 'Condicions i protecció de dades', text: this.text, social : false }
                });
                dialogRef.afterClosed().subscribe(result => {
                console.log('The dialog was closed, inner width', innerWidth);
               
            });
        } else if(this.responsive === 'lg') {
            
        //  var widthString = (width.toFixed(0)).toString() + 'px';
        //var heightString = (height.toFixed(0)).toString() + 'px';
       //   console.log(widthString);
          let dialogRef = this.dialog.open(DialogComponent, {
              height: '680px',
              width: '558px',
              data: { title: 'Condicions i protecció de dades', text: this.text, social : false }
              });
              dialogRef.afterClosed().subscribe(result => {
              console.log('The dialog was closed, inner width', innerWidth);
             
          });
      }
       
        
  }

  navigateBack() {
    this.router.navigate(['/admin']);
  }

  removeProposal(idProposal){
    this.queryService.removeProposal(this.queryId, idProposal).subscribe(query => {
      this.query = query;         
       
        this.proposalItems = this.query.proposals;        

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
         
         // totalVotesProposal += item.votes;
        });
    })
  }

  editQueryInfo(){
    this.editQueryInfoMode = true;
  }
  
  saveQueryInfo({form, value, valid}){
    if (valid) {
      this.queryInfoService.editQueryInfo(this.queryInfo._id, this.queryInfo).subscribe(res => {
        if (res === 'ok') {
          this.editQueryInfoMode = false;
          this.oldQueryInfo = JSON.parse(JSON.stringify(this.queryInfo));
        } else {
          console.log(res);
        }
      })
    } else {
      console.log('Form is not valid.');
    }
    
  }

  cancelEditQueryInfo() {
    this.editQueryInfoMode = false;
   // console.log("oldQueryInfo:", this.oldQueryInfo);
    this.queryInfo =  JSON.parse(JSON.stringify(this.oldQueryInfo));    
   // console.log("queryInfo:", this.queryInfo);
  }

  

}
