
var CommentActions = require('../flux/comment/CommentActions');
var CommentStore = require('../flux/comment/CommentStore');


var CommentList = React.createClass({

	getInitialState: function() {
  	return {
  		comments: []
  	};
  },

  componentDidMount: function() {
  	CommentStore.addChangeListener(this._onCommentStoreChange);
  	CommentActions.loadComments(this.props.blogpostID, this.state.comments.length);
  },

  componentWillUnmount: function() {
  	CommentStore.removeChangeListener(this._onCommentStoreChange);
  },

  // Event handler for 'change' events coming from the LoginStore
  _onCommentStoreChange: function() {
  	if( CommentStore.getCommentsByBlogpost(this.props.blogpostID)){
    	this.setState(CommentStore.getCommentsByBlogpost(this.props.blogpostID));
  	}
  },

  // shouldComponentUpdate: function(nextProps, nextState) {
  // 	if(nextState.comments.length !== this.state.comments.length){
  // 		return true;
  // 	}
  // 	else{
  // 		console.log('no update');
  // 		return false;
  // 	}
  // },


	postNewComment: function (comment) {
		CommentActions.createComment(this.props.blogpostID, comment);
	},

	loadMoreComments: function () {
		CommentActions.loadComments(this.props.blogpostID, this.state.comments.length);
	},


	render: function() {
		var commentNodes = this.state.comments.map( function (comment) {
			return (
					<Comment key={comment.id} author={comment.author} text={comment.text} timestamp={comment.created_at} />
				);
		});

		var loadingIcon = '';
  	if(this.state.loading){
  		loadingIcon = <i className="glyphicon glyphicon-refresh spin"/>
  	}

		return (
			<div className="commentBox">
        <h3>Kommentit</h3>
        {loadingIcon}
				{commentNodes}
				<a href='' onClick={this.loadMoreComments}>Näytä lisää kommentteja</a>
        <CommentForm postNewComment={this.postNewComment}/>
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
					<input className="form-control" type="text" placeholder="Nimi" required ref="author" maxLength="50" />
					<textarea className="form-control" placeholder="Kommentti" required ref="comment" maxLength="1000" ></textarea>
					<input className="btn btn-default" type="submit" value="Lähetä" />
				</form>
			</div>
		);
	}

});


var Comment = React.createClass({

	render: function() {
		

		var date = new Date(this.props.timestamp);
		
		var timestamp = ('0' + date.getDate()).slice(-2) + '.' + 
									 ('0' + (date.getMonth()+1)).slice(-2) + '.' + 
									 date.getFullYear() + ', ' +
									 ('0' + date.getHours()).slice(-2) + ':' + 
									 ('0' + date.getMinutes()).slice(-2) + ':' + 
									 ('0' + date.getSeconds()).slice(-2);

		return (
			<div className="comment">
				<span className="commentAuthor">
					{this.props.author}
				</span>
				<span className="pull-right commentTimestamp">
					{timestamp}
				</span>
				<div className="commentDivider"></div>
				<span className="commentText">{this.props.text}</span>
			</div>
		);
	}

});

module.exports = CommentList;