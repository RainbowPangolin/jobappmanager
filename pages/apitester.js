import { useState } from 'react';
import styles from '../styles/grid.module.css';


const MyPage = () => {
  const [response, setResponse] = useState('');
  const [url, setUrl] = useState('/api/applications/User1/1');

  const handleClick = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    setResponse(JSON.stringify(data));
  };

  const handleClickP = async (url) => {

    const myData = {
      user_id: "3s Tester",
      job_name: "Softasware Engineer1", 
      company: "Comp1", 
      job_content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt augue nulla, sit amet tempor lorem lobortis nec. Nam molestie augue ac ex ullamcorper eleifend. Sed suscipit posuere est, vel dignissim quam.",
      job_link:"https://www.example.com/job/software-engineer", 
      app_status:"Applied", 
      created_at:"2023-05-04T04:27:48.089Z"
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myData)
    });
    const resBody = await res.json(); 
    console.log(`Okay, here is res: \n ${JSON.stringify(resBody)} \n`)
  };

  const handleButtonClick = (event) => {
    const url = event.target.innerText;
    setUrl(url);
    handleClick(url);
  };

  const handleButtonClickPost = (event) => {
    const url = event.target.innerText;
    setUrl(url);
    handleClickP(url);
  };



  const handleCustomButtonClick = (event) => {
    const url = document.getElementById("customRoute");
    setUrl(url);
    handleClick(url);
  };

  return (
    <div className={styles.container}>

      <p>GET</p>

      <button onClick={handleButtonClick}>/api/applications/User1/1</button>
      <button onClick={handleButtonClick}>/api/applications/User1/2</button>
      <button onClick={handleButtonClick}>/api/applications/JohnDoe/3</button>
      <button onClick={handleButtonClick}>/api/applications/User1</button>
      <button onClick={handleButtonClick}>/api/applications/JohnDoe</button>
      <button onClick={handleCustomButtonClick}>CUSTOM ROUTE</button>
      <input type="text" id="customRoute" placeholder="/api/applications"></input>

      <p>POST</p>

      <button onClick={handleButtonClickPost}>/api/applications</button>


      <br />
      <textarea value={response} readOnly />
    </div>
  );
};

export default MyPage;



