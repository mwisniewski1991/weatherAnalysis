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
    dailyWeekly: {
        section: document.querySelector('#dailyWekklySection'),
        chart: document.querySelector('#dailyWeekly__chart'),
    },
    hourly: {
        chart: document.querySelector('#hourly__chart'),
    }
};