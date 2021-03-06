const axios = require('axios');
const express = require('express');
const app = express();
app.use(express.json());
var cors = require('cors')
app.use(cors())

/*
    Usage:
    1. Open Postman
    2. Select Post.
    3. Call it with localhost:8080/
    4. Call the /addProblem route
    5. For POST request in Postman, go to the body tab, select JSON on the dropdown, then in the
    text area create a json object with the keys "userID" & "problem". Within "problem" specify a 
    object with {} add in the keys "problem", "answer", & "problemId"
    8. For each call, you will be sent back a response indicating success or failure

    Example request: 
    {
    "userId":"99",
    "problem": {"problem":"5+2", "answer":"4","problemId":"3"}
    }
*/

// Makes post request to /addProblem route
app.post('/addProblem', (pmanReq,pmanRes)=>{
    
    // Grab the posts body
    const bodyPost = pmanReq.body
    // Make post request to our API
    axios.post("https://codubee-projects-api.herokuapp.com/math/addProblem",bodyPost)
    .then(function(newResponse){
        // Executes if request was successful
        console.log(newResponse)
        pmanRes.json({"message":"Posted"})
    }).catch(function(err){
        // Executes if there was any errors
        console.log(err)
        pmanRes.json({"message":"Error"})
    })
})

app.get('/getProblem', function(req, res) {
    axios.get('https://codubee-projects-api.herokuapp.com/math/getProblem')
    .then(function(response) {
        console.log(response["data"])
        res.json(response["data"])
    })
    .catch(function(error) {
        console.log(error)
        response.json({"message": "ERROR: REQUEST FAILED"})
    })
});

app.get('/getMatches', (req, res) => {
    axios.get(`https://codubee-projects-api.herokuapp.com/math/getMatches?userId=${req.query.userId}`)
    .then((axiosResponse) => {
        res.json(axiosResponse.data)
    })
    .catch((err) => {
        res.json(err);
    })
});


app.delete('/deleteProblem', (req, res) => {
    axios.delete(`https://codubee-projects-api.herokuapp.com/math/deleteProblem?userId=${req.query.userId}&problemId=${req.query.problemId}`)
    .then((axiosResponse) => {
        res.json(axiosResponse.data);
    })
    .catch((err) => {
        res.json(err);
    })
});

app.get('/getWeather', (req, res) => {
    axios.get('https://codubee-projects-api.herokuapp.com/getWeather')
    .then((axiosResponse) => {
        res.json(axiosResponse.data)
    })
    .catch((err) => {
        res.json(err);
    })
});

app.listen( process.env.PORT || 8080, () => console.log('Example app listening at http://localhost:8080'))
