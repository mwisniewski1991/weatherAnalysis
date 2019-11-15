import { dailyForecastWeekly } from './dailyForecastWeekly'; //TEST
import { dailyForecastWeeklyTwo } from './dailyForecastWeeklyTwo'; //TEST
const moment = require('moment');

export default class DataCollector{

    constructor(){
        this.dataGroup = {
            dailyWeekklyData: {},
            dailyWeekklyDataTwo: {},
            dailyDayData: {},
            hourlyData: {},
        };
    }


    loadDataFile(){



    }

    loadDailyWeeklyData(week){
        //DEV MODE FROM FILE - LATER FROM SERVER

        dailyForecastWeekly.forEach(el => {
            el.time = el.time * 1000; //MODIFY 
        })

        dailyForecastWeeklyTwo.forEach(el => {
            el.time = el.time * 1000; //MODIFY 
        })
        


        this.dataGroup.dailyWeekklyData = dailyForecastWeekly;
        this.dataGroup.dailyWeekklyDataTwo = dailyForecastWeeklyTwo;
    }

}