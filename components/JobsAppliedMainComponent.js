import {useState, useContext, useEffect} from 'react';
import { CallbacksContext } from './utils/CallbacksContexts';
import * as db from './utils/localDB';
import Link from 'next/link';
import * as jobSort from './utils/sortingFunctions';
import MiscOptionsDialog from './MiscOptionsDialog';

const JobItemComponent = ({jobItem}) => {
	//TODO Refactoring so that each job is within its own context might be smart? TODO
	
	const [editMode, setEditMode] = useState(false);
	const [curJob, setCurJob] = useState(jobItem);
	const toggleEdit = () => {
		if(editMode){
			setEditMode(false);
		} else {
			setEditMode(true);
		}
	};

	const submitUpdate = () => {
		db.updateJob(curJob.id, curJob);
	};

	const submitDelete = () => {
		db.deleteJob(curJob.id);
	};

	function formatUrl(url) {
		let formatted = url.replace(/(^\w+:|^)\/\//, ''); // Removing the protocol part
		let firstFewCharacters = formatted.substr(0, 10); // Extracting the first 10 characters
		let result = `${firstFewCharacters}...`; // Appending ellipses

		return result;
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
					<td><Link href={curJob.job_link}>{formatUrl(curJob.job_link)}</Link></td>
					<td>{curJob.date_applied}</td>
					<td><JobStatusSelector job={curJob}/></td>
					<td><JobNoteExpander/></td>
					<td><EditButton toggleEdit={toggleEdit}>Edit</EditButton></td>
					<td><DeleteButton submitDelete={submitDelete}/></td>
				</>}

		</tr>
	);
};

const JobStatusSelector = ({job}) => {
	const cbList = useContext(CallbacksContext);
	const setJobItemStatus = cbList.setJobItemStatus;

	return(
		<select defaultValue={job.status} onChange={(e) => setJobItemStatus(job.id, e.target.value)}>
			<option value="TODO">TODO</option>
			<option value="Applied">Applied</option>
			<option value="Rejected">Rejected</option>
			<option value="Offered">Offered</option>
			<option value="Accepted">Accepted</option>
		</select>
	);
};

const EditButton = ({toggleEdit, submitUpdate, children}) => {
	const setEditMode = () => {
		toggleEdit.call();
		submitUpdate?.call();
	};

	return(
		<button onClick={setEditMode}>{children}</button>
	);
};

const DeleteButton = ({submitDelete}) => {
	const cbList = useContext(CallbacksContext);
	const myDel = () => {
		submitDelete.call();
		cbList.deleteJobCallback.call();

	};

	return(
		<button onClick={myDel}>Delete</button>
	);
};

const JobItemList = ({listOfJobs, sortingFunction}) => {
	if(listOfJobs.length > 0){
		const curSortingFunction = jobSort.getSortingFunction(sortingFunction);
		const sortedListOfJobs = listOfJobs.sort(curSortingFunction);
		const listItemsAsElements = sortedListOfJobs.map((item) => (
			<JobItemComponent key={item.id} jobItem={item}/>
		));

		return(
			<tbody>
				{listItemsAsElements}
			</tbody>
		);    
	}
	
	return(
		<tbody>
		</tbody>
	);   
};

const JobNoteExpander = () => {
	return(
		<MiscOptionsDialog/>
	);
};

const JobItemAdder = () => {
	const cbList = useContext(CallbacksContext);
	const addJobCallback = cbList.addJobCallback;
	const [jobName, setJobName] = useState('');
	const [company, setCompany] = useState('');
	const [link, setLink] = useState('');

	const updateJob = (event) => {
		setJobName(event.target.value);
	};

	const updateCompany = (event) => {
		setCompany(event.target.value);
	};

	const updateLink = (event) => {
		setLink(event.target.value);
	};

	const isInvalidUrl = (url) => {
		// Regular expression pattern for URL validation
		let urlPattern = /^(?:https?:\/\/)?(?:www\.)?[^\s.]+\.[^\s]{2,}$/i;
		let isValid = urlPattern.test(url);
		return isValid;
	};

	function isJobValid(job){
		if(isInvalidUrl(job.job_link)){
			return false;
		}
		return true;
	}

	const attemptAddJob = () => {
		let newJob = {
			id: db.getNewId(),
			user_id: 'testUser',
			job_name: jobName, 
			company: company, 
			job_content:'',
			job_link: link, 
			app_status:'Unknown', 
			date_applied: db.getCurDate()
		};

		try {
			const jobInvalid = isJobValid(newJob);
			if(jobInvalid){
				throw new Error('Invalid input, job not added.');
			}
			addJobCallback(newJob);
			db.createJob(newJob);
		} catch (e) {
			alert(e);
		}
	};

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
					<td><button type="submit" onClick={attemptAddJob}>Add Job</button></td>
				</tr>
			</tbody>
			
		</table>
		
	);
};

const SortingMethodSelector = ({onSortingFunctionChange}) => {
	return(
		<select type='radio' defaultValue='byId' onChange={onSortingFunctionChange}>
			<option value="byId">by Id</option>
			<option value="byIdReverse">Reverse Id</option>
		</select>
	);
};

export default function JobsAppliedMainComponent(){

	const [listOfJobs, setListOfJobs] = useState([]);
	const [sortingFunction, setSortingFunction] = useState('byId');

	useEffect(() => {
		setListOfJobs(db.getList());
	}, []);

	const callbacks = {
		addJobCallback: (newJob) => {
			setListOfJobs([newJob, ...listOfJobs]); 
		},
		// Definitions left in case I want to update the architecture to use these callbacks correctly.
		// eslint-disable-next-line
		deleteJobCallback: (id) => { 
			setListOfJobs(db.getList());
		},
		// eslint-disable-next-line
		updateJobCallback: (id, newJob) => { 
		},
		setJobItemStatus: (id, status) => {
			const theJob = db.getJob(id);
			db.updateJob(id, {...theJob, status: status});
		}
	};

	const onSortingFunctionChange = (event) => {
		const sortingFunctionName = event.target.value;
		setSortingFunction(sortingFunctionName);
	};

	return(
		<CallbacksContext.Provider value={callbacks}>
			<p> JobsAppliedMainComponent </p> 
			<JobItemAdder/>
			<SortingMethodSelector onSortingFunctionChange={onSortingFunctionChange}/>
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
				<JobItemList listOfJobs={listOfJobs} sortingFunction={sortingFunction}/>
			</table>
			
		</CallbacksContext.Provider>
	);
}





