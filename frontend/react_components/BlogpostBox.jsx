
var CommentBox = require('./CommentBox.jsx');

var LoginStore = require('../flux/login/LoginStore');
var BlogpostActions = require('../flux/blogpost/BlogpostActions');
var BlogpostStore = require('../flux/blogpost/BlogpostStore');

var BlogpostBox = React.createClass({

  getInitialState: function() {
  	return {
  		blogposts: [],
  	};
  },

  componentDidMount: function() {
  	BlogpostStore.addChangeListener(this._onBlogpostStoreChange);
  	BlogpostActions.loadBlogposts();
  },

  componentWillUnmount: function() {
  	BlogpostStore.removeChangeListener(this._onBlogpostStoreChange);
  },

	// Event handler for 'change' events coming from the BlogpostStore
  _onBlogpostStoreChange: function() {
    this.setState(BlogpostStore.getBlogposts());
  },

  render: function() {
    return (
      <div className="blogpostBox">
        <BlogpostList blogposts={this.state.blogposts} />
      </div>
    );
  },

});


var BlogpostList = React.createClass({

	render: function() {
		var blogpostNodes = this.props.blogposts.map( function (blogpost) {
			return (
					<Blogpost key={blogpost.id} blogpostID={blogpost.id} author={blogpost.author} timestamp={blogpost.created_at}>
	          {blogpost.text}
	        </Blogpost>
				);
		});

		return (
			<div className="blogpostList">
				{blogpostNodes}
			</div>
		);
	}

});


var Blogpost = React.createClass({

	getInitialState: function() {
		return {
  		loggedUser: LoginStore.getLoggedUser() 
		};
	},

	componentDidMount: function() {
  	LoginStore.addChangeListener(this._onLoginChange);
	},

  componentWillUnmount: function() {
    LoginStore.removeChangeListener(this._onLoginChange);
  },

	goToAdminPage: function () {
		page('/editblogpost/'+this.props.blogpostID);
	},

	render: function() {
		
		var rawMarkup = '';
		if(this.props.children){
			rawMarkup = marked(this.props.children.toString());
		}

		var editBlogpostAnchor;
		if(this.state.loggedUser){
			editBlogpostAnchor = <a className="pull-right" href="" onClick={this.goToAdminPage}>Edit blogpost</a>
		}
		else{
			editBlogpostAnchor = '';
		}

		var date = new Date(this.props.timestamp);

		var timestamp = ('0' + date.getDate()).slice(-2) + '.' + 
									 ('0' + (date.getMonth()+1)).slice(-2) + '.' + 
									 date.getFullYear() + ', ' +
									 ('0' + date.getHours()).slice(-2) + ':' + 
									 ('0' + date.getMinutes()).slice(-2) + ':' + 
									 ('0' + date.getSeconds()).slice(-2);

		return (
			<div className="blogpost">
				<div className="blogpostHeader">
					<span className="blogpostAuthor">
						Kirjoittanut: {this.props.author}
					</span>
      		{editBlogpostAnchor}
      		<div className="blogpostTimestamp">
      			{timestamp}
      		</div>
				</div>
				<div className="headerDivider" />
				<span dangerouslySetInnerHTML={{__html: rawMarkup}} />
				<CommentBox blogpostID={this.props.blogpostID} />
			</div>
		);
	},

  // Event handler for 'change' events coming from the LoginStore
  _onLoginChange: function() {
    this.setState({loggedUser: LoginStore.getLoggedUser()});
  }

});

module.exports = BlogpostBox;