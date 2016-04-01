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
        <UsersProductForm authenticityToken={this.props.authenticityToken} hideDetails={this.hideDetails} url={"/products/" + this.props.product.id + "/users_products"} usersProduct={{servings: "", date_eaten: "", price: ""}} />
      );
    }

    var details = "";
    if(this.state.detailsShown) {
      details = (
        <div>
          <div className="product-details" id={"product-details-" + this.props.product.id}>
            <p>var ProductSearch = React.createClass({

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
