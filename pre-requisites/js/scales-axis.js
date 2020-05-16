/**
 * Linear Scales
 * Time Scale
 * Log Scale
 * Ordinal Scale
 * Band Scale
 * Domains and Ranges:
 * 
 */

 
d3.json('data/buildings.json').then(function(data){


    data.forEach(d=>{

        d.height = +d.height;
    });

    console.log(data);

var svg = d3.select('#chart-area');

// var color = d3.ordinalScale()
//               .domain([280])
//               .range(['RED']);

var y = d3.scaleLinear()
          .domain([0,500])
          .range([0,400]);



var rects = svg.selectAll('rect').data(data);

var label = svg.selectAll('label').data(data);


rects.enter()
     .append('rect')
     .attr('x',(d,i)=>{

        return i * 50 +30 ;
     })
     .attr('y',(d)=>{

        return 500 - y(d.height);
     })
     .attr('width',30)
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