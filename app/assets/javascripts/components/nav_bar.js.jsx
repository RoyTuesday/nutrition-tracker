var LoginRegisterForm = React.createClass({
  getInitialState: function() {
    return {
      username: null,
      email: null,
      password: null
    }
  },

  handleUsernameChange: function(event) {
    this.setState({username: event.target.value});
  },

  handleEmailChange: function(event) {
    this.setState({email: event.target.value});
  },

  handlePasswordChange: function(event) {
    this.setState({password: event.target.value});
  },

  handleSubmit: function(event) {
    event.preventDefault();
    var formUrl = this.state.isRegisterForm ? this.props.urls.register : this.props.urls.login;

    $.ajax({
      data: this.state,
      dataType: "json",
      method: "POST",
      url: formUrl,
      success: function(data) {
        this.props.handleLoginSuccess(data.user);
      }.bind(this),
      fail: function(xhr, status, err) {
        console.log("Session form failure?", status, err);
      }.bind(this)
    });
  },

  render: function() {
    var usernameField;
    if(this.props.isRegisterForm) {
      usernameField = (
        <span>
          <label htmlFor="username">Username</label>
          <input id="username" onChange={this.handleUsernameChange} placeholder="my_name" type="text" value={this.state.username}/>
        </span>
      );
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <input name="authenticity_token" type="hidden" value={this.props.authenticityToken}/>
        <fieldset>
          {usernameField}

          <label htmlFor="email">Email</label>
          <input id="email" onChange={this.handleEmailChange} placeholder="email@example.com" type="email" value={this.state.email}/>

          <label htmlFor="password">Password</label>
          <input id="password" onChange={this.handlePasswordChange} placeholder="password123" type="password" value={this.state.password}/>

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

  handleHomeClick: function(event) {
    event.preventDefault();
    this.props.changeToPage();
  },

  handleLoginClick: function(event) {
    event.preventDefault();

    if(this.state.isRegisterForm) {
      loginFormState = true;
    }
    else {
      loginFormState = !this.state.isLoginFormShown;
    }

    this.setState({
      isLoginFormShown: loginFormState,
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

  handleUserClick: function(event) {
    event.preventDefault();
    this.props.changeToPage("user");
  },

  handleLogoutClick: function(event) {
    event.preventDefault();
    $.ajax({
      contentType: "html",
      type: "DELETE",
      url: "/sessions/" + this.props.currentUser.id,
      success: function(data) {
        this.props.logoutUser();
      }.bind(this),
      fail: function(xhr, status, err) {
        console.log(status, err);
      }.bind(this)
    });
  },

  handleLoginSuccess: function(user) {
    this.setState({isLoginFormShown: false});
    this.props.loginUser(user);
  },

  render: function() {
    var sessionForm = "";
    var sessionLinks = (
      <span>
        <a href="#" onClick={this.handleLoginClick}>
          Login
        </a> | <a href="#" onClick={this.handleRegisterClick}>
          Register
        </a>
      </span>
    );
    if(this.props.isLoggedIn) {
      sessionLinks = (
        <span>
          <a href="#" onClick={this.handleUserClick}>
            {this.props.currentUser.username}
          </a> | <a href="#" onClick={this.handleLogoutClick}>
            Log out
          </a>
        </span>
      );
    }
    else if(this.state.isLoginFormShown) {
      sessionForm = (
        <LoginRegisterForm authenticityToken={this.props.authenticityToken} handleLoginSuccess={this.handleLoginSuccess} isRegisterForm={this.state.isRegisterForm} urls={this.props.urls} />
      );
    }

    return (
      <nav>
        <p>
          <a href="/" onClick={this.handleHomeClick}>
            Home
          </a> | {sessionLinks}
        </p>
        <h1>
          Welcome to Nutrition Tracker
        </h1>
        {sessionForm}
      </nav>
    );
  }
});
