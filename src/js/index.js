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
await state.dataCollector.loadDailyWeeklyData(1); //data

const { dailyWeekklyData, dailyWeekklyDataTwo } = state.dataCollector.dataGroup;
// console.log(dailyWeekklyData);

        const y = 'temperatureMin'
state.chartCreator.renderChart('dailyWeeklyChart', [dailyWeekklyData, dailyWeekklyDataTwo], 'time', 'temperatureMin');
state.chartCreator.renderChart('hourlyChart', [dailyWeekklyData, dailyWeekklyDataTwo], 'time', 'temperatureMin');
state.chartCreator.renderChart('dailyDailyChart', [dailyWeekklyData, dailyWeekklyDataTwo], 'time', 'temperatureMin');


console.log(state.dataCollector);
console.log(state.chartCreator);
}
appCtrl();





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


//RESIZE CHARTS
const resizeCharts = () =>{
    const { dailyWeekklyData, dailyWeekklyDataTwo  } = state.dataCollector.dataGroup;

    state.chartCreator.redrawChart('dailyWeeklyChart', [dailyWeekklyData, dailyWeekklyDataTwo]);
    state.chartCreator.redrawChart('hourlyChart', [dailyWeekklyData, dailyWeekklyDataTwo]);
    state.chartCreator.redrawChart('dailyDailyChart', [dailyWeekklyData, dailyWeekklyDataTwo]);
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

// window.onload = () => {
//     setUpMainFooter()
// }