import  { htmlComponents } from './base'
import { TimelineMax } from 'gsap';
import { html } from 'd3';

export const renderRadioButtons = (chartType, variables, setUp) => {

    const radioBox = htmlComponents[chartType].section.querySelector('.block__chartBlackboard--chartRadiobox');
    const currentVar = setUp.filter(el => el.show === true).map(el => el.y)[0]; //set current variable from data class
    
    variables.forEach((variable) => {

        const status = variable === currentVar ? 'checked' : '';

        const html = `
            <div class="radio">
                <input class="radio__input" type="radio" name="${chartType}Var" id="${chartType}-${variable}" ${status}>
                <label class="radio__label" for="${chartType}-${variable}">${variable}</label>
            </div>
        `;

        radioBox.insertAdjacentHTML('beforeend', html);

    });

};

export const showAnimationElement = (element, className, wantShow) => {

    const tl = new TimelineMax();
    if(wantShow){

        tl
        .to(element, .1, {borderRadius: 50, opacity: 1, visibility: 'visible'})
        .to(element, .3,{scaleX: 1, scaleY: .02})
        .to(element, .3,{scaleX: 1, scaleY: 1})

        element.classList.toggle(`${className}--hide`);
    }else{
        tl
        .to(element, .3, {scaleX: 1, scaleY: .02})
        .to(element, .3, {scaleX: 0, scaleY: .0})
        .to(element, .3, {borderRadius: 50, visibility: 'hidden'})

        element.classList.toggle(`${className}--hide`);
    }

};

export const switchButton = (button) => {
        button.classList.toggle('button--disactivate');
        if(button.disabled){button.disabled = false}else{button.disabled = true};
};

export const renderInfoText = (chartType, text, title) => {
    const infoBox = htmlComponents[chartType].section.querySelector('.chartInfo__paragraph');
    const heading = htmlComponents[chartType].section.querySelector('.block__heading');
    infoBox.innerText = text;
    heading.innerText = title;

};

export const renderLegend = (chartType, legend) => {
    console.log(chartType);
    console.log(legend);

    const section = htmlComponents[chartType].section;
    const legendBox = section.querySelector('.block__chartBlackboard--legend');

    legend.forEach((el) => {

        const className = el.class;
        const text = el.text;

        const html = `
            <span class="legend__text ${className}">
                ${text}
            </span>
        `; 

        legendBox.insertAdjacentHTML('beforeend', html)
    });
    
};