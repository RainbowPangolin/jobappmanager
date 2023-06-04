import {useRef} from 'react';

export default function JobNotesDialogButton(){
	const dialogRef = useRef(null);

	const showDialog = () => {
		console.log('asd2sf');
		if (dialogRef.current) {
			dialogRef.current.showModal();
		}
	};

	return(
		<>
			<button onClick={showDialog}>
				Notes
			</button>
			<dialog ref={dialogRef}>
				<p>asdf</p>
			</dialog>
		</>
	);
}