import { dailyForecastWeekly } from './dailyForecastWeekly'; //TEST
import { dailySummarise } from './dailySummarise'; //TEST
import { currentWeather } from './currentWeather'; //TEST
import { hourlyForecast } from './hourlyForecast'; //TEST
const moment = require('moment');


export default class DataCollector{

    constructor(){

        this.testData = {
            dataSets: [
                {   data: {},
               
                },
                {
                    data: {},
                }
            ]
        }

        this.dailyWeekly = {
            chartType: 'dailyWeeklyChart',
            chartTitle: 'Daily forecast per week',
            xLabel: 'Time',
            yLabel: 'Temperature',
            timePeriod: 2,
            routes: ['dailySummarise', 'dailyForecastWeekly'],
            variables: ['temperatureMin', 'temperatureMax', 'pressure', 'humidity', 'cloudCover'],
            info: 'Chart show real situation in past period for each day. It is comapare with forecast. Forecast has been take at the begining of weekend for whole 7 days. So we can compare one week prediction against real situation.'
            ,
            dataSets: [
                {   data: {},
                    setUp: [
                        {x: 'time', y:'temperatureMin', show: true, classLine:'chartLine__mainLine chartLine__mainLine--actualMin', classDots: 'chartLine__mainDott chartLine__mainDott--actualMin'},
                        {x: 'time', y:'temperatureMax', show: false, classLine:'chartLine__mainLine chartLine__mainLine--actualMax', classDots: 'chartLine__mainDott chartLine__mainDott--actualMax'},
                        {x: 'time', y:'pressure', show: false, classLine:'chartLine__mainLine chartLine__mainLine--actual', classDots: 'chartLine__mainDott chartLine__mainDott--actual'},
                        {x: 'time', y:'humidity', show: false, classLine:'chartLine__mainLine chartLine__mainLine--actual', classDots: 'chartLine__mainDott chartLine__mainDott--actual'},
                        {x: 'time', y:'cloudCover', show: false ,classLine:'chartLine__mainLine chartLine__mainLine--actual', classDots: 'chartLine__mainDott chartLine__mainDott--actual'},
                    ]
                },
                {
                    data: {},
                    setUp: [
                        {x: 'time', y:'temperatureMin',  show: true,  classLine:'chartLine__mainLine chartLine__mainLine--forecastMin', classDots: 'chartLine__mainDott chartLine__mainDott--forecastMin'},
                        {x: 'time', y:'temperatureMax', show: false, classLine:'chartLine__mainLine chartLine__mainLine--forecastMax', classDots: 'chartLine__mainDott chartLine__mainDott--forecastMax'},
                        {x: 'time', y:'pressure', show: false, classLine:'chartLine__mainLine chartLine__mainLine--forecast', classDots: 'chartLine__mainDott chartLine__mainDott--forecast'},
                        {x: 'time', y:'humidity', show: false, classLine:'chartLine__mainLine chartLine__mainLine--forecast', classDots: 'chartLine__mainDott chartLine__mainDott--forecast'},
                        {x: 'time', y:'cloudCover', show: false, classLine:'chartLine__mainLine chartLine__mainLine--forecast', classDots: 'chartLine__mainDott chartLine__mainDott--forecast'},
                    ]
                }
            ]
        }

        this.dailyDaily = {
            chartType: 'dailyDailyChart',
            chartTitle: 'Daily forecast per day',
            xLabel: 'Time',
            yLabel: 'Temperature',
            timePeriod: 2,
            routes: ['dailySummarise', 'dailyForecastDaily'],
            variables: ['temperatureMin', 'temperatureMax', 'pressure', 'humidity', 'cloudCover'],
            info: 'Chart show real situation in past period for each day. It is comapare with forecast. Forecast is taken every day for next day. For example tool check on Monday prediction on Tuesday. This data is compared with real situation in past period.',
            dataSets: [
                {   data: {},
                    setUp: [
                        {x: 'time', y:'temperatureMin', show: true, classLine:'chartLine__mainLine chartLine__mainLine--actualMin', classDots: 'chartLine__mainDott chartLine__mainDott--actualMin'},
                        {x: 'time', y:'temperatureMax', show: false, classLine:'chartLine__mainLine chartLine__mainLine--actualMax', classDots: 'chartLine__mainDott chartLine__mainDott--actualMax'},
                        {x: 'time', y:'pressure', show: false, classLine:'chartLine__mainLine chartLine__mainLine--actual', classDots: 'chartLine__mainDott chartLine__mainDott--actual'},
                        {x: 'time', y:'humidity', show: false, classLine:'chartLine__mainLine chartLine__mainLine--actual', classDots: 'chartLine__mainDott chartLine__mainDott--actual'},
                        {x: 'time', y:'cloudCover', show: false ,classLine:'chartLine__mainLine chartLine__mainLine--actual', classDots: 'chartLine__mainDott chartLine__mainDott--actual'},
                    ]
                },
                {
                    data: {},
                    setUp: [
                        {x: 'time', y:'temperatureMin',  show: true,  classLine:'chartLine__mainLine chartLine__mainLine--forecastMin', classDots: 'chartLine__mainDott chartLine__mainDott--forecastMin'},
                        {x: 'time', y:'temperatureMax', show: false, classLine:'chartLine__mainLine chartLine__mainLine--forecastMax', classDots: 'chartLine__mainDott chartLine__mainDott--forecastMax'},
                        {x: 'time', y:'pressure', show: false, classLine:'chartLine__mainLine chartLine__mainLine--forecast', classDots: 'chartLine__mainDott chartLine__mainDott--forecast'},
                        {x: 'time', y:'humidity', show: false, classLine:'chartLine__mainLine chartLine__mainLine--forecast', classDots: 'chartLine__mainDott chartLine__mainDott--forecast'},
                        {x: 'time', y:'cloudCover', show: false, classLine:'chartLine__mainLine chartLine__mainLine--forecast', classDots: 'chartLine__mainDott chartLine__mainDott--forecast'},
                    ]
                }
            ]
        }

        this.hourly = {
            chartType: 'hourlyChart',
            chartTitle: 'Hourly forecast',
            xLabel: 'Time',
            yLabel: 'Temperature',
            timePeriod: 2,
            routes: ['currentWeather', 'hourlyForecast'],
            variables: ['temperature', 'pressure', 'humidity', 'cloudCover'],
            info: 'Chart show real situation in past period for each hour. Forecast is taken every day before midnight for next day. Prediction is comapred with real situation.',
            dataSets: [
                {   data: {},
                    setUp: [
                        {x: 'time', y:'temperature', show: true, classLine:'chartLine__mainLine chartLine__mainLine--actual', classDots: 'chartLine__mainDott chartLine__mainDott--actual'},
                        {x: 'time', y:'pressure', show: false, classLine:'chartLine__mainLine chartLine__mainLine--actual', classDots: 'chartLine__mainDott chartLine__mainDott--actual'},
                        {x: 'time', y:'humidity', show: false, classLine:'chartLine__mainLine chartLine__mainLine--actual', classDots: 'chartLine__mainDott chartLine__mainDott--actual'},
                        {x: 'time', y:'cloudCover', show: false, classLine:'chartLine__mainLine chartLine__mainLine--actual', classDots: 'chartLine__mainDott chartLine__mainDott--actual'},
                    ]
                },
                {   data: {},
                    setUp: [
                        {x: 'time', y:'temperature', show: true, classLine:'chartLine__mainLine chartLine__mainLine--forecast', classDots: 'chartLine__mainDott chartLine__mainDott--forecast'},
                        {x: 'time', y:'pressure', show: false, classLine:'chartLine__mainLine chartLine__mainLine--forecast', classDots: 'chartLine__mainDott chartLine__mainDott--forecast'},
                        {x: 'time', y:'humidity', show: false, classLine:'chartLine__mainLine chartLine__mainLine--forecast', classDots: 'chartLine__mainDott chartLine__mainDott--forecast'},
                        {x: 'time', y:'cloudCover', show: false, classLine:'chartLine__mainLine chartLine__mainLine--forecast', classDots: 'chartLine__mainDott chartLine__mainDott--forecast'},
                    ]
                }
            ]
        }

        this.forecasts ={
            chartType: 'forecasts',
            chartTitle: 'Forecasts',
            xLabel: 'Time',
            yLabel: 'Temperature',
            timePeriod: 2,
            routes: ['dailyForecastDaily', 'dailyForecastWeekly'],
            variables: ['temperatureMin', 'temperatureMax', 'pressure', 'humidity', 'cloudCover'],
            info: 'Chart compare forecast daily and forecast weekly. It is possible to check diffrence beetween prediction take one time at beggining of week and prediction taking every day.',
            dataSets:[
                {   
                    data: {},
                    setUp: [
                        {x: 'time', y:'temperatureMin', show: true, classLine:'chartLine__mainLine chartLine__mainLine--forecastDaily', classDots: 'chartLine__mainDott chartLine__mainDott--forecastDaily'},
                        {x: 'time', y:'temperatureMax', show: false, classLine:'chartLine__mainLine chartLine__mainLine--forecastDaily', classDots: 'chartLine__mainDott chartLine__mainDott--forecastDaily'},
                        {x: 'time', y:'pressure', show: false, classLine:'chartLine__mainLine chartLine__mainLine--forecastDaily', classDots: 'chartLine__mainDott chartLine__mainDott--forecastDaily'},
                        {x: 'time', y:'humidity', show: false, classLine:'chartLine__mainLine chartLine__mainLine--forecastDaily', classDots: 'chartLine__mainDott chartLine__mainDott--forecastDaily'},
                        {x: 'time', y:'cloudCover', show: false ,classLine:'chartLine__mainLine chartLine__mainLine--forecastDaily', classDots: 'chartLine__mainDott chartLine__mainDott--forecastDaily'},
                    ]
                },
                {
                    data: {},
                    setUp: [
                        {x: 'time', y:'temperatureMin',  show: true,  classLine:'chartLine__mainLine chartLine__mainLine--forecastWeekly', classDots: 'chartLine__mainDott chartLine__mainDott--forecastWeekly'},
                        {x: 'time', y:'temperatureMax', show: false, classLine:'chartLine__mainLine chartLine__mainLine--forecastWeekly', classDots: 'chartLine__mainDott chartLine__mainDott--forecastWeekly'},
                        {x: 'time', y:'pressure', show: false, classLine:'chartLine__mainLine chartLine__mainLine--forecastWeekly', classDots: 'chartLine__mainDott chartLine__mainDott--forecastWeekly'},
                        {x: 'time', y:'humidity', show: false, classLine:'chartLine__mainLine chartLine__mainLine--forecastWeekly', classDots: 'chartLine__mainDott chartLine__mainDott--forecastWeekly'},
                        {x: 'time', y:'cloudCover', show: false, classLine:'chartLine__mainLine chartLine__mainLine--forecastWeekly', classDots: 'chartLine__mainDott chartLine__mainDott--forecastWeekly'},
                    ]
                }
            ]
        }

        this.moonPhase={
            chartType: 'moonPhase',
            chartTitle: 'Moon phase',
            xLabel: 'Time',
            yLabel: 'Moon phase',
            timePeriod: 2,
            routes: ['dailyForecastDaily', 'dailyForecastDaily'],
            variables: ['moonPhase'],
            info: 'Chart show moon phase for every date.',
            dataSets:[
                {   
                    data: {},
                    setUp: [
                        {x: 'time', y:'moonPhase', show: true, classLine:'chartLine__mainLine chartLine__mainLine--forecastDaily', classDots: 'chartLine__mainDott chartLine__mainDott--forecastDaily'},
                    ]
                },
                {   
                    data: {},
                    setUp: [
                        {x: 'time', y:'moonPhase', show: true, classLine:'chartLine__mainLine chartLine__mainLine--forecastDaily', classDots: 'chartLine__mainDott chartLine__mainDott--forecastDaily'},
                    ]
                },
            ]
        }
    }

    async loadApi(chartType, timeCounters){

        const routes = this[chartType].routes;
     
        let index = 0;
        for (const route of routes){

            const apiURL = `/${route}/${timeCounters}`;

            const response = await fetch(apiURL);
            const apiData = await response.json();
    
            // console.log(chartType);
            // console.log(apiURL);
            // console.log(apiData);

            this[chartType].dataSets[index].data = apiData;
            index =+1
        };
     
    }
   
    loadData(chartType, weeks){

        dailySummarise.forEach(el => {
            // el.time = el.time * 1000; //MODIFY 
            el.cloudCoverAvg = +el.cloudCoverAvg; 
            el.humidityAvg = +el.humidityAvg; 
            el.pressureAvg = +el.pressureAvg; 
            // console.log(moment(el.time).format('YYYY.MM.DD HH:MM'));
        });

        // dailyForecastWeekly.forEach(el => {
        //     el.time = el.time * 1000; //MODIFY 
        //     // console.log(moment(el.time).format('YYYY.MM.DD HH:MM'));
        // })

        const countDays = weeks * 7;

        // console.log(dailySummarise.slice(0,countDays));
        // console.log(dailyForecastWeekly.slice(0,countDays));

        //dailyWeeklyTemp
        this.dailyWeekly.dataSets[0].data = dailySummarise.slice(0,countDays)
        this.dailyWeekly.dataSets[1].data = dailyForecastWeekly.slice(0,countDays)

    }

    loadDailyWeeklyData(weeks){

        dailySummarise.forEach(el => {
            // el.time = el.time * 1000; //MODIFY 
            el.cloudCoverAvg = +el.cloudCoverAvg; 
            el.humidityAvg = +el.humidityAvg; 
            el.pressureAvg = +el.pressureAvg; 
            // console.log(moment(el.time).format('YYYY.MM.DD HH:MM'));
        });

        // dailyForecastWeekly.forEach(el => {
        //     el.time = el.time * 1000; //MODIFY 
        //     // console.log(moment(el.time).format('YYYY.MM.DD HH:MM'));
        // })

        const countDays = weeks * 7;

        //dailyWeeklyTemp
        this.dailyWeekly.dataSets[0].data = dailySummarise.slice(0,countDays)
        this.dailyWeekly.dataSets[1].data = dailyForecastWeekly.slice(0,countDays)
    }


    loadDataTest(week){
        //DEV MODE FROM FILE - LATER FROM SERVER

        currentWeather.forEach(el => {
            el.time = el.time * 1000; //MODIFY 
            // console.log(moment(el.time).format('YYYY.MM.DD HH:MM'));
        });

        hourlyForecast.forEach(el => {
            el.time = el.time * 1000; //MODIFY 
            // console.log(moment(el.time).format('YYYY.MM.DD HH:MM'));
        });

        
        
        this.dailyDaily.dataSets[0].data = dailySummarise;
        this.dailyDaily.dataSets[1].data = dailyForecastWeekly;

        //hourlyTemp
        this.hourly.dataSets[0].data = currentWeather;
        this.hourly.dataSets[1].data = hourlyForecast;


        // console.log(dailySummarise)
        // console.log(dailyForecastWeekly)
    }

}