// Login page

var LoginActions = require('../flux/login/LoginActions');

var LoginPage = React.createClass({

	componentDidMount: function() {
		
	},

	getInitialState: function() {
		return {
			showLoginError: false
		};
	},

	postLoginInfo: function () {
		var loginInfo = {};
		loginInfo.username = React.findDOMNode(this.refs.username).value;
    loginInfo.password = React.findDOMNode(this.refs.password).value;

		$.ajax({
			url: page.base()+'/api/login', 
			method: "POST", 
			contentType: "application/json; charset=utf-8", 
			data: JSON.stringify(loginInfo)})

		.done(function (data, status) {

			LoginActions.login(data);
			// Login complete, go to main page
			page('/');
		}.bind(this))

		.fail(function (xhr, status, err) {
			// Show login error message
			this.setState({showLoginError: true});

	    // hide error after 1000 milliseconds
	    setTimeout(function(){
	      this.setState({showLoginError: false});
	    }.bind(this), 3000);

		}.bind(this));

	},

	render: function() {

		var errorMessage;
		if(this.state.showLoginError){
			errorMessage = 
				<span style={errorMessageStyles}>
					Wrong username or password!
				</span>;
		}

		return (
			<form style={loginContainerStyles} >
				<div className="form-group">
					<label>Username:</label>
					<input className="form-control" type="text" ref="username" />
				</div>
				<div className="form-group">
					<label>Password:</label>
					<input className="form-control" type="password" ref="password" />
				</div>
				<a className="btn btn-primary" onClick={this.postLoginInfo}>Login</a>
				{errorMessage}
			</form>
		);
	}

});

var loginContainerStyles = {
	width: '40%',
	border: '1px solid grey',
	borderRadius: '5px',
	marginLeft: '5%',
	marginTop: '5%',
	padding: '10px'
};

var errorMessageStyles = {
	color: 'red',
	marginLeft: '10px'
}

module.exports = LoginPage;