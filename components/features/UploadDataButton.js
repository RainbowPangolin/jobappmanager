import * as db from '../utils/localDB.js';

export default function UploadDataButton({dataKey, children, getUploadedData}){
	const uploadToStorage = () => {
		console.log('todo', dataKey);
		db.setItem(dataKey, getUploadedData.call());
	};

	return(
		<button onClick={uploadToStorage}>
			{children}
		</button>
	);

}