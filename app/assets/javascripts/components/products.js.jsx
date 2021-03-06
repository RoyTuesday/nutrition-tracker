class Product extends React.Component {
  constructor(props) {
    super(props);

    this.state = { detailsShown: false };

    this.handleClick = this.handleClick.bind(this);
    this.hideDetails = this.hideDetails.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({ detailsShown: !this.state.detailsShown });
  }

  hideDetails() {
    this.setState({ detailsShown: false })
  }

  render() {
    var usersProductForm;

    if (this.props.isLoggedIn) {
      usersProductForm = (
        <UsersProductForm
          authenticityToken={ this.props.authenticityToken }
          hideDetails={ this.hideDetails }
          method="POST"
          submitName="Add food record"
          url={ "/products/" + this.props.product.id + "/users_products" }
          usersProduct={{ servings: "", date_eaten: "", price: "" }} />
      );
    }

    var details = "";
    if (this.state.detailsShown) {
      details = (
        <div className="product-details-container">
          <ul className="product-details" id={ "product-details-" + this.props.product.id }>
            <li>
              Category: { this.props.product.category }
            </li>
            <li>
              Serving size: { this.props.product.serving_size + this.props.product.serving_unit }
            </li>
          </ul>

          { usersProductForm }
        </div>
      );
    }

    return (
      <div className="product" id={ "product-" + this.props.product.id }>
        <button className="product-title" onClick={ this.handleClick }>
          { this.props.product.name }
        </button>

        { details }
      </div>
    );
  }
}

class ProductSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = { searchInput: '' };

    this.filterProducts     = this.filterProducts.bind(this);
    this.handleQueryChange  = this.handleQueryChange.bind(this);
  }

  filterProducts(terms) {
    var products = this.props.products.filter(function(product) {
      var length = terms.length;
      for (var i = 0; i < length; i++) {
        if (terms[i].test(product.name)) {
          return true;
        }
      }
      return false;
    });
    this.props.updateProducts(products);
  }

  handleQueryChange(event) {
    this.setState({ searchInput: event.target.value });

    var terms = event.target.value.split(" ").map(function(term) {
      return new RegExp(term, "i");
    });

    this.filterProducts(terms);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form acceptCharset="UTF-8" id="products-search" onSubmit={ this.handleSubmit }>
        <fieldset>
          <div>
            <label htmlFor="search_terms">Search terms:</label>
            <input
              id="product-search-terms" placeholder="food" type="text"
              value={ this.state.searchInput } onChange={ this.handleQueryChange } />
          </div>
        </fieldset>
      </form>
    );
  }
}

class ProductList extends React.Component {
  render() {
    var productNodes = (
      <li>No products found!</li>
    );

    if (this.props.products.length > 0) {
      productNodes = this.props.products.map(function(product, index) {
        return (
          <li className="product" key={ "product" + index }>
            <Product
              authenticityToken={ this.props.authenticityToken }
              isLoggedIn={ this.props.isLoggedIn }
              product={ product } />
          </li>
        );
      }, this);
    }

    return (
      <ul>
        { productNodes }
      </ul>
    );
  }
}

class ProductsIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = { products: props.products };

    this.addProduct     = this.addProduct.bind(this);
    this.updateProducts = this.updateProducts.bind(this);
  }

  addProduct(product) {
    this.setState({ products: this.state.products.concat(product) });
  }

  updateProducts(products) {
    this.setState({ products: products });
  }

  render() {
    var usdaSearchForm = (
      <p style={{ margin: "1em" }}>
        Please log in to add products to the database
      </p>
    );

    if (this.props.isLoggedIn) {
      usdaSearchForm = (
        <UsdaProductList
          addProduct={ this.addProduct }
          authenticityToken={ this.props.authenticityToken }
          urls={ this.props.urls } />
      );
    }

    return (
      <div>
        <div id="product-search-container">
          <h2>Products in Database</h2>
          <ProductSearch
            products={ this.props.products }
            updateProducts={ this.updateProducts }
            url={ this.props.urls.productsSearch } />
        </div>

        <ProductList
          authenticityToken={ this.props.authenticityToken }
          isLoggedIn={ this.props.isLoggedIn }
          products={ this.state.products } />

        { usdaSearchForm }
      </div>
    );
  }
}
