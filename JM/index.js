const axios = require('axios');
const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config({ path: '../.env' });

app.use(express.json());
app.use(cors());

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

app.delete('/deletePerson', (req, res) => {
    axios.delete(`http://java-sample-api-2020.herokuapp.com/deletePerson?id=${req.query.id}`)
    .then(() => {
        res.json({"Message": `Deleted Person ${req.query.id}`})
    })
    .catch(() => {
        res.status(500).json({"Message": "Error"});
    })
});

app.get('/events', (req, res) => {
    let params = Object.keys(req.query).length === 0 ? '' : req.query;
    console.log(params);
    console.log(req.query);

    axios.get(`https://api.yelp.com/v3/events`, {
        headers: {
            Authorization: `Bearer ${process.env.API_TOKEN}`
        },
        params: {
            location: params.location ? params.location : null,
            limit: params.limit ? params.limit : null,
            locale: params.locale ? params.locale : null,
            offset: params.offset ? params.offset : null,
            sort_by: params.sort_by ? params.sort_by : null,
            sort_on: params.sort_on ? params.sort_on : null,
            start_date: params.start_date ? params.start_date : null,
            end_date: params.end_date ? params.end_date : null,
            categories: params.categories ? params.categories : null,
            is_free: params.is_free ? params.is_free : null,
            latitude: params.latitude ? params.latitude : null,
            radius: params.radius ? params.radius : null,
            excluded_events: params.excluded_events ? params.excluded_events : null
        }
    })
    .then((response) => {
        res.json(response.data);
    })
    .catch((err) => {
        res.json(err);
    })
})

app.listen(3000, () => {
    console.log('Server is running');
});