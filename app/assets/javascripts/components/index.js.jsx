var Index = React.createClass({
  getInitialState: function() {
    return {
      currentUser: this.props.currentUser,
      isLoggedIn: !!this.props.currentUser,
      currentPage: "products",
      products: this.props.products
    }
  },

  changeToPage: function(pageName) {
    this.setState({currentPage: pageName});
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
      isLoggedIn: false,
      currentPage: "products"
    });
  },

  render: function() {
    var page;
    switch(this.state.currentPage) {
      case "products": page = <ProductsIndex authenticityToken={this.props.authenticityToken} isLoggedIn={this.state.isLoggedIn} products={this.props.products} urls={this.props.urls} />;
      break;
      case "user": page = <UserShow authenticityToken={this.props.authenticityToken} currentUser={this.state.currentUser} />;
      break;
      default: page = <ProductsIndex authenticityToken={this.props.authenticityToken} isLoggedIn={this.state.isLoggedIn} products={this.props.products} urls={this.props.urls} />;
      break;
    }

    return (
      <div>
        <NavBar authenticityToken={this.props.authenticityToken} changeToPage={this.changeToPage} currentUser={this.state.currentUser} isLoggedIn={this.state.isLoggedIn} loginUser={this.loginUser} logoutUser={this.logoutUser} urls={this.props.urls} />

        <main>
          {page}
        </main>
      </div>
    );
  }
});
