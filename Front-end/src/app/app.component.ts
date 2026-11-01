import { Component, NgModule, Pipe, PipeTransform, ViewEncapsulation, OnInit  } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { MatIconRegistry } from "@angular/material/icon";
import { MediaChange, MediaObserver  } from "@angular/flex-layout";
import { MicrositeService } from './services/microsite.service';
import * as _ from 'lodash';


import { DialogComponent } from './dialog/dialog.component';

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@Pipe({
  name: 'safe'
  })
  export class SafePipe {
  
  constructor(protected sanitizer: DomSanitizer) {}
  
    transform(htmlString: string): any {
      return this.sanitizer.bypassSecurityTrustHtml(htmlString);
    }
  }


@Pipe({

  //The @Pipe decorator takes an object with a name property whose value is the pipe name that we'll use within a template expression. It must be a valid JavaScript identifier. Our pipe's name is orderby.

  name: "orderby"
})

export class OrderByPipe implements PipeTransform {
  transform(array:Array<any>, args?) {

    // Check if array exists, in this case array contains articles and args is an array that has 1 element : !id

    if(array) {

      // get the first element

      let orderByValue = args[0]
      let byVal = 1

      // check if exclamation point 

      if(orderByValue.charAt(0) == "!") {

        // reverse the array

        byVal = -1
        orderByValue = orderByValue.substring(1)
      }
      console.log("byVal",byVal);
      console.log("orderByValue",orderByValue);

      array.sort((a: any, b: any) => {
        if(a[orderByValue] < b[orderByValue]) {
          return -1*byVal;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1*byVal;
        } else {
          return 0;
        }
      });
      return array;
    }
    //
  }
}

@Pipe({
  name: 'visiblephasefilter'
})

export class VisiblePhaseFilterPipe implements PipeTransform {
 
  transform(value: any, keyName: any, visible: any): any[] {
      return _.filter(value, function (o) {
          return o[keyName] === visible;
      });
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'NeopolisParticipacio';
 // public text = `<p>Els pressupostos participatius de Piera són un exercici d’aprofundiment democràtic a través del qual la ciutadania pot decidir de manera directa una part del pressupost del capítol d’inversions del municipi. </p>
 // <p>Es tracta d’un procés participatiu que combina la democràcia deliberativa (generació d’intel•ligència col•lectiva) amb la democràcia directa (presa de decisions a través d’un procés de votació).</p>
 // <p>Això vol dir que la ciutadania pot presentar propostes per millorar el municipi. Posteriorment aquestes propostes seran analitzades per l’ajuntament (anàlisi de viabilitat). Després, les propostes que resultin vàlides seran prioritzades pels veïns i veïnes en una jornada participativa. I finalment, les persones empadronades al municipi de 16 i més anys decidiran, a través d’una votació, els projectes guanyadors per tal que l’ajuntament els executi.</p>`
 
 public text = '';
 public dataProtection = '';
 public micrositeEditor = false;
 public responsive: string;
 public editMode = false;
  constructor(private media: MediaObserver, public micrositeService: MicrositeService,  public dialog: MatDialog, public matIconRegistry :MatIconRegistry, public domSanitizer: DomSanitizer, private route: ActivatedRoute,
    private router: Router) {
    this.matIconRegistry.addSvgIcon(
      "icon-checked",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/icons/icon-checked.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "icon",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/icons/icon.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "icon-checked-black",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/icons/icon-black-checked.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "icon-black",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/icons/icon-black.svg")
    );
    this.micrositeService.getMicrosite('5ec97d156049740c9869f15f').subscribe(data => {      
      if(data) {
        this.text = data.whois;
        this.dataProtection = data.dataProtection;
      }
    });
    
      media.media$
      .subscribe((change: MediaChange) => {
        // alert(change.mqAlias);
        console.log(change.mqAlias);
        if(change.mqAlias == 'xs'){
          this.responsive = 'xs';
        }
        else if(change.mqAlias == 'md'){
          this.responsive = 'md';
        } else if(change.mqAlias == 'sm'){
          this.responsive = 'sm';
        }
        else{
          this.responsive = 'xl';
        }
      });
      var parsedUrl = new URL(window.location.href);
      console.log("href:", parsedUrl)
       var n = parsedUrl.pathname.search("editar-que-son");
        if(n !== -1) {
          this.editMode = true;
        }
        var nMicrositeEditor = parsedUrl.pathname.search("microsite");
        if(nMicrositeEditor !== -1) {
          this.micrositeEditor = true;
        }
   /*  this.route.params.forEach((params: Params) => {
        var href = this.router.url;
        console.log("href:", href)
        var n = href.search("editar-que-son");
        if(n !== -1) {
          this.editMode = true;
        }
        var nMicrositeEditor = href.search("microsite");
        if(nMicrositeEditor !== -1) {
          this.micrositeEditor = true;
        }
    });*/
    }
  ngOnInit() {
  };

  goToURL(year) {
    if(year === '2024') {
      window.open("http://46.101.159.166:7076/vota", "_blank");
    } 
  }
  
  openDialog(title, text, type) {
     console.log("dialog");
     var parsedUrl = new URL(window.location.href);
      console.log("href:", parsedUrl)
       var n = parsedUrl.pathname.search("editar-que-son");
        if(n !== -1) {
          this.editMode = true;
        }
        
        var nMicrositeEditor = parsedUrl.pathname.search("microsite");
        if(nMicrositeEditor !== -1) {
          this.micrositeEditor = true;
        }
     if(this.micrositeEditor){
       console.log("micrositeEditor",this.micrositeEditor);
       this.micrositeEditor = false;
      this.router.navigate(['/editar-que-son', '5ec97d156049740c9869f15f']);

     } else {
      if(this.responsive === 'xs' || this.responsive === 'md' || this.responsive === 'sm') {
        let dialogRef = this.dialog.open(DialogComponent, {
            maxWidth: '100vw',
            maxHeight: '100vh',
            height: '100%',
            width: '100%',
            data: { title: title, text: text, social : false, type: type }
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
           
            data: { title: title, text: text, social : false, type: type }
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
          data: { title: title, text: text, social : false, type: type }
          });
          dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed, inner width', innerWidth);
         
      });
     }
    }
      
        
         
          
    }

  
  
}
