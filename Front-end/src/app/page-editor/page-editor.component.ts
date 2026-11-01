import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MediaChange, MediaObserver  } from "@angular/flex-layout";
//import { FileUploader } from 'ng2-file-upload';
//import { ShareButtons } from '@ngx-share/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { PageService } from '../services/page.service';
import { MicrositeService } from '../services/microsite.service';
import { DialogComponent } from '../dialog/dialog.component';
import { HistorialDialogComponent } from '../historial-dialog/historial-dialog.component';
import { ConfirmationDialogComponent } from './../confirmation-dialog/confirmation-dialog.component';
import * as DocumentEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/ca.js';

import { baseServer } from '../../settings'

declare var CKEDITOR: any;

@Component({
  selector: 'app-page-editor',
  templateUrl: './page-editor.component.html',
  styleUrls: ['./page-editor.component.scss']
})
export class PageEditorComponent implements OnInit {

  micrositeId;
  pageId;
  phaseNumber;
  microsite;
  icons;
  public editMode = false;
  public file: string;
  public responsive: string;
  public successMsg: boolean = false;
  public errorMsg: boolean = false;
  columnNum = 2;  
  rowHeight;
  rowHeightResult;
  gutterSize;
  public title: string;
  public content: string;
  public email = new FormControl('', [Validators.required, Validators.email]);  
  public page = {
      micrositeId: '',
      coverTitle: '',
      title: '',
      index: 1,
      phase: 0,
      type: {
        name: 'Text', type: 'text'},
      image: 'assets/images/icons/icons/13.svg',
      content: '',
      note: ''
  };
 // public uploader: FileUploader = new FileUploader({url: `${baseServer}/upload`} );
  public Editor1;
  public Editor2;
  public Editor3;
  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );    
  } 

  types = [
    {
      name: 'Text',
      type: 'text'
   },
    {
      name: "Formulari 'Envia la teva proposta'",
      type: 'form'
    },
    {
      name: "Fases del procés",
      type: 'phases'
    },
    {
      name: "Historial",
      type: 'historic'
    },
   {
      name: "Votació",
      type: 'voting'
    }
];



  constructor(
 /*   public dialogRef: MatDialogRef<CreateProposalComponent>,*/
    private media: MediaObserver,
    private route: ActivatedRoute,
    private router: Router, 
    private pageService: PageService,
    private micrositeService: MicrositeService,
    public dialog: MatDialog            

 /* @Inject(MAT_DIALOG_DATA) public data: any*/) { 
    /*  this.matIconRegistry.addSvgIcon(
        "icon-checked",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/icons/icon-black-checked.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "icon",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/icons/icon-black.svg")
      );
      this.matIconRegistry = data.iconRegisrty;*/
      this.Editor1 = DocumentEditor;
      this.Editor2 = DocumentEditor;
      this.Editor3 = DocumentEditor;

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
      
      this.route.params.forEach((params: Params) => {
          var href = this.router.url;
          var n = href.search("editar-pagina");
          if(n !== -1) {
            this.pageId = params['pageId'];
            this.editMode = true;
          } else {
            this.micrositeId = params['micrositeId'];
            this.phaseNumber = params['phaseNumber'];
            this.page.micrositeId = this.micrositeId;
            this.page.phase = this.phaseNumber;
            this.micrositeService.getMicrosite(this.micrositeId).subscribe(data => {
            //  console.log("inside");
              if(data) {
                this.microsite = data;
                this.microsite.icons.forEach(element => {
                  if(this.page.image === element.image) {
                    element.selected = true;
                  }
                  else {
                    element.selected = false;
                  }
                })
                
              }
            })
          }
      });
      if(this.pageId) {
      //  console.log('proposalId: ', this.proposalId);
       // console.log('editMode: ', this.editMode);
        this.pageService.getPageById(this.pageId).subscribe(page => {
        //  console.log("proposal:", proposal);
          this.page = page;
        //  console.log("type:", this.page.type);
          this.micrositeId = this.page.micrositeId;
         //   console.log("micrositeId:", this.micrositeId);
            this.micrositeService.getMicrosite(this.micrositeId).subscribe(data => {
              if(data) {
                this.microsite = data;
               
                this.microsite.icons.forEach(element => {
                  if(this.page.image === element.image) {
                    element.selected = true;
                  }
                  else {
                    element.selected = false;
                  }
                })
              }
            })
        });
      }
      
      media.media$
      .subscribe((change: MediaChange) => {
        // alert(change.mqAlias);
        console.log(change.mqAlias);
        if(change.mqAlias == 'xs'){
          this.columnNum = 1;
          this.rowHeight = 217;  
          this.rowHeightResult = 395;     
          this.gutterSize = 16;
          this.responsive = 'xs';
        }
        else if(change.mqAlias == 'md'){
          this.columnNum = 2;
          this.rowHeight = 108;  
          this.rowHeightResult = 632;       
          this.gutterSize = 15;
          this.responsive = 'md';
  
        } else if(change.mqAlias == 'sm'){
          this.columnNum = 2;
          this.rowHeight = 108;  
          this.rowHeightResult = 473;      
          this.gutterSize = 15;
          this.responsive = 'sm';
        }  else if(change.mqAlias == 'lg'){
          this.columnNum = 3;
          this.rowHeight = 108;  
          this.rowHeightResult = 473;      
          this.gutterSize = 15;
          this.responsive = 'sm';
        }
        else{
          this.columnNum = 4;
          this.rowHeight = 108;
          this.rowHeightResult = 584; 
          //this.rowHeight = 483;
          this.gutterSize = 15;
          this.responsive = 'xl';
        }
      });
      
 }

ngOnInit() {
  
}



/*openConfirmDialog(index) {
  let title = "Atenció!"
  let text = "Estàs segur que vols eliminar aquesta pàgina?"
  let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    width: '350px',
    data: { title: title, text: text }
  });
 

  dialogRef.afterClosed().subscribe((confirmed: boolean) => {
    if (confirmed) {
     this.removeImage(index);
    }
  });
}*/
selectIcon(image) {
  this.page.image = image;
  this.microsite.icons.forEach(element => {
    if(element.image === image) {
      element.selected = true;
    } else {
      element.selected = false;
    }
  });
}

selectionChanged() { 
  this.types.forEach(element => {
    if(this.page.type.name === element.name) {
      this.page.type.type = element.type;
    }
  });
}

removePoint(index) { 
    var points = JSON.parse(JSON.stringify(this.microsite.historial.points));
    points.splice( index, 1);    
    this.microsite.historial.points = points;
}

addPoint(position, index) {
  var point = {
    title : '',
    body: 'xxxxx',
    button: 'xxxxx',
    url : '/valides',
    file: 'xxxxx'
  }
  if(position === 'start') {
    this.microsite.historial.points.unshift(point);
  } else if(position === 'end') {
    this.microsite.historial.points.push(point);
  }
  else {
    var points = JSON.parse(JSON.stringify(this.microsite.historial.points));
    points.splice( index, 0, point );    
    this.microsite.historial.points = points;
  }
}

openDialog(title, text, social) {
        
  //  innerWidth = window.innerWidth;
    //let width = innerWidth * 0.4;
    //let height = width * 0.82;  
    
      if(this.responsive === 'xs' || this.responsive === 'md' || this.responsive === 'sm') {
            let dialogRef = this.dialog.open(DialogComponent, {
                maxWidth: '100vw',
                maxHeight: '100vh',
                height: '100%',
                width: '100%',
                data: { title: title, text: text, social : social }
                });
                dialogRef.afterClosed().subscribe(result => {
                //console.log('The dialog was closed');
               // this.text = result;
            });
        } else if(this.responsive === 'xl') {
            
          //  var widthString = (width.toFixed(0)).toString() + 'px';
           // var heightString = (height.toFixed(0)).toString() + 'px';
          //  console.log(widthString);
            let dialogRef = this.dialog.open(DialogComponent, {
                height: '768px',
                width: '630px',
               
                data: { title: title, text: text, social : social }
                });
                dialogRef.afterClosed().subscribe(result => {
                console.log('The dialog was closed, inner width', innerWidth);
               
            });
        } else if(this.responsive === 'lg') {
            
       //   var widthString = (width.toFixed(0)).toString() + 'px';
        //  var heightString = (height.toFixed(0)).toString() + 'px';
       //   console.log(widthString);
          let dialogRef = this.dialog.open(DialogComponent, {
              height: '680px',
              width: '558px',
              data: { title: title, text: text, social : social }
              });
              dialogRef.afterClosed().subscribe(result => {
              console.log('The dialog was closed, inner width', innerWidth);
             
          });
      }  
  }

  openHistorialDialog(record) {        
     
      
        if(this.responsive === 'xs' || this.responsive === 'md' || this.responsive === 'sm') {
              let dialogRef = this.dialog.open(HistorialDialogComponent, {
                  maxWidth: '100vw',
                  maxHeight: '100vh',
                  height: '100%',
                  width: '100%',
                  data: { button: record.button,  url: record.url, file: record.file }
                  });
                  dialogRef.afterClosed().subscribe(result => {
                    if(result) {
                      record.button = result.button;
                      record.url = result.url;
                      record.file = result.file;
                    }
                    
                  //console.log('The dialog was closed');
                 // this.text = result;
              });
          } else if(this.responsive === 'xl') {
              
            //  var widthString = (width.toFixed(0)).toString() + 'px';
             // var heightString = (height.toFixed(0)).toString() + 'px';
            //  console.log(widthString);
              let dialogRef = this.dialog.open(HistorialDialogComponent, {
                  height: '768px',
                  width: '630px',
                 
                  data: { button: record.button,  url: record.url, file: record.file }
                  });
                  dialogRef.afterClosed().subscribe(result => {
                    if(result) {
                      record.button = result.button;
                      record.url = result.url;
                      record.file = result.file;
                    }
                    console.log('The dialog was closed, inner width', innerWidth);
                 
              });
          } else if(this.responsive === 'lg') {
              
         //   var widthString = (width.toFixed(0)).toString() + 'px';
          //  var heightString = (height.toFixed(0)).toString() + 'px';
         //   console.log(widthString);
            let dialogRef = this.dialog.open(HistorialDialogComponent, {
                height: '680px',
                width: '558px',
                data: { button: record.button,  url: record.url, file: record.file }
                });
                dialogRef.afterClosed().subscribe(result => {
                  if(result) {
                    record.button = result.button;
                    record.url = result.url;
                    record.file = result.file;
                  }
                  console.log('The dialog was closed, inner width', innerWidth);
               
            });
        }  
    }



processPage({form, value, valid}) {
  if(this.editMode) {
    this.savePage({form, value, valid});
  } else {
    this.createPage({form, value, valid});
  }
}

createPage({form, value, valid}) {       
        
  if (valid) {
      this.pageService.addPage(this.page).subscribe(res => {
        if (res === 'ok') {
            
            if(this.page.type.type === 'phases') {
              this.micrositeService.updatePhases(this.micrositeId, {phases: this.microsite.phases} ).subscribe(res => {
                if (res === 'ok') {
                  this.openDialog('Correcte', "La pàgina està afegida correctament!", false); 
                  this.router.navigate(['/microsite-fase', this.page.phase]);
                } else {
                  this.openDialog('Atenció!', "La pàgina no està afegida! Intenteu de nou.", false);  
                }
              })
            } else if(this.page.type.type === 'historic') {
              this.micrositeService.updateHistorial(this.micrositeId, {historial: this.microsite.historial} ).subscribe(res => {
                if (res === 'ok') {
                  this.openDialog('Correcte', "La pàgina està afegida correctament!", false); 
                  this.router.navigate(['/microsite-fase', this.page.phase]);
                } else {
                  this.openDialog('Atenció!', "La pàgina no està afegida! Intenteu de nou.", false);  
                }
              })

            } else {
              this.openDialog('Correcte', "La pàgina està afegida correctament!", false); 
              this.router.navigate(['/microsite-fase', this.page.phase]);
            }
         /*   this.page.title = page.title;
            this.page.coverTitle = page.coverTitle;              
            this.page.image = page.image;
            this.page.index = page.index;
            this.page.phase = page.phase;
            this.page.type = page.type;
            this.page.content = page.content;      */        
            
         
           
        } else {
            this.openDialog('Atenció!', "La pàgina no està afegida! Intenteu de nou.", false);  
        }
      });
  } else {
      //console.log('Form is not valid.');
  }
}


savePage({form, value, valid}) {
  if (valid) {
    // value.content = CKEDITOR.instances.content.getData();
    
      this.pageService.editPage(this.pageId, this.page).subscribe(res => {
          if (res === 'ok') {
            
            this.pageService.getPageById(this.pageId).subscribe(page => {
              this.page = page; 
              if(this.page.type.type === 'phases') {
                this.micrositeService.updatePhases(this.micrositeId, {phases: this.microsite.phases} ).subscribe(res => {
                  if (res === 'ok') {
                    this.openDialog('Correcte', "La pàgina s'ha guardat correctament!", false); 
                  } else {
                    this.openDialog('Atenció!', "La pàgina no s'ha guardat! Intenteu de nou.", false);  
                  }
                })
              } else if(this.page.type.type === 'historic') {
                this.micrositeService.updateHistorial(this.micrositeId, {historial: this.microsite.historial} ).subscribe(res => {
                  if (res === 'ok') {
                    this.openDialog('Correcte', "La pàgina s'ha guardat correctament!", false); 
                  } else {
                    this.openDialog('Atenció!', "La pàgina no s'ha guardat! Intenteu de nou.", false);  
                  }
                })
  
              } else {
                this.openDialog('Correcte', "La pàgina s'ha guardat correctament!", false); 
              }
           /*   this.page.title = page.title;
              this.page.coverTitle = page.coverTitle;              
              this.page.image = page.image;
              this.page.index = page.index;
              this.page.phase = page.phase;
              this.page.type = page.type;
              this.page.content = page.content;      */        
              
            })
             
          } else {
              this.openDialog('Atenció!', "La pàgina no s'ha guardat! Intenteu de nou.", false);  
          }
      });
    } else {
        //console.log('Form is not valid.');
    }
  }



}
