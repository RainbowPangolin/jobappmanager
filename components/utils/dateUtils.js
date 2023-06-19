/**
 * @param {Date} rawDate e.g. rawDate = new Date(Date.now())
 */
export function parseDate(rawDate){
	let day = rawDate.getDate();
	let month = rawDate.getMonth() + 1; // Months are zero-based, so we add 1
	let year = rawDate.getFullYear();

	// Formatting the date as "MM/DD/YYYY"
	let formattedDate = `${year}-${month}-${day}`;

	return formattedDate;
}


export function getDayNoTime() {
	const currentDate = new Date();
	currentDate.setHours(0, 0, 0, 0); // Set the time to midnight
	return currentDate.getTime(); // Return the timestamp representing the current day
}	

/**
 * @param {Date} date e.g. date = new Date()
 */
export function getDayOf(date) {
	const currentDate = new Date(date);
	currentDate.setHours(0, 0, 0, 0); // Set the time to midnight
	return currentDate.getTime(); // Return the timestamp representing the current day
}	