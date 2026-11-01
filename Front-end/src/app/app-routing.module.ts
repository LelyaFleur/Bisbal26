import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { PageComponent } from './page/page.component';
import { VotingComponent } from './voting/voting.component';
import { Voting2018Component } from './voting-2018/voting-2018.component';
import { Voting2019Component } from './voting-2019/voting-2019.component';
import { AddProposalComponent } from './add-proposal/add-proposal.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { QueryComponent } from './query/query.component';
import { MicrositeService } from './services/microsite.service';
import { MicrositeEditorComponent } from './microsite-editor/microsite-editor.component';
import { PageEditorComponent } from './page-editor/page-editor.component';
import { AuthGuard } from './services/auth-guard.service';
import { VoteGuard } from './services/vote-guard.service';
import { ProposalGuard } from './services/proposal-guard.service';
import { PollsEditorComponent } from './polls-editor/polls-editor.component';
import { QueryInfoEditorComponent } from './query-info-editor/query-info-editor.component';
import { CreateProposalComponent } from './create-proposal/create-proposal.component';
import { DocViewerComponent } from './doc-viewer/doc-viewer.component';
import { WhoWeAreComponent } from './who-we-are/who-we-are.component';
//import { HttpClient } from '@angular/common/http';
//import { Microsite } from './models/microsite';

/*let http: HttpClient;

let micrositeService: MicrositeService = new MicrositeService(http);
let microsite: Microsite; 
micrositeService.getMicrosite('5ec97d156049740c9869f15f').subscribe(microsite => {
  microsite = microsite;
});*/


const routes: Routes = [
  { path: '', redirectTo: 'pressupostos-participatius', pathMatch: 'full' },
  { path: 'pressupostos-participatius', component: MenuComponent },
  { path: 'pressupostos-participatius/:index', component: PageComponent },
  { path: 'envia-la-teva-proposta', component: AddProposalComponent,/* canActivate: [ProposalGuard], data: {microsite : microsite}*/},
  { path: 'resultats-votacio-final-2018-2019', component: Voting2018Component/*, canActivate: [VoteGuard]*/},
  { path: 'resultats-votacio-final-2019-2020', component: Voting2019Component/*, canActivate: [VoteGuard]*/},  
  { path: 'vota', component: VotingComponent/*, canActivate: [VoteGuard]*/ },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'admin/:id', component: QueryComponent, canActivate: [AuthGuard] },
  { path: 'microsite-editor/:index/:phaseNumber', component: PageComponent, canActivate: [AuthGuard]},
  { path: 'microsite-editor-votacio/:phaseNumber', component: VotingComponent, canActivate: [AuthGuard]},
  { path: 'microsite-fase/:phaseNumber', component: MicrositeEditorComponent, canActivate: [AuthGuard]},
  { path: 'microsite-editor', component: MicrositeEditorComponent, canActivate: [AuthGuard]},
  { path: 'editar-faqs/:queryId', component: QueryInfoEditorComponent, canActivate: [AuthGuard]},
  { path: 'editar-instruccions/:queryId', component: QueryInfoEditorComponent, canActivate: [AuthGuard]},
  { path: 'editar-pagina/:pageId', component: PageEditorComponent, canActivate: [AuthGuard]},
  { path: 'afegir-pagina/:micrositeId/:phaseNumber', component: PageEditorComponent, canActivate: [AuthGuard]},
  { path: 'editar-consulta/:id', component: PollsEditorComponent, canActivate: [AuthGuard]  },
  { path: 'afegir-proposta/:id', component: CreateProposalComponent, canActivate: [AuthGuard]  },
  { path: 'editar-proposta/:id/:proposalId', component: CreateProposalComponent, canActivate: [AuthGuard]  },
  { path: 'editar-que-son/:id', component: WhoWeAreComponent, canActivate: [AuthGuard]  },
  { path: 'inversions', component: DocViewerComponent },
  { path: 'acceptades', component: DocViewerComponent }, 
  { path: 'valides', component: DocViewerComponent }, 
  { path: 'ja_previstes', component: DocViewerComponent },
  { path: 'descartades_o_ja_previstes', component: DocViewerComponent },
  { path: 'descartades', component: DocViewerComponent },
  { path: 'prioritzades', component: DocViewerComponent },
  { path: 'repetides', component: DocViewerComponent },
  { path: 'demandes', component: DocViewerComponent },
  { path: 'resultats', component: DocViewerComponent },
  { path: 'exemples', component: DocViewerComponent }
 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
 /* const appRoutes: Routes = [
    {path: '', redirectTo: 'pressupostos-participatius', pathMatch: 'full'},
    {path: 'login', component: LoginComponent}, 
    {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
    {path: 'admin/:id', component: QueryComponent, canActivate: [AuthGuard]},
    {path: 'nova_consulta', component: NewQueryComponent, canActivate: [AuthGuard]},
    {path: 'propostas', component: ProposalsComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'pressupostos-participatius', component: MenuComponent},
    {path: 'pressupostos-participatius/:index', component: PageComponent},
    {path: 'on_pots_fer_les_teves_propostes', component: HistorialComponent},
    {path: 'resultats-votacio-final-2018', component: Results2018Component},  
    {path: 'envia-la-teva-proposta', component: AddProposalComponent},
    {path: 'vota', component: VotingComponent,canActivate: [VoteGuard]},
    {path: 'vota-admin', component: VotingComponent,  canActivate: [AuthGuard]},
    {path: 'inversions', component: DocViewerComponent},
    {path: 'acceptades', component: DocViewerComponent}, 
    {path: 'ja_previstes', component: DocViewerComponent},
    {path: 'passen_a_votacio', component: DocViewerComponent},  
    {path: 'descartades', component: DocViewerComponent},
    {path: 'prioritzades', component: DocViewerComponent},
    {path: 'repetides', component: DocViewerComponent},
    {path: 'resultats', component: DocViewerComponent}
    
  ]*/
 }
