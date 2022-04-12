import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

import { map } from 'rxjs/operators';
import { Player } from './player.model';

@Component({
	selector: 'app-players',
	templateUrl: './players.component.html',
	styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
	totalPlayers: Player[] = [];
	sortedPlayers: Player[] = [];

	constructor(private http: HttpClient) {}

	ngOnInit(): void {
		this.http.get<{ [key: string]: Player }>('https://esports.hirezstudios.com/esportsAPI/smite/stats/7263')
		.pipe(map(responseData => {
			const playersArray: Player[] = [];

			for (const key in responseData) {
				if (responseData.hasOwnProperty(key)) {
					if (responseData[key].role !== 'Coach') {
						responseData[key].imagePath = responseData[key].playerName.toLowerCase();
						playersArray.push({ ...responseData[key], id: key });
					}
				}
			}

			return playersArray;
		}))
		.subscribe(players => {
			this.totalPlayers = players;
			this.sortedPlayers = players;
		});
	}

	onSort(type: string) {
		this.sortedPlayers = [];
		const sortedPlayersObject = {};

		this.totalPlayers.forEach(function(player, i) {
			switch (type) {
				case 'Hunter':
					if (player.role === 'Hunter') sortedPlayersObject[i] = player;
					break;
				case 'Support':
					if (player.role === 'Support') sortedPlayersObject[i] = player;
					break;
				case 'Mid':
					if (player.role === 'Mid') sortedPlayersObject[i] = player;
					break;
				case 'Jungle':
					if (player.role === 'Jungle') sortedPlayersObject[i] = player;
					break;
				case 'Solo':
					if (player.role === 'Solo') sortedPlayersObject[i] = player;
					break;
				case 'all':
					sortedPlayersObject[i] = player;
					break;
			}
		});

		for (const key in sortedPlayersObject) {
			if (sortedPlayersObject.hasOwnProperty(key)) {
				this.sortedPlayers.push({ ...sortedPlayersObject[key], id: key });
			}
		}
	}
}
