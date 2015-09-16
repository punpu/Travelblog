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
    $.ajax({url: page.base()+'/api/checksession', dataType: 'json', cache: false})
    .done(function (data) {

      AppDispatcher.dispatch({
        actionType: LoginConstants.AUTH_LOGIN,
        user: data
      });
    }.bind(this))

    .fail(function (xhr, status, err) {
      console.log('/api/checksession', status, err.toString());
    }.bind(this));

  },

};

module.exports = LoginActions;
