var NewProductForm = React.createClass({
  getInitialState: function() {
    return {
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
    this.props.hideForm();

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
        console.log("New product success!", this.props.itemIndex);
        this.props.removeFoodItem(this.props.itemIndex);
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("New product failure?", this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
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
        <NewProductForm authenticityToken={this.props.authenticityToken} foodItem={this.props.foodItem} hideForm={this.hideForm} itemIndex={this.props.itemIndex} removeFoodItem={this.props.removeFoodItem} url={this.props.newProductUrl} />
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
var UsdaProductList = React.createClass({
  render: function() {
    var productNodes = this.props.foodItems.map(function(foodItem, index) {
      return (
        <li key={"usda-product-" + index}>
          <UsdaProduct authenticityToken={this.props.authenticityToken} foodItem={foodItem} itemIndex={index} newProductUrl={this.props.newProductUrl} removeFoodItem={this.props.removeFoodItem} />
        </li>
      );
    }.bind(this));

    return (
      <ul>
        {productNodes}
      </ul>
    );
  }
});
var UsdaSearchForm = React.createClass({
  getInitialState: function() {
    return {foodItems: [], search_terms: ""}
  },

  handleQueryChange: function(event) {
    this.setState({search_terms: event.target.value});
  },

  handleSubmit: function(event) {
    event.preventDefault();
    var form = {search_terms: this.state.search_terms.trim()};
    $.ajax({
      data: form,
      dataType: "json",
      method: "POST",
      url: this.props.url,
      success: function(data) {
        this.setState({foodItems: data.food_items});
        console.log(data, this.state.foodItems);
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("UDSA search failure?", this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  removeFoodItem: function(itemIndex) {
    this.setState({foodItems: this.state.foodItems.splice(itemIndex)})
  },

  render: function() {
    return (
      <div className="usda-search-form">
        <h3>
          Didn't find what you were looking for?
          <br/>
          Search the UDSA's database to add to the list!
        </h3>
        <form acceptCharset="UTF-8" id="usda-nbd-search" onSubmit={this.handleSubmit}>
          <input name="authenticity_token" type="hidden" value={this.props.authenticityToken}/>
          <fieldset>
            <label htmlFor="search-terms">Search for:</label>
            <input id="search-terms" name="search_terms" onChange={this.handleQueryChange} placeholder="food" type="text"/>

            <input type="submit" value="Search"/>
          </fieldset>
        </form>
        <UsdaProductList authenticityToken={this.props.authenticityToken} foodItems={this.state.foodItems} newProductUrl={this.props.newProductUrl} removeFoodItem={this.removeFoodItem} />
      </div>
    );
  }
});
