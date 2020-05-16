/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.5 - Activity: Adding SVGs to the screen
var is function scoped and let is block scoped
*/

/**
 * Using d3 1.select 2. append 3. attr
 */
var svg = d3.select('#chart-area')
            .append('svg')
            .attr('width',300)
            .attr('height',300);


var circle = svg.append('circle')
                .attr('cx',150)
                .attr('cy',150)
                .attr('r',75)
                .attr('fill','blue');

