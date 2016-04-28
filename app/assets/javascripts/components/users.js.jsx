var NutrientsTotalsForm = React.createClass({
  getInitialState: function() {
    return {
      startDate: null,
      endDate: null
    }
  },

  componentDidMount: function() {
    $(".datepicker").datepicker({
      showOn: "focus"
    });
  },

  render: function() {
    return (
      <form>
        <fieldset>
          <label>
            Start date
          </label>
          <input className="datepicker" type="date" value={this.state.startDate}/>
        </fieldset>
      </form>
    );
  }
})

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
