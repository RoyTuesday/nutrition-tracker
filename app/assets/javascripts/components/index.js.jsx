var Index = React.createClass({
  getInitialState: function() {
    return {
      currentUser: this.props.currentUser,
      isLoggedIn: this.props.isLoggedIn
    }
  },

  render: function() {
    return (
      <main>
        <ProductsIndex authenticityToken={this.props.authenticityToken} isLoggedIn={this.state.isLoggedIn} products={this.props.products} urls={this.props.urls} />
      </main>
    );
  }
});
