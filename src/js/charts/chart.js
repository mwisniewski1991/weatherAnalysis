import * as d3 from "d3";
import { htmlComponents } from '../base';
const moment = require('moment');


export default class ChartCreator {
    constructor(){

        this.chartGroups = {
            dailyWeeklyChart: {
                div: '#dailyWeekly__chart',
                paths: [],
                dots: [],
                timeFormat: '%d.%m',
                xTicks: 7,
            },
            hourlyChart: {
                div: '#hourly__chart',
                paths: [],
                dots: [],
                timeFormat: '%H:%M',
                xTicks: 12,
            },
            dailyDailyChart: {
                div: '#dailyDaily__chart',
                paths: [],
                dots: [],
                timeFormat: '%d.%m',
                xTicks: 7,
            }
        }

        this.chartSettings = {
            margins: {top:40, right:40, bottom:55, left:60},
            lineCurve: d3.curveCatmullRom.alpha(.5),
            values: { xValue: (d) => d[x], yValue: (d) => d[y]}
        }
    }


    renderChart(dataObj){ //param: data obj, first var, secondVar

        // console.log(dataObj);

        //PREPARE INPUTS FROM OBJECTS
        const { chartType, xLabel, yLabel } = dataObj;
        const { x, y } = dataObj.dataSets[0].setUp[0];

        const data = [dataObj.dataSets[0].data, dataObj.dataSets[1].data];
        const setUp = [dataObj.dataSets[0].setUp, dataObj.dataSets[1].setUp];

        const { div, timeFormat, xTicks } = this.chartGroups[chartType];

        //DATA
        const xValue =  (d) => d[x];
        const yValue =  (d) => d[y];

        //DIMENSION
        //READ DIMENSIONS OD BASED DIV
        const { height, width } = document.querySelector(div).getBoundingClientRect()

        const margin = this.chartSettings.margins;
        const svgWidth = width - margin.left - margin.right;
        const svgHeight = height - margin.top - margin.bottom;


        //CREATE MAIN SVG
        {

             this.chartGroups[chartType].svgG = d3.select(div)
             .append('svg')
             .attr('id', `${chartType}__chartSvg`)
             .attr('class', 'chartLine')
             .attr('width', width)
             .attr('height', height)
             .append('g')
             .attr("transform", `translate(${margin.left}, ${margin.top})`);
             
             this.chartGroups[chartType].svg = d3.select(`#${chartType}__chartSvg`);                          
        }

        //X AXIS      
        {

            this.chartGroups[chartType].xScale = d3.scaleTime()
                .domain([d3.min(data[0], xValue), d3.max(data[0], xValue)])
                .range([0, svgWidth])
                // .nice()
            
            this.chartGroups[chartType].xAxisG = this.chartGroups[chartType].svgG.append('g')
                .attr('class', 'chartLine__axisLine')
                .attr('transform', `translate(0, ${svgHeight})`)
                .call(d3.axisBottom(this.chartGroups[chartType].xScale)
                    .ticks(xTicks)
                    .tickFormat(d3.timeFormat(timeFormat))
                    .tickPadding(10));
                
            this.chartGroups[chartType].xAxisG.append('text')
                .attr('class','chartLine__axisLabel')
                .attr('x', svgWidth/2)
                .attr('y',50)
                .text(xLabel);                                        
        }                  

        //Y AXIS
        {

            this.chartGroups[chartType].yScale = d3.scaleLinear() 
            // .domain(d3.extent(data, yValue))
                .domain([this.calcMinValue(data, setUp) - 1, this.calcMaxValue(data, setUp) + 1])
                .range([svgHeight, 0])
                .nice();                      
            
            this.chartGroups[chartType].yAxisG = this.chartGroups[chartType].svgG.append('g')
                .attr('class', 'chartLine__axisLine chartLine__axisLine--yLine')
                .call(d3.axisLeft(this.chartGroups[chartType].yScale)
                    .ticks(7)
                    .tickSize(-svgWidth)
                    .tickPadding(10));
            
            this.chartGroups[chartType].yAxisG.append('text')
                .attr('class','chartLine__axisLabel')
                .attr('text-anchor', 'middle')
                .attr('transform','rotate(-90)')
                .attr('x', -svgHeight/2)
                .attr('y', -40)
                .text(yLabel);             
        }
                                            
        //LINE, DOTS      
        {
            data.forEach( (dataset, index) => {
                this.drawPath(chartType, dataset, setUp[index]);   
                this.drawDots(chartType, dataset, setUp[index]);
            })
        }                                     
    }


    drawPath(chartType, data, setUp){
        //arguments: forWhichChart, data, currentVairables
        
        setUp.forEach((el) => {
            const xValue =  (d) => d[x];
            const yValue =  (d) => d[y];

            const x = el.x;
            const y = el.y;
            const classLine = el.classLine;

            const  pathNum = this.chartGroups[chartType].paths.length;

            this.chartGroups[chartType].paths[pathNum] = this.chartGroups[chartType].svgG
                .append('path')
                    .datum(data)
                // .attr('class', 'chartLine__mainLine chartLine__mainLine--actual')
                .attr('class', classLine)
                .attr("d", d3.line()
                            .x((d) => this.chartGroups[chartType].xScale(xValue(d)))
                            .y((d) => this.chartGroups[chartType].yScale(yValue(d)))
                            .curve(this.chartSettings.lineCurve));

            })

    }

    drawDots(chartType, data, setUp){
        //arguments: forWhichChart, data, currentVairables

        setUp.forEach((el) => {
            const xValue =  (d) => d[x];
            const yValue =  (d) => d[y];

            const x = el.x;
            const y = el.y;
            const classDots = el.classDots;

            const  dotsNum = this.chartGroups[chartType].dots.length;

            this.chartGroups[chartType].dots[dotsNum] = this.chartGroups[chartType].svgG.append('g')
                        .selectAll("dot")
                            .data(data)
                            .enter()
                        .append("circle")
                            // .attr('class', 'chartLine__mainDott chartLine__mainDott--actual')
                            .attr('class', classDots)
                            .attr("cx", (d) => this.chartGroups[chartType].xScale(xValue(d)))
                            .attr("cy", (d) => this.chartGroups[chartType].yScale(yValue(d)))
                            .attr("r", 3);

        });
    }

    redrawChart(dataObj){

        const { chartType } = dataObj;
        const data = [dataObj.dataSets[0].data, dataObj.dataSets[1].data];
        const setUp = [...dataObj.dataSets[0].setUp, ...dataObj.dataSets[1].setUp];


        const { div } = this.chartGroups[chartType];
        const { height, width } = document.querySelector(div).getBoundingClientRect()

        // const width = 300;

        const margin = this.chartSettings.margins;
        const svgWidth = width - margin.left - margin.right;
        const svgHeight = height - margin.top - margin.bottom;

        this.chartGroups[chartType].svg
                                    .attr('width', width)
                                    .attr('height', height);

        //X AXIS    
        this.chartGroups[chartType].xScale.range([0, svgWidth])
        this.chartGroups[chartType].xAxisG
                                    .attr('class', 'chartLine__axisLine')
                                    .attr('transform', `translate(0, ${svgHeight})`)
                                    .call(d3.axisBottom(this.chartGroups[chartType].xScale)
                                        .ticks(7)
                                        .tickFormat(d3.timeFormat("%d.%m"))
                                        .tickPadding(10));

        //Y AXIS    
        this.chartGroups[chartType].yScale.range([svgHeight, 0])
        this.chartGroups[chartType].yAxisG
                                    .attr('class', 'chartLine__axisLine chartLine__axisLine--yLine')
                                    .call(d3.axisLeft(this.chartGroups[chartType].yScale)
                                        .ticks(7)
                                        .tickSize(-svgWidth)
                                        .tickPadding(10));

        //DATA

            this.chartGroups[chartType].paths.forEach( (path, index) =>{

                    const x = setUp[index].x;
                    const y = setUp[index].y;
                    const xValue =  (d) => d[x];
                    const yValue =  (d) => d[y];

                path
                    .attr("d", d3.line()
                    .x((d) => this.chartGroups[chartType].xScale(xValue(d)))
                    .y((d) => this.chartGroups[chartType].yScale(yValue(d)))
                    .curve(this.chartSettings.lineCurve));
            });

            this.chartGroups[chartType].dots.forEach( (dot, index) =>{

                    const x = setUp[index].x;
                    const y = setUp[index].y;
                    const xValue =  (d) => d[x];
                    const yValue =  (d) => d[y];

                    dot
                    .attr("cx", (d) => this.chartGroups[chartType].xScale(xValue(d)))
                    .attr("cy", (d) => this.chartGroups[chartType].yScale(yValue(d)))
            });

    }


    calcMinValue(datasets, setUp){

        const datasetsValues = [];

        datasets.forEach((data,index) => {

            setUp[index].forEach((el) => {
                
                const variable = el.y;
                const tempValues = data.map(el => el[variable]);         
                datasetsValues.push(...tempValues);
            })
        });
        return d3.min(datasetsValues);
    }

    calcMaxValue(datasets, setUp){
        const datasetsValues = [];

        datasets.forEach((data,index) => {

            setUp[index].forEach((el) => {
                const variable = el.y;
                const tempValues = data.map(el => el[variable]);         
                datasetsValues.push(...tempValues);
            })
        });
        return d3.max(datasetsValues);
    }


    renderChartTwo(chartType, data, x, y){ //param: data obj, first var, secondVar

        


        const { div } = this.chartGroups[chartType];

        //DATA
        const xValue =  (d) => d[x];
        const xLabel =  x; 
        const yValue =  (d) => d[y];
        const yLabel =  y; 
 
        const yValueTwo =  (d) => d[y] - 2;

        //DIMENSION
        //READ DIMENSIONS OD BASED DIV
        const { height, width } = document.querySelector(div).getBoundingClientRect()

        const margin = this.chartSettings.margins;
        const svgWidth = width - margin.left - margin.right;
        const svgHeight = height - margin.top - margin.bottom;


        //CREATE MAIN SVG
        {

             this.chartGroups[chartType].svgG = d3.select(div)
             .append('svg')
             .attr('id', `${chartType}__chartSvg`)
             .attr('class', 'chartLine')
             .attr('width', width)
             .attr('height', height)
             .append('g')
             .attr("transform", `translate(${margin.left}, ${margin.top})`);
             
             this.chartGroups[chartType].svg = d3.select(`#${chartType}__chartSvg`);                          
        }

        //X AXIS      
        {

            this.chartGroups[chartType].xScale = d3.scaleTime()
                .domain([d3.min(data[0], xValue), d3.max(data[0], xValue)])
                .range([0, svgWidth])
                // .nice()
            
            this.chartGroups[chartType].xAxisG = this.chartGroups[chartType].svgG.append('g')
                .attr('class', 'chartLine__axisLine')
                .attr('transform', `translate(0, ${svgHeight})`)
                .call(d3.axisBottom(this.chartGroups[chartType].xScale)
                    .ticks(7)
                    .tickFormat(d3.timeFormat("%d.%m"))
                    .tickPadding(10));
                
            this.chartGroups[chartType].xAxisG.append('text')
                .attr('class','chartLine__axisLabel')
                .attr('x', svgWidth/2)
                .attr('y',50)
                .text(xLabel);                                        
        }                  

        //Y AXIS
        {

            this.chartGroups[chartType].yScale = d3.scaleLinear() 
            // .domain(d3.extent(data, yValue))
                .domain([this.calcMinValue(data, y) - 1, this.calcMaxValue(data, y) + 1])
                .range([svgHeight, 0])
                .nice();                      
            
            this.chartGroups[chartType].yAxisG = this.chartGroups[chartType].svgG.append('g')
                .attr('class', 'chartLine__axisLine chartLine__axisLine--yLine')
                .call(d3.axisLeft(this.chartGroups[chartType].yScale)
                    .ticks(7)
                    .tickSize(-svgWidth)
                    .tickPadding(10));
            
            this.chartGroups[chartType].yAxisG.append('text')
                .attr('class','chartLine__axisLabel')
                .attr('text-anchor', 'middle')
                .attr('transform','rotate(-90)')
                .attr('x', -svgHeight/2)
                .attr('y', -40)
                .text(yLabel);             
        }
                                            
        //LINE      
        {
            data.forEach( (dataset) => {
                this.drawPath(chartType, dataset, {x, y});    
                this.drawDots(chartType, dataset, {x, y});

                this.drawPath(chartType, dataset, {x, y});    
                this.drawDots(chartType, dataset, {x, y});
            })
        }                                     
    }

}