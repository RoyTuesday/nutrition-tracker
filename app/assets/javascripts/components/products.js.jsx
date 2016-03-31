var Product = React.createClass({
  render: function() {
    return (
      <div id={"product-" + this.props.product.id}>
        <h3 key={this.props.key}>
          <a className="product" data-id={this.props.product.id} href={"products/" + this.props.product.id + "/users_products/new"}>
            {this.props.product.name}
          </a>
        </h3>
        <div className="product-details" id={"product-details-" + this.props.product.id}>
          <p>
            Category: {this.props.product.category}
          </p>
          <p>
            Serving size: {this.props.product.serving_size + this.props.product.serving_unit}
          </p>
        </div>
        <div id={"product-" + this.props.product.id + "-form-container"}>
        </div>
      </div>
    );
  }
});
var ProductList = React.createClass({
  render: function() {
    var productNodes = this.props.products.map(function(product, index) {
      return (
        <li key={"product" + index}>
          <Product product={product} />
        </li>
      );
    });

    return (
      <ul>
        {productNodes}
      </ul>
    );
  }
});
