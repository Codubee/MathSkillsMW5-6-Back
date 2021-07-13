const axios = require('axios');
const express = require('express');
const app = express();

app.use(express.json());

app.post('/addPerson', (req, res) => {
    const body = req.body;
   
    axios.post('http://java-sample-api-2020.herokuapp.com/addPerson', body)
    .then((response) => {
        res.json({"Person Added": body});
    })
    .catch(() => {
        res.status(500).json({"message": "Error"})
    })
});

app.get('/getAllPeople', (req, res) => {
    axios.get('http://java-sample-api-2020.herokuapp.com/getAllPeople')
    .then((response) => {
        res.json({"All People": response.data})
    })
    .catch(() => {
        res.status(500).json({"Message": "Error"});
    })
});

app.delete('/deletePerson/:id', (req, res) => {
    axios.delete(`http://java-sample-api-2020.herokuapp.com/deletePerson/${req.params.id}`)
    .then(() => {
        res.json({"Message": `Deleted Person ${req.params.id}`})
    })
    .catch(() => {
        res.status(500).json({"Message": "Error"});
    })
});

app.listen(3000, () => {
    console.log('Server is running');
});