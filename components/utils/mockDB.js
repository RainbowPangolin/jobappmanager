import * as fs from 'fs';

const rawData = fs.readFileSync('./mockdb.json');
const data = JSON.parse(rawData);

const usedIds = new Set();
  
const listOfJobs = [data];

export function initializeUsedIds(listOfIds){
    listOfIds.forEach((id) => {
        usedIds.add(id);
    })
}

export function getNewId() {
    let newId = Math.floor(Math.random() * 1000000);
    while (usedIds.has(newId)){
        newId = Math.floor(Math.random() * 1000000);
    }
    return newId;
}

export function getAll(){
    return listOfJobs;
}

export function createJob(newJob){
    listOfJobs.push(newJob);
}

export function updateJob(id, newJob){
    listOfJobs.filter((job) => {
        if(job.id === id){
            return {...newJob, id: id};
        }
        return job;
    });
}

export function deleteJob(newJob){
    listOfJobs.push(newJob);
}



