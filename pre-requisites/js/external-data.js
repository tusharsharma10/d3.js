/**
 * External data loading uses promises
 */

d3.json('data/age.json').then( function(data){

     data.forEach(d=>{
          d.age = +d.age;
     });
     console.log(data);



var svg = d3.select('#chart-area')
.append('svg')
.attr('width',300)
.attr('height',300);


var circles = svg.selectAll('circle')
     .data(data);

     
// d is corresponding value in dataset
// i is index 
circles.enter()
.append('circle')
.attr('cx',(d,i)=>{

return (i*50)+25;
})
.attr('cy',25)
.attr('r',(d,i)=>{
return d.age;
})
.attr('fill','purple')

}).catch((error)=>console.log('Error is :',error));