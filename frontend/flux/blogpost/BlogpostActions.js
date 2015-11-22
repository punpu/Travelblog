/*
 * BlogpostActions
 */

var AppDispatcher = require('../AppDispatcher');
var BlogpostConstants = require('./BlogpostConstants');

var BlogpostActions = {


  // Loads Blogposts from server
  // Dispatches loading, finished and error actions
  loadBlogposts: function (offset) {

    AppDispatcher.dispatch({
      actionType: BlogpostConstants.BLOGPOST_LOAD_LOADING,
    });


    $.ajax({
    	url: page.base()+'/api/blogposts/'+'?offset='+offset, 
    	dataType: 'json', 
    	cache: false})
    .done(function (data) {

      AppDispatcher.dispatch({
        actionType: BlogpostConstants.BLOGPOST_LOAD_FINISHED,
        blogposts: data
      });
    })

    .fail(function (xhr, status, err) {
      AppDispatcher.dispatch({
        actionType: BlogpostConstants.BLOGPOST_LOAD_ERROR,
      });
    });
  },

  // Sends a new blogpost to server
  // Dispatches loading, finished and error actions
  createBlogpost: function (blogpost, callback) {
    
  	AppDispatcher.dispatch({
      actionType: BlogpostConstants.BLOGPOST_CREATE_LOADING,
    });

    $.ajax({
			url: page.base()+'/api/blogposts/', 
			method: "POST", 
			contentType: "application/json; charset=utf-8", 
			data: JSON.stringify(blogpost)})

		.done(function (data, status) {
			AppDispatcher.dispatch({
	      actionType: BlogpostConstants.BLOGPOST_CREATE_FINISHED,
	      blogpost: data
	    });

	    if(callback){callback();}
		})

		.fail(function (xhr, status, err) {
			AppDispatcher.dispatch({
	      actionType: BlogpostConstants.BLOGPOST_CREATE_ERROR,
	    });
		});

  },


  editBlogpost: function (blogpost, callback) {
    
  	AppDispatcher.dispatch({
      actionType: BlogpostConstants.BLOGPOST_EDIT_LOADING,
    });

    $.ajax({
			url: page.base()+'/api/blogposts/'+blogpost.id, 
			method: 'PUT',
			contentType: 'application/json; charset=utf-8', 
			data: JSON.stringify(blogpost)})

		.done(function (data, status) {
			AppDispatcher.dispatch({
	      actionType: BlogpostConstants.BLOGPOST_EDIT_FINISHED,
	      blogpost: data
	    });

	    if(callback){callback();}
		})

		.fail(function (xhr, status, err) {
			AppDispatcher.dispatch({
	      actionType: BlogpostConstants.BLOGPOST_EDIT_ERROR,
	    });
		});

  },


  // parameter callback is used to redirect
  // the page when the blogpost is successfully deleted
  deleteBlogpost: function(blogpostid, callback) {

    AppDispatcher.dispatch({
      actionType: BlogpostConstants.BLOGPOST_DELETE_LOADING,
      blogpostid: blogpostid
    });
  
    $.ajax({
      url: page.base()+'/api/blogposts/'+blogpostid, 
      method: 'DELETE'})

    .done(function (data) {

      AppDispatcher.dispatch({
        actionType: BlogpostConstants.BLOGPOST_DELETE_FINISHED,
        blogpostid: blogpostid
      });

      if(callback){callback();}
    })

    .fail(function (xhr, status, err) {
      AppDispatcher.dispatch({
        actionType: BlogpostConstants.BLOGPOST_DELETE_ERROR,
        blogpostid: blogpostid
      });
    }); 
  },

};

module.exports = BlogpostActions;
