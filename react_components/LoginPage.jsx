// Login page



var LoginPage = React.createClass({

	componentDidMount: function() {
		
	},

	getInitialState: function() {
		return {
		 
		};
	},

	render: function() {
		return (
			<form>
				<label>Username: <input type="text" ref="username" /></label>
				<label>Password: <input type="text" ref="password" /></label>
				<a className="btn btn-primary" >Login</a>
			</form>
		);
	}


});


module.exports = LoginPage;