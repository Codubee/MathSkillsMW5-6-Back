const axios = require('axios');
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


app.get('/getMatches', (req, res) => {
    axios.get(`https://codubee-projects-api.herokuapp.com/math/getMatches?userId=${req.query.userId}`)
    .then((axiosResponse) => {
        res.json(axiosResponse.data)
    })
    .catch((err) => {
        res.json(err);
    })
});


app.listen( process.env.PORT || 8080, () => console.log('Example app listening at http://localhost:8080'))
