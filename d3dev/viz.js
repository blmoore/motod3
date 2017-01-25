"use strict";

d3.json('lids.json', (data) => {

    function initChart(){
        console.log(JSON.stringify(data[0]))

        let viz_height = 450;
        let viz_width = 700;
        let x_pad = 50;
        let y_pad = 20;

        // x scale: rating
        let xScale = d3.scaleLinear()
                       .domain([1, d3.max(data, d => d.rating)])
                       .range([0, viz_width - x_pad]);

        // y scale: price
        let yScale = d3.scaleLinear()
                       .domain([0, 1000
                           //d3.min(data, d => d.price),
                           //d3.max(data, d => d.price)
                       ])
                       .range([viz_height - y_pad, 0]);

        let svg = d3.select('#viz')
                    .append('svg')
                    .attr('width', viz_width)
                    .attr('height', viz_height);

        svg.selectAll('circle')
           .data(data)
           .enter()
           .append('circle')
           .attr('cx', d => xScale(d.rating))
           .attr('cy', d => yScale(d.price))
           .attr('r', 5);

        svg.selectAll("text")
           .data(data)
           .enter()
           .append("text")
           .text(d => d.name)
           .attr("x", d => xScale(d.rating) + 5)
           .attr("y", d => yScale(d.price) + 10)
           .attr("font-family", "sans-serif")
           .attr("font-size", "11px")
           .attr("fill", "red");

    }

    initChart()
})