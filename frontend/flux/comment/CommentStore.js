

var AppDispatcher = require('../AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var CommentConstants = require('./CommentConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';


var CommentStore = assign({}, EventEmitter.prototype, {

  // Get the logged users info
  getLoggedUser: function() {
    return _loggedUser;
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
AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case CommentConstants.COMMENT_DELETE:
      CommentStore.emitChange();
      break;
  
    default:
      // no op
  }
});

module.exports = CommentStore;
