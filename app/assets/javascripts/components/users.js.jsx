class UserShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nutrients: new Array,
      usersProducts: new Array
    };

    this.setNutrients       = this.setNutrients.bind(this);
    this.removeUsersProduct = this.removeUsersProduct.bind(this);
  }

  componentDidMount() {
    $.ajax({
      dataType: "json",
      method: "GET",
      url: "/users_products",
      success: function(data) {
        this.setState({ usersProducts: data });
      }.bind(this),
      fail: function(xhr, status, err) {
        console.log("Users products index failure?", status, err);
      }
    });
  }

  setNutrients(nutrients) {
    this.setState({ nutrients: nutrients });
  }

  removeUsersProduct(id) {
    var usersProducts = this.state.usersProducts.filter(function(currentUsersProduct) {
      return currentUsersProduct.id !== id;
    });

    this.setState({ usersProducts: usersProducts });
  }

  render() {
    return(
      <div style={{ padding: "0.0625em 0" }}>
        <h2 style={{ margin: "1em" }}>
          Welcome, { this.props.currentUser.username }!
        </h2>

        <NutrientsTotalsForm setNutrients={ this.setNutrients } />

        <NutrientList nutrients={ this.state.nutrients }/>

        <UsersProductList
          authenticityToken={ this.props.authenticityToken }
          removeUsersProduct={ this.removeUsersProduct }
          usersProducts={ this.state.usersProducts } />
      </div>
    );
  }
}
