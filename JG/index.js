const { default: axios } = require('axios');
const express = require ('express');
const app = express();
app.use(express.json())


/*
    This function will add a user to the DB using a POST method request.
*/
app.post('/addPerson', function(req,res) {
    const body = req.body;
    axios.post("http://java-sample-api-2020.herokuapp.com/addPerson",body)
    .then(function(response){
        res.json({"Response":"Success!"})
    })
    .catch(function(error){
        console.log(error)
        res.json({"Response":"There has been an error!"})
    })
})

/*
    This function will call the API and output the users in the DB using a GET method request.
*/
app.get('/getAllPeople', function(req,res) {
    axios.get("http://java-sample-api-2020.herokuapp.com/getAllPeople")

    .then(function(response){
        console.log(response["data"])
        res.json({"Response":"Successfully received"})
    })  
    .catch(function(error){
        console.log(error)
        res.json({"Response":"There has been an error retrieving data."})
    })  
})

/*
    This function use a DELETE method request to erase a user from the DB via user id.
*/
app.delete('/deletePerson', function(req,res){
    const user_id = req.query["id"]
    axios.delete("https://java-sample-api-2020.herokuapp.com/deletePerson?id=" + user_id)

    .then(function(response){
        console.log(response.data)
        res.json({"Response":"Successfully deleted."})
    })  
    .catch(function(error){
        console.log(error)
        res.json({"Response":"There has been an error deleting."})
    })  
})

app.delete('/deleteProblem', function(req,res){
    const user_id = req.query["userId"]
    const problem_id = req.query["problemId"]
    axios.delete("https://codubee-projects-api.herokuapp.com/math/deleteProblem?userId=${user_id}&problemId=${problem_id}")

    .then(function(response){
        console.log(response)
        res.json({"Response":"Successfully deleted!"})
    })  
    .catch(function(error){
        console.log(error)
        res.json({"Response":"There has been an error deleting."})
    })
})


//Start API listening on port 8080.
app.listen(8080, function() {
    console.log("API is listening.");
})
