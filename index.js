/* 
 * This api route GETS a random math problem from the math problem api.
*/

const axios = require('axios');
const { response } = require('express');
const express = require('express');
const app = express();
app.use(express.json());

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

app.listen(8080, function() {
    console.log("listening")
})