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
