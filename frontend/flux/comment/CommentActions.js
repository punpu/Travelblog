/*
 * CommentActions
 */

var AppDispatcher = require('../AppDispatcher');
var CommentConstants = require('./CommentConstants');

var CommentActions = {


  // Loads comments for one blogpost from server
  // Dispatches loading, finished and error actions
  loadComments: function (blogpostid, offset) {

    // Use a timeout of 0 to push this dispatch to the end of execution queue
    // so the previous dispatch can be finished before running a new one
    setTimeout( function () {
      AppDispatcher.dispatch({
        actionType: CommentConstants.COMMENT_LOAD_LOADING,
        blogpostid: blogpostid
      });  
    }, 0 );
    

    $.ajax({
      url: page.base()+'/api/blogposts/'+blogpostid+'/comments'+'?offset='+offset, 
      dataType: 'json', 
      cache: false})
    .done(function (data) {

      AppDispatcher.dispatch({
        actionType: CommentConstants.COMMENT_LOAD_FINISHED,
        blogpostid: blogpostid,
        comments: data
      });
    })

    .fail(function (xhr, status, err) {
      AppDispatcher.dispatch({
        actionType: CommentConstants.COMMENT_LOAD_ERROR,
        blogpostid: blogpostid
      });
    });
  },

  // Sends a new comment to server
  // Dispatches loading, finished and error actions
  createComment: function (blogpostid, comment) {
    
  	AppDispatcher.dispatch({
      actionType: CommentConstants.COMMENT_CREATE_LOADING,
      blogpostid: blogpostid
    });

    $.ajax({url: page.base()+'/api/blogposts/'+blogpostid+'/comments', 
    	method: "POST", 
			contentType: "application/json; charset=utf-8", 
			data: JSON.stringify(comment)})

    .done(function (data) {

      AppDispatcher.dispatch({
        actionType: CommentConstants.COMMENT_CREATE_FINISHED,
        blogpostid: blogpostid,
        comment: data
      });
    })

    .fail(function (xhr, status, err) {
      AppDispatcher.dispatch({
        actionType: CommentConstants.COMMENT_CREATE_ERROR,
        blogpostid: blogpostid
      });
    });

  },


  deleteComment: function(commentid) {

    AppDispatcher.dispatch({
      actionType: CommentConstants.COMMENT_DELETE_LOADING,
      commentid: commentid
    });
  
    $.ajax({
      url: page.base()+'/api/comments/'+commentid, 
      method: 'DELETE'})

    .done(function (data) {

      AppDispatcher.dispatch({
        actionType: CommentConstants.COMMENT_DELETE_FINISHED,
        commentid: commentid
      });
    })

    .fail(function (xhr, status, err) {
      AppDispatcher.dispatch({
        actionType: CommentConstants.COMMENT_DELETE_ERROR,
        commentid: commentid
      });
    });


    
  },

};

module.exports = CommentActions;
