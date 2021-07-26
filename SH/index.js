
// We define the npm packages to be used here
const { default: axios } = require('axios');
const express = require ('express');
const app = express();
app.use(express.json())

/*
    Testcases:
    1. Open Postman
    2. Select a path. Either GET, POST, or DELETE
    3. Call it with localhost:8080/
    4. After the '/' specify getAllPeople if GET was selected or addPerson if it was a POST
    5. For POST request in Postman, go to the body tab, select JSON on the dropdown, then in the
    text area create a json object with the keys "name" & "address"
    6. For the delete route, if selected in Postman, call localhost:8080/deletePerson
    7. In the params tab add 'id' as a key and under the value column specify the ID
    8. For each call, you will be sent back a response indicating success or failure
*/


/* Create a get request to the route /getAllPeople, then we call
    the API using axios to get the information from the api and we 
    log the data. We send a response back to postman with pmanRes
 */
app.get('/getAllPeople', function(pmanReq,pmanRes){
    // Calling API
    axios.get("http://java-sample-api-2020.herokuapp.com/getAllPeople").then(function(newResponse){
        // Logging API response and sending a response back
        console.log(newResponse["data"])
        pmanRes.json({"message":"received"})
    }).catch(function(error){
        // If we have an error, we log it and send a response back
        console.log(error)
        pmanRes.json({"message":"error in getting all people"})
    })
    
})

/* Here we make a post request to our API. We call the route /addPerson and send a body
   in Postman. We parse it and hold it in a variable. Call axios to post it to our API.
*/
app.post('/addPerson', function(pmanReq,pmanRes){
    // Grabbing the sent request contents
    const bodyPost = pmanReq.body;
    console.log(bodyPost)
    // Attempting to post the contents to our API and sending a response back
    axios.post("http://java-sample-api-2020.herokuapp.com/addPerson",bodyPost).then(function(newResponse){
        console.log(newResponse);
        pmanRes.json({"message":"posted"})
    }).catch(function(error){
        console.log(error)
        pmanRes.json({"message":"error in posting"})
    })
})

/*
    We make a call route to the deletePerson route with a delete request.
    We parse it for the ID and make a delete call with axios to our API.
 */
app.delete('/deletePerson', function(pmanReq,pmanRes){
    // We grab the id
    const userID = pmanReq.query["id"]
    // Make a delete call to the API and handle it. We send response back to the caller (Postman)
    axios.delete("https://java-sample-api-2020.herokuapp.com/deletePerson?id=" + userID)
    .then(function(newResponse){
        console.log(newResponse)
        pmanRes.json({"message":"deleted"})
    }).catch(function(error){
        console.log(error)
        pmanRes.json({"message":"error in deleting"})
    })
    
})


// We start up the backend with port 8080 or a provided port
app.listen(process.env.PORT || 8080,function(){
    console.log("API is listening");
})