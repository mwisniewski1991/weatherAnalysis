import  { htmlComponents } from './base'
import { TimelineMax } from 'gsap';

export const renderRadioButtons = (chartType, variables) => {

    const radioBox = htmlComponents[chartType].radioBox;

    
    variables.forEach((variable, index) => {

        const status = variable === 'temperature' ? 'checked' : '';

        const html = `
            <div class="radio">
                <input class="radio__input" type="radio" name="dailyWeeklyVar" id="dailyWeekly-${variable}" ${status}>
                <label class="radio__label" for="dailyWeekly-${variable}">${variable}</label>
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
};