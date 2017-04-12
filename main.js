var GridView = React.createClass({
  getInitialState: function() {
    return {
      data: data
    }
  },
  render: function() {
    var tileNodes = this.state.data.map(function(tile) {
      return (
        <Tile title={tile.title} />
      )
    })
    return (
      <div className="main-grid">
        Hello
        {tileNodes}
      </div>
    );
  }
})

var Tile = React.createClass({
  render: function() {
    return (
      <div className="tile">
        {this.props.title}
      </div>
    )
  }
})

React.render(
  React.createElement(GridView, null),
  document.getElementById('grid')
);
