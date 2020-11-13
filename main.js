const margin = ({top: 20, right: 20, bottom: 20, left: 20});
const width = 800 - margin.left - margin.right;
const height = 550 - margin.top - margin.bottom;

const svg = d3.select('.chart').append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


const xScale = d3.scaleLinear()
		.range([0, width])

const yScale = d3.scaleLinear()
		.range([height, 0])

const xAxis = d3.axisBottom()
	.scale(xScale);

const yAxis = d3.axisLeft()
	.scale(yScale);


svg.append('g')
	.attr('class', 'axis x-axis')
	.attr('transform', `translate(0, ${height})`)
	.call(xAxis);
	
svg.append('g')
	.attr('class', 'axis y-axis')
	.call(yAxis);

function update(data) {
	xScale.domain(d3.extent(data, d => d.miles)).nice();

	yScale.domain(d3.extent(data, d => d.gas)).nice();

	svg.selectAll(".circles")
	.data(data)
	.enter()
	.append("circle")
	.attr("cx", function(d) {
		return xScale(d.miles);
	})
	.attr('cy', function(d) {
		return yScale(d.gas);
	})
	.attr('r', 5)
	.attr('fill', 'black')
	.attr('stroke', '#000080')
	.attr('class', 'circles');


	svg.selectAll('.x-axis')
		.call(xAxis);

	svg.selectAll('.y-axis')
		.call(yAxis);
}

d3.csv('./data/driving.csv', d3.autoType).then(data => {
	update(data);
	console.log(data);
});