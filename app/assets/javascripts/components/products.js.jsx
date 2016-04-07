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
        <div className="product-details-container">
          <ul className="product-details" id={"product-details-" + this.props.product.id}>
            <li>
              Category: {this.props.product.category}
            </li>
            <li>
              Serving size: {this.props.product.serving_size + this.props.product.serving_unit}
            </li>
          </ul>
          {usersProductForm}
        </div>
      );
    }

    return (
      <div className="product" id={"product-" + this.props.product.id}>
        <article className="product-title" onClick={this.handleClick}>
          <h3 key={this.props.key}>
            {this.props.product.name}
          </h3>
        </article>
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

  filterProducts: function(terms) {
    var products = this.props.products.filter(function(product) {
      var isAMatch = false;
      terms.forEach(function(term) {
        if(!!term.exec(product.name)) {
          isAMatch = true;
        }
      });
      return isAMatch;
    });
    this.props.updateProducts(products);
  },

  handleQueryChange: function(event) {
    this.setState({searchInput: event.target.value});

    var terms = event.target.value.split(" ").map(function(term) {
      return new RegExp(term, "i");
    });

    this.filterProducts(terms);
  },

  render: function() {
    return (
      <form acceptCharset="UTF-8" id="products-search">
        <fieldset>
          <div>
            <label htmlFor="search_terms">Search terms:</label>
            <input id="product-search-terms" onChange={this.handleQueryChange} placeholder="food" type="text" value={this.state.searchInput}/>
            </div>
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
          <li className="product" key={"product" + index}>
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

  addProduct: function(product) {
    this.setState({
      products: this.state.products.concat(product)
    });
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
        <UsdaProductList addProduct={this.addProduct} authenticityToken={this.props.authenticityToken} urls={this.props.urls} />
      );
    }

    return (
      <div>
        <div id="product-search-container">
          <h2>
            Products in Database
          </h2>
          <ProductSearch products={this.props.products} updateProducts={this.updateProducts} url={this.props.urls.productsSearch} />
        </div>
        <ProductList authenticityToken={this.props.authenticityToken} isLoggedIn={this.props.isLoggedIn} products={this.state.products} />
        {usdaSearchForm}
      </div>
    );
  }
});
