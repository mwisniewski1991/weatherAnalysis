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

const { dailyWeekklyData  } = state.dataCollector.dataGroup;
// console.log(dailyWeekklyData);

state.chartCreator.renderChart('dailyWeeklyChart', dailyWeekklyData);
state.chartCreator.renderChart('hourlyChart', dailyWeekklyData);


// state.





console.log(state.dataCollector);
console.log(state.chartCreator);
}
appCtrl();





//RESIZE CHARTS
const resizeCharts = () =>{

    state.chartCreator.redrawChart();
};


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
    const infoBox = htmlComponents.info.textBox;
    const main = htmlComponents.main;
    const footer = htmlComponents.footer;
    
    infoBox.classList.toggle('info__textBox--show');
    main.classList.toggle('layout--up')

};

//EVENST LISTENNERS
htmlComponents.info.button.addEventListener('click', showInfo);

window.addEventListener('resize', resizeCharts);


// window.onload = () => {
//     setUpMainFooter()
// }