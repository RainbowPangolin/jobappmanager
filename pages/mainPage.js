import {TodoList, ResumeLinker, ReferencesSheet, NotesComponent, JobsAppliedMainComponent} from '../components';


export default function MainPage(){
	return(
		<div>
			<div>
				<details>
					<summary>TODO LIST</summary>
					<TodoList/>

				</details>
				<ResumeLinker/>
				<ReferencesSheet/>
				<NotesComponent/>
			</div>

			<div>
				<JobsAppliedMainComponent/>
			</div>
		</div>
	);
}

  