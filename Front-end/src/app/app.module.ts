import { BrowserModule } from '@angular/platform-browser';
import { NgModule, PipeTransform, Pipe, enableProdMode, ApplicationInitStatus } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, OrderByPipe, SafeHtmlPipe, SafePipe, VisiblePhaseFilterPipe } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule}  from '@angular/material/toolbar';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material'; 
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { MenuComponent } from './menu/menu.component';
import { MicrositeService } from './services/microsite.service';
import { PageService } from './services/page.service';
import { ProposalService } from './services/proposal.service';
import { QueryService } from './services/query.service';
import { QueryInfoService } from './services/query-info.service';
import { AuthService } from './services/auth.service';
import { LoaderService } from './services/loader.service';
import { ExportService } from './services/export.service';
import { AuthGuard } from './services/auth-guard.service';
import { VoteGuard } from './services/vote-guard.service';
import { ProposalGuard } from './services/proposal-guard.service';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { QueryComponent } from './query/query.component';
import { ProposalsComponent } from './proposals/proposals.component';
import { PageComponent } from './page/page.component';
import { DialogComponent } from './dialog/dialog.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { FaqsComponent } from './faqs/faqs.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { ProposalComponent } from './proposal/proposal.component';
import { PreProposalComponent } from './pre-proposal/pre-proposal.component';
import { Proposal2019Component } from './proposal-2019/proposal-2019.component';
import { NeighbourComponent } from './neighbour/neighbour.component';
import { ResultsComponent } from './results/results.component';
import { Results2019Component } from './results-2019/results-2019.component';
import { AddProposalComponent } from './add-proposal/add-proposal.component';
import { VotingComponent } from './voting/voting.component';
import { Voting2018Component } from './voting-2018/voting-2018.component';
import { Voting2019Component } from './voting-2019/voting-2019.component';
import { DocViewerComponent } from './doc-viewer/doc-viewer.component';
import { DateFormat } from './date-format';
import { CensusService } from './services/census.service';
import { MicrositeEditorComponent } from './microsite-editor/microsite-editor.component';
import { PageEditorComponent } from './page-editor/page-editor.component';
import { HistorialDialogComponent } from './historial-dialog/historial-dialog.component';
import { MyLoaderComponent } from './my-loader/my-loader.component';
import { LoaderInterceptor } from './interceptors/loader-interceptor.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PollsEditorComponent } from './polls-editor/polls-editor.component';
import { CreateProposalComponent } from './create-proposal/create-proposal.component';
import { FileUploadModule, FileSelectDirective } from 'ng2-file-upload';
import { QueryInfoEditorComponent } from './query-info-editor/query-info-editor.component';
import { WhoWeAreComponent } from './who-we-are/who-we-are.component';



export const firebaseConfig = {
  apiKey: "AIzaSyC6IF_gWFUoz9wA_l3GGicVLhA6D2le_h4",
  authDomain: "transaparency-vote-project.firebaseapp.com",
  databaseURL: "https://transaparency-vote-project.firebaseio.com",
  projectId: "transaparency-vote-project",
  storageBucket: "transaparency-vote-project.appspot.com",
  messagingSenderId: "216127651453"
};

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    OrderByPipe,
    SafeHtmlPipe,
    SafePipe,
    VisiblePhaseFilterPipe,
    PageComponent,
    AddProposalComponent,
    VotingComponent,
    Voting2018Component,
    Voting2019Component,
    DialogComponent,
    FaqsComponent,
    InstructionsComponent,
    ConfirmationDialogComponent,
    ProposalComponent,
    LoginComponent,
    AdminComponent,
    QueryComponent,
    PreProposalComponent,
    NeighbourComponent,
    ResultsComponent,
    Results2019Component,
    ProposalsComponent,
    Proposal2019Component,
    DocViewerComponent,
    MicrositeEditorComponent,
    PageEditorComponent,    
    HistorialDialogComponent,
    MyLoaderComponent,
    PollsEditorComponent,
    CreateProposalComponent,
    QueryInfoEditorComponent,
    WhoWeAreComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatRadioModule,
    MatFormFieldModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MatCardModule,
    MatGridListModule,
    FlexLayoutModule,
    ShareButtonsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    CKEditorModule,
    FileUploadModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    
    
  ],
  providers: [
    MicrositeService,
    PageService,
    ProposalService,
    QueryService,
    CensusService,
    AuthService,   
    AuthGuard,
    VoteGuard,
    ProposalGuard,
    LoaderService,
    ExportService,
    QueryInfoService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  //  {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true, direction: 'ltr'}}
    { provide: DateAdapter, useClass: DateFormat },
  ],
  entryComponents: [ DialogComponent, ProposalComponent, PreProposalComponent, Proposal2019Component, NeighbourComponent,
     InstructionsComponent, ResultsComponent,Results2019Component, FaqsComponent,
      ConfirmationDialogComponent, HistorialDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private dateAdapter:DateAdapter<Date>) {
		dateAdapter.setLocale('ca-CA'); // DD/MM/YYYY
	}
}
