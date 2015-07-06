



// Admin page for creating and editing blogposts and uploading images
var BlogpostCreationPage = React.createClass({

	componentDidMount: function() {
		
	},

	getInitialState: function() {
		return {
		 
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

	render: function() {
		return (
			<div>
				<h2>Post:</h2>
				<input type="text" ref="author">mooi</input>
				<textarea ref="blogpostText"></textarea>
				<button onClick={this.postNewBlogpost}>Save</button>
				<h2>Preview:</h2>
			</div>
		);
	}


});


module.exports = BlogpostCreationPage;