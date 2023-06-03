const localStorageMock = {
	setItem: () => {},
	getItem: () => {return null;},
	removeItem: () => {},
	clear: () => {}
};


function getLocalStorage() {
	if (typeof window !== 'undefined' && window.localStorage) {
		return window.localStorage;
	} else {
		console.warn('localStorage is not available. Implement an alternative approach.');
		return localStorageMock; // Return null or throw an error to handle the absence of localStorage
	}
}

const localDb = getLocalStorage();

const usedIds = new Set();

export function initializeUsedIds(listOfIds){
	listOfIds.forEach((id) => {
		usedIds.add(id);
	});
}

export function getNewId() {
	let newId = Math.floor(Math.random() * 1000000);
	while (usedIds.has(newId)){
		newId = Math.floor(Math.random() * 1000000);
	}
	return newId;
}

export function getList(){
	let myJobs = localDb.getItem('jobList');
	if (!myJobs){
		return [];
	}
	return JSON.parse(myJobs);
}

export function getJob(id){
	let myJobs = localDb.getItem('jobList');
	if (!myJobs){
		return null;
	}

	//Yes, I should refactor to a map data structure instead of this list. TODO.

	const myList = JSON.parse(myJobs);
	const theJobListSingle = myList.filter((item) => item.id === id);
	const theJob = theJobListSingle[0];
	return theJob;
}

export function createJob(newJob){
	let myJobs = localDb.getItem('jobList');
	if (!myJobs){
		myJobs = [];
	}

	const newJobsList = [...JSON.parse(myJobs), newJob];
	localDb.setItem('jobList', JSON.stringify(newJobsList));
}

export function updateJob(id, newJob){
	let myJobs = JSON.parse(localDb.getItem('jobList'));

	const newJobsList = myJobs.map((job) => {
		if(job.id === id){
			return {...newJob, id: id};
		} else {
			return job;
		}
	});

	localDb.setItem('jobList', JSON.stringify(newJobsList));
}

export function deleteJob(id){
	let myJobs = JSON.parse(localDb.getItem('jobList'));

	const newJobsList = myJobs.filter((job) => {
		if(job.id === id){
			return false;
		} else {
			return true;
		}
	});

	localDb.setItem('jobList', JSON.stringify(newJobsList));
}



