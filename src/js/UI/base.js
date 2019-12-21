export const htmlComponents = {
    main: document.querySelector('.layout'),
    mainUp: document.querySelector('.layout--up'),
    footer: document.querySelector('.footer'),
    sections: Array.from(document.querySelectorAll('.layout__section')),
    info: {
        div: document.querySelector('.info'),
        buttons: Array.from(document.querySelectorAll('.info__button')),
        textBox: document.getElementsByClassName('info__textBox')[0],
        paragraph: document.getElementsByClassName('info__paragraph')[0],
    },
    changePeriod: {
        buttonsWeeks: Array.from(document.querySelectorAll(".block__button--changeTime")),
    },
    blackBoards:{
        buttons: Array.from(document.querySelectorAll('.block__button--blackboard')),
    },
    chartRadiobox: {
        box: Array.from(document.querySelectorAll('.block__chartBlackboard--chartRadiobox')),
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