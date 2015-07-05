

var CommentBox = React.createClass({

	
  getInitialState: function() {
  	return {
  		data: [] 
  	};
  },

  componentDidMount: function() {
  	this.loadCommentsFromServer();
  },


  loadCommentsFromServer: function () {
		$.ajax({url: '/api/blogpost/'+this.props.blogpostID+'/comments', dataType: 'json', cache: false})
  		.done(function (data) {
  			this.setState({data: data});
  		}.bind(this))

  		.fail(function (xhr, status, err) {
  			console.log('/api/blogpost/'+this.props.blogpostID+'/comments', status, err.toString());
  		}.bind(this));
	},

	postNewComment: function (comment) {
		console.log(comment);

		$.ajax({
			url: '/api/blogpost/'+this.props.blogpostID+'/comments', 
			method: "POST", 
			contentType: "application/json; charset=utf-8", 
			data: JSON.stringify(comment)})

		.done(function (data, status) {
			this.loadCommentsFromServer();
			console.log('postNewComment status: '+status);
		}.bind(this))

		.fail(function (xhr, status, err) {
			console.error('/api/blogpost/'+this.props.blogpostID+'/comments', status, err.toString());
		}.bind(this));

	},


  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm postNewComment={this.postNewComment}/>
      </div>
    );
  }
});


var CommentList = React.createClass({

	render: function() {
		console.log('CommentList data:');
		console.log(this.props.data);
		var commentNodes = this.props.data.map( function (comment) {
			return (
					<Comment key={comment.id} author={comment.author} timestamp={comment.created_at}>
	          {comment.text}
	        </Comment>
				);
		});

		return (
			<div className="commentList">
				{commentNodes}
			</div>
		);
	}

});

var CommentForm = React.createClass({

	handleSubmit: function (el) {
		el.preventDefault();
		var author = React.findDOMNode(this.refs.author).value.trim();
    var comment = React.findDOMNode(this.refs.comment).value.trim();
    // Both need to be set
    if (!comment || !author) {
      return;
    }
    // send request to the server
    this.props.postNewComment({author: author, text: comment });
    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.comment).value = '';
    return;
	},


	render: function() {
		return (
			<form className="commentForm" onSubmit={this.handleSubmit}>
				<input type="text" placeholder="Author" ref="author"/>
				<input type="text" placeholder="Comment" ref="comment" />
				<input type="submit" value="Post" />
			</form>
		);
	}

});


var Comment = React.createClass({

	render: function() {
		
		var rawMarkup = '';
		if(this.props.children){
			rawMarkup = marked(this.props.children.toString(), {sanitize: true});
		}

		return (
			<div className="comment">
				<h2 className="commentAuthor">
					{this.props.author}
				</h2>
				<span dangerouslySetInnerHTML={{__html: rawMarkup}} />
			</div>
		);
	}

});

module.exports = CommentBox;