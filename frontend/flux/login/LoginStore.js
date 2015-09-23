

var AppDispatcher = require('../AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var LoginConstants = require('./LoginConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _loggedUser = false;

// Save users login info 
function login(user) {
  _loggedUser = user;
}

// Reset users login info
function logout() {
  _loggedUser = false;
}


var LoginStore = assign({}, EventEmitter.prototype, {

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
    case LoginConstants.AUTH_LOGIN:
      login(action.user);
      LoginStore.emitChange();
      break;

    case LoginConstants.AUTH_LOGOUT:
      logout();
      LoginStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = LoginStore;
