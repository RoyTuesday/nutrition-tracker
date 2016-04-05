var LoginRegisterForm = React.createClass({
  render: function() {
    var usernameField;
    if(this.props.isRegisterForm) {
      usernameField = (
        <span>
          <label htmlFor="username">Username</label>
          <input id="username" placeholder="my_name" type="text" value={this.state.username}/>
        </span>
      );
    }

    return (
      <form>
        <input name="authenticity_token" type="hidden" value={this.props.authenticityToken}/>
        <fieldset>
          {usernameField}

          <label htmlFor="email">Email</label>
          <input id="email" placeholder="email@example.com" type="email" value={this.state.email}/>

          <label htmlFor="password">Password</label>
          <input id="password" placeholder="password123" type="password" value={this.state.password}/>

          <input type="submit" value="Log in"/>
        </fieldset>
      </form>
    );
  }
});

var NavBar = React.createClass({
  getInitialState: function() {
    return {
      isLoginFormShown: false,
      isRegisterForm: true
    }
  },

  handleLoginClick: function(event) {
    event.preventDefault();
    this.setState({
      isLoginFormShown: !this.state.isLoginFormShown,
      isRegisterForm: false
    });
  },

  handleRegisterClick: function(event) {
    event.preventDefault();
    this.setState({
      isLoginFormShown: !this.state.isLoginFormShown,
      isRegisterForm: true
    });
  },

  render: function() {
    var sessionForm = "";
    var sessionLinks = (
      <span>
        <a href="#">
          Login
        </a> | <a href="#">
          Register
        </a>
      </span>
    );
    if(this.props.isLoggedIn) {
      sessionLinks = (
        <span>
          <a href="#">
            {this.props.currentUser.username}
          </a> | <a href="#">
            Log out
          </a>
        </span>
      );
    }
    else if(this.state.isLoginFormShown) {
      sessionForm = (
        <LoginRegisterForm authenticityToken={this.props.authenticityToken} isRegisterForm={this.state.isRegisterForm} />
      );
    }

    return (
      <nav>
        <p>
          <a href="/">
            Home
          </a> | {sessionLinks}
        </p>
        <h1>
          Welcome to Nutrition Tracker
        </h1>
      </nav>
    );
  }
});
