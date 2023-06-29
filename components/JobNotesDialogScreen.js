import JobDescriptionBox from './JobDescriptionBox';
import CustomResumeBox from './CustomResumeBox';
import CoverLetterBox from './CoverLetterBox';

export default function JobNotesDialogScreen({job}){
	
	const resumeLink = job?.job_resume;
	return(
		<>
			<p>poo: {resumeLink}</p>
			<CustomResumeBox/>
			<CoverLetterBox/>
			<JobDescriptionBox/>
		</>
	);
}