import { dailyForecastWeekly } from './dailyForecastWeekly'; //TEST
import { dailySummarise } from './dailySummarise'; //TEST
import { currentWeather } from './currentWeather'; //TEST
import { hourlyForecast } from './hourlyForecast'; //TEST
const moment = require('moment');

export default class DataCollector{

    constructor(){
        this.dailyWeekly = {
            chartType: 'dailyWeeklyChart',
            xLabel: 'Time',
            yLabel: 'Temperature',
            weeksNum: 1,
            dataSets: [
                {   data: {},
                    setUp: [
                        {x: 'time', y:'temperatureMin', classLine:'chartLine__mainLine chartLine__mainLine--actualMin', classDots: 'chartLine__mainDott chartLine__mainDott--actualMin'},
                        // {x: 'time', y:'temperatureMax', classLine:'chartLine__mainLine chartLine__mainLine--actualMax', classDots: 'chartLine__mainDott chartLine__mainDott--actualMax'}
                    ]
                },
                {
                    data: {},
                    setUp: [
                        {x: 'time', y:'temperatureMin', classLine:'chartLine__mainLine chartLine__mainLine--forecastMin', classDots: 'chartLine__mainDott chartLine__mainDott--forecastMin'},
                        // {x: 'time', y:'temperatureMax', classLine:'chartLine__mainLine chartLine__mainLine--forecastMax', classDots: 'chartLine__mainDott chartLine__mainDott--forecastMax'}
                    ]
                }
            ]
        }

        this.dailyDailyTemp = {
            chartType: 'dailyDailyChart',
            xLabel: 'Time',
            yLabel: 'Temperature',
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

        this.hourlyTemp = {
            chartType: 'hourlyChart',
            xLabel: 'Time',
            yLabel: 'Temperature',
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


    loadDailyWeeklyData(weeks){

        // dailySummarise.forEach(el => {
        //     el.time = el.time * 1000; //MODIFY 
        //     // console.log(moment(el.time).format('YYYY.MM.DD HH:MM'));
        // });

        // dailyForecastWeekly.forEach(el => {
        //     el.time = el.time * 1000; //MODIFY 
        //     // console.log(moment(el.time).format('YYYY.MM.DD HH:MM'));
        // })

        const countDays = weeks * 7;

        //dailyWeeklyTemp
        this.dailyWeekly.dataSets[0].data = dailySummarise.slice(0,countDays)
        this.dailyWeekly.dataSets[1].data = dailyForecastWeekly.slice(0,countDays)
    }








    loadData(week){
        //DEV MODE FROM FILE - LATER FROM SERVER

        currentWeather.forEach(el => {
            el.time = el.time * 1000; //MODIFY 
            // console.log(moment(el.time).format('YYYY.MM.DD HH:MM'));
        });

        hourlyForecast.forEach(el => {
            el.time = el.time * 1000; //MODIFY 
            // console.log(moment(el.time).format('YYYY.MM.DD HH:MM'));
        });

        
        
        this.dailyDailyTemp.dataSets[0].data = dailySummarise;
        this.dailyDailyTemp.dataSets[1].data = dailyForecastWeekly;

        //hourlyTemp
        this.hourlyTemp.dataSets[0].data = currentWeather;
        this.hourlyTemp.dataSets[1].data = hourlyForecast;


        // console.log(dailySummarise)
        // console.log(dailyForecastWeekly)
    }

}