

var AppDispatcher = require('../AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var BlogpostConstants = require('./BlogpostConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

// This contains all the blogposts
var _blogposts = {};

var BlogpostStore = assign({}, EventEmitter.prototype, {

  getBlogposts: function() {
    return _blogposts;
  },

  getBlogpostByID: function (id) {
    for (var i = 0; i < _blogposts.blogposts.length; i++) {
      if( _blogposts.blogposts[i].id == id ){
        return _blogposts.blogposts[i];
      }
    };
  },


  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },


  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },


  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
BlogpostStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.actionType) {

    case BlogpostConstants.BLOGPOST_LOAD_LOADING:
      _blogposts = {blogposts: [], loading: true};
      BlogpostStore.emitChange();
      break;

    case BlogpostConstants.BLOGPOST_LOAD_FINISHED:
      _blogposts = {blogposts: action.blogposts, loading: false};
      BlogpostStore.emitChange();
      break;

    case BlogpostConstants.BLOGPOST_LOAD_ERROR:
      _blogposts = {blogposts: [], loading: false, error: true};
      BlogpostStore.emitChange();
      break;

    case BlogpostConstants.BLOGPOST_CREATE_LOADING:
      _blogposts.loading = true;
      BlogpostStore.emitChange();
      break;

    case BlogpostConstants.BLOGPOST_CREATE_FINISHED:
      _blogposts.loading = false;
      _blogposts.blogposts.unshift(action.blogpost);
      BlogpostStore.emitChange();
      break;

    case BlogpostConstants.BLOGPOST_CREATE_ERROR:
      _blogposts.loading = false;
      _blogposts.error = true;
      BlogpostStore.emitChange();
      break;

    case BlogpostConstants.BLOGPOST_DELETE:
      BlogpostStore.emitChange();
      break;
  
    default:
      // no op
  }
});

module.exports = BlogpostStore;
