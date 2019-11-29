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
    dailyWeekly: {
        section: document.querySelector('#dailyWekklySection'),
        chart: document.querySelector('#dailyWeekly__chart'),
        buttonLessWeeks: document.querySelector("#dailyWeeklyLessWeeks"),
        buttonMoreWeeks: document.querySelector("#dailyWeeklyMoreWeeks"),
        buttonsWeeks: Array.from(document.querySelectorAll(".block__button--changeTime"))
    },
    hourly: {
        chart: document.querySelector('#hourly__chart'),
    }
};