const usedIds = new Set();

const testItem = {
    id: 0,
    user_id: "testUser",
    job_name: "JobName", 
    company: "Comp1", 
    job_content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt augue nulla, sit amet tempor lorem lobortis nec. Nam molestie augue ac ex ullamcorper eleifend. Sed suscipit posuere est, vel dignissim quam.",
    job_link:"https://www.example.com/job/software-engineer", 
    app_status:"Applied", 
    date_applied:"2023-05-04"
  }
  
let listOfJobs = [testItem];

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



