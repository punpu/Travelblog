// Blog page, shows the blog


var BlogpostBox = require('./BlogpostBox.jsx');

var BlogPage = React.createClass({

	componentDidMount: function() {
		
	},

	getInitialState: function() {
		return {
		 
		};
	},

	render: function() {
		return (
			<BlogpostBox />
		);
	}


});


module.exports = BlogPage;