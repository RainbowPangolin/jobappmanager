import {useState, useContext, useEffect} from "react";
import { CallbacksContext } from "./utils/CallbacksContexts";
import * as db from "./utils/localDB";

const JobItemComponent = ({jobItem}) => {
    //TODO Edit functionality
    
    const [editMode, setEditMode] = useState(false)
    const [curJob, setCurJob] = useState(jobItem);
    const toggleEdit = () => {
        if(editMode){
            setEditMode(false);
        } else {
            setEditMode(true);
        }
    }

    const submitUpdate = () => {
        db.updateJob(curJob.id, curJob);
    };

    const submitDelete = () => {
        db.deleteJob(curJob.id);
    }

    return(
        <tr>
            {editMode ? 
                <>
                    <td><input defaultValue={curJob.job_name} onChange={(e) => setCurJob({ ...curJob, job_name: e.target.value })}></input></td>
                    <td><input defaultValue={curJob.company} onChange={(e) => setCurJob({ ...curJob, company: e.target.value })}></input></td>
                    <td><input defaultValue={curJob.job_link} onChange={(e) => setCurJob({ ...curJob, job_link: e.target.value })}></input></td>
                    <td><EditButton toggleEdit={toggleEdit} submitUpdate={submitUpdate}>Confirm Edit</EditButton></td>
                </>:
                <>
                    <td>{curJob.job_name}</td>
                    <td>{curJob.company}</td>
                    <td>{curJob.job_link}</td>
                    <td><JobStatusSelector/></td>
                    <td><JobNoteExpander/></td>
                    <td><EditButton toggleEdit={toggleEdit}>Edit</EditButton></td>
                    <td><DeleteButton submitDelete={submitDelete}/></td>
                    <td>{curJob.id}</td>
                </>}

        </tr>
    )
}

const JobStatusSelector = () => {
    const cbList = useContext(CallbacksContext);

    const setJobItemStatus = cbList.setJobItemStatus;

    return(
        <select onChange={(e) => setJobItemStatus(e.target.value)}>
            <option value="TODO">TODO</option>
            <option value="Applied">Applied</option>
            <option value="Rejected">Rejected</option>
            <option value="Offered">Offered</option>
            <option value="Accepted">Accepted</option>
        </select>
    )
}

const EditButton = ({toggleEdit, submitUpdate, children}) => {
    const cbList = useContext(CallbacksContext);

    const setEditMode = () => {
        toggleEdit.call();
        submitUpdate?.call();
    }


    return(
        <button onClick={setEditMode}>{children}</button>
    )
}

const DeleteButton = ({submitDelete}) => {

    //TODO- Using the callbacks via context will probably lead to nicer code. Refactor when you get a chance.

    const cbList = useContext(CallbacksContext);

    const myDel = () => {
        submitDelete.call();
        cbList.deleteJobCallback.call();

    }

    return(
        <button onClick={myDel}>Delete</button>
    )
}

const JobItemList = ({listOfJobs}) => {
    if(listOfJobs.length > 0){
        const listItemsAsElements = listOfJobs.map((item) => (
            <JobItemComponent key={item.id} jobItem={item}/>
        ));
    
    
        return(
            <tbody>
                {listItemsAsElements}
            </tbody>
        )    
    }
    return(
        <tbody>
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
        db.createJob(newJob);
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

    const [listOfJobs, setListOfJobs] = useState([]);

    useEffect(() => {
        setListOfJobs(db.getList());
    }, []);

    const callbacks = {
        addJobCallback: (newJob) => {
            setListOfJobs([newJob, ...listOfJobs]) 
        },
        deleteJobCallback: (id) => { 
            // const filteredArray = listOfJobs.filter((item) => {
            //     item.id != id;
            // });
            // setListOfJobs([filteredArray]);
            setListOfJobs(db.getList());
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
        setJobItemStatus: (id, status) => {
            //TODO Refactor to use callbacks
        }
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
                        <td>Job Name</td>
                        <td>Company</td>
                        <td>Link</td>
                        <td>Status</td>
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





