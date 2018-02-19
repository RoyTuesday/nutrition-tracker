class NewProductForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: new Array,
      servingSize: 0,
      servingUnit: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    var newState = {};
    newState[event.target.name] = event.target.value;

    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();

    var form = {product: {
      name          : this.props.foodItem.name,
      category      : this.props.foodItem.group,
      ndb_no        : this.props.foodItem.ndbno,
      serving_size  : this.state.servingSize,
      serving_unit  : this.state.servingUnit
    }}

    $.ajax({
      data: form,
      dataType: "json",
      method: "POST",
      url: this.props.url,
      success: function(data) {
        if(data.errors) {
          this.setState({ errors: data.errors });
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
  }

  render() {
    var errorMessages = this.state.errors.map(function(message, index) {
      return (
        <li key={ "new-product-error-" + index }>{ message }</li>
      );
    });

    return (
      <form onSubmit={ this.handleSubmit }>
        <input name="authenticity_token" type="hidden" value={ this.props.authenticityToken }/>

        <fieldset>
          <div>
            <label htmlFor="serving_size">Serving Size</label>
            <input
              id="serving_size" name="servingSize" placeholder="0" type="number"
              value={ this.state.servingSize } onChange={ this.handleChange } />
          </div>

          <div>
            <label htmlFor="serving_unit">Serving Unit</label>
            <input
              id="serving_unit" name="servingUnit" placeholder="g" type="text"
              value={ this.state.servingUnit } onChange={ this.handleChange } />
          </div>

          <input type="submit" value="Add new food item"/>
        </fieldset>

        <ul className="ndb-search-errors">
          { errorMessages }
        </ul>
      </form>
    );
  }
}

class UsdaProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isFormShown: false };

    this.handleClick  = this.handleClick.bind(this);
    this.hideForm     = this.hideForm.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({ isFormShown: !this.state.isFormShown });
  }

  hideForm() {
    this.setState({ isFormShown: false });
  }

  render() {
    var productForm;

    if (this.state.isFormShown) {
      productForm = (
        <NewProductForm
          addProduct={ this.props.addProduct }
          authenticityToken={ this.props.authenticityToken }
          foodItem={ this.props.foodItem }
          hideForm={ this.hideForm }
          itemIndex={ this.props.itemIndex }
          removeFoodItem={ this.props.removeFoodItem }
          url={ this.props.urls.newProduct } />
      );
    }

    return (
      <div>
        <a className="food-item" href="#" onClick={ this.handleClick }>
          { this.props.foodItem.name }
        </a>

        { productForm }
      </div>
    );
  }
}

class UsdaSearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { searchTerms: new String };

    this.handleQueryChange  = this.handleQueryChange.bind(this);
    this.handleSubmit       = this.handleSubmit.bind(this);
  }

  handleQueryChange(event) {
    this.setState({ searchTerms: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    var form = { search_terms: this.state.searchTerms.trim() };

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
  }

  render() {
    return (
      <div className="usda-search-form">
        <form acceptCharset="UTF-8" id="usda-nbd-search" onSubmit={ this.handleSubmit }>
          <input name="authenticity_token" type="hidden" value={ this.props.authenticityToken }/>

          <fieldset>
            <div>
              <label htmlFor="search-terms">Search for:</label>
              <input
                id="search-terms" name="search_terms" placeholder="food" type="text"
                value={ this.state.searchTerms } onChange={ this.handleQueryChange } />
            </div>

            <input type="submit" value="Search"/>
          </fieldset>
        </form>
      </div>
    );
  }
}

class UsdaProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { foodItems: new Array };

    this.removeFoodItem   = this.removeFoodItem.bind(this);
    this.updateFoodItems  = this.updateFoodItems.bind(this);
  }

  removeFoodItem(itemIndex) {
    var items = this.state.foodItems;
    items.splice(itemIndex, 1);

    this.setState({ foodItems: items });
  }

  updateFoodItems(foodItems) {
    this.setState({ foodItems: foodItems });
  }

  render() {
    var productNodes = this.state.foodItems.map(function(foodItem, index) {
      return (
        <li className="product" key={ "usda-product-" + index }>
          <UsdaProduct
            addProduct={ this.props.addProduct }
            authenticityToken={ this.props.authenticityToken }
            foodItem={ foodItem }
            itemIndex={ index }
            urls={ this.props.urls }
            removeFoodItem={ this.removeFoodItem } />
        </li>
      );
    }, this);

    return (
      <div id="usda-container">
        <h3>
          Didn't find what you were looking for?<br/>
          Search the UDSA's database to add to the list!
        </h3>
        <UsdaSearchForm
          authenticityToken={ this.props.authenticityToken }
          updateFoodItems={ this.updateFoodItems }
          url={ this.props.urls.ndbSearch } />

        <ul>
          { productNodes }
        </ul>
      </div>
    );
  }
}
