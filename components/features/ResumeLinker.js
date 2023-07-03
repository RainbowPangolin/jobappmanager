import { useState } from 'react';

export default function ResumeLinker() {
	const [resumeLink, setResumeLink] = useState('');
	const handleInputChange = (event) => {
		setResumeLink(event.target.value);
	};
	const handleButtonClick = () => {
		// Perform any additional operations you want here
		// For now, let's log the resume link to the console
		console.log('Resume Link:', resumeLink);
	};

	return (
		<div>
			<a href={resumeLink}>Resume</a>
			<input
				id="userInputResumeLink"
				value={resumeLink}
				onChange={handleInputChange}
			/>
			<button type="submit" onClick={handleButtonClick}>
				Set Resume Link
			</button>
		</div>
	);
}
