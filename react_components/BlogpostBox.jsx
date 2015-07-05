
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
		$.ajax({url: '/api/blogpost', dataType: 'json', cache: false})
  		.done(function (data) {
  			this.setState({blogposts: data});
  		}.bind(this))

  		.fail(function (xhr, status, err) {
  			console.error('/api/blogpost', status, err.toString());
  		}.bind(this));
	},

  render: function() {
    return (
      <div className="blogpostBox">
        <h1>Blog</h1>
        <BlogpostList blogposts={this.state.blogposts} />
      </div>
    );
  }
});


var BlogpostList = React.createClass({

	render: function() {
		console.log(this.props.blogposts);
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

	render: function() {
		
		var rawMarkup = '';
		if(this.props.children){
			rawMarkup = marked(this.props.children.toString(), {sanitize: true});
		}

		return (
			<div className="blogpost">
				<span dangerouslySetInnerHTML={{__html: rawMarkup}} />
				<span className="blogpostAuthor">
					{this.props.author}
				</span>
				<CommentBox blogpostID={this.props.blogpostID} />
			</div>
		);
	}

});

module.exports = BlogpostBox;