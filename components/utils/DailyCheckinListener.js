import * as db from './localDB';
export function submitActivity(){

	let today = null;

	if ( false ) {//checkedInOn(today)){
		return;
	} else{
		db.checkIn();
	}
	
}

function checkedInOn(date){
	let history = db.getActivityTracker();
	if (history.date > 1){
		return true;
	} else {
		return false;
	}
}