import { dailyForecastWeekly } from './dailyForecastWeekly'; //TEST
import { dailySummarise } from './dailySummarise'; //TEST
import { currentWeather } from './currentWeather'; //TEST
import { hourlyForecast } from './hourlyForecast'; //TEST
import { async } from 'q';
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
            timePeriod: 1,
            routes: ['dailySummarise', 'dailyForecastWeekly'],
            variables: ['temperatureMin', 'temperatureMax', 'pressure', 'humidity', 'cloudCover'],
            info: 'Daily weekly chart. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, vero placeat? Obcaecati, saepe Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, vero placeat? Obcaecati, saepe Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, vero placeat? Obcaecati, saepe',
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
            weeksNum: 1,
            variables: ['temperature', 'pressure', 'humidity', 'cloudCover'],
            info: 'Daily daily chart. Ipsa, vero placeat? Obcaecati, saepe Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, vero placeat? Obcaecati, saepe Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, vero placeat? Obcaecati, saepe',
            dataSets: [
                {   data: {},
                    setUp: [
                        {x: 'time', y:'temperatureMin', classLine:'chartLine__mainLine chartLine__mainLine--actualMin', classDots: 'chartLine__mainDott chartLine__mainDott--actualMin'},
                    ]
                },
                {
                    data: {},
                    setUp: [
                        {x: 'time', y:'temperatureMin', classLine:'chartLine__mainLine chartLine__mainLine--forecastMin', classDots: 'chartLine__mainDott chartLine__mainDott--forecastMin'},
                    ]
                }
            ]
        }

        this.hourly = {
            chartType: 'hourlyChart',
            chartTitle: 'Hourly forecast',
            xLabel: 'Time',
            yLabel: 'Temperature',
            weeksNum: 1,
            variables: ['temperature', 'pressure', 'humidity', 'cloudCover'],
            info: 'Hourly chart. Saepe Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, vero placeat? Obcaecati, saepe Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, vero placeat? Obcaecati, saepe',
            dataSets: [
                {   data: {},
                    setUp: [
                        {x: 'time', y:'temperature', classLine:'chartLine__mainLine chartLine__mainLine--actual', classDots: 'chartLine__mainDott chartLine__mainDott--actual'},
                    ]
                },
                {   data: {},
                    setUp: [
                        {x: 'time', y:'temperature', classLine:'chartLine__mainLine chartLine__mainLine--forecast', classDots: 'chartLine__mainDott chartLine__mainDott--forecast'},
                    ]
                }
            ]
        }
    }

    async loadApi(chartType, timeCounters){

        const routes = this[chartType].routes;
        
        routes.forEach(async (route, index) => {

            const apiURL = `/${route}/${timeCounters}`;

            const response = await fetch(apiURL);
            const data = await response.json();

    
            console.log(data);

            this.testData.dataSets[index].data = data;
        })

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