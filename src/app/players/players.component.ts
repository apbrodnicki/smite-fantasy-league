import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

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
	sort = 'desc';

	constructor(private http: HttpClient) {}

	ngOnInit(): void {
		this.http.get<{ [key: string]: Player }>('https://esports.hirezstudios.com/esportsAPI/smite/stats/7263')
		.pipe(map(responseData => {
			const playersArray: Player[] = [];

			for (const key in responseData) {
				if (responseData.hasOwnProperty(key)) {
					if (responseData[key].role !== 'Coach') {
						responseData[key].points = calculatePoints(responseData[key]);
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
	};

	onSortRole(type: string) {
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
			};
		});

		for (const key in sortedPlayersObject) {
			if (sortedPlayersObject.hasOwnProperty(key)) {
				this.sortedPlayers.push({ ...sortedPlayersObject[key], id: key });
			}
		}
	};

	onSortPoints() {
		if (this.sort === 'asc') {
			this.sortedPlayers.sort((a, b) => (a.points - b.points));
			this.sort = 'desc';
		} else if (this.sort === 'desc') {
			this.sortedPlayers.sort((a, b) => (b.points - a.points));
			this.sort = 'asc';
		}
	};

	onDraftPlayer(player: Player) {
		for (const key in this.sortedPlayers) {
			if (this.sortedPlayers[key].playerName === player.playerName) delete this.sortedPlayers[key];
		}
	}
}

function calculatePoints(player: Player) {
	let points = 0;

	switch (player.role) {
		case 'Hunter':
			points += player.kills * 2;
			points += player.assists * .33;
			break;
		case 'Support':
			points += player.kills * 1.5;
			points += player.assists * .75;
			break;
		case 'Mid':
			points += player.kills * 2;
			points += player.assists * .33;
			break;
		case 'Jungle':
			points += player.kills * 2;
			points += player.assists * .33;
			break;
		case 'Solo':
			points += player.kills * 1.5;
			points += player.assists * .5;
			break;
	};

	points -= player.deaths;

	points = +points.toFixed(2);

	return points;
}
function sort(sortedPlayers: Player[]): Player[] {
	throw new Error('Function not implemented.');
}

