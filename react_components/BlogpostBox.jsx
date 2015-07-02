
var CommentBox = require('./CommentBox.jsx');


var BlogpostBox = React.createClass({

	loadBlogpostsFromServer: function () {
		$.ajax({url: this.props.url, dataType: 'json', cache: false})
  		.done(function (data) {
  			this.setState({blogposts: data});
  		}.bind(this))

  		.fail(function (xhr, status, err) {
  			console.error(this.props.url, status, err.toString());
  		}.bind(this));
	},

	/*
	postNewBlogpost: function (blogpost) {

		$.ajax({
			url: this.props.url, 
			method: "POST", 
			contentType: "application/json; charset=utf-8", 
			data: JSON.stringify(blogpost)})

		.done(function (data, status) {
			this.loadBlogpostsFromServer();
			console.log('postNewBlogpost status: '+status);
		}.bind(this))

		.fail(function (xhr, status, err) {
			console.error(this.props.url, status, err.toString());
		}.bind(this));

	},
	*/

  getInitialState: function() {
  	return {
  		blogposts: [] 
  	};
  },

  componentDidMount: function() {
  	this.loadBlogpostsFromServer();
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
					<Blogpost key={blogpost.id} author={blogpost.author} timestamp={blogpost.created_at}>
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
				<CommentBox url="" />
			</div>
		);
	}

});

module.exports = BlogpostBox;