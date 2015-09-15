/*
 * LoginActions
 */

var AppDispatcher = require('./AppDispatcher');
var LoginConstants = require('./LoginConstants');

var LoginActions = {

  login: function(user) {
    AppDispatcher.dispatch({
      actionType: LoginConstants.AUTH_LOGIN,
      user: user
    });
  },

  logout: function(id, text) {
    AppDispatcher.dispatch({
      actionType: LoginConstants.AUTH_LOGOUT
    });
  },

  checkLoginSessionExists: function() {
    AppDispatcher.dispatch({
      actionType: LoginConstants.AUTH_CHECKSESSION
    });
  },

};

module.exports = LoginActions;
