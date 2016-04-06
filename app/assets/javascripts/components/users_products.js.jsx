var UsersProduct = React.createClass({
  getInitialState: function() {
    return {
      areDetailsShown: false,
      isEditFormShown: false
    }
  },

  render: function() {
    var details, editForm;
    if(this.areDetailsShown) {
      details = (
        <div class="users-product-details">
          <p>
            Category: {this.props.usersProduct.category}
          </p>
          <p>
            Serving size: {this.props.usersProduct.serving_size + this.props.usersProduct.serving_unit}
          </p>
          <p>
            Date eaten: {this.props.usersProduct.date_eaten}
          </p>
          <p>
            Price: {this.props.usersProduct.price}
          </p>
        </div>
      );
    }
    if(this.isEditFormShown) {
      editForm = (
        <div>
          Edit form coming soon.
        </div>
      );
    }

    return(
      <div>
        <h3>
          <a href="#">{this.props.usersProduct.name}</a>
        </h3>
        {details}
        <a href="#">Edit</a>
        <a href="#">Delete</a>
        {editForm}
      </div>
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
      method: "POST",
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

          <input type="submit" value="Add food record"/>
        </fieldset>
      </form>
    );
  }
});
