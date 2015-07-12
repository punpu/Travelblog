



// Admin page for creating and editing blogposts and uploading images
var BlogpostCreationPage = React.createClass({

	componentDidMount: function() {
		
	},

	getInitialState: function() {
		return {
			preview: "" 
		};
	},

	postNewBlogpost: function () {
		var author = React.findDOMNode(this.refs.author).value.trim();
    var blogpostText = React.findDOMNode(this.refs.blogpostText).value.trim();

    if(!author || !blogpostText){
    	return;
    }

    var blogpost = {author: author, text: blogpostText};

    $.ajax({
			url: '/api/blogpost/', 
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

	updatePreview: function () {
		var blogpostText = React.findDOMNode(this.refs.blogpostText).value;
		
		this.setState( {preview: marked(blogpostText)} ); 
	},

	render: function() {
		
		return (
			<div>
				<h2>Post:</h2>
				<input className="form-control" placeholder="Kirjoittaja" type="text" ref="author" style={style.input}></input>
				<textarea className="form-control" rows="20" placeholder="Teksti" ref="blogpostText" onKeyUp={this.updatePreview}></textarea>
				<button onClick={this.postNewBlogpost}>Save</button>
				<h2>Preview:</h2>
				<div dangerouslySetInnerHTML={{__html: this.state.preview}} />
			</div>
		);
	}

});

var style = {input: {"margin-bottom": "15px"}};


module.exports = BlogpostCreationPage;