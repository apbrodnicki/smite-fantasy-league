import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DraftComponent } from './draft/draft.component';
import { HomeComponent } from './home/home.component';
import { PlayersComponent } from './players/players.component';
import { TeamsComponent } from './teams/teams.component';

const appRoutes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'draft', component: DraftComponent },
	{ path: 'players', component: PlayersComponent },
	{ path: 'teams', component: TeamsComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule {

}