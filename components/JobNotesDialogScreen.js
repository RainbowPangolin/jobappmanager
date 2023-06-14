import JobDescriptionBox from './JobDescriptionBox';
import CustomResumeBox from './CustomResumeBox';
import CoverLetterBox from './CoverLetterBox';

export default function JobNotesDialogScreen(){

	return(
		<>
			<CustomResumeBox/>
			<CoverLetterBox/>
			<JobDescriptionBox/>
		</>
	);
}