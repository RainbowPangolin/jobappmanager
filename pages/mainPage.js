import * as Components from '../components';


export default function MainPage(){
	return(
		<div>
			<div>
				<details>
					<summary>TODO LIST</summary>
					<Components.TodoList/>

				</details>
				<Components.ResumeLinker/>
				<Components.ReferencesSheet/>
				<Components.NotesComponent/>
			</div>

			<div>
				<Components.JobsAppliedMainComponent/>
				<Components.DownloadDataButton dataKey={'jobList'}>
					Download Job Applications Backup
				</Components.DownloadDataButton>
			</div>
		</div>
	);
}

  