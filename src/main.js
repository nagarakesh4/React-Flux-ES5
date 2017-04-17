$ = jquery = require('jquery'); //set jquery to both 'jquery' and '$'
//bootstrap expects jquery to be in the global namespace

var React = require('react');
var HomePage = require('./components/homePage');
var AboutPage = require('./components/about/aboutPage');

var App = React.createClass({
	render: function(){
		var Child;
		
		switch(this.props.route){
			case 'about': Child = AboutPage; break;
			default: Child = HomePage;
	    }
		
		return(
			<div>
				<Child />
			</div>
		);
	}
});

function render(){
	var route = window.location.hash.substr(1);
	React.render(<App route={route} />, document.getElementById("app"));
}

window.addEventListener('hashchange', render);
render();