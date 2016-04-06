var UserShow = React.createClass({
  componentDidMount: function() {
    $.ajax({
      dataType: "json",
      method: "GET",
      url: "/users_products",
      success: function(data) {
        this.setState({usersProducts: data});
      }.bind(this),
      fail: function(xhr, status, err) {
        console.log("Users products index failure?", status, err);
      }
    });
  },

  getInitialState: function() {
    return {usersProducts: new Array}
  },

  render: function() {
    return(
      <div>
        <h2>
          Welcome, {this.props.currentUser.username}!
        </h2>
        <UsersProductList usersProducts={this.state.usersProducts} />
      </div>
    );
  }
});
