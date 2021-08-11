const axios = require('axios');
const express = require ('express');
const app = express();
app.use(express.json());

/* 
 * Creates a Node.js API which interfaces with an API with a list of people who have IDs
 * attached to them. The first route is a GET request to retrieve a list of all of the people 
 * in the API. The second route is a DELETE request to delete a person from the list by specifying
 * their ID. The third route is a POST request to add a person to the list.
*/

app.get('/getAllPeople', function(req, res){ // route which logs list of all people to console
    axios.get("http://java-sample-api-2020.herokuapp.com/getAllPeople") // request attempted here
    .then(function(newResponse){
        console.log(newResponse["data"]) // on success, logs the data from the API in the console
        res.json({"message": "OK"})
    })
    .catch(function(error){ // on error, the API response is "REQUEST FAILED"
        console.log(error)
        res.json({"message": "ERROR: REQUEST FAILED"})
    })
});

app.delete('/deletePerson', function(req, res){ // route which deletes person by queried id
    const id = req.query["id"] // parses for the value of a query parameter called "id"
    axios.delete("https://java-sample-api-2020.herokuapp.com/deletePerson?id=" + id) // request attempted here
    .then(function(newResponse){ // on success, responds in the console with message
        console.log(newResponse)
        res.json({"message": "SUCCESS: USER WITH ID " + id +  "DELETED"})
    })
    .catch(function(error){ // on error, the API response is "USER NOT DELETED"
        console.log(error)
        res.json({"message": "ERROR: USER NOT DELETED"})
    }) 
});

app.post('/addPerson', function(req, res){ // route which adds a person to the API 
    const body = req.body;  
    console.log(body) // logs the body of the post request for debugging
    axios.post("http://java-sample-api-2020.herokuapp.com/addPerson", body) // POST request attempted here
    .then(function(newResponse){ // on success, the message is the response
        console.log(newResponse);
        res.json({"message":"SUCCESS: USER ADDED"})
    })
    .catch(function(error){ // on error, the API response is "POST FAILED"
        console.log(error)
        res.json({"message":"ERROR: POST FAILED"})
    })
});

// starts the api listening on a port (8080 default)
app.listen(process.env.PORT || 8080,function(){
    console.log("listening");
});
