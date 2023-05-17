import { useState } from 'react';
  
function SearchBar({searchTerm, onSearchTextChange}) {
    return (
      <form>
        <input 
            type="text" 
            placeholder="Search..." 
            value={searchTerm} 
            onChange={(e) => onSearchTextChange(e.target.value)} 
        />
        <label>
          
        </label>
      </form>
    );
}

function Title(){
    return(
        <h2>Jobs</h2>
    )
}

function JobRow({jobData}){
    return (
        <tr>
        <td>{jobData.job_name}</td>
        <td>{jobData.company}</td>
        <td>{jobData.app_status}</td>
        <td>{jobData.job_link}</td>
        </tr>
    );
}

function JobTable({jobs, searchTerm}){



    const rows = [];

    jobs.forEach((job) => {
        
        

        if (job.job_name.toLowerCase().indexOf(
            searchTerm.toLowerCase()) 
            === -1
          ){
            return
        }
        
        rows.push(<JobRow jobData={job}/>)
    })
    
    return (
      <table>
        <thead>
          <tr>
            <th>Job Name</th>
            <th>Company</th>
            <th>Status</th>
            <th>Link To Posting</th>
            <th>More...</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
}

function JobBoard({jobs}){

    const [searchTerm, setSearchTerm] = useState('');
    
    return (
        <div>
            <SearchBar 
                searchTerm={searchTerm} 
                onSearchTextChange={setSearchTerm}/>
            <Title/>
            <JobTable jobs={jobs} searchTerm={searchTerm}/>
        </div>
    )
}
  



export default function App() {
    return <JobBoard jobs={testData}/>

    // return <FilterableProductTable products={PRODUCTS} />;
}

const testData = [  {app_id: 1, 
  user_id: "Tester",
  job_name: "Software Engineer1", 
  company: "Comp1", 
  job_content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt augue nulla, sit amet tempor lorem lobortis nec. Nam molestie augue ac ex ullamcorper eleifend. Sed suscipit posuere est, vel dignissim quam.",
  job_link:"https://www.example.com/job/software-engineer", 
  app_status:"Applied", 
  created_at:"2023-05-04T04:27:48.089Z"},

  {app_id: 3, 
  user_id: "Tester",
  job_name: "Software Engineer3", 
  company: "Comp1", 
  job_content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt augue nulla, sit amet tempor lorem lobortis nec. Nam molestie augue ac ex ullamcorper eleifend. Sed suscipit posuere est, vel dignissim quam.",
  job_link:"https://www.example.com/job/software-engineer", 
  app_status:"Applied", 
  created_at:"2023-05-04T04:27:48.089Z"},

  {app_id: 2, 
      user_id: "OtherTester",
      job_name: "Software Engineer2", 
      company: "Comp2", 
      job_content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt augue nulla, sit amet tempor lorem lobortis nec. Nam molestie augue ac ex ullamcorper eleifend. Sed suscipit posuere est, vel dignissim quam.",
      job_link:"https://www.example.com/job2/software-engineer", 
      app_status:"Not Submitted", 
      created_at:"2023-05-04T04:27:48.089Z"}
]
