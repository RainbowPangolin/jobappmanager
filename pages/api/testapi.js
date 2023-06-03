export default async function handler(req, res) {
	const testData = [  {app_id: 1, 
		user_id: 'Tester',
		job_name: 'Software Engineer1', 
		company: 'Comp1', 
		job_content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt augue nulla, sit amet tempor lorem lobortis nec. Nam molestie augue ac ex ullamcorper eleifend. Sed suscipit posuere est, vel dignissim quam.',
		job_link:'https://www.example.com/job/software-engineer', 
		app_status:'Applied', 
		created_at:'2023-05-04T04:27:48.089Z'},

	{app_id: 1, 
		user_id: 'Tester',
		job_name: 'Software Engineer3', 
		company: 'Comp1', 
		job_content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt augue nulla, sit amet tempor lorem lobortis nec. Nam molestie augue ac ex ullamcorper eleifend. Sed suscipit posuere est, vel dignissim quam.',
		job_link:'https://www.example.com/job/software-engineer', 
		app_status:'Applied', 
		created_at:'2023-05-04T04:27:48.089Z'},

	{app_id: 2, 
		user_id: 'OtherTester',
		job_name: 'Software Engineer2', 
		company: 'Comp2', 
		job_content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt augue nulla, sit amet tempor lorem lobortis nec. Nam molestie augue ac ex ullamcorper eleifend. Sed suscipit posuere est, vel dignissim quam.',
		job_link:'https://www.example.com/job2/software-engineer', 
		app_status:'Not Submitted', 
		created_at:'2023-05-04T04:27:48.089Z'}
	];
	res.status(200).json(testData);
}


  