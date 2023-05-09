export default async function handler(req, res) {

    // TODO The user_id is taken from the authentication token to ensure that the user can only retrieve their own job applications.
            //if req is GET

        

        // This endpoint retrieves all job applications for a specific user.
        // The user_id is taken from the authentication token to ensure that the user can only retrieve their own job applications.

        if(req.method === 'GET'){
            let [user_id, app_id] = req.query.params
            let url;

            // GET /applications/user/app
            if(app_id){
                url = `https://g1a0971b56a7dae-jobappdb.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/jobapi/applications/${user_id}/${app_id}`
            } 
            // GET /applications/user
            else {
                url = `https://g1a0971b56a7dae-jobappdb.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/jobapi/applications/${user_id}`
            }
            const response = await fetch(url);
            const tempData = await response.json();
            const finalData = tempData.items
            res.status(200).json(finalData);
        }
    

        //if req is POST

        //POST /applications
        // This endpoint creates a new job application in the database.
        // Request body should contain the required data: job_name, company_name, job_desc, job_link, app_status.
        // The user_id is taken from the authentication token.

        if(req.method === 'POST'){
            const url = `https://g1a0971b56a7dae-jobappdb.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/jobapi/applications`
            const requestBody = req.body;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
              })
            .catch(error => {
                console.error('Error:', error);
              }
            );

            const resBody = await response.json(); // or res.text(), res.blob(), etc.

            console.log(resBody)

            res.status(response.status).json(resBody);
        }
    
    
        //if req is  PUT
        // PUT /applications/{app_id}
    
        // This endpoint updates an existing job application in the database.
        // Request body should contain the updated data: job_name, company_name, job_desc, job_link, app_status.
        // The user_id is taken from the authentication token to ensure that the user can only update their own job applications.
    
    
        //if req is DELETE
    
        // DELETE /applications/{app_id}
    
        // This endpoint deletes a specific job application from the database.
        // The user_id is taken from the authentication token to ensure that the user can only delete their own job applications.
      
      
  
    
    }