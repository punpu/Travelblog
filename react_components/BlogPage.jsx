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
			<BlogpostBox url = "/api/blogpost" />
		);
	}


});


module.exports = BlogPage;