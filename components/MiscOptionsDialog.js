import {useState} from 'react';
import JobNotesDialogScreen from './JobNotesDialogScreen.js';
import Modal from './Modal.js';

export default function MiscOptionsDialog({data}){

	const [closed, setClosed] = useState(true);
	const openJobNotes = () => {
		setClosed(false);
	};

	return(
		<>
			<button onClick={openJobNotes}>
				Misc
			</button>
			<Modal isClosed={closed} onClose={() => setClosed(true)}>
				<JobNotesDialogScreen job={data}/>
			</Modal>
		</>

	);
}