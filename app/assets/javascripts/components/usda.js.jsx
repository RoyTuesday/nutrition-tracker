var NewProductForm = React.createClass({
  getInitialState: function() {
    return {
      errors: new Array,
      servingSize: 0,
      servingUnit: ""
    }
  },

  handleServingSizeChange: function(event) {
    this.setState({servingSize: event.target.value});
  },

  handleServingUnitChange: function(event) {
    this.setState({servingUnit: event.target.value});
  },

  handleSubmit: function(event) {
    event.preventDefault();

    var form = {product: {
      name: this.props.foodItem.name,
      category: this.props.foodItem.group,
      ndb_no: this.props.foodItem.ndbno,
      serving_size: this.state.servingSize,
      serving_unit: this.state.servingUnit
    }}

    $.ajax({
      data: form,
      dataType: "json",
      method: "POST",
      url: this.props.url,
      success: function(data) {
        if(data.errors) {
          this.setState({errors: data.errors});
        }
        else {
          this.props.hideForm();
          this.props.removeFoodItem(this.props.itemIndex);
          this.props.addProduct(data.product);
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("New product failure?", this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    var errorMessages = this.state.errors.map(function(message, index) {
      return (
        <li key={"new-product-error-" + index}>
          {message}
        </li>
      );
    });

    return (
      <form onSubmit={this.handleSubmit}>
        <input name="authenticity_token" type="hidden" value={this.props.authenticityToken}/>
        <fieldset>
          <label htmlFor="serving_size">Serving Size</label>
          <input id="serving_size" onChange={this.handleServingSizeChange} placeholder="0" type="number"/>

          <label htmlFor="serving_unit">Serving Unit</label>
          <input id="serving_unit" onChange={this.handleServingUnitChange} placeholder="g" type="text"/>

          <input type="submit" value="Add new food item"/>
        </fieldset>
        <ul className="ndb-search-errors">
          {errorMessages}
        </ul>
      </form>
    );
  }
});

var UsdaProduct = React.createClass({
  getInitialState: function() {
    return {isFormShown: false}
  },

  handleClick: function(event) {
    event.preventDefault();
    this.setState({isFormShown: !this.state.isFormShown});
  },

  hideForm: function() {
    this.setState({isFormShown: false});
  },

  render: function() {
    var productForm;
    if(this.state.isFormShown) {
      productForm = (
        <NewProductForm addProduct={this.props.addProduct} authenticityToken={this.props.authenticityToken} foodItem={this.props.foodItem} hideForm={this.hideForm} itemIndex={this.props.itemIndex} removeFoodItem={this.props.removeFoodItem} url={this.props.urls.newProduct} />
      );
    }

    return (
      <div>
        <a className="food-item" href="#" onClick={this.handleClick}>
          {this.props.foodItem.name}
        </a>
        {productForm}
      </div>
    );
  }
});

var UsdaSearchForm = React.createClass({
  getInitialState: function() {
    return {searchTerms: new String}
  },

  handleQueryChange: function(event) {
    this.setState({searchTerms: event.target.value});
  },

  handleSubmit: function(event) {
    event.preventDefault();
    var form = {search_terms: this.state.searchTerms.trim()};
    $.ajax({
      data: form,
      dataType: "json",
      method: "POST",
      url: this.props.url,
      success: function(data) {
        this.props.updateFoodItems(data.food_items);
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("UDSA search failure?", this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    return (
      <div className="usda-search-form">
        <form acceptCharset="UTF-8" id="usda-nbd-search" onSubmit={this.handleSubmit}>
          <input name="authenticity_token" type="hidden" value={this.props.authenticityToken}/>
          <fieldset>
            <label htmlFor="search-terms">Search for:</label>
            <input id="search-terms" name="search_terms" onChange={this.handleQueryChange} placeholder="food" type="text"/>

            <input type="submit" value="Search"/>
          </fieldset>
        </form>
      </div>
    );
  }
});

var UsdaProductList = React.createClass({
  getInitialState: function() {
    return {foodItems: new Array}
  },

  removeFoodItem: function(itemIndex) {
    var items = this.state.foodItems;
    items.splice(itemIndex, 1);
    this.setState({foodItems: items});
  },

  updateFoodItems: function(foodItems) {
    this.setState({foodItems: foodItems});
  },

  render: function() {
    var productNodes = this.state.foodItems.map(function(foodItem, index) {
      return (
        <li key={"usda-product-" + index}>
          <UsdaProduct addProduct={this.props.addProduct} authenticityToken={this.props.authenticityToken} foodItem={foodItem} itemIndex={index} urls={this.props.urls} removeFoodItem={this.removeFoodItem} />
        </li>
      );
    }.bind(this));

    return (
      <div>
        <h3>
          Didn't find what you were looking for?
          <br/>
          Search the UDSA's database to add to the list!
        </h3>
        <UsdaSearchForm authenticityToken={this.props.authenticityToken} updateFoodItems={this.updateFoodItems} url={this.props.urls.ndbSearch} />
        <ul>
          {productNodes}
        </ul>
      </div>
    );
  }
});
