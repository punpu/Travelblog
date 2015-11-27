// Blog page, shows the blog


var BlogpostList = require('./BlogpostList.jsx');
var SideNav = require('./SideNav.jsx');

var BlogPage = React.createClass({

	componentDidMount: function() {
		
	},

	getInitialState: function() {
		return {
		 
		};
	},

	render: function() {
		return (
			<div>
				<BlogpostList />
				<SideNav/>
			</div>
		);
	}


});


module.exports = BlogPage;