import React from "react"

const JobItemComponent = ({jobItem}) => {
    return(
        <tr>
            <td>{jobItem.job_name}</td>
            <td>{jobItem.app_status}</td>
            <td>{jobItem.job_link}</td>
            <td>{jobItem.app_status}</td>
            <td><JobNoteExpander/></td>
            <td><EditButton/></td>
            <td><DeleteButton/></td>
        </tr>
    )
}

const EditButton = () => {
    return(
        <button>Edit</button>
    )
}

const DeleteButton = () => {
    return(
        <button>Delete</button>
    )
}

const JobItemList = ({listOfJobs}) => {
    return(
        <JobItemComponent jobItem={listOfJobs[0]}/>
    )    
}

const JobNoteExpander = () => {
    return(
        <button type="submit">Job Note Expander</button>
    )
}

export default function JobsAppliedMainComponent(){

    return(
        <div>
            <p> JobsAppliedMainComponent </p>
            <thead>
                <tr>
                    <th colspan="5">The table header</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>
                    <td>8</td>
                </tr>

                <JobItemList listOfJobs={[testItem]}/>
            </tbody>
        </div>
    )
}





const testItem = {
    user_id: "testUser",
    job_name: "JobName", 
    company: "Comp1", 
    job_content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt augue nulla, sit amet tempor lorem lobortis nec. Nam molestie augue ac ex ullamcorper eleifend. Sed suscipit posuere est, vel dignissim quam.",
    job_link:"https://www.example.com/job/software-engineer", 
    app_status:"Applied", 
    date_applied:"2023-05-04"
  }