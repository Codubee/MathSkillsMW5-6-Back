const axios = require('axios');
const express = require('express');
const app = express();

// get route that gets the users matches
app.get('/getMatches', (req, res) => {
    axios.get(`https://codubee-projects-api.herokuapp.com/math/getMatches?userId=${req.query.userId}`)
    .then((axiosResponse) => {
        res.json(axiosResponse.data)
    })
    .catch((err) => {
        res.json(err);
    })
});

app.listen(3000, () => {
    console.log('Server is running');
});