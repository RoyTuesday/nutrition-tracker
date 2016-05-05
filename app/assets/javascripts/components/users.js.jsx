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
    $("#start-date").on("change", this.handleStartDateChange);
  },

  handleStartDateChange: function(event) {
    event.preventDefault();
    console.log("input event", event);
    this.setState({
      startDate: $.datepicker.formatDate("dd/mm/yy", new Date(event.target.value))
    });
  },

  onSubmit: function(event) {
    event.preventDefault();
    $.ajax({
      data: {
        start_date: this.state.startDate,
        end_date: this.state.endDate
      },
      method: "POST",
      url: "/users/nutrients_totals",
      success: function(response) {
        console.log(response);
      },
      fail: function(response) {
        console.log("Nutrients totals failure?", response);
      }
    });
  },

  render: function() {
    return (
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <label>
            Start date
          </label>
          <input className="datepicker" id="start-date" type="text" value={this.state.startDate}/>
          <input type="submit" value="Search"/>
        </fieldset>
      </form>
    );
  }
});

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
