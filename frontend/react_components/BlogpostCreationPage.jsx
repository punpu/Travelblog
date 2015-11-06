

var BlogpostActions = require('../flux/blogpost/BlogpostActions');
var BlogpostStore = require('../flux/blogpost/BlogpostStore');


// Admin page for creating and editing blogposts and uploading images
var BlogpostCreationPage = React.createClass({

	componentDidMount: function() {
		if(this.props.blogpostid){
			var blogpost = BlogpostStore.getBlogpostByID(this.props.blogpostid);
			this.setState({blogpost: blogpost});
			this.setState({preview: marked(blogpost.text) });
		}
	},

	getInitialState: function() {
		return {
			preview: "",
			blogpost: {author: "", text: ""}
		};
	},

	postNewBlogpost: function () {
		var author = React.findDOMNode(this.refs.author).value.trim();
    var blogpostText = React.findDOMNode(this.refs.blogpostText).value.trim();

    if(!author || !blogpostText){
    	return;
    }

    var blogpost = {author: author, text: blogpostText};

    BlogpostActions.createBlogpost(blogpost, function () {
    	// Redirect when successful
    	page('/');
    });
	},

	editBlogpost: function () {
		var author = React.findDOMNode(this.refs.author).value.trim();
    var blogpostText = React.findDOMNode(this.refs.blogpostText).value.trim();

    if(!author || !blogpostText){
    	return;
    }

    var blogpost = {author: author, text: blogpostText, id: this.props.blogpostid};

    BlogpostActions.editBlogpost(blogpost, function () {
    	// Redirect if successful
    	page('/');
    });

	},

	deleteBlogpost: function () {

		BlogpostActions.deleteBlogpost(this.props.blogpostid, function () {
			// If successful, will redirect
			page('/');
		});
	},

	// Either edit or post a new blogpost depending on whether the id exists
	saveBlogpost: function () {
		if(this.props.blogpostid){
			this.editBlogpost();
		}
		else{
			this.postNewBlogpost();
		}
	},

	// Update blogpost and preview states, so input values and preview change
	updateForm: function () {
		var blogpostText = React.findDOMNode(this.refs.blogpostText).value;
		var blogpostAuthor = React.findDOMNode(this.refs.author).value;
		
		this.setState( {blogpost: {author: blogpostAuthor, text: blogpostText}});
		this.setState( {preview: marked(blogpostText)});

	},

	render: function() {
		
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-6 newPostForm">
						<h2>Post:</h2>
						<input className="form-control" placeholder="Kirjoittaja" type="text" ref="author" 
									 style={style.input} onChange={this.updateForm} value={this.state.blogpost.author}>
						</input>
						<textarea className="form-control" rows="20" placeholder="Teksti" ref="blogpostText"
										  onChange={this.updateForm} value={this.state.blogpost.text}></textarea>

						<button className="btn btn-primary" onClick={this.saveBlogpost}>Save</button>
						<button className="btn btn-default pull-right" onClick={this.deleteBlogpost}>Delete post</button>
					</div>
					<div className="col-md-6 postPreview">
						<h2>Preview:</h2>
						<div dangerouslySetInnerHTML={{__html: this.state.preview}} />
					</div>
				</div>
				
				<div className="col-md-6">Filez
					<form action="/api/images" method="POST" encType="multipart/form-data">
	  				<input type="file" name="image" />
	  				<input className="btn btn-primary" type="submit">Tallenna</input>
	  			</form>
				</div>

			</div>
		);
	}

});

var style = {input: {"marginBottom": "15px"}};


module.exports = BlogpostCreationPage;