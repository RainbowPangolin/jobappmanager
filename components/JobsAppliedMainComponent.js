import {useState, useContext, createContext} from "react"

const AddJobCallbackContext = createContext(null);

const JobItemComponent = ({jobItem}) => {
    let editMode = false;
    return(
        <tr>

            {editMode ? 
                <>
                    <p>Edit</p>
                </>:
                <>
                    <td>{jobItem.job_name}</td>
                    <td>{jobItem.company}</td>
                    <td>{jobItem.job_link}</td>
                    <td>{jobItem.app_status}</td>
                    <td><JobNoteExpander/></td>
                    <td><EditButton/></td>
                    <td><DeleteButton/></td>
                </>}

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

    const listItemsAsElements = listOfJobs.map(
        (item) => {
            return(
                <li key={item.id}>
                    <JobItemComponent jobItem={item}/>
                </li>
            )
        }
    )


    return(
        <ul>{listItemsAsElements}</ul>
    )    
}

const JobNoteExpander = () => {
    return(
        <button type="submit">Job Note Expander</button>
    )
}

const JobItemAdder = () => {

    const addJobCallback = useContext(AddJobCallbackContext);

    const [jobName, setJobName] = useState('')
    const [company, setCompany] = useState('')
    const [link, setLink] = useState('')

    const updateJob = (event) => {
        setJobName(event.target.value);
    }

    const updateCompany = (event) => {
        setCompany(event.target.value);
    }

    const updateLink = (event) => {
        setLink(event.target.value);
    }

    const addJob = () => {
        let newJob = {
            user_id: "testUser",
            job_name: jobName, 
            company: company, 
            job_content:"",
            job_link: link, 
            app_status:"Unknown", 
            date_applied:"TimestampTODO"
          }
        addJobCallback(newJob);
    }

    return(
        <table>
            <thead>
                <tr>
                    <th colSpan="4">Add Job</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>jobname</td>
                    <td>company</td>
                    <td>link</td>
                    <td>button</td>
                </tr>
                <tr>
                    <td><input onChange={updateJob}></input></td>
                    <td><input onChange={updateCompany}></input></td>
                    <td><input onChange={updateLink}></input></td>
                    <td><button type="submit" onClick={addJob}>Add Job</button></td>
                </tr>
            </tbody>
            
        </table>
        
    )
}

export default function JobsAppliedMainComponent(){

    const [listOfJobs, setListOfJobs] = useState([testItem])

    console.log(listOfJobs)

    const addJobCallback = (newJob) => {
        setListOfJobs([newJob, ...listOfJobs]);
    }

    return(
        <AddJobCallbackContext.Provider value={addJobCallback}>
            <p> JobsAppliedMainComponent </p>
            <JobItemAdder/>
            <table>
                <thead>
                    <tr>
                        <th colSpan="5">The table header</th>
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

                    <JobItemList listOfJobs={listOfJobs}/>
                </tbody>
            </table>
            
        </AddJobCallbackContext.Provider>
    )
}





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