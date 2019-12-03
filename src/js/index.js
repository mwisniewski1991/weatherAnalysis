import '../styles/main.scss'; //IMPORT SASS
import 'babel-polyfill'; //IMPORT BABEL FOR ASYNC/AWAIT
import DataCollector from './apidata/data';
import ChartCreator from './charts/chart';
import * as ui from './UI/ui';
import { htmlComponents } from './UI/base';
import { TimelineMax } from 'gsap';

const state = {};


const appCtrl = async () => {

    //GET DATA
    state.dataCollector = new DataCollector;
    state.chartCreator = new ChartCreator;


    await state.dataCollector.loadApi('dailyWeekly', 1);
    await state.dataCollector.loadApi('hourly', 1);

    // await state.dataCollector.loadData('dailyWeekly', 1);

    // console.log(state.dataCollector.testData.dataSets);
    // console.log(state.dataCollector.dailyWeekly.dataSets);
    //DAILY WEEKLY
    // await state.dataCollector.loadDataTest(1); //data

    const { dailyWeekly, dailyDaily, hourly } = state.dataCollector;

    state.chartCreator.renderChart(dailyWeekly);
    // state.chartCreator.renderChart(dailyDaily);
    state.chartCreator.renderChart(hourly);


    ui.renderRadioButtons('dailyWeekly', dailyWeekly.variables);
    ui.renderRadioButtons('dailyDaily', dailyDaily.variables);
    ui.renderRadioButtons('hourly', hourly.variables);

    ui.renderInfoText('dailyWeekly', dailyWeekly.info, dailyWeekly.chartTitle);
    ui.renderInfoText('dailyDaily', dailyDaily.info, dailyDaily.chartTitle);
    ui.renderInfoText('hourly', hourly.info, hourly.chartTitle);

    // state.chartCreator.renderChart('dailyDailyChart', [dailyWeekklyData, dailyWeekklyDataTwo], 'time', 'temperatureMin');
    // state.chartCreator.renderChart('hourlyChart', [dailyWeekklyData, dailyWeekklyDataTwo], 'time', 'temperatureMin');

    console.log(state.dataCollector);
    // console.log(state.chartCreator);
}
appCtrl();



//---------------------------------------------------------------------------------------------
//CHANGE DAILYWEEKLY DATA
const changeWeeklyDailyData = async (e) => {

    const timePeriod = state.dataCollector.dailyWeekly.timePeriod;
    const weeksCalc =  timePeriod + parseInt(e.target.value);
    const chartType = e.target.id;

    if(weeksCalc > 0 && weeksCalc<4){
        state.dataCollector.dailyWeekly.timePeriod = weeksCalc;
    };

    // await state.dataCollector.loadData('dailyWeekly', state.dataCollector.dailyWeekly.timePeriod);
    await state.dataCollector.loadApi('dailyWeekly', state.dataCollector.dailyWeekly.timePeriod);

    state.chartCreator.changeChart(state.dataCollector.dailyWeekly);

};
htmlComponents.dailyWeekly.buttonsWeeks.forEach((button) => {button.addEventListener('click', changeWeeklyDailyData)});

//CHANGE VARIABLE 
const changeVariable = (e) => {
    const input = e.target;

    if(input.matches('input')){
        const idString = input.id.split('-');
        const chartType = idString[0];
        const variable = idString[1];

        // console.log(chartType);
        // console.log(variable);

        const { dataSets } = state.dataCollector[chartType]
        
        dataSets.forEach((el)=>{
            el.setUp.forEach((elTwo) => {
                elTwo.show = false;

                if(elTwo.y.includes(variable)){
                    elTwo.show = true;
                }
            })
        })


        state.chartCreator.changeChart(state.dataCollector.dailyWeekly);

        // console.log(state.dataCollector[chartType].dataSets[0].setUp);
        // console.log(state.dataCollector[chartType].dataSets[1].setUp);

    }
};

htmlComponents.changeVar.box.forEach((el) => {
    el.addEventListener('click', changeVariable)
});



//---------------------------------------------------------------------------------------------
//RESIZE CHARTS
const resizeCharts = () =>{

    const { dailyWeekly, dailyDaily, hourly } = state.dataCollector;


    state.chartCreator.redrawChart(dailyWeekly);
    // state.chartCreator.redrawChart(dailyDaily);
    // state.chartCreator.redrawChart(hourly);
    
};
window.addEventListener('resize', resizeCharts);

//---------------------------------------------------------------------------------------------

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
    const radioButton = parent.querySelector('.block__button--vars');
    const wantShow = Array.from(chartInfo.classList).includes('chartInfo--hide') === true ? true : false;

    ui.showAnimationElement(chartInfo,'chartInfo', wantShow);

    if(wantShow){
        radioButton.removeEventListener('click', showRadioBox);
        ui.switchButton(radioButton);

    }else{
       
        radioButton.addEventListener('click', showRadioBox);
        ui.switchButton(radioButton);

    };
};

htmlComponents.chartInfo.buttons.forEach((el)=>{ el.addEventListener('click', showChartInfo);});

//SHOW CHANGE VAR RADIO BOX
const showRadioBox = (e) => {

    const parent = e.target.parentNode.parentNode.parentNode;
    const radioBox = parent.querySelector('.block__chartRadiobox');
    const infoButton = parent.querySelector('.block__button--info');
    const wantShow = Array.from(radioBox.classList).includes('chartRadiobox--hide') === true ? true : false;

    ui.showAnimationElement(radioBox,'chartRadiobox', wantShow);

    const infoButtons = htmlComponents.chartInfo.buttons;

    if(wantShow){
        ui.switchButton(infoButton);
        infoButton.removeEventListener('click', showChartInfo);

    }else{
        ui.switchButton(infoButton);
        infoButton.addEventListener('click', showChartInfo);
    };
};

htmlComponents.changeVar.buttons.forEach((el)=>{el.addEventListener('click', showRadioBox);});



// window.onload = () => {
//     setUpMainFooter()
// }    