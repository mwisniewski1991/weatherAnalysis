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

    // await state.dataCollector.loadApi('dailyWeekly', 2);
    // await state.dataCollector.loadApi('dailyDaily', 2);
    // await state.dataCollector.loadApi('hourly', 2);
// 
    await state.dataCollector.loadData('dailyWeekly', 2);



    const { dailyWeekly, dailyDaily, hourly } = state.dataCollector;

    state.chartCreator.renderChart(dailyWeekly);
    state.chartCreator.renderChart(dailyDaily);
    state.chartCreator.renderChart(hourly);

    ui.renderRadioButtons('dailyWeekly', dailyWeekly.variables, dailyWeekly.dataSets[0].setUp);
    ui.renderRadioButtons('dailyDaily', dailyDaily.variables, dailyDaily.dataSets[0].setUp);
    ui.renderRadioButtons('hourly', hourly.variables, hourly.dataSets[0].setUp);

    ui.renderInfoText('dailyWeekly', dailyWeekly.info, dailyWeekly.chartTitle);
    ui.renderInfoText('dailyDaily', dailyDaily.info, dailyDaily.chartTitle);
    ui.renderInfoText('hourly', hourly.info, hourly.chartTitle);

    // console.log(state.dataCollector.dailyWeekly);
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
htmlComponents.changeVar.box.forEach((el) => {el.addEventListener('click', changeVariable)});


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