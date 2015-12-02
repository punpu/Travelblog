

var BlogpostActions = require('../flux/blogpost/BlogpostActions');
var BlogpostStore = require('../flux/blogpost/BlogpostStore');

var SideNav = React.createClass({

	getInitialState: function() {
  	return BlogpostStore.getBlogpostTitles();
  },

  componentDidMount: function() {
  	BlogpostStore.addChangeListener(this._onBlogpostStoreChange);
  	BlogpostActions.loadBlogpostsTitles();
  },

  componentWillUnmount: function() {
  	BlogpostStore.removeChangeListener(this._onBlogpostStoreChange);
  },


	// Event handler for 'change' events coming from the BlogpostStore
  _onBlogpostStoreChange: function() {
    this.setState(BlogpostStore.getBlogpostTitles());
  },


	render: function() {

		var titles = this.state.titles.map( function (title, index) {
			return (
				<li key={index} >
          <a href={'#post'+title.id}>{title.title}</a>
          
        </li>
			);
		});

		return (
			<nav className="navbar well sideNav" style={navBarStyle}>
				<ul className="nav nav-pills nav-stacked">
				  {titles}
				</ul>
			</nav>
		);
	}

});

var navBarStyle = {
	position: "fixed",
	top: "10%",
	right: "1%",
	width: "15%",
	border: "1px solid",
	padding: "1%",
	backgroundColor: "#eeeeee",
	borderRadius: "10px",
	boxShadow: "0px 0px 2px 2px grey"
};


module.exports = SideNav;