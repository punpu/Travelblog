/*
 * BlogpostActions
 */

var AppDispatcher = require('../AppDispatcher');
var BlogpostConstants = require('./BlogpostConstants');

var BlogpostActions = {


  // Loads Blogposts from server
  // Dispatches loading, finished and error actions
  loadBlogposts: function () {

    AppDispatcher.dispatch({
      actionType: BlogpostConstants.BLOGPOST_LOAD_LOADING,
    });

    $.ajax({url: page.base()+'/api/blogposts/', dataType: 'json', cache: false})
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

  /*// Sends a new comment to server
  // Dispatches loading, finished and error actions
  createComment: function (blogpostid, comment) {
    
  	AppDispatcher.dispatch({
      actionType: BlogpostConstants.BLOGPOST_CREATE_LOADING,
      blogpostid: blogpostid
    });

    $.ajax({url: page.base()+'/api/blogposts/'+blogpostid+'/comments', 
    	method: "POST", 
			contentType: "application/json; charset=utf-8", 
			data: JSON.stringify(comment)})

    .done(function (data) {

      AppDispatcher.dispatch({
        actionType: BlogpostConstants.BLOGPOST_CREATE_FINISHED,
        blogpostid: blogpostid,
        comment: data
      });
    })

    .fail(function (xhr, status, err) {
      AppDispatcher.dispatch({
        actionType: BlogpostConstants.BLOGPOST_CREATE_ERROR,
        blogpostid: blogpostid
      });
    });

  },


  deleteComment: function(commentid) {

    AppDispatcher.dispatch({
      actionType: BlogpostConstants.BLOGPOST_DELETE_LOADING,
      commentid: commentid
    });
  
    $.ajax({
      url: page.base()+'/api/comments/'+commentid, 
      method: 'DELETE'})

    .done(function (data) {

      AppDispatcher.dispatch({
        actionType: BlogpostConstants.BLOGPOST_DELETE_FINISHED,
        commentid: commentid
      });
    })

    .fail(function (xhr, status, err) {
      AppDispatcher.dispatch({
        actionType: BlogpostConstants.BLOGPOST_DELETE_ERROR,
        commentid: commentid
      });
    });


    
  },*/

};

module.exports = BlogpostActions;
