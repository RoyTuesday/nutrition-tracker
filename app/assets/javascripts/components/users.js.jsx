var UserShow = React.createClass({
  render: function() {
    return(
      <div>
        <h2>
          Welcome, {this.props.currentUser.username}!
        </h2>
      </div>
    );
  }
});
