



// Admin page for creating and editing blogposts and uploading images
var BlogpostCreationPage = React.createClass({

	componentDidMount: function() {
		if(this.props.blogpostid){
			this.fetchExistingBlogpost();
		}
	},

	getInitialState: function() {
		return {
			preview: "",
			blogpost: {author: "", text: ""}
		};
	},

	fetchExistingBlogpost: function () {
		$.ajax({url: '/api/blogposts/'+this.props.blogpostid, dataType: 'json', cache: false})
		.done(function (data) {
			this.setState({blogpost: data});
			this.setState({preview: marked(this.state.blogpost.text) });
		}.bind(this))

		.fail(function (xhr, status, err) {
			console.error('/api/blogposts', status, err.toString());
		}.bind(this));
	},

	postNewBlogpost: function () {
		var author = React.findDOMNode(this.refs.author).value.trim();
    var blogpostText = React.findDOMNode(this.refs.blogpostText).value.trim();

    if(!author || !blogpostText){
    	return;
    }

    var blogpost = {author: author, text: blogpostText};

    $.ajax({
			url: '/api/blogposts/', 
			method: "POST", 
			contentType: "application/json; charset=utf-8", 
			data: JSON.stringify(blogpost)})

		.done(function (data, status) {
			
			console.log('postNewBlogpost status: '+status);
		}.bind(this))

		.fail(function (xhr, status, err) {
			console.error('postNewBlogpost: ', status, err.toString());
		}.bind(this));

	},

	editBlogpost: function () {
		var author = React.findDOMNode(this.refs.author).value.trim();
    var blogpostText = React.findDOMNode(this.refs.blogpostText).value.trim();

    if(!author || !blogpostText){
    	return;
    }

    var blogpost = {author: author, text: blogpostText};

    $.ajax({
			url: '/api/blogposts/'+this.props.blogpostid, 
			method: 'PUT', 
			contentType: 'application/json; charset=utf-8', 
			data: JSON.stringify(blogpost)})

		.done(function (data, status) {
			console.log('Blogpost edited');
		}.bind(this))

		.fail(function (xhr, status, err) {
			console.error('postNewBlogpost: ', status, err.toString());
		}.bind(this));

	},

	deleteBlogpost: function () {

    $.ajax({
			url: '/api/blogposts/'+this.props.blogpostid, 
			method: 'DELETE'})

		.done(function (data, status) {
			console.log('Blogpost deleted');
			page('/');

		}.bind(this))

		.fail(function (xhr, status, err) {
			console.error('postNewBlogpost: ', status, err.toString());
		}.bind(this));

	},

	// Either edit or post a new blogpost depending on whether the id exists
	saveBlogpost: function () {
		if(this.props.blogpostid){
			this.editBlogpost();
		}
		else{
			this.postNewBlogpost();
		}
		page('/');
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
			<div>
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
				
				Filez
				<form action="/api/images" method="POST" encType="multipart/form-data">
  				<input type="file" name="image" />
  				<input className="btn btn-primary" type="submit">Tallenna</input>
  			</form>

			</div>
		);
	}

});

var style = {input: {"marginBottom": "15px"}};


module.exports = BlogpostCreationPage;