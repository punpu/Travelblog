// Blog page, shows the blog


var BlogpostList = require('./BlogpostList.jsx');

var BlogPage = React.createClass({

	componentDidMount: function() {
		
	},

	getInitialState: function() {
		return {
		 
		};
	},

	render: function() {
		return (
			<BlogpostList />
		);
	}


});


module.exports = BlogPage;