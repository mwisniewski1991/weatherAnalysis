import { dailyForecastWeekly } from './dailyForecastWeekly'; //TEST
const moment = require('moment');

export default class DataCollector{

    constructor(){
        this.dataGroup = {
            dailyWeekklyData: {},
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

        this.dataGroup.dailyWeekklyData = dailyForecastWeekly;
    }

}