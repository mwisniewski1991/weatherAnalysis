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

    const timeCount = request.params.timeCount * 7;
    // const now = moment().subtract(1, 'days')
    const now = moment('2019-12-02').unix();

    // console.log(moment(now).format('YYYY.MM.DD HH:MM'));
    
    // console.log(moment(now));
    // console.log('now')

    try{
        const dailySummarise = new Datastore('data/databases/dailySummarise.db');
        dailySummarise.loadDatabase();
            //time: {$lt: now}
        dailySummarise.find({time: {$lt: now}}).sort({collectTime: -1, time: -1}).limit(timeCount).exec( (err, docs)=>{

            docs.forEach((doc) =>{
                doc.cloudCover = +doc.cloudCover;
                doc.humidity = +doc.humidity;
                doc.pressure = +doc.pressure;
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
    // const now = moment().subtract(1, 'days')
    const now = moment('2019-12-02').unix();

    // console.log(moment(now).format('YYYY.MM.DD HH:MM'));

    try{

        const dailyForecastWeekly = new Datastore('data/databases/dailyForecastWeekly.db');
        dailyForecastWeekly.loadDatabase();
            
        dailyForecastWeekly.find({time: {$lt: now}}).sort({collectTime: -1, time: -1}).limit(timeCount).exec( (err, docs)=>{

            docs.forEach((doc) =>{
                // doc.cloudCover = +doc.cloudCover;
                // doc.humidity = +doc.humidity;
                // doc.pressure = +doc.pressure;
                doc.time = doc.time * 1000;
            });


            response.json(docs)
        });

    }catch(err){
        console.log("ERROR")
        console.log(err);
    }
});


app.get('/currentWeather/:timeCount', async (request, response) => {

    const timeCount = request.params.timeCount * 24;
    // const now = moment().subtract(1, 'hour')
    const now = moment('2019-12-02 16:00').unix();

    try{

        const currentWeather = new Datastore('data/databases/currentWeather.db');
        currentWeather.loadDatabase();
            
        currentWeather.find({time: {$lt: now}}).sort({collectTime: -1, time: -1}).limit(timeCount).exec( (err, docs)=>{

            docs.forEach((doc) =>{
                // doc.cloudCover = +doc.cloudCover;
                // doc.humidity = +doc.humidity;
                // doc.pressure = +doc.pressure;
                doc.time = doc.time * 1000;
            });

            response.json(docs)
        });

    }catch(err){
        console.log("ERROR")
        console.log(err);
    }



});


app.get('/hourlyForecast/:timeCount', async (request, response) => {

    const timeCount = request.params.timeCount * 24;
    // const now = moment().subtract(1, 'hour')
    const now = moment('2019-12-02 16:00').unix();

    try{

        const hourlyForecast = new Datastore('data/databases/hourlyForecast.db');
        hourlyForecast.loadDatabase();
            
        hourlyForecast.find({time: {$lt: now}}).sort({collectTime: -1, time: -1}).limit(timeCount).exec( (err, docs)=>{

            docs.forEach((doc) =>{
                // doc.cloudCover = +doc.cloudCover;
                // doc.humidity = +doc.humidity;
                // doc.pressure = +doc.pressure;
                doc.time = doc.time * 1000;
            });

            response.json(docs)
        });

    }catch(err){
        console.log("ERROR")
        console.log(err);
    }

});