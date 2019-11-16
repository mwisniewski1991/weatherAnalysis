import { dailyForecastWeekly } from './dailyForecastWeekly'; //TEST
import { dailyForecastWeeklyTwo } from './dailyForecastWeeklyTwo'; //TEST
import { dailySummarise } from './dailySummarise'; //TEST
const moment = require('moment');

export default class DataCollector{

    constructor(){
        this.dataGroup = {
            dailyWeekklyData: {
            },

            dailyWeekklyDataTwo: {},

            dailyDayData: {},

            hourlyData: {},
        };

        this.dailyWeeklyTemp = {
            dataSets: [
                {
                    id: 'minTempForecast',
                    data: [],
                    x: 'time',
                    xName: 'Time',
                    y:'temperatureMin',
                    yName: 'Min Temperature',
                },
                {   
                    id: 'minTempCurrent',
                    data: [],
                    x: 'time',
                    xName: 'Time',
                    y:'temperatureMin',
                    yName: 'Min Temperature',
                },
                {   
                    id: 'maxTempForecast',
                    data: [],
                    x: 'time',
                    xName: 'Time',
                    y:'temperatureMin',
                    yName: 'Min Temperature',
                },
                {   
                    id: 'maxTempCurrent',
                    data: [],
                    x: 'time',
                    xName: 'Time',
                    y:'temperatureMin',
                    yName: 'Min Temperature',
                },
            ]

        }
    }


    loadDataFile(){



    }

    loadDailyWeeklyData(week){
        //DEV MODE FROM FILE - LATER FROM SERVER

        dailyForecastWeekly.forEach(el => {
            el.time = el.time * 1000; //MODIFY 
            // console.log(moment(el.time).format('YYYY.MM.DD HH:MM'));
        })

        dailyForecastWeeklyTwo.forEach(el => {
            el.time = el.time * 1000; //MODIFY 
        })

        dailySummarise.forEach(el => {
            el.time = el.time * 1000; //MODIFY 
            // console.log(moment(el.time).format('YYYY.MM.DD HH:MM'));
        });
        
        

        
        this.dataGroup.dailySummariseTemp = dailySummarise;
        this.dataGroup.dailyWeekklyTemp = dailyForecastWeekly;

        this.dataGroup.dailyForecastWeeklyTwo = dailyForecastWeeklyTwo;

        // console.log(dailySummarise)
        // console.log(dailyForecastWeekly)
    }

}