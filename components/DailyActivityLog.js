/* eslint-disable */

import * as db from './utils/localDB';
import {useState} from 'react';

const ActivityTile = ({dayObject}) => {
	const poo = [];
	dayObject.forEach((checkin) => {
		poo.push(checkin)
	});

	return(
		<>
			{poo}
		</>
	)
}

export default function DailyActivityLog(){
	
	//Get DAL data
	let importedTracker = db.getActivityTracker();
	//Might need to be an effect
	console.log(importedTracker);
	//Generate table based on queried state

	const [numDays, setNumDays] = useState(60);
	const trackerPastDays = []; 
	

	for(let i = 0; i < numDays; i++){
		//get Current Date based on my custom util function
		//get current date - i
		//if that date is in my tracker, push to front
		//if not, push empty ActivityTile
	}

	let test = ActivityTile({dayObject: [1,2,3]});
	//generate table of last 60 (variable) days
	//Filter data to past 60 days
	
	//For each entry in the filtered tracker, assign to corresponding table element


	return(
		<div>
			DAL
		</div>
	);
}