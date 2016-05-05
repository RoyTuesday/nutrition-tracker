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

  removeUsersProduct: function(id) {
    var usersProducts = this.state.usersProducts.filter(function(currentUsersProduct) {
      return currentUsersProduct.id !== id
    });

    this.setState({
      usersProducts: usersProducts
    });
  },

  render: function() {
    return(
      <div style={{padding: "0.0625em 0"}}>
        <h2 style={{margin: "1em"}}>
          Welcome, {this.props.currentUser.username}!
        </h2>
        <NutrientsTotalsForm />
        <UsersProductList authenticityToken={this.props.authenticityToken} removeUsersProduct={this.removeUsersProduct} usersProducts={this.state.usersProducts} />
      </div>
    );
  }
});
