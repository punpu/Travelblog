
var CommentList = require('./CommentList.jsx');

var LoginStore = require('../flux/login/LoginStore');
var BlogpostActions = require('../flux/blogpost/BlogpostActions');
var BlogpostStore = require('../flux/blogpost/BlogpostStore');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var BlogpostList = React.createClass({

	_BodyElement: document.body,
	_HTMLElement: document.documentElement,

	getInitialState: function() {
  	return BlogpostStore.getBlogposts();
  },

  componentDidMount: function() {
  	BlogpostStore.addChangeListener(this._onBlogpostStoreChange);

  	if(this.state.blogposts.length === 0){
	  	BlogpostActions.loadBlogposts(this.state.blogposts.length);
  	}

  	window.addEventListener('scroll', this.handleScroll);
  },

  componentWillUnmount: function() {
  	BlogpostStore.removeChangeListener(this._onBlogpostStoreChange);

  	window.removeEventListener('scroll', this.handleScroll);
  },

  handleScroll: function (event) {
  	// Load more blogposts when at bottom
  	if ($(window).scrollTop() == $(document).height() - $(window).height()) {
       this.loadMoreBlogposts();
    }

    // This is how to do it without jQuery, but this would need debouncing
    // so the if condition is not fired too many times resulting in many blogposts being fetched

		// var totalHeight, currentScroll, visibleHeight;

		// if (document.documentElement.scrollTop){ 
		// 	currentScroll = document.documentElement.scrollTop;
		// }
		// else{ 
		// 	currentScroll = document.body.scrollTop; 
		// }

		// totalHeight = document.body.offsetHeight;
		// visibleHeight = document.documentElement.clientHeight;

		// if (totalHeight <= currentScroll + visibleHeight ){
	 //    this.loadMoreBlogposts();
	 //  }
  },

  loadMoreBlogposts: function () {
  	BlogpostActions.loadBlogposts(this.state.blogposts.length);
  },

	// Event handler for 'change' events coming from the BlogpostStore
  _onBlogpostStoreChange: function() {
    this.setState(BlogpostStore.getBlogposts());
  },


	render: function() {
		var blogpostNodes = this.state.blogposts.map( function (blogpost, index) {
			return (
				<Blogpost key={index} blogpostID={blogpost.id} author={blogpost.author} timestamp={blogpost.created_at}>
          {blogpost.text}
        </Blogpost>
			);
		});

		var loadMore;
		if(this.state.noMoreBlogposts){
			loadMore = (
				<div style={loadMoreButtonCSS}>Ei enempää blogikirjoituksia</div>
			);
		}
		else{
			loadMore = (
				<button className="btn btn-default" style={loadMoreButtonCSS} onClick={this.loadMoreBlogposts}>
					Lataa lisää blogikirjoituksia
				</button>
			);
		}

		return (
			<div className="blogpostList">
				<ReactCSSTransitionGroup transitionName="blogpost" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{blogpostNodes}
				</ReactCSSTransitionGroup>
				{loadMore}
			</div>
		);
	}

});


var Blogpost = React.createClass({

	getInitialState: function() {
		return {
  		loggedUser: LoginStore.getLoggedUser() 
		};
	},

	componentDidMount: function() {
  	LoginStore.addChangeListener(this._onLoginChange);
	},

  componentWillUnmount: function() {
    LoginStore.removeChangeListener(this._onLoginChange);
  },

	goToAdminPage: function () {
		page('/editblogpost/'+this.props.blogpostID);
	},

	render: function() {
		
		var rawMarkup = '';
		if(this.props.children){
			rawMarkup = marked(this.props.children.toString());
		}


		var editBlogpostAnchor;
		if(this.state.loggedUser){
			editBlogpostAnchor = <a className="pull-right" href="" onClick={this.goToAdminPage}>Edit blogpost</a>
		}
		else{
			editBlogpostAnchor = '';
		}

		var date = new Date(this.props.timestamp);

		var timestamp = ('0' + date.getDate()).slice(-2) + '.' + 
									 ('0' + (date.getMonth()+1)).slice(-2) + '.' + 
									 date.getFullYear() + ', ' +
									 ('0' + date.getHours()).slice(-2) + ':' + 
									 ('0' + date.getMinutes()).slice(-2) + ':' + 
									 ('0' + date.getSeconds()).slice(-2);

		return (
			<div className="blogpost" id={'post'+this.props.blogpostID}>
				<div className="blogpostHeader">
					<span className="blogpostAuthor">
						Kirjoittanut: {this.props.author}
					</span>
      		{editBlogpostAnchor}
      		<div className="blogpostTimestamp">
      			{timestamp}
      		</div>
				</div>
				<div className="headerDivider" />
				<span dangerouslySetInnerHTML={{__html: rawMarkup}} />
				<CommentList blogpostID={this.props.blogpostID} />
			</div>
		);
	},

  // Event handler for 'change' events coming from the LoginStore
  _onLoginChange: function() {
    this.setState({loggedUser: LoginStore.getLoggedUser()});
  }

});

var loadMoreButtonCSS = {
	display: "block",
	width: "20em", 
	marginBottom: "50px",
	marginLeft: "auto",
	marginRight: "auto"};

module.exports = BlogpostList;