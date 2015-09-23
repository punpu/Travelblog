/*
 * CommentActions
 */

var AppDispatcher = require('../AppDispatcher');
var CommentConstants = require('./CommentConstants');

var CommentActions = {

  delete: function(id) {
  
    $.ajax({
      url: page.base()+'/api/comments/'+id, 
      method: 'DELETE'})

    .done(function (data) {

      AppDispatcher.dispatch({
        actionType: CommentConstants.COMMENT_DELETE,
        id: id
      });
    }.bind(this))

    .fail(function (xhr, status, err) {
      // Dispatch error message?
    }.bind(this));


    
  },

};

module.exports = CommentActions;
