const Datastore = require('nedb');
// const moment = require('moment');
import { dailyForecastWeekly } from './dailyForecastWeekly';

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
        this.dataGroup.dailyWeekklyData = dailyForecastWeekly;

    }

}