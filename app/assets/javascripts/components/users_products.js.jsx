class ProductsChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canvas: null,
      context: null
    };

    this.drawNutrientGraph = this.drawNutrientGraph.bind(this);
  }

  componentDidMount() {
    var canvas = document.getElementById("chart");
    var context = canvas.getContext("2d");

    this.setState({
      canvas: canvas,
      context: context
    });
  }

  drawNutrientGraph(nutrientName) {
    var nutrientPoints = new Object;
    this.props.usersProducts.forEach(function(usersProduct) {
      var nutrient = usersProduct.products_nutrients.find(function(products_nutrient) {
        return products_nutrient.nutrient.name == nutrientName;
      });
      console.log("found nutrient", nutrient, "nutrientPoints", nutrientPoints);
      if(nutrient) {
        if(nutrientPoints[usersProduct.date_eaten]) {
          nutrientPoints[usersProduct.date_eaten] += nutrient.quantity;
        }
        else {
          nutrientPoints[usersProduct.date_eaten] = nutrient.quantity;
        }
      }
    });

    var xCoord = 0;
    for(var prop in nutrientPoints) {
      if(nutrientPoints.hasOwnProperty(prop)) {
        xCoord += 20;
        var height = this.state.canvas.height - nutrientPoints[prop];
        this.state.context.lineTo(xCoord, height);
      }
    }
    this.state.context.stroke();

    this.state.context.closePath();
    this.state.context.beginPath();
    var xCoord = 0;
    for(var prop in nutrientPoints) {
      if(nutrientPoints.hasOwnProperty(prop)) {
        xCoord += 20;
        var height = this.state.canvas.height - nutrientPoints[prop];
        this.state.context.moveTo(xCoord, height);
        this.state.context.arc(xCoord, height, 3, 0, 2 * Math.PI, false);
      }
    }
    this.state.context.fill();
  }

  render() {
    return (
      <canvas
        height="400px"
        id="chart"
        style={{backgroundColor: "#EEE", border: "1px solid black"}}
        width="800px">
      </canvas>
    );
  }
}

class UsersProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      areDetailsShown: false,
      isEditFormShown: false,
      usersProduct: props.usersProduct
    };

    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleNameClick = this.handleNameClick.bind(this);
    this.hideDetails = this.hideDetails.bind(this);
    this.updateUsersProduct = this.updateUsersProduct.bind(this);
  }

  handleDeleteClick(event) {
    event.preventDefault();
    $.ajax({
      dataType: "json",
      method: "DELETE",
      url: "/users_products/" + this.state.usersProduct.id,
      success: function(data) {
        this.props.removeUsersProduct(this.state.usersProduct.id);
      }.bind(this),
      fail: function(xhr, status, err) {
        console.log("Users products delete failure?", status, err);
      }
    })
  }

  handleEditClick(event) {
    event.preventDefault();
    this.setState({isEditFormShown: !this.state.isEditFormShown});
  }

  handleNameClick(event) {
    event.preventDefault();
    this.setState({areDetailsShown: !this.state.areDetailsShown});
  }

  hideDetails() {
    this.setState({
      areDetailsShown: false,
      isEditFormShown: false
    });
  }

  updateUsersProduct(usersProduct) {
    this.setState({usersProduct: usersProduct});
  }

  render() {
    var details, editForm;

    if (this.state.areDetailsShown) {
      details = (
        <div className="users-product-details">
          <p>
            Category: {this.state.usersProduct.product.category}
          </p>
          <p>
            Serving size: {this.state.usersProduct.product.serving_size + this.state.usersProduct.product.serving_unit}
          </p>
          <p>
            Date eaten: {this.state.usersProduct.date_eaten}
          </p>
          <p>
            Price: {this.state.usersProduct.price}
          </p>
        </div>
      );
    }
    if (this.state.isEditFormShown) {
      editForm = (
        <UsersProductForm authenticityToken={this.props.authenticityToken} hideDetails={this.hideDetails} method="PUT" submitName="Update food record" updateUsersProduct={this.updateUsersProduct} url={"/users_products/" + this.state.usersProduct.id} usersProduct={this.state.usersProduct} />
      );
    }

    return(
      <div>
        <button className="product-title" onClick={ this.handleNameClick }>
          { this.state.usersProduct.product.name }
        </button>
        { details }
        <article className="product-links-container">
          <a href="#" onClick={ this.handleEditClick }>Edit</a> | <a href="#" onClick={ this.handleDeleteClick }>Delete</a>
        </article>
        <div className="users-product-errors-container">
          { editForm }
        </div>
      </div>
    );
  }
}

class UsersProductList extends React.Component {
  render() {
    var usersProductNodes = this.props.usersProducts.map(function(usersProduct, index) {
      return (
        <li className="product" key={ "users-products-" + index }>
          <UsersProduct authenticityToken={ this.props.authenticityToken } removeUsersProduct={ this.props.removeUsersProduct } usersProduct={ usersProduct } />
        </li>
      );
    }, this);

    return (
      <ul>
        {usersProductNodes}
      </ul>
    );
  }
}

class UsersProductForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date_eaten: props.usersProduct.date_eaten,
      errors: new Array,
      price: props.usersProduct.price,
      servings: props.usersProduct.servings
    };

    this.handleDateEatenChange = this.handleDateEatenChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleServingsChange = this.handleServingsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDateEatenChange(event) {
    this.setState({date_eaten: event.target.value});
  }

  handlePriceChange(event) {
    this.setState({price: event.target.value});
  }

  handleServingsChange(event) {
    this.setState({servings: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    var form = {users_product: {
      date_eaten: this.state.date_eaten,
      price: this.state.price,
      servings: this.state.servings
    }};

    $.ajax({
      data: form,
      dataType: "json",
      method: this.props.method,
      url: this.props.url,
      success: function(data) {
        if(data.errors) {
          this.setState({errors: data.errors});
        }
        else {
          this.props.hideDetails();
          if(this.props.updateUsersProduct) {
            this.props.updateUsersProduct(data);
          }
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("New users product failure?", this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  render() {
    var errorMessages = this.state.errors.map(function(message, index) {
      return(
        <li key={"new-users-product-error-" + index}>
          {message}
        </li>
      );
    });

    return (
      <form className="new_users_product" onSubmit={this.handleSubmit}>
        <input name="authenticity_token" type="hidden" value={this.props.authenticityToken}/>
        <fieldset>
          <div>
            <label htmlFor="servings">
              Servings
            </label>
            <input defaultValue={this.state.servings} id="servings" min="0" name="servings" onChange={this.handleServingsChange} placeholder="1" step="any" type="number"/>
          </div>
          <div>
            <label htmlFor="date-eaten">
              Date Eaten
            </label>
            <input defaultValue={this.state.date_eaten} id="date-eaten" name="date_eaten" onChange={this.handleDateEatenChange} placeholder="yyyy-mm-dd" type="date"/>
          </div>
          <div>
            <label htmlFor="price">
              Price
            </label>
            <input defaultValue={this.state.price} id="price" name="price" onChange={this.handlePriceChange} placeholder="$1.00" type="text"/>
          </div>
          <input type="submit" value={this.props.submitName}/>
        </fieldset>
        <ul className="form-errors">
          {errorMessages}
        </ul>
      </form>
    );
  }
}
