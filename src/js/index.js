import '../styles/main.scss'; //IMPORT SASS
import 'babel-polyfill'; //IMPORT BABEL FOR ASYNC/AWAIT
import DataCollector from './apidata/data';
import ChartCreator from './charts/chart';
import * as ui from './UI/ui';
import { htmlComponents } from './UI/base';

const state = {};


const appCtrl = async () => {

    //GET DATA
    state.dataCollector = new DataCollector;
    state.chartCreator = new ChartCreator;

    await state.dataCollector.loadApi('dailyWeekly', 2);
    await state.dataCollector.loadApi('dailyDaily', 2);
    await state.dataCollector.loadApi('hourly', 2);
    await state.dataCollector.loadApi('forecasts', 2);
    await state.dataCollector.loadApi('moonPhase', 2);


    // await state.dataCollector.loadData('dailyWeekly', 2);

    const { dailyWeekly, dailyDaily, hourly, forecasts, moonPhase } = state.dataCollector;

    state.chartCreator.renderChart(dailyWeekly);
    state.chartCreator.renderChart(dailyDaily);
    state.chartCreator.renderChart(hourly);
    state.chartCreator.renderChart(forecasts);
    state.chartCreator.renderChart(moonPhase);

    ui.renderRadioButtons('dailyWeekly', dailyWeekly.variables, dailyWeekly.dataSets[0].setUp);
    ui.renderRadioButtons('dailyDaily', dailyDaily.variables, dailyDaily.dataSets[0].setUp);
    ui.renderRadioButtons('hourly', hourly.variables, hourly.dataSets[0].setUp);
    ui.renderRadioButtons('forecasts', forecasts.variables, forecasts.dataSets[0].setUp);
    ui.renderRadioButtons('moonPhase', moonPhase.variables, moonPhase.dataSets[0].setUp);

    ui.renderInfoText('dailyWeekly', dailyWeekly.info, dailyWeekly.chartTitle);
    ui.renderInfoText('dailyDaily', dailyDaily.info, dailyDaily.chartTitle);
    ui.renderInfoText('hourly', hourly.info, hourly.chartTitle);
    ui.renderInfoText('forecasts', forecasts.info, forecasts.chartTitle);
    ui.renderInfoText('moonPhase', moonPhase.info, moonPhase.chartTitle);

    ui.renderLegend('dailyWeekly', dailyWeekly.legend);
    ui.renderLegend('dailyDaily', dailyDaily.legend);
    ui.renderLegend('hourly', hourly.legend);
    ui.renderLegend('forecasts', forecasts.legend);
    ui.renderLegend('moonPhase', moonPhase.legend);



    console.log(state.dataCollector);
    // console.log(state.chartCreator);
}
appCtrl();

//---------------------------------------------------------------------------------------------
//CHANGE DAILYWEEKLY DATA
const changeTimePeriod = async (e) => {

    const chartType = e.target.parentNode.parentNode.parentNode.id;
    const timePeriod = state.dataCollector[chartType].timePeriod;
    const weeksCalc =  timePeriod + parseInt(e.target.value);
    const minPeriod = 1;
    const maxPeriod = 4;

    const buttonLess = document.querySelector(`#${chartType}`).querySelector('.block__button--lessTime');
    const buttonMore = document.querySelector(`#${chartType}`).querySelector('.block__button--moreTime');
    const buttonLessClassList = Array.from(buttonLess.classList);
    const buttonMoreClassList = Array.from(buttonMore.classList);

    //PART TO CONFIGURE BUTTONS
    if(buttonLessClassList.includes('button--disactivate')){
        buttonLess.classList.toggle('button--disactivate');
        buttonLess.addEventListener('click', changeTimePeriod);
    };
    if(buttonMoreClassList.includes('button--disactivate')){
        buttonMore.classList.toggle('button--disactivate');
        buttonMore.addEventListener('click', changeTimePeriod);
    };  

    //PART TO CHANGE TIME PERIOD IN STATE
    if(weeksCalc >= minPeriod && weeksCalc <= maxPeriod){   //no longer than 3 periods
        state.dataCollector[chartType].timePeriod = weeksCalc;
    };


    //PART TO CONFIGURE BUTTONS
    if (state.dataCollector[chartType].timePeriod === minPeriod){
        buttonLess.classList.toggle('button--disactivate');
        buttonLess.removeEventListener('click', changeTimePeriod);
    }
    if(state.dataCollector[chartType].timePeriod === maxPeriod){
        buttonMore.classList.toggle('button--disactivate');
        buttonMore.removeEventListener('click', changeTimePeriod);
    };

    await state.dataCollector.loadApi(chartType, state.dataCollector[chartType].timePeriod);
    state.chartCreator.changeChart(state.dataCollector[chartType]);


};
htmlComponents.changePeriod.buttonsWeeks.forEach((button) => {button.addEventListener('click', changeTimePeriod)});

//CHANGE VARIABLE 
const changeVariable = (e) => {
    const input = e.target;

    if(input.matches('input')){
        const idString = input.id.split('-');
        const chartType = idString[0];
        const variable = idString[1];

        const { dataSets } = state.dataCollector[chartType]
        
        dataSets.forEach((el)=>{
            el.setUp.forEach((elTwo) => {
                elTwo.show = false;

                if(elTwo.y.includes(variable)){
                    elTwo.show = true;
                }
            })
        })

        state.chartCreator.changeChart(state.dataCollector[chartType]);

    }
};
htmlComponents.chartRadiobox.box.forEach(el => el.addEventListener('click', changeVariable))

//---------------------------------------------------------------------------------------------
//SHOW BLACKBOARDS
const showBlackboard = (e) =>{
    
    const id = e.target.id;
    const parent = e.target.parentNode.parentNode.parentNode;
    const blackboard = parent.querySelector(`.block__chartBlackboard--${id}`)

    const wantShow = Array.from(blackboard.classList).includes(`${id}--hide`) === true ? true : false;
  
    ui.showAnimationElement(blackboard, id, wantShow);
    
    const otherButtons = Array.from(parent.querySelectorAll('.block__button--blackboard '));

    otherButtons.forEach( (button) => {
        if(button.id !== id){
            ui.switchButton(button);
        }
    });

};
htmlComponents.blackBoards.buttons.forEach(el => {el.addEventListener('click', showBlackboard)})


//---------------------------------------------------------------------------------------------
//INFO BOX FUCNTION
const showInfo = () => {
    console.log("GIT")

    const info = htmlComponents.info.div;

    const wantShow = Array.from(info.classList).includes('info--hide') === true ? true : false;

    ui.showAnimationElement(info,'chartRadiobox', wantShow);
    info.classList.toggle('info--hide');
};
//EVENST LISTENNERS
htmlComponents.info.buttons.forEach((button) =>{button.addEventListener('click', showInfo);});

//---------------------------------------------------------------------------------------------
//RESIZE CHARTS
const resizeCharts = () =>{

    const { dailyWeekly, dailyDaily, hourly } = state.dataCollector;

    state.chartCreator.redrawChart(dailyWeekly);
    state.chartCreator.redrawChart(dailyDaily);
    state.chartCreator.redrawChart(hourly);
    
};
window.addEventListener('resize', resizeCharts);
window.addEventListener('orientationchange', resizeCharts);

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
window.addEventListener('orientationchange', resizeSection);