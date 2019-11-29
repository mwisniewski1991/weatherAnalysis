const fetch = require('node-fetch');
const express = require('express');
const Datastore = require('nedb');
const moment = require('moment');


//CREATE DATABASE
// const currentWeather = new Datastore('data/currentWeather.db');
// const dailyForecast = new Datastore('data/dailyForecast.db');
// const hourlyForecast = new Datastore('data/hourlyForecast.db');

//LOAD DATABASE
// currentWeather.loadDatabase();
// dailyForecast.loadDatabase();
// hourlyForecast.loadDatabase();

const daysCounter = 7;

//CREATE APP 
const app = express();
app.listen(3000, () => console.log("Listening at 3000"));
app.use(express.static('dist'));

//TEST API
app.get('/dailySummarise/:timeCount', async (request, response)=> {

    const timeCount = request.params.timeCount * daysCounter;

    try{

        const dailySummarise = new Datastore('data/databases/dailySummarise.db');
        dailySummarise.loadDatabase();
            
        dailySummarise.find({}).sort({collectTime: -1, time: -1}).limit(timeCount).exec( (err, docs)=>{

            docs.forEach((doc) =>{
                doc.cloudCoverAvg = +doc.cloudCoverAvg;
                doc.humidityAvg = +doc.humidityAvg;
                doc.pressureAvg = +doc.pressureAvg;
                doc.time = doc.time * 1000;
            });
            
            response.json(docs)
        });

    }catch(err){
        console.log("ERROR")
        console.log(err);
    }
});

app.get('/dailyForecastWeekly/:timeCount', async (request, response)=> {

    const timeCount = request.params.timeCount * 7;

    try{

        const dailyForecastWeekly = new Datastore('data/databases/dailyForecastWeekly.db');
        dailyForecastWeekly.loadDatabase();
            
        dailyForecastWeekly.find({}).sort({collectTime: -1, time: -1}).limit(timeCount).exec( (err, docs)=>{

            docs.forEach((doc) =>{
                // doc.cloudCoverAvg = +doc.cloudCoverAvg;
                // doc.humidityAvg = +doc.humidityAvg;
                // doc.pressureAvg = +doc.pressureAvg;
                doc.time = doc.time * 1000;
            });


            response.json(docs)
        });

    }catch(err){
        console.log("ERROR")
        console.log(err);
    }
});
