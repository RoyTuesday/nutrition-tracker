var NutrientsTotalsForm = React.createClass({
  getInitialState: function() {
    return {
      startDate: null,
      endDate: null,
      foundNoNutrients: false
    }
  },

  componentDidMount: function() {
    $("#start-date").on("change", this.handleStartDateChange);
    $("#end-date").on("change", this.handleEndDateChange);
  },

  handleStartDateChange: function(event) {
    this.setState({
      startDate: event.target.value
    });
  },

  handleEndDateChange: function(event) {
    this.setState({
      endDate: event.target.value
    });
  },

  handleSubmit: function(event) {
    event.preventDefault();
    $.ajax({
      data: {
        start_date: this.state.startDate,
        end_date: this.state.endDate
      },
      method: "POST",
      url: "/nutrients/totals",
      success: function(response) {
        this.props.setNutrients(response.map(function(nutrient) {
          return {
            name: nutrient[0],
            value: nutrient[1] + nutrient[2]
          }
        }));
        if(response.length === 0) {
          this.setState({foundNoNutrients: true});
        }
        else {
          this.setState({foundNoNutrients: false});
        }
      }.bind(this),
      fail: function(response) {
        console.log("Nutrients totals failure?", response);
      }
    });
  },

  render: function() {
    var noNutrientsMsg;
    if(this.state.foundNoNutrients) {
      noNutrientsMsg = (
        <p style={{color: "#B22"}}>
          No nutrients found in this date range
        </p>
      );
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <label htmlFor="start-date">
            Start date
          </label>
          <input id="start-date" placeholder="dd/mm/yyyy" type="date" value={this.state.startDate}/>
          <label htmlFor="end-date">
            End date
          </label>
          <input id="end-date" placeholder="dd/mm/yyyy" type="date" value={this.state.endDate}/>
          <input type="submit" value="Search"/>
          {noNutrientsMsg}
        </fieldset>
      </form>
    );
  }
});
var NutrientsChart = React.createClass({
  render: function() {
    return (
      <canvas height={this.props.height} width={this.props.width}>
      </canvas>
    );
  }
});
var Nutrient = React.createClass({
  render: function() {
    return (
      <td>
        {this.props.name}
        <br/>
        {this.props.value}
      </td>
    );
  }
});
var NutrientList = React.createClass({
  render: function() {
    var nutrients = this.props.nutrients.map(function(nutrient, index) {
      return (
        <Nutrient key={index} name={nutrient.name} value={nutrient.value} />
      );
    });
    var rows = new Array;
    var numberOfRows = Math.ceil(nutrients.length / 5);
    for(var i = 0; i < numberOfRows; i++) {
      rows.push(
        <tr key={i}>
          {nutrients.splice(0, 5)}
        </tr>
      );
    }

    return (
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
})
