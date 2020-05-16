
d3.json('data/buildings.json').then(function(data){


    data.forEach(d=>{

        d.height = +d.height;
    });

    console.log(data);

var svg = d3.select('#chart-area');

var x = d3.scaleBand()
          .domain(['Burj Khalifa','Shanghai Tower',
          'Abraj Al-Bait Clock Tower','Ping An Finance Centre','Lotte World Tower','Tower of Unity'])
          .range([0,300])
          .paddingInner(0.3)
          .paddingOuter(0.3);

var rects = svg.selectAll('rect').data(data);

var label = svg.selectAll('label').data(data);


rects.enter()
     .append('rect')
     .attr('x',(d,i)=>{

        return x(d.name) ;
     })
     .attr('y',(d)=>{

        return 500 - d.height;
     })
     .attr('width',x.bandwidth)
     .attr('height',(d)=>{

        return  d.height;
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