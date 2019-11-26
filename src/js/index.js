import '../styles/main.scss'; //IMPORT SASS
import 'babel-polyfill'; //IMPORT BABEL FOR ASYNC/AWAIT
import { htmlComponents } from './base';
import DataCollector from './apidata/data';
import ChartCreator from './charts/chart'


const state = {};


const appCtrl = async () => {

//GET DATA
state.dataCollector = new DataCollector;
state.chartCreator = new ChartCreator;


//DAILY WEEKLY
await state.dataCollector.loadData(1); //data

await state.dataCollector.loadDailyWeeklyData(1);

state.chartCreator.renderChart(state.dataCollector.dailyWeekly);
// state.chartCreator.renderChart(state.dataCollector.dailyDailyTemp);
// state.chartCreator.renderChart(state.dataCollector.hourlyTemp);


// state.chartCreator.renderChart('dailyDailyChart', [dailyWeekklyData, dailyWeekklyDataTwo], 'time', 'temperatureMin');
// state.chartCreator.renderChart('hourlyChart', [dailyWeekklyData, dailyWeekklyDataTwo], 'time', 'temperatureMin');


// console.log(state.dataCollector);
console.log(state.chartCreator);
}
appCtrl();



//---------------------------------------------------------------------------------------------
//CHANGE DAILYWEEKLY DATA
const changeWeeklyDailyData = (e) => {

    const weeksNum = state.dataCollector.dailyWeekly.weeksNum;
    const weeksCalc =  weeksNum + parseInt(e.target.value);
    

    if(weeksCalc > 0 && weeksCalc<4){
        state.dataCollector.dailyWeekly.weeksNum = weeksCalc;
    };

    state.dataCollector.loadDailyWeeklyData(state.dataCollector.dailyWeekly.weeksNum);
    state.chartCreator.changeChart(state.dataCollector.dailyWeekly);


};

htmlComponents.dailyWeekly.buttonsWeeks.forEach((button) => {
    button.addEventListener('click', changeWeeklyDailyData)
});

//---------------------------------------------------------------------------------------------
//RESIZE CHARTS
const resizeCharts = () =>{

    state.chartCreator.redrawChart(state.dataCollector.dailyWeekly);
    state.chartCreator.redrawChart(state.dataCollector.dailyDailyTemp);
    state.chartCreator.redrawChart(state.dataCollector.hourlyTemp);
};
window.addEventListener('resize', resizeCharts);

//RESIZE SECTION
const resizeSection = () => {
    const width = window.innerWidth

    if(width>900){
        const newWidth = width / 2 - 30;
        htmlComponents.sections.forEach( (el) =>{
            el.style.width = `${newWidth}px`;
        });
    }
    if(width<=900){
        const newWidth = width - 45;
        htmlComponents.sections.forEach( (el) =>{
            el.style.width = `${newWidth}px`;
        });
    }

    

    // section.style.width = `${width}px`;
};
window.addEventListener('resize', resizeSection);

//---------------------------------------------------------------------------------------------
//INFO BOX FUCNTION
const setUpMainFooter = () => {

    const button = htmlComponents.info.button;
    const main = htmlComponents.mainUp;
    const footer = htmlComponents.footer;

    const buttonPos = button.getBoundingClientRect().bottom;
    const mainPos = main.getBoundingClientRect().top;
    const offsetHeight = -(mainPos - buttonPos - 10)

    document.documentElement.style.setProperty("--mainOffset", `${offsetHeight}px`);
    main.style.transition = `transition: all .5s linear`;

}
const showInfo = () => {

    const infoBox = htmlComponents.info.textBox;
    const main = htmlComponents.main;
    const footer = htmlComponents.footer;
    
    infoBox.classList.toggle('info__textBox--show');
    main.classList.toggle('layout--up')

};
//EVENST LISTENNERS
htmlComponents.info.button.addEventListener('click', showInfo);


//---------------------------------------------------------------------------------------------
//SHOW CHART INFO
const showChartInfo = (e) =>{

    const parent = e.target.parentNode.parentNode.parentNode;
    const chartInfo = parent.querySelector('.block__chartInfo');

    chartInfo.classList.toggle('chartInfo--hide');

};


htmlComponents.chartInfo.buttons.forEach((el)=>{
    el.addEventListener('click', showChartInfo);
})





// window.onload = () => {
//     setUpMainFooter()
// }    