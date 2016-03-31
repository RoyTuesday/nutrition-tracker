var UsdaProduct = React.createClass({
  render: function() {
    return (
      <a className="food-item" href="products/new">
        {this.props.product.name}
      </a>
    );
  }
});

var UsdaProductList = React.createClass({
  render: function() {
    var productNodes = this.props.products.map(function(product, index) {
      return (
        <li key={"usda-product-" + index}>
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

var UsdaSearchForm = React.createClass({
  getInitialState: function() {
    return {products: [], search_terms: ""}
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
        this.setState({products: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(this.props.url, status, err.toString());
      }.bind(this)
    });
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
          <input name="authenticity_token" type="hidden" value={this.props.authenticity_token}/>
          <fieldset>
            <label htmlFor="search-terms">Search for:</label>
            <input id="search-terms" name="search_terms" onChange={this.handleQueryChange} placeholder="food" type="text"/>

            <input type="submit" value="Search"/>
          </fieldset>
        </form>
        <UsdaProductList products={this.state.products} />
      </div>
    );
  }
});
