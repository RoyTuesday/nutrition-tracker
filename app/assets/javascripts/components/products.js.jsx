var Product = React.createClass({
  getInitialState: function() {
    return {detailsShown: false};
  },

  handleClick: function(event) {
    event.preventDefault();
    this.setState({detailsShown: !this.state.detailsShown});
  },

  hideDetails: function() {
    this.setState({detailsShown: false})
  },

  render: function() {
    var usersProductForm;
    if(this.props.isLoggedIn) {
      usersProductForm = (
        <UsersProductForm authenticityToken={this.props.authenticityToken} hideDetails={this.hideDetails} method="POST" submitName="Add food record" url={"/products/" + this.props.product.id + "/users_products"} usersProduct={{servings: "", date_eaten: "", price: ""}} />
      );
    }

    var details = "";
    if(this.state.detailsShown) {
      details = (
        <div>
          <div className="product-details" id={"product-details-" + this.props.product.id}>
            <p>
              Category: {this.props.product.category}
            </p>
            <p>
              Serving size: {this.props.product.serving_size + this.props.product.serving_unit}
            </p>
          </div>
          {usersProductForm}
        </div>
      );
    }

    return (
      <div id={"product-" + this.props.product.id}>
        <h3 key={this.props.key}>
          <a className="product" href="#" onClick={this.handleClick}>
            {this.props.product.name}
          </a>
        </h3>
        {details}
      </div>
    );
  }
});
var ProductSearch = React.createClass({
  getInitialState: function() {
    return {
      searchInput: null,
    }
  },

  handleQueryChange: function(event) {
    this.setState({searchInput: event.target.value});

    var terms = event.target.value.split(" ").map(function(term) {
      return new RegExp(term);
    });
  },

  render: function() {
    return (
      <form acceptCharset="UTF-8" id="products-search">
        <fieldset>
          <label htmlFor="search_terms">Search terms:</label>
          <input id="product-search-terms" onChange={this.handleQueryChange} placeholder="food" type="text" value={this.state.searchInput}/>
        </fieldset>
      </form>
    );
  }
});
var ProductList = React.createClass({
  render: function() {
    var productNodes = (
      <li>
        No products found!
      </li>
    );

    if(this.props.products.length > 0) {
      productNodes = this.props.products.map(function(product, index) {
        return (
          <li key={"product" + index}>
            <Product authenticityToken={this.props.authenticityToken} isLoggedIn={this.props.isLoggedIn} product={product} />
          </li>
        );
      }.bind(this));
    }

    return (
      <ul>
        {productNodes}
      </ul>
    );
  }
});
var ProductsIndex = React.createClass({
  getInitialState: function() {
    return {products: this.props.products};
  },

  updateProducts: function(products) {
    this.setState({products: products});
  },

  render: function() {
    var usdaSearchForm = (
      <p>
        Please log in to add products to the database
      </p>
    );

    if(this.props.isLoggedIn) {
      usdaSearchForm = (
        <UsdaSearchForm authenticityToken={this.props.authenticityToken} newProductUrl={this.props.urls.newProduct} url={this.props.urls.ndbSearch} />
      );
    }

    return (
      <div>
        <h2 className="mb-none">
          Products in Database
        </h2>
        <ProductSearch products={this.state.products} updateProducts={this.updateProducts} url={this.props.urls.productsSearch} />
        <ProductList authenticityToken={this.props.authenticityToken} isLoggedIn={this.props.isLoggedIn} products={this.state.products} />
        {usdaSearchForm}
      </div>
    );
  }
});
