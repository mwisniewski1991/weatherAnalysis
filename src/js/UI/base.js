export const htmlComponents = {
    main: document.querySelector('.layout'),
    mainUp: document.querySelector('.layout--up'),
    footer: document.querySelector('.footer'),
    sections: Array.from(document.querySelectorAll('.layout__section')),
    info: {
        button: document.getElementsByClassName('info__button')[0],
        textBox: document.getElementsByClassName('info__textBox')[0],
        paragraph: document.getElementsByClassName('info__paragraph')[0],
    },
    chartInfo: {
        buttons: Array.from(document.querySelectorAll('.block__button--info')),
        chartInfoBox: Array.from(document.querySelectorAll('.block__chartInfo')),
    },
    changePeriod: {
        buttonsWeeks: Array.from(document.querySelectorAll(".block__button--changeTime")),
    },
    changeVar: {
        buttons: Array.from(document.querySelectorAll('.block__button--vars')),
        box: Array.from(document.querySelectorAll('.block__chartRadiobox')),
    },
    dailyWeekly: {
        section: document.querySelector('#dailyWeekly'),
        chart: document.querySelector('#dailyWeekly__chart')
    },
    dailyDaily:{
        section: document.querySelector('#dailyDaily'),

    },
    hourly: {
        section: document.querySelector('#hourly'),
        chart: document.querySelector('#dailyDaily__chartRadiobox'),
    }
};