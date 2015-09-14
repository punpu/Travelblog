/*
 * LoginActions
 */

var AppDispatcher = require('./AppDispatcher');
var LoginConstants = require('./LoginConstants');

var LoginActions = {

  /**
   * @param  {string} text
   */
  login: function(user) {
    AppDispatcher.dispatch({
      actionType: LoginConstants.AUTH_LOGIN,
      user: user
    });
  },

  /**
   * @param  {string} id The ID of the ToDo item
   * @param  {string} text
   */
  logout: function(id, text) {
    AppDispatcher.dispatch({
      actionType: LoginConstants.AUTH_LOGOUT
    });
  },

};

module.exports = LoginActions;
