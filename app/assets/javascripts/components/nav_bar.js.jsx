class LoginRegisterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username  : '',
      email     : '',
      password  : '',
      errors    : new Array
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    var newState = {};
    newState[event.target.name] = event.target.value;

    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();
    var formUrl = this.props.isRegisterForm ? this.props.urls.register : this.props.urls.login;

    $.ajax({
      data: {user: this.state},
      dataType: "json",
      method: "POST",
      url: formUrl,
      success: function(data) {
        if (data.errors) {
          this.setState({errors: data.errors});
        }
        else {
          this.setState({
            username  : '',
            email     : '',
            password  : '',
            errors    : new Array
          });
          this.props.handleLoginSuccess(data.user);
        }
      }.bind(this),
      fail: function(xhr, status, err) {
        console.log("LoginRegisterForm failure?", status, err);
      }.bind(this)
    });
  }

  render() {
    var usernameField, errorList;
    var submitName = "Log in";

    if (this.props.isRegisterForm) {
      usernameField = (
        <span>
          <label htmlFor="username" style={{ display: "block" }}>Username</label>
          <input id="username" name="username" placeholder="my_name" type="text" value={ this.state.username } onChange={ this.handleUsernameChange } />
        </span>
      );
      submitName = "Register";
    }

    if (this.state.errors.length > 0) {
      errorList = this.state.errors.map(function(message, index) {
        return (
          <li key={ "error-" + index }>{ message }</li>
        );
      });
    }

    return (
      <form id="login-register" onSubmit={ this.handleSubmit } style={ this.props.style }>
        <input name="authenticity_token" required type="hidden" value={ this.props.authenticityToken }/>
        <fieldset>
          { usernameField }

          <label htmlFor="email">Email</label>
          <input
            id="email" name="email" placeholder="email@example.com" required type="email"
            value={ this.state.email } onChange={ this.handleChange } />

          <label htmlFor="password">Password</label>
          <input
            id="password" name="password" placeholder="password123" required type="password"
            value={ this.state.password } onChange={this.handleChange} />

          <input type="submit" value={ submitName }/>
        </fieldset>
        <ul className="form-errors">
          { errorList }
        </ul>
      </form>
    );
  }
}

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formAnimation     : "",
      isLoginFormShown  : false,
      isRegisterForm    : true
    };

    this.handleHomeClick      = this.handleHomeClick.bind(this);
    this.handleLoginClick     = this.handleLoginClick.bind(this);
    this.handleRegisterClick  = this.handleRegisterClick.bind(this);
    this.handleUserClick      = this.handleUserClick.bind(this);
    this.handleLogoutClick    = this.handleLogoutClick.bind(this);
    this.handleLoginSuccess   = this.handleLoginSuccess.bind(this);
  }

  componentDidMount() {
    addEventListener("animationend", function(event) {
      if(event.animationName == "dropup") {
        this.setState({ isLoginFormShown: false });
      }
    }.bind(this));
  }

  handleHomeClick(event) {
    event.preventDefault();
    this.props.changeToPage();
  }

  handleLoginClick(event) {
    event.preventDefault();

    var animation;
    if (this.state.isLoginFormShown && !this.state.isRegisterForm) {
      animation = "dropup 600ms running";
    }
    else {
      animation = "dropdown 600ms running";
    }

    this.setState({
      formAnimation     : animation,
      isLoginFormShown  : true,
      isRegisterForm    : false
    });
  }

  handleRegisterClick(event) {
    event.preventDefault();

    var animation, display;
    if (this.state.isLoginFormShown && this.state.isRegisterForm) {
      animation = "dropup 600ms running";
    }
    else {
      animation = "dropdown 600ms running";
    }

    this.setState({
      formAnimation     : animation,
      isLoginFormShown  : true,
      isRegisterForm    : true
    });
  }

  handleUserClick(event) {
    event.preventDefault();
    this.props.changeToPage("user");
  }

  handleLogoutClick(event) {
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
  }

  handleLoginSuccess(user) {
    this.setState({
      formAnimation: "dropup 600ms running",
      isLoginFormShown: true
    });
    this.props.loginUser(user);
  }

  render() {
    var sessionLinks = (
      <span>
        <a href="#" onClick={ this.handleLoginClick }>
          Login
        </a> | <a href="#" onClick={ this.handleRegisterClick }>
          Register
        </a>
      </span>
    );

    if ( this.props.isLoggedIn ) {
      sessionLinks = (
        <span>
          <a href="#" onClick={ this.handleUserClick }>
            { this.props.currentUser.username }
          </a> | <a href="#" onClick={ this.handleLogoutClick }>
            Log out
          </a>
        </span>
      );
    }

    var styles = {
      top       : this.state.isLoginFormShown ? "4em" : "-10em",
      animation : this.state.formAnimation
    };

    return (
      <nav>
        <header>
          <h1>
            Welcome to Nutrition Tracker
          </h1>
          <div id="nav-links-container">
            <a href="/" onClick={ this.handleHomeClick }>Home</a> | { sessionLinks }
          </div>
        </header>
        <LoginRegisterForm
          authenticityToken={ this.props.authenticityToken }
          handleLoginSuccess={ this.handleLoginSuccess }
          isRegisterForm={ this.state.isRegisterForm }
          style={ styles }
          urls={ this.props.urls } />
      </nav>
    );
  }
}
