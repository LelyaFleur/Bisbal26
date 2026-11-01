import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MicrositeService } from '../services/microsite.service';
import { DialogComponent } from '../dialog/dialog.component';
import { Observable } from 'rxjs';
import { Microsite } from '../models/microsite';


@Injectable({
  providedIn: 'root'
})
export class ProposalGuard  implements CanActivate {
  public responsive: string;
  openWarning(title, text) {
    let innerWidth = window.innerWidth;
    let innerHeight = window.innerHeight;
    if(innerWidth/innerHeight > 1) {
      this.responsive = 'xl';
    } else  {
      this.responsive = 'xs';
    }
    let width = innerWidth * 0.2;
    let height = width * 0.82;  
   
    console.log('responsive inside openWarning: ', this.responsive);
    if(this.responsive === 'md' || this.responsive === 'lg' || this.responsive === 'xl') {
          
          var widthString = (width.toFixed(0)).toString() + 'px';
          var heightString = (height.toFixed(0)).toString() + 'px';
          console.log(widthString);
          let dialogRef = this.dialog.open(DialogComponent, {
              height: heightString,
              width: widthString,
              data: { title: title, text: text, social : false }
              });
              dialogRef.afterClosed().subscribe(result => {
              //console.log('The dialog was closed');
            // this.text = result;
          });
      } else {
        let dialogRef = this.dialog.open(DialogComponent, {
          maxWidth: '100vw',
          maxHeight: '100vh',
          height: '100%',
          width: '100%',
          data: { title: title, text: text, social : false }
          });
          dialogRef.afterClosed().subscribe(result => {
          //console.log('The dialog was closed');
        // this.text = result;
      });
      }
}
  constructor(
      private router: Router,          
      public dialog: MatDialog,
      private micrositeService: MicrositeService,
  ) {
    
   }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
   /* this.micrositeService.getMicrosite('5ec97d156049740c9869f15f').subscribe(data => {
     
       
        if(data.activePhase.number == 1) {          
          return true;        
        } 
          this.openWarning('Atenció',"El període de presentació de propostes ja està acabat");
          this.router.navigate(['/pressupostos-participatius']);      
          return false;
     
      
    })*/
    
 

   this.openWarning('Atenció',"El període de presentació de propostes ja està acabat");
          this.router.navigate(['/pressupostos-participatius']);      
          return false; 
   
  }
}
