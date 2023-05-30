import {useState, useContext} from "react";
import { CallbacksContext } from "./utils/CallbacksContexts";
import * as db from "./utils/mockDB";

const JobItemComponent = ({jobItem}) => {
    const [editMode, setEditMode] = useState(false)
    const toggleEdit = () => {
        if(editMode){
            setEditMode(false);
        } else {
            setEditMode(true);
        }
    }

    return(
        <tr>
            {false ? 
                <>
                    <p>Edit</p>
                </>:
                <>
                    <td>{jobItem.job_name}</td>
                    <td>{jobItem.company}</td>
                    <td>{jobItem.job_link}</td>
                    <td>{jobItem.app_status}</td>
                    <td><JobNoteExpander/></td>
                    <td><EditButton toggleEdit={toggleEdit}/></td>
                    <td><DeleteButton/></td>
                </>}

        </tr>
    )
}

const EditButton = ({toggleEdit}) => {
    const cbList = useContext(CallbacksContext);

    const updateJobCallback = cbList.updateJobCallback;

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

    const listItemsAsElements = listOfJobs.map((item) => (
        <JobItemComponent key={item.id} jobItem={item}/>
    ));


    return(
        <tbody>
            {listItemsAsElements}
        </tbody>
    )    
}

const JobNoteExpander = () => {
    return(
        <button type="submit">Job Note Expander</button>
    )
}

const JobItemAdder = () => {

    const cbList = useContext(CallbacksContext);

    const addJobCallback = cbList.addJobCallback;

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
            id: db.getNewId(),
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

                <tr>
                    <td>jobname</td>
                    <td>company</td>
                    <td>link</td>
                    <td>button</td>
                </tr>
            </thead>
            <tbody>
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

    const [listOfJobs, setListOfJobs] = useState(db.getAll())

    const callbacks = {
        addJobCallback: (newJob) => {
            setListOfJobs([newJob, ...listOfJobs]) 
        },
        deleteJobCallback: (id) => { 
            const filteredArray = listOfJobs.filter((item) => {
                item.id != id;
            });
            setListOfJobs([filteredArray]);
        },
        updateJobCallback: (id, newJob) => { 
            const newArr = listOfJobs.map((item) => {
                if (item.id === id){
                    return newJob;
                } else {
                    return item;
                }
            })
            newArr;
        },
      };

    return(
        <CallbacksContext.Provider value={callbacks}>
            <p> JobsAppliedMainComponent </p> 
            <JobItemAdder/>
            <table>
                <thead>
                    <tr>
                        <th colSpan="5">The table header</th>
                    </tr>
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
                </thead>
                <JobItemList listOfJobs={listOfJobs}/>
            </table>
            
        </CallbacksContext.Provider>
    )
}





