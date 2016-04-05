var Index = React.createClass({
  getInitialState: function() {
    return {
      currentUser: this.props.currentUser,
      isLoggedIn: !!this.props.currentUser,
      currentPage: "products"
    }
  },

  loginUser: function(user) {
    this.setState({
      currentUser: user,
      isLoggedIn: true
    });
  },

  logoutUser: function() {
    this.setState({
      currentUser: null,
      isLoggedIn: false
    });
  },

  render: function() {
    return (
      <div>
        <NavBar authenticityToken={this.props.authenticityToken} currentUser={this.state.currentUser} isLoggedIn={this.state.isLoggedIn} loginUser={this.loginUser} logoutUser={this.logoutUser} urls={this.props.urls} />

        <main>
          <ProductsIndex authenticityToken={this.props.authenticityToken} isLoggedIn={this.state.isLoggedIn} products={this.props.products} urls={this.props.urls} />
        </main>
      </div>
    );
  }
});
