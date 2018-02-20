class NutritionTracker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser : props.currentUser,
      isLoggedIn  : !!props.currentUser,
      currentPage : "products",
      products    : props.products
    };

    this.changeToPage = this.changeToPage.bind(this);
    this.loginUser    = this.loginUser.bind(this);
    this.logoutUser   = this.logoutUser.bind(this);
  }

  changeToPage(pageName) {
    this.setState({ currentPage: pageName });
  }

  loginUser(user) {
    this.setState({
      currentUser : user,
      isLoggedIn  : true
    });
  }

  logoutUser() {
    this.setState({
      currentUser : {},
      isLoggedIn  : false,
      currentPage : "products"
    });
  }

  render() {
    var page;

    switch(this.state.currentPage) {
      case "products":
        page = <ProductsIndex
                 authenticityToken={ this.props.authenticityToken }
                 isLoggedIn={ this.state.isLoggedIn }
                 products={ this.state.products }
                 urls={ this.props.urls } />;
        break;
      case "user":
        page = <UserShow
                 authenticityToken={ this.props.authenticityToken }
                 currentUser={ this.state.currentUser } />;
        break;
      default:
        page = <ProductsIndex
                 authenticityToken={ this.props.authenticityToken }
                 isLoggedIn={ this.state.isLoggedIn }
                 products={ this.state.products }
                 urls={ this.props.urls } />;
        break;
    }

    return (
      <div>
        <NavBar
          authenticityToken={ this.props.authenticityToken }
          changeToPage={ this.changeToPage }
          currentUser={ this.state.currentUser }
          isLoggedIn={ this.state.isLoggedIn }
          loginUser={ this.loginUser }
          logoutUser={ this.logoutUser }
          urls={ this.props.urls } />

        <main>
          { page }
        </main>
      </div>
    );
  }
}
