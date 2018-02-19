class NutrientsTotalsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate       : '',
      endDate         : '',
      foundNoNutrients: false
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

    $.ajax({
      data: {
        start_date  : this.state.startDate,
        end_date    : this.state.endDate
      },
      method: "POST",
      url: "/nutrients/totals",
      success: function(response) {
        this.props.setNutrients(response.map(function(nutrient) {
          return {
            name  : nutrient[0],
            value : nutrient[1] + nutrient[2]
          }
        }));

        this.setState({ foundNoNutrients: response.length === 0 });
      }.bind(this),
      fail: function(response) {
        console.log("Nutrients totals failure?", response);
      }
    });
  }

  render() {
    var noNutrientsMsg;

    if (this.state.foundNoNutrients) {
      noNutrientsMsg = (
        <p style={{ color: "#B22" }}>
          No nutrients found in this date range
        </p>
      );
    }

    return (
      <form onSubmit={ this.handleSubmit }>
        <fieldset>
          <label htmlFor="start-date">
            Start date
          </label>
          <input
            id="start-date" name="startDate" placeholder="dd/mm/yyyy" type="date"
            value={ this.state.startDate } onChange={ this.handleChange } />

          <label htmlFor="end-date">
            End date
          </label>
          <input
            id="end-date" name="endDate" placeholder="dd/mm/yyyy" type="date"
            value={ this.state.endDate } onChange={ this.handleChange } />

          <input type="submit" value="Search"/>
          { noNutrientsMsg }
        </fieldset>
      </form>
    );
  }
}

class NutrientsChart extends React.Component {
  render() {
    return (
      <canvas height={ this.props.height } width={ this.props.width }></canvas>
    );
  }
}

class Nutrient extends React.Component {
  render() {
    return (
      <td>
        { this.props.name }<br/>
        { this.props.value }
      </td>
    );
  }
}

class NutrientList extends React.Component {
  render() {
    var nutrients = this.props.nutrients.map(function(nutrient, index) {
      return (
        <Nutrient key={ index } name={ nutrient.name } value={ nutrient.value } />
      );
    });

    var rows = new Array;
    var numberOfRows = Math.ceil(nutrients.length / 5);
    
    for(var i = 0; i < numberOfRows; i++) {
      rows.push(
        <tr key={ i }>
          { nutrients.splice(0, 5) }
        </tr>
      );
    }

    return (
      <table>
        <tbody>
          { rows }
        </tbody>
      </table>
    );
  }
}
