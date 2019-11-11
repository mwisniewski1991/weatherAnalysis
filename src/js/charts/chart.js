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
            },
            dailyDailyChart: {
                div: '#dailyDaily__chart'
            }
        }

        this.chartSettings = {
            margins: {top:40, right:40, bottom:55, left:60},
        }
    }


    renderChart(chartType, data, varOne, varTwo){ //param: data obj, first var, secondVar

        // console.log(data);
        // data.forEach( el => {
        //     console.log(d3.timeParse("%Y-%m-%d"));
        //     el.time = d3.timeParse("%Y-%m-%d")(el.time);
        // });
        // console.log(data);


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

            this.chartGroups[chartType].xScale = d3.scaleLinear()
            .domain([d3.min(data, xValue), d3.max(data, xValue)])
            .range([0, svgWidth])
            .nice()
            
            this.chartGroups[chartType].xAxisG = this.chartGroups[chartType].svgG.append('g')
            .attr('class', 'chartLine__axisLine')
            .attr('transform', `translate(0, ${svgHeight})`)
            .call(d3.axisBottom(this.chartGroups[chartType].xScale)
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
            .domain(d3.extent(data, yValue))
            .range([svgHeight, 0])
            .nice();                      
            
            this.chartGroups[chartType].yAxisG = this.chartGroups[chartType].svgG.append('g')
            .attr('class', 'chartLine__axisLine chartLine__axisLine--yLine')
            .call(d3.axisLeft(this.chartGroups[chartType].yScale)
            .tickSize(-svgWidth));
            
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
            // this.chartGroups[chartType].path = this.chartGroups[chartType].svgG.append('path')
            //     .datum('data')
            //     .attr('fill','none')
            //     .attr("stroke", "steelblue")
            //     .attr("stroke-width", 1.5)
            //     .attr("d", d3.line()
            //         .x((d) => this.chartGroups[chartType].xScale(d.temperatureMin))
            //         .y((d) => this.chartGroups[chartType].yScale(d.temperatureMax))
            //     )

            // this.chartGroups[chartType].svgG.append('g')
            //         .selectAll("dot")
            //         .data(data)
            //         .enter()
            //         .append("circle")
            //         .attr("cx", (d) => this.chartGroups[chartType].xScale(d.temperatureMax))
            //         .attr("cy", (d) => this.chartGroups[chartType].yScale(d.temperatureMin))
            //         .attr("r", 4)
            //         .style("fill", "darkred")


        }                                     
                                    

    }

    redrawChart(chartType){

        // const chartType = 'dailyWeeklyChart';

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
                                        .tickPadding(10));

        //Y AXIS    
        this.chartGroups[chartType].yScale.range([svgHeight, 0])
        this.chartGroups[chartType].yAxisG
                                    .attr('class', 'chartLine__axisLine chartLine__axisLine--yLine')
                                    .call(d3.axisLeft(this.chartGroups[chartType].yScale)
                                        .tickSize(-svgWidth));


        // // console.log(`svg width: ${this.chartGroups[chartType].svg.style('width')}`);
        // console.log(this.chartGroups[chartType].xAxisG.style('width'));
        // // console.log(this.chartGroups[chartType].xScale.range());

    }

    renderChartAxis(){
    }

    renderChartDat(){
        
    }



}