/**
 * Using data joins
 */
var dataSet = [25,20,10,12,15];

var svg = d3.select('#chart-area')
            .append('svg')
            .attr('width',300)
            .attr('height',300);


var circles = svg.selectAll('circle')
                 .data(dataSet);

                 
// d is corresponding value in dataset
// i is index 
circles.enter()
        .append('circle')
        .attr('cx',(d,i)=>{

            return (i*50)+25;
        })
        .attr('cy',25)
        .attr('r',(d,i)=>{
            return d+i;
        })
        .attr('fill','violet')