/**
 * Margins and groups
 */

 var svgWidth = 700;
 var svgHeight = 700;

 var margin = {left:90,right:10,top:90,bottom:10};
 var width = svgWidth - margin.left - margin.right;
 var height = svgHeight - margin.top - margin.bottom;
//console.log(height);//500
 var svg = d3.select('#chart-area');

 var g = svg.append('g')
            .attr('transform','translate(' + margin.left + ')');

d3.json('data/buildings.json').then(function(data){


    data.forEach(d=>{

        d.height = +d.height;
    });

    console.log(data);

    var maxData = d3.max(data,function(d){
        return d.height;
    })

var x = d3.scaleBand()
          .domain(data.map(function(d){
              return d.name;
          }))
          .range([0,width])
          .paddingInner(0.3)
          .paddingOuter(0.3);

var rects = g.selectAll('rect').data(data);

var label = g.selectAll('label').data(data);

var y = d3.scaleLinear()
          .domain([0,d3.max(data, function(d){
              return d.height;
          })])
          .range([0,d3.max(data, function(d){
            return d.height;
        })])

var xAxis = d3.axisBottom(x);
g.append('g')
 .attr('class','x axis')
 .attr('transform','translate(0,'+ height + ')')
 .call(xAxis)
 .selectAll('text')
 .attr('y','10')
 .attr('x','-5')
 .attr('text-anchor','end')
 .attr('transform','rotate(-40)')
 .attr('stroke','orange')
 .attr('stroke-width',0.5);

 var yAxis = d3.axisLeft(y)
                .ticks(5)
                .tickFormat((d)=>{
                    return maxData - d  +'m';
                })
                
    g.append('g')
    .attr('class','y axis')
    .attr('transform','translate(0,'+ (height-maxData) + ')')
    .call(yAxis);


rects.enter()
     .append('g')
     .attr('transform','translate(' + 0 + ' '+-(margin.top+margin.bottom)+')')
     .append('rect')
     .attr('x',(d,i)=>{

        return x(d.name) ;
     })
     .attr('y',(d)=>{

        return svgHeight - y(d.height);
     })
     .attr('width',x.bandwidth)
     .attr('height',(d)=>{

        return  y(d.height);
     })
     .attr('fill','skyblue');
     
     

     

}).catch((err)=>console.log('Error is ',err))