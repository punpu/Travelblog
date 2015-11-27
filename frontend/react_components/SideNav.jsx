

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
          {title.id}
        </li>
			);
		});

		return (
			<div className="well" style={navBarStyle}>
				<ul className="nav nav-pills nav-stacked">
				  {titles}
				</ul>
			</div>
		);
	}

});

var navBarStyle = {
	position: "fixed",
	top: "30%",
	right: "1%",
	width: "200px"
};


module.exports = SideNav;