"use strict";

d3.json('lids.json', (data) => {

    function initChart(){

        let margin = {top: 20, right: 100, bottom: 30, left: 40},
            height = 400,
            width = 500,
            viz_width = height - margin.left - margin.right,
            viz_height = width - margin.top - margin.bottom;

        // x scale: rating
        let xScale = d3.scaleLinear()
                       .domain([1, d3.max(data, d => d.rating)])
                       .range([1, width]);
        let xAxis = d3.axisBottom(xScale);

        // y scale: price
        let yScale = d3.scaleLinear()
                       .domain([0, 1000])
                       .range([height, 0]);
        let yAxis = d3.axisLeft(yScale);

        let materials = [];
        data.forEach((x) => {
            if (materials.indexOf(x.material) === -1) {
                if (x.material != null){
                    materials.push(x.material);
               }   
            }
        });
        
        let palette = ["#3366cc", "#dc3912", "#ff9900", 
                      "#109618", "#990099", "#0099c6", 
                      "#dd4477", "#66aa00", "#b82e2e", 
                      "#316395", "#994499", "#22aa99"];

        // colour scale: material
        let colScale = d3.scaleOrdinal()
                         .domain([1, materials.length])
                         .range(palette.slice(1, materials.length));

        let svg = d3.select('#viz')
                    .append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)
                    .append('g')
                    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        let tooltip = d3.select("body")
                        .append("div")
                        .attr("class", "tooltip")
                        .style("opacity", 0);

         // y-axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 0)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Price (GBP)");

        // x-axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("class", "label")
            .attr("x", viz_width)
            .attr("y", -6)
            .style("text-anchor", "end")
            .text("SHARP rating");

        svg.selectAll('circle')
           .data(data)
           .enter()
           .append('circle')
           .attr('cx', d => xScale(d.rating))
           .attr('cy', d => yScale(d.price))
           .attr('fill', d => colScale(d.material))
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