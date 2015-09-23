/*
 * CommentActions
 */

var AppDispatcher = require('../AppDispatcher');
var CommentConstants = require('./CommentConstants');

var CommentActions = {


  // Loads comments from server
  // Dispatches loading, finished and error actions
  loadComments: function (blogpostid) {

    AppDispatcher.dispatch({
      actionType: CommentConstants.COMMENT_LOAD_LOADING,
      blogpostid: blogpostid
    });

    $.ajax({url: page.base()+'/api/blogposts/'+blogpostid+'/comments', dataType: 'json', cache: false})
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


  delete: function(commentid) {

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
