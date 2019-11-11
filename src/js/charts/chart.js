import * as d3 from "d3";
import { htmlComponents } from '../base';

export default class ChartCreator {
    constructor(){

        this.chartGroups = {
            dailyWeeklyChart: {
                div: '#dailyWeekly__chart'
            },
            hourlyChart: {
                div: '#hourly__chart'
            }
        }

    }


    renderChart(chartType, data, varOne, varTwo){ //param: data obj, first var, secondVar


        const { div } = this.chartGroups[chartType];

        
        const x = 'temperatureMax'
        const y = 'temperatureMin'

        //DATA
        const xValue =  (d) => d[x];
        const xLabel =  x; 
        const yValue =  (d) => d[y];
        const yLabel =  y; 
 

        //DIMENSION
        //READ DIMENSIONS OD BASED DIV
        const { height, width } = document.querySelector(div).getBoundingClientRect()


         const margin = {top:40, right:40, bottom:40, left:40};
         const svgWidth = width - margin.left - margin.right;
         const svgHeight = height - margin.top - margin.bottom;

 
         //CREATE MAIN SVG
         this.chartGroups[chartType].svgG = d3.select(div)
                         .append('svg')
                             .attr('class', `${chartType}__chartSvg`)
                             .attr('width', width)
                             .attr('height', height)
                        .append('g')
                            .attr("transform","translate(" + margin.left + "," + margin.top + ")");

                                
        this.chartGroups[chartType].svg = d3.select(`.${chartType}__chartSvg`);                          


        //X AXIS                        
        this.chartGroups[chartType].xScale = d3.scaleLinear()
                            .domain([d3.min(data, xValue), d3.max(data, xValue)])
                            .range([0, svgWidth])
                            .nice()

        this.chartGroups[chartType].xAxisG = this.chartGroups[chartType].svgG.append('g')
                            .attr('transform', `translate(0, ${svgHeight})`)
                            .call(d3.axisBottom(this.chartGroups[chartType].xScale)
                                        .tickPadding(10));

        // xAxisG.append('text')
        //         .attr('class','axisLabel')
        //         .attr('fill','#fff')
        //         .attr('font-size', 25)
        //         .attr('x', svgWidth/2)
        //         .attr('y',50)
        //         .text(xLabel);                                        


        //Y AXIS
        this.chartGroups[chartType].yScale = d3.scaleLinear() 
                            .domain(d3.extent(data, yValue))
                            .range([svgHeight, 0])
                            .nice();                      

        this.chartGroups[chartType].yAxisG = this.chartGroups[chartType].svgG.append('g')
                            .call(d3.axisLeft(this.chartGroups[chartType].yScale))

        // yAxisG.append('text')
        //         .attr('class','axisLabel')
        //         .attr('fill','#fff')
        //         .attr('font-size', 25)
        //         .attr('text-anchor', 'middle')
        //         .attr('transform','rotate(-90)')
        //         .attr('x', -svgHeight/2)
        //         .attr('y', -60)
        //         .text(yLabel);                                        
        

    }

    redrawChart(){

        console.log('----------------------')


        const chartType = 'dailyWeeklyChart';
        const { div } = this.chartGroups[chartType];
        const { height, width } = document.querySelector(div).getBoundingClientRect()

        // const width = 300;

        const margin = {top:40, right:40, bottom:40, left:40};
        const svgWidth = width - margin.left - margin.right;
        const svgHeight = height - margin.top - margin.bottom;

        console.log(d3.select(`.${chartType}__chartSvg`))
        console.log(this.chartGroups[chartType].svg)


        this.chartGroups[chartType].svg
                                    .attr('width', width)
                                    .attr('height', height);
        //X AXIS    
        this.chartGroups[chartType].xScale.range([0, svgWidth])
        this.chartGroups[chartType].xAxisG
                                    .call(d3.axisBottom(this.chartGroups[chartType].xScale))
                                    .attr('transform', `translate(0, ${svgHeight})`);

        //Y AXIS    
        this.chartGroups[chartType].yScale.range([svgHeight, 0])
        this.chartGroups[chartType].yAxisG.call(d3.axisLeft(this.chartGroups[chartType].yScale));


        // // console.log(`svg width: ${this.chartGroups[chartType].svg.style('width')}`);
        // console.log(this.chartGroups[chartType].xAxisG.style('width'));
        // // console.log(this.chartGroups[chartType].xScale.range());

    }

    renderChartAxis(){
    }

    renderChartDat(){
        
    }



}