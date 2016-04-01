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
          {this.props.user.name}
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
