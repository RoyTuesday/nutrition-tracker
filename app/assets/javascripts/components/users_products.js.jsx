var UsersProduct = React.createClass({
  getInitialState: function() {
    return {
      areDetailsShown: false,
      isEditFormShown: false,
      usersProduct: this.props.usersProduct
    }
  },

  handleDeleteClick: function(event) {
    event.preventDefault();
    $.ajax({
      dataType: "json",
      method: "DELETE",
      url: "/users_products/" + this.state.usersProduct.id,
      success: function(data) {
        this.props.removeUsersProduct(this.state.usersProduct.id);
      }.bind(this),
      fail: function(xhr, status, err) {
        console.log("Users products delete failure?", status, err);
      }
    })
  },

  handleEditClick: function(event) {
    event.preventDefault();
    this.setState({isEditFormShown: !this.state.isEditFormShown});
  },

  handleNameClick: function(event) {
    event.preventDefault();
    this.setState({areDetailsShown: !this.state.areDetailsShown});
  },

  hideDetails: function() {
    this.setState({
      areDetailsShown: false,
      isEditFormShown: false
    });
  },

  updateUsersProduct: function(usersProduct) {
    this.setState({usersProduct: usersProduct});
  },

  render: function() {
    var details, editForm;
    if(this.state.areDetailsShown) {
      details = (
        <div className="users-product-details">
          <p>
            Category: {this.state.usersProduct.product.category}
          </p>
          <p>
            Serving size: {this.state.usersProduct.product.serving_size + this.state.usersProduct.product.serving_unit}
          </p>
          <p>
            Date eaten: {this.state.usersProduct.date_eaten}
          </p>
          <p>
            Price: {this.state.usersProduct.price}
          </p>
        </div>
      );
    }
    if(this.state.isEditFormShown) {
      editForm = (
        <UsersProductForm authenticityToken={this.props.authenticityToken} hideDetails={this.hideDetails} method="PUT" submitName="Update food record" updateUsersProduct={this.updateUsersProduct} url={"/products/" + this.state.usersProduct.product.id + "/users_products/" + this.state.usersProduct.id} usersProduct={this.state.usersProduct} />
      );
    }

    return(
      <div>
        <h3>
          <a href="#" onClick={this.handleNameClick}>{this.state.usersProduct.product.name}</a>
        </h3>
        {details}
        <a href="#" onClick={this.handleEditClick}>Edit</a> | <a href="#" onClick={this.handleDeleteClick}>Delete</a>
        <div className="users-product-errors-container">
          {editForm}
        </div>
      </div>
    );
  }
});

var UsersProductList = React.createClass({
  render: function() {
    var usersProductNodes = this.props.usersProducts.map(function(usersProduct, index) {
      return (
        <li key={"users-products-" + index}>
          <UsersProduct authenticityToken={this.props.authenticityToken} removeUsersProduct={this.props.removeUsersProduct} usersProduct={usersProduct} />
        </li>
      );
    }.bind(this));

    return (
      <ul>
        {usersProductNodes}
      </ul>
    );
  }
});

var UsersProductForm = React.createClass({
  getInitialState: function() {
    return {
      date_eaten: this.props.usersProduct.date_eaten,
      price: this.props.usersProduct.price,
      servings: this.props.usersProduct.servings
    };
  },

  handleDateEatenChange: function(event) {
    this.setState({date_eaten: event.target.value});
  },

  handlePriceChange: function(event) {
    this.setState({price: event.target.value});
  },

  handleServingsChange: function(event) {
    this.setState({servings: event.target.value});
  },

  handleSubmit: function(event) {
    event.preventDefault();
    var form = {users_product: {
      date_eaten: this.state.date_eaten,
      price: this.state.price,
      servings: this.state.servings
    }};
    $.ajax({
      data: form,
      dataType: "json",
      method: this.props.method,
      url: this.props.url,
      success: function(data) {
        console.log("New users product success!", data);
        this.props.hideDetails();
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("New users product failure?", this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    return (
      <form className="new_users_product" onSubmit={this.handleSubmit}>
        <input name="authenticity_token" type="hidden" value={this.props.authenticityToken}/>
        <fieldset>
          <label htmlFor="servings">
            Servings
          </label>
          <input defaultValue={this.state.servings} id="servings" min="0" name="servings" onChange={this.handleServingsChange} placeholder="1" step="any" type="number"/>

          <label htmlFor="date-eaten">
            Date Eaten
          </label>
          <input defaultValue={this.state.date_eaten} id="date-eaten" name="date_eaten" onChange={this.handleDateEatenChange} placeholder="yyyy-mm-dd" type="date"/>

          <label htmlFor="price">
            Price
          </label>
          <input defaultValue={this.state.price} id="price" name="price" onChange={this.handlePriceChange} placeholder="$1.00" type="text"/>

          <input type="submit" value={this.props.submitName}/>
        </fieldset>
      </form>
    );
  }
});
