import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
// import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DraftComponent } from './draft/draft.component';
import { PlayersComponent } from './draft/players/players.component';
import { TeamsComponent } from './draft/teams/teams.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
	declarations: [
		AppComponent,
		DraftComponent,
		PlayersComponent,
		TeamsComponent,
  HeaderComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		// AppRoutingModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
