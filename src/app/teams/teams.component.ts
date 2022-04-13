import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { map } from 'rxjs/operators';
import { Team } from './team.model';

@Component({
	selector: 'app-teams',
	templateUrl: './teams.component.html',
	styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
	teams: Team[] = [];

	constructor(private http: HttpClient) {}

	ngOnInit(): void {
		this.http.get<{ [key: string]: Team }>('https://esports.hirezstudios.com/esportsAPI/smite/standings/7261/2')
		.pipe(map(responseData => {
			const teamsArray: Team[] = [];
			for (const key in responseData) {
				if (responseData.hasOwnProperty(key)) {
					teamsArray.push({ ...responseData[key], id: key });
				}
			}

			return teamsArray;
		}))
		.subscribe(teams => {
			this.teams = teams;
		});
	}
}
