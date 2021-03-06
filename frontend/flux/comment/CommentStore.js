

var AppDispatcher = require('../AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var CommentConstants = require('./CommentConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

// This contains all the comments
// Comment arrays are found under the blogposts id that they belong to
var _comments = {};

var CommentStore = assign({}, EventEmitter.prototype, {

  // Returns all comments in blogpost
  getCommentsByBlogpost: function(blogpostid) {
    return _comments[blogpostid];
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
CommentStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.actionType) {

    case CommentConstants.COMMENT_LOAD_LOADING:
      if( _comments[action.blogpostid] ){
        _comments[action.blogpostid].loading = true;
      }
      else{
        // Initialize the object for this blogposts comments
        _comments[action.blogpostid] = {comments: [], loading: true, error: false};
      }

      CommentStore.emitChange();
      break;

    case CommentConstants.COMMENT_LOAD_FINISHED:
      _comments[action.blogpostid].loading = false;
      
      // Push all new comments from action.comments to stores comments array
      if(action.comments.length > 0){
        _comments[action.blogpostid].comments.push.apply(_comments[action.blogpostid].comments, action.comments);  
      }
      else{
        _comments[action.blogpostid].noMoreComments = true;
      }
      
      CommentStore.emitChange();
      break;

    case CommentConstants.COMMENT_LOAD_ERROR:
      _comments[action.blogpostid] = {comments: [], loading: false, error: true};
      CommentStore.emitChange();
      break;

    case CommentConstants.COMMENT_CREATE_LOADING:
      _comments[action.blogpostid].loading = true;
      CommentStore.emitChange();
      break;

    case CommentConstants.COMMENT_CREATE_FINISHED:
      _comments[action.blogpostid].loading = false;
      _comments[action.blogpostid].comments.push(action.comment);
      CommentStore.emitChange();
      break;

    case CommentConstants.COMMENT_CREATE_ERROR:
      _comments[action.blogpostid].loading = false;
      _comments[action.blogpostid].error = true;
      CommentStore.emitChange();
      break;

    case CommentConstants.COMMENT_DELETE:
      CommentStore.emitChange();
      break;
  
    default:
      // no op
  }
});

module.exports = CommentStore;
