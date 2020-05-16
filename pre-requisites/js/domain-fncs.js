/**
 * Domain functions for setting scales:
 * 
 */

 
d3.json('data/buildings.json').then(function(data){


    data.forEach(d=>{

        d.height = +d.height;
    });

    console.log(data);

var svg = d3.select('#chart-area');

var x = d3.scaleBand()
          .domain(data.map(function(d){
              return d.name;
          }))
          .range([0,400])
          .paddingInner(0.3)
          .paddingOuter(0.3);

var rects = svg.selectAll('rect').data(data);

var label = svg.selectAll('label').data(data);

var y = d3.scaleLinear()
          .domain([0,d3.max(data, function(d){
              return d.height;
          })])
          .range([0,400])

rects.enter()
     .append('rect')
     .attr('x',(d,i)=>{

        return x(d.name) ;
     })
     .attr('y',(d)=>{

        return 500 - y(d.height);
     })
     .attr('width',x.bandwidth)
     .attr('height',(d)=>{

        return  y(d.height);
     })
     .attr('fill','skyblue');
     
     
label.enter()
     .append('text')
     .text((d)=>{
         return d.name;
     })
     .attr('y',(d,i)=>{

        return 500 - d.height - i*50;
     })
     .attr('x',(d,i)=>{
         return i*50 + 30;
     })
     .attr('stroke','orange')
     

}).catch((err)=>console.log('Error is ',err))