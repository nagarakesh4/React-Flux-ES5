module.exports = function() {
	var config = {
		port: 9005,
		devBaseURL: 'http://localhost',
		paths:{
			html: './src/*.html', //for any HTML file changes
			js: './src/**/*.js', //for any JS file changes
			mainJS: './src/main.js', //to browserify
			dist: './dist', //to copy files in dist folder
			css: [
				'node_modules/bootstrap/dist/css/bootstrap.min.css',
				'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
			]
		}
	};
	return config;
};