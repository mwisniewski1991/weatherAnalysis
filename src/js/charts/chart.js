import * as d3 from "d3";
// import { curveCatmullRom, select, scaleTime, min, max, axisBottom, timeFormat, scaleLinear, axisLeft, line } from 'd3';
import { htmlComponents } from '../UI/base';
const moment = require('moment');


export default class ChartCreator {
    constructor(){

        this.chartGroups = {
            dailyWeeklyChart: {
                div: '#dailyWeekly__chart',
                paths: [],
                pathsDatajoin: [],
                dots: [],
                dotsDatajoin: [],
                timeFormat: '%d.%m',
                xTicks: 7,
            },
            hourlyChart: {
                div: '#hourly__chart',
                paths: [],
                pathsDatajoin: [],
                dots: [],
                dotsDatajoin: [],
                timeFormat: '%H:%M',
                xTicks: 12,
            },
            dailyDailyChart: {
                div: '#dailyDaily__chart',
                paths: [],
                pathsDatajoin: [],
                dots: [],
                dotsDatajoin: [],
                timeFormat: '%d.%m',
                xTicks: 7,
            }
        }

        this.chartSettings = {
            margins: {top:20, right:40, bottom:60, left:60},
            lineCurve: d3.curveCatmullRom.alpha(.5),
            values: { xValue: (d) => d[x], yValue: (d) => d[y]}
        }
    }


    renderChart(dataObj){ //param: data obj, first var, secondVar

        // console.log(dataObj.dataSets);
        //PREPARE INPUTS FROM OBJECTS
        const { chartType, xLabel } = dataObj;
        const { x, y } = dataObj.dataSets[0].setUp[0];
        
        const data = [dataObj.dataSets[0].data, dataObj.dataSets[1].data];
        const setUp = [
            dataObj.dataSets[0].setUp.filter(el => el.show === true),
            dataObj.dataSets[1].setUp.filter(el => el.show === true)
        ]
        
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
             
            this.chartGroups[chartType].svg  = d3.select(div)
                                                .append('svg');

            this.chartGroups[chartType].svgG =  this.chartGroups[chartType].svg                                
                                                        .attr('id', `${chartType}__chartSvg`)
                                                        .attr('class', 'chartLine')
                                                        .attr('width', width)
                                                        .attr('height', height)
                                                    .append('g')
                                                        .attr("transform", `translate(${margin.left}, ${margin.top})`);
             
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
                .domain([this.calcMinValue(data, setUp), this.calcMaxValue(data, setUp)])
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
                .text(y);            
                
        }
                                            
        //LINE, DOTS      
        {

            //HOW MANY PATHS 
            const numOfPaths = setUp[0].length + setUp[1].length;
            const setUpArray = [...dataObj.dataSets[0].setUp.filter(el => el.show === true),
                                ...dataObj.dataSets[1].setUp.filter(el => el.show === true)];

            //LOOP CREATE ALL LINES WHICH ARE REQUIRED
            for(let i=0 ; i<numOfPaths; i++){
                const helpNumber = numOfPaths / 2;
                const whichData = i < helpNumber ? 0 : 1;

                this.drawPath(chartType, data[whichData], setUpArray[i], i);   
                this.drawDots(chartType, data[whichData], setUpArray[i], i);   
            }



            
        }                                     
    }

    changeChart(dataObj){

        const { chartType, xLabel, yLabel } = dataObj;
        const data = [dataObj.dataSets[0].data, dataObj.dataSets[1].data];
        const setUp = [
                dataObj.dataSets[0].setUp.filter(el => el.show === true), 
                dataObj.dataSets[1].setUp.filter(el => el.show === true)];

        this.calcXaxis(dataObj);
        this.calcYaxis(dataObj);

        //HOW MANY PATHS 
        const numOfPaths = setUp[0].length + setUp[1].length;
        const setUpArray = [
                ...dataObj.dataSets[0].setUp.filter(el => el.show === true),
                ...dataObj.dataSets[1].setUp.filter(el => el.show === true)];

        for(let i=0 ; i<numOfPaths; i++){
            const helpNumber = numOfPaths / 2;
            const whichData = i < helpNumber ? 0 : 1;

            this.drawPath(chartType, data[whichData], setUpArray[i], i);   
            this.drawDots(chartType, data[whichData], setUpArray[i], i);   

        }
    }

    drawPath(chartType, data, setUp, pathNum){
        //arguments: forWhichChart, data, currentVairables
        // console.log(data);
        // console.log(setUp);

        const { paths, pathsDatajoin, xScale, yScale, svgG } = this.chartGroups[chartType];

            const xValue =  (d) => d[x];
            const yValue =  (d) => d[y];

            const x = setUp.x;
            const y = setUp.y;
            const classLine = setUp.classLine;

            const lineGenerator = d3.line()
                                        .x(d => xScale(d[x]))
                                        .y(d => yScale(d[y]))
                                        .curve(d3.curveCatmullRom.alpha(.5));
            
            pathsDatajoin[pathNum] = svgG.selectAll(`.lineTest${pathNum}`)
                                                            .data([data]);

            paths[pathNum] = pathsDatajoin[pathNum]
                .enter()
                    .append('path');
            
            paths[pathNum]
                    .attr('opacity', 0)
                    .attr('class', `${classLine} lineTest${pathNum}`)
                .merge(pathsDatajoin[pathNum])
                    .transition()
                    .duration(1000)   
                    .attr('opacity', 1)
                    .attr("d", lineGenerator(data));

            pathsDatajoin[pathNum]
                .exit()
                .transition().duration(500) 
                .attr("opacity", 0)
                .remove();
    }

    drawDots(chartType, data, setUp, dotsNum){
        //arguments: forWhichChart, data, currentVairables

        const { dots, dotsDatajoin, xScale, yScale, svgG } = this.chartGroups[chartType];

            const xValue =  (d) => d[x];
            const yValue =  (d) => d[y];

            const x = setUp.x;
            const y = setUp.y;
            const classDots = setUp.classDots;

            dotsDatajoin[dotsNum] = svgG.selectAll(`.dotsTest${dotsNum}`)
                                        .data(data)
                                        
            dots[dotsNum] = dotsDatajoin[dotsNum]
                                .enter()
                                    .append('circle');
                
            dots[dotsNum]
                    .attr('class', `${classDots} dotsTest${dotsNum}`)
                    .attr("cx", (d) => this.chartGroups[chartType].xScale(d[x]))
                    .attr("cy", (d) => this.chartGroups[chartType].yScale(d[y]))
                    .attr("r", 1)
                    .merge(dotsDatajoin[dotsNum])
                        .transition().duration(1000)  
                            .attr('opacity', 1)
                            .attr("cx", (d) => this.chartGroups[chartType].xScale(d[x]))
                            .attr("cy", (d) => this.chartGroups[chartType].yScale(d[y]))
                            .attr("r", 4);


            dotsDatajoin[dotsNum]
                .exit()
                .transition().duration(500) 
                .attr("r", 0)
                .remove();
            

    }

    redrawChart(dataObj){

        const { chartType, xLabel } = dataObj;
        const data = [dataObj.dataSets[0].data, dataObj.dataSets[1].data];
        const setUp = [
            ...dataObj.dataSets[0].setUp.filter(el => el.show === true), 
            ...dataObj.dataSets[1].setUp.filter(el => el.show === true)];

        const { div } = this.chartGroups[chartType];
        const { height, width } = document.querySelector(div).getBoundingClientRect()

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

        this.chartGroups[chartType].xAxisG.select('chartLine__axisLabel')
                .attr('x', svgWidth/2)
                .attr('y', 50)
                .text(xLabel);  

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

    calcXaxis(dataObj){

        const { chartType } = dataObj;

        const { div, timeFormat, xTicks, xScale, xAxisG } = this.chartGroups[chartType];
        const { height } = document.querySelector(div).getBoundingClientRect()
        const margin = this.chartSettings.margins;
        const svgHeight = height - margin.top - margin.bottom;
        

        const data = [dataObj.dataSets[0].data, dataObj.dataSets[1].data];
        const { x } = dataObj.dataSets[0].setUp[0];
        const xValue =  (d) => d[x];


        xScale.domain([d3.min(data[0], xValue), d3.max(data[0], xValue)])

        xAxisG
            .transition().duration(1000)
            .attr('transform', `translate(0, ${svgHeight})`)
            .call(d3.axisBottom(xScale)
                .ticks(xTicks)
                .tickFormat(d3.timeFormat(timeFormat))
                .tickPadding(10));

    }

    calcYaxis(dataObj){

        const { chartType } = dataObj;

        const { div, yScale, yAxisG } = this.chartGroups[chartType];
        const { width } = document.querySelector(div).getBoundingClientRect()
        
        const margin = this.chartSettings.margins;
        const svgWidth = width - margin.left - margin.right;

        const data = [dataObj.dataSets[0].data, dataObj.dataSets[1].data];
        const setUp = [
            dataObj.dataSets[0].setUp.filter(el => el.show === true),
            dataObj.dataSets[1].setUp.filter(el => el.show === true)];

        const { y } = setUp[0][0];

        yScale.domain([this.calcMinValue(data, setUp), this.calcMaxValue(data, setUp)])

        yAxisG
            .transition().duration(1000)
            .call(d3.axisLeft(yScale)
                .ticks(7)
                .tickSize(-svgWidth)
                .tickPadding(10));

        yAxisG.select('.chartLine__axisLabel').text(y);
    }

    calcMinValue(datasets, setUp){

        const datasetsValues = [];

        datasets.forEach((data,index) => {


            setUp[index].forEach((el) => {
                
                const variable = el.y;
                const tempValues = data.map(el => parseFloat(el[variable]));         
                datasetsValues.push(...tempValues);
            })
        });

        const buffer = 0;
        const minValue = d3.min(datasetsValues) + (d3.min(datasetsValues) * buffer);
        
        return minValue;
    }

    calcMaxValue(datasets, setUp){
        const datasetsValues = [];

        datasets.forEach((data,index) => {

            setUp[index].forEach((el) => {
                const variable = el.y;
                const tempValues = data.map(el => parseFloat(el[variable]));         
                datasetsValues.push(...tempValues);
            })
        });

        const buffer = 0;
        const maxValue = d3.max(datasetsValues) + (d3.max(datasetsValues) * buffer)

        return maxValue;
    }


    //TO DELETE
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

    drawPathTwo(chartType, data, setUp){
        //arguments: forWhichChart, data, currentVairables
        // console.log(data);
        // console.log(setUp);

        const { paths, pathsDatajoin, xScale, yScale, svgG } = this.chartGroups[chartType];

        
        setUp.forEach((el) => {

            const xValue =  (d) => d[x];
            const yValue =  (d) => d[y];

            const x = el.x;
            const y = el.y;
            const classLine = el.classLine;

            const lineGenerator = d3.line()
                                        .x(d => xScale(d[x]))
                                        .y(d => yScale(d[y]))
                                        .curve(d3.curveCatmullRom.alpha(.5));
            
            const pathNum = paths.length;

            pathsDatajoin[pathNum] = svgG.selectAll(`.lineTest${pathNum}`)
                                                            .data([data]);

            
            paths[pathNum] = pathsDatajoin[pathNum]
            .enter()
            .append('path');
            paths[pathNum]
            .attr('opacity', 0)
            .attr('class', `${classLine} lineTest${pathNum}`)
            .merge(pathsDatajoin[pathNum])
            .transition()
            .duration(1000)   
            .attr('opacity', 1)
            .attr("d", lineGenerator(data));
            
            // paths[pathNum] = pathsDatajoin[pathNum]
            //     .enter()
            //         .append('path')
            //         .attr('opacity', 0)
            //         .attr('class', `${classLine} lineTest${pathNum}`)
            //     .merge(pathsDatajoin[pathNum])
            //         .transition()
            //         .duration(1000)   
            //         .attr('opacity', 1)
            //         .attr("d", lineGenerator(data));
                                                            
        })
    }

}