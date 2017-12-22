var path = require('path');

var component = require('./package.json');

var config = {
	entry: [
		'./index'
	],
	output: {
		path: path.join(__dirname, 'release'),
		filename: component.name,
		publicPath: '/release/'
	},
	resolve: {
		extensions: ['.js'],
		modules: ['src', 'node_modules'],
		alias: {
			'dev/raphael.core.js': './dev/raphael.core.js',
			'raphael.core': './raphael.core.js',
			'raphael.svg': './dev/raphael.svg.js',
			'raphael.vml': './dev/raphael.vml.js'
		}
	}
};

module.exports = config;
