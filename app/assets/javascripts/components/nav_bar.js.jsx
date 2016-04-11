var LoginRegisterForm = React.createClass({
  getInitialState: function() {
    return {
      username: null,
      email: null,
      password: null,
      errors: new Array
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
    var formUrl = this.props.isRegisterForm ? this.props.urls.register : this.props.urls.login;

    $.ajax({
      data: {user: this.state},
      dataType: "json",
      method: "POST",
      url: formUrl,
      success: function(data) {
        if(data.errors) {
          this.setState({errors: data.errors});
        }
        else {
          this.props.handleLoginSuccess(data.user);
        }
      }.bind(this),
      fail: function(xhr, status, err) {
        console.log("LoginRegisterForm failure?", status, err);
      }.bind(this)
    });
  },

  render: function() {
    var usernameField, errorList;
    var submitName = "Log in";
    if(this.props.isRegisterForm) {
      usernameField = (
        <span>
          <label htmlFor="username" style={{display: "block"}}>Username</label>
          <input id="username" onChange={this.handleUsernameChange} placeholder="my_name" type="text" value={this.state.username}/>
        </span>
      );
      submitName = "Register";
    }
    if(this.state.errors.length > 0) {
      errorList = this.state.errors.map(function(message, index) {
        return (
          <li key={"error-" + index}>
            {message}
          </li>
        );
      });
    }

    return (
      <form id="login-register" onSubmit={this.handleSubmit} style={this.props.style}>
        <input name="authenticity_token" required type="hidden" value={this.props.authenticityToken}/>
        <fieldset>
          {usernameField}

          <label htmlFor="email">Email</label>
          <input id="email" onChange={this.handleEmailChange} placeholder="email@example.com" required type="email" value={this.state.email}/>

          <label htmlFor="password">Password</label>
          <input id="password" onChange={this.handlePasswordChange} placeholder="password123" required type="password" value={this.state.password}/>

          <input type="submit" value={submitName}/>
        </fieldset>
        <ul className="form-errors">
          {errorList}
        </ul>
      </form>
    );
  }
});

var NavBar = React.createClass({
  componentDidMount: function() {
    addEventListener("animationend", function(event) {
      if(event.animationName == "dropup") {
        this.setState({isLoginFormShown: false});
      }
    }.bind(this));
  },

  getInitialState: function() {
    return {
      formAnimation: "",
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

    var animation;
    if(this.state.isLoginFormShown && !this.state.isRegisterForm) {
      animation = "dropup 600ms running";
    }
    else {
      animation = "dropdown 600ms running";
    }

    this.setState({
      formAnimation: animation,
      isLoginFormShown: true,
      isRegisterForm: false
    });
  },

  handleRegisterClick: function(event) {
    event.preventDefault();

    var animation, display;
    if(this.state.isLoginFormShown && this.state.isRegisterForm) {
      animation = "dropup 600ms running";
    }
    else {
      animation = "dropdown 600ms running";
    }

    this.setState({
      formAnimation: animation,
      isLoginFormShown: true,
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

    return (
      <nav>
        <h1>
          Welcome to Nutrition Tracker
        </h1>
        <div className="form-container">
          <LoginRegisterForm authenticityToken={this.props.authenticityToken} handleLoginSuccess={this.handleLoginSuccess} isRegisterForm={this.state.isRegisterForm} style={{display: this.state.isLoginFormShown ? "initial" : "none", animation: this.state.formAnimation}} urls={this.props.urls} />
        </div>
        <div id="nav-links-container">
          <a href="/" onClick={this.handleHomeClick}>
            Home
          </a> | {sessionLinks}
        </div>
      </nav>
    );
  }
});
