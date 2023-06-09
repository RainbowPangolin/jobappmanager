import * as db from './/utils/localDB.js';

export default function DownloadDataButton({dataKey, children}){

	const downloadToBrowser = () => {
		const data = JSON.stringify(db.getItem(dataKey));
		const blob = new Blob([data], { type: 'application/json' });
		const url = URL.createObjectURL(blob);

		const link = document.createElement('a');
		link.href = url;
		link.download = 'data.json';

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

	};

	return(
		<button onClick={downloadToBrowser}>
			{children}
		</button>
	);

}