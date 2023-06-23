import * as db from './utils/localDB';

export default function DailyActivityLog(){
	
	//Get DAL data
	let importedTracker = db.getActivityTracker();
	console.log(importedTracker);
	//Generate table based on queried state
	//generate table of last 60 (variable) days
	//Filter data to past 60 days
	
	//For each entry in the filtered tracker, assign to corresponding table element


	return(
		<div>
			DAL
		</div>
	);
}