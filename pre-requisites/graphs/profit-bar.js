
/**
 * Profit bar graph
 */

var svgHeight = 600;
var svgWidth = 500;

var margin = {left:90,right:10,top:10,bottom:90};

var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.left - margin.right;

var svg = d3.select('#chart-area')
            .append('svg')
            .attr('width',svgWidth)
            .attr('height',svgHeight)
            .attr('class','bg-info')


var g = svg.append('g')
           .attr('transform','translate('+margin.left+')')
           
//Xlabel:

g.append('text')
.attr('x',width/2)
.attr('y',svgHeight-margin.top)
.attr('text-anchor','middle')
.text('Month')


g.append('text')
.attr('y',margin.left-margin.left/4)
.attr('x',height/2)
.attr('transform','rotate(90)')
.text('Profit')


d3.json('data/revenues.json').then(function(data){

    data.forEach((d)=>{

        d.profit = +d.profit;
    })

    var maxVal = d3.max(data,function(d){
        return d.profit;
    });

    var maxRange = height - height/4;

var xScale = d3.scaleBand()
               .domain(data.map(function(d){
                   return d.month;
               }))
               .range([0,width])
               .paddingInner(0.3)
               .paddingOuter(0.5);

var yScale = d3.scaleLinear()
                .domain([0,maxVal])
                .range([0,maxRange]);


var yAxis = d3.axisLeft(yScale)
              .ticks(5)
              .tickFormat((d,i)=>{
                  return 60000 - i*10000 +'$';
              })

g.append('g')
 .attr('transform','translate(0,'+(height-maxRange)+')')
 .call(yAxis)
                              
var xAxis = d3.axisBottom(xScale);

g.append('g')
.attr('class','x')
.attr('transform','translate(0,'+(height)+')')
.call(xAxis)
.selectAll('text')
.attr('y','10')
.attr('x','-5')
.attr('text-anchor','end')
 .attr('transform','rotate(-40)');
 

var rects = g.selectAll('rect').data(data);

rects.enter()
.append('g')
.append('rect')
.attr('x',(d)=>{
    return xScale(d.month);
})
.attr('y',(d,i)=>{
    return height -  yScale(d.profit);
})
.attr('width',xScale.bandwidth)
.attr('height',(d)=>{
    return  yScale(d.profit);
})
.attr('fill','lightgreen')

})