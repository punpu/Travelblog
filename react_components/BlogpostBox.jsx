
var CommentBox = require('./CommentBox.jsx');


var BlogpostBox = React.createClass({

  getInitialState: function() {
  	return {
  		blogposts: [] 
  	};
  },

  componentDidMount: function() {
  	this.loadBlogpostsFromServer();
  },

  loadBlogpostsFromServer: function () {
		$.ajax({url: page.base()+'/api/blogposts', dataType: 'json', cache: false})
		.done(function (data) {
			this.setState({blogposts: data});
		}.bind(this))

		.fail(function (xhr, status, err) {
			console.log('/api/blogposts', status, err.toString());
		}.bind(this));
	},

  render: function() {
    return (
      <div className="blogpostBox">
      	Blogit
        <BlogpostList blogposts={this.state.blogposts} />
      </div>
    );
  }
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


	goToAdminPage: function () {
		page('/editblogpost/'+this.props.blogpostID);
	},

	render: function() {
		
		var rawMarkup = '';
		if(this.props.children){
			rawMarkup = marked(this.props.children.toString());
		}

		return (
			<div className="blogpost">
				<div className="blogpostHeader">
					<span className="blogpostAuthor">
						Kirjoittanut: {this.props.author}
					</span>
      		<a className="pull-right" href="" onClick={this.goToAdminPage}>Admin</a>
				</div>
				<div className="headerDivider" />
				<span dangerouslySetInnerHTML={{__html: rawMarkup}} />
				<CommentBox blogpostID={this.props.blogpostID} />
			</div>
		);
	}

});

module.exports = BlogpostBox;