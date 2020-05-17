/*

Revenue bar graph
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

var svgHeight = 500;
var svgWidth = 500;
var margin = {left:90,right:10,bottom:90,top:10};

var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.left - margin.right;


var svg = d3.select('#chart-area')
            .append('svg')
            .attr('width',svgWidth)
            .attr('height',svgHeight)
            .attr('class','bg-dark');



var g = svg.append('g').attr('transform','translate('+ margin.left +')')

//X label
g.append('text')
    
 .attr('x',width/2)
 .attr('y',svgHeight - margin.top)
 .attr('text-anchor','middle')
 .text('Month')
 .attr('stroke','white');



//Y label transform 90 x->y and y->-x gets replaced
g.append('text')
.attr('class','y axis')

.attr('y',margin.left-margin.left/4)
 .attr('x',height/2)
 .attr('transform','rotate(90)')
.attr('text-anchor','middle')
 .text('Revenue')
 .attr('stroke','white');


d3.json('data/revenues.json').then(function(data){

    data.forEach(d=>{

        d.revenue = +d.revenue;
        d.profit = +d.profit;
    })
    console.log(data);

    var maxVal = d3.max(data,function(d){
        return d.revenue;
    });

    // maxRange is 3/4th of height
    var maxRange = height - height/4;


    // Scaling:

var yScale = d3.scaleLinear()
                .domain([0,maxVal])
                .range([0,maxRange]);

var xScale = d3.scaleBand()
                .domain(data.map(function(d){
                    return d.month;
                }))
                .range([0,width])
                .paddingInner(0.5)
                .paddingOuter(0.3);


                data.forEach(d=>{
                    console.log(yScale(d.revenue));
                })

//

// Axes

var xAxis = d3.axisBottom(xScale);

g.append('g')
.attr('class','x axis')
.attr('transform','translate(0,'+(height)+')')
.call(xAxis)
.selectAll('text')
 .attr('y','10')
 .attr('x','-5')
 .attr('text-anchor','end')
 .attr('transform','rotate(-40)')
 .attr('stroke','orange')
 .attr('stroke-width',0.5);


 var yAxis = d3.axisLeft(yScale)
               .ticks(5)
               .tickFormat((d,i)=>{
                   return 60000 - i*10000 +'$'
               })

g.append('g')
 .attr('transform','translate(0,'+( height - maxRange) +')')
 .call(yAxis);

 //


var rects = g.selectAll('rect').data(data);

    rects.enter()
        .append('g')
        .append('rect')
        .attr('x',(d)=>{
            return xScale(d.month);
        })
        .attr('y',(d,i)=>{
            return height -  yScale(d.revenue);
        })
        .attr('width',xScale.bandwidth)
        .attr('height',(d)=>{
            return  yScale(d.revenue);
        })
        .attr('fill','skyblue')


})