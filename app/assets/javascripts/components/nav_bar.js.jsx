var LoginRegisterForm = React.createClass({
  render: function() {
    var usernameField;
    if(this.props.isRegisterForm) {
      usernameField = (
        <label htmlFor="username">Username</label>
        <input id="username" placeholder="my_name" type="text" value={this.state.username}/>
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
  render: function() {
    var sessionLinks = (
      <a href="#">
        Login
      </a> | 
      <a href="#">
        Register
      </a>
    );
    if(this.props.isLoggedIn) {
      sessionLinks = (
        <a href="#">
          {this.props.currentUser.username}
        </a> | 
        <a href="#">
          Log out
        </a>
      );
    }

    return (
      <nav>
        <p>
          <a href="/">
            Home
          </a> | 
          {sessionLinks}
        </p>
      </nav>
    );
  }
});
