

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
		$.ajax({url: page.base()+'/api/blogposts/'+this.props.blogpostID+'/comments', dataType: 'json', cache: false})
  		.done(function (data) {
  			this.setState({data: data});
  		}.bind(this))

  		.fail(function (xhr, status, err) {
  			console.log('/api/blogposts/'+this.props.blogpostID+'/comments', status, err.toString());
  		}.bind(this));
	},

	postNewComment: function (comment) {
		console.log(comment);

		$.ajax({
			url: page.base()+'/api/blogposts/'+this.props.blogpostID+'/comments', 
			method: "POST", 
			contentType: "application/json; charset=utf-8", 
			data: JSON.stringify(comment)})

		.done(function (data, status) {
			this.loadCommentsFromServer();
			console.log('postNewComment status: '+status);
		}.bind(this))

		.fail(function (xhr, status, err) {
			console.log('/api/blogposts/'+this.props.blogpostID+'/comments', status, err.toString());
		}.bind(this));

	},


  render: function() {
    return (
      <div className="commentBox">
        <h3>Kommentit</h3>
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
					<Comment key={comment.id} author={comment.author} text={comment.text} timestamp={comment.created_at} />
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

	getInitialState: function() {
		return {
			showForm: false 
		};
	},

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

	openNewCommentForm: function () {
		this.setState({showForm: true});
	},


	render: function() {

		var displayForm = {display: "none"};
		if(this.state.showForm){
			displayForm = {display: "block"};
		}

		return (
			<div>
				<a href="" onClick={this.openNewCommentForm}>Kirjoita uusi kommentti</a>
				<form className="commentForm" onSubmit={this.handleSubmit} style={displayForm}>
					<input className="form-control" type="text" placeholder="Nimi" required ref="author"/>
					<textarea className="form-control" placeholder="Kommentti" required ref="comment" ></textarea>
					<input className="btn btn-default" type="submit" value="Lähetä" />
				</form>
			</div>
		);
	}

});


var Comment = React.createClass({

	render: function() {
		
		// var rawMarkup = '';
		// if(this.props.children){
		// 	rawMarkup = marked(this.props.children.toString(), {sanitize: true});
		// }

		var date = new Date(this.props.timestamp).toLocaleString();

		return (
			<div className="comment">
				<span className="commentAuthor">
					{this.props.author}
				</span>
				<span className="pull-right commentTimestamp">
					{date}
				</span>
				<div className="commentDivider"></div>
				<span className="commentText">{this.props.text}</span>
			</div>
		);
	}

});

module.exports = CommentBox;