import JobDescriptionBox from '../joblistcomponent/JobDescriptionBox';
import CustomResumeBox from '../joblistcomponent/CustomResumeBox';
import CoverLetterBox from '../joblistcomponent/CoverLetterBox';

export default function JobNotesDialogScreen({job}){
	
	const resumeLink = job?.job_resume;
	const coverLetter = job?.job_coverletter;
	const jobDescription = job?.job_content;
	return(
		<>
			<p>poo: {resumeLink}</p>
			<CustomResumeBox resumeLink={resumeLink}/>
			<CoverLetterBox coverLetter={coverLetter}/>
			<JobDescriptionBox jobDescription={jobDescription}/>
		</>
	);
}