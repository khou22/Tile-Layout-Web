const gridID = 'grid'; // Grid id

var GridView = React.createClass({

  // Constructor
  getInitialState: function() {
    return {
      data: data,
      numColumns: 3, // Number of columns in grid
      gridWidth: 0 // Will override immediately
    }
  },

  // Establish sizing
  componentDidMount: function() {
    this.windowResize(); // Establish window size

    // Add event listener for resizing
    window.addEventListener('resize', this.windowResize);
  },

  // On window resize
  windowResize: function() {
    var gridWidth = $("#" + gridID).width(); // Get width of grid

    this.setState({
      gridWidth: gridWidth
    });

    // console.log("Set width to: " + gridWidth);
  },

  // Render the DOM
  render: function() {
    // Establish standards
    var baseWidth = this.state.gridWidth * Math.floor(100 / this.state.numColumns) / 100; // Get percentage width

    var tileNodes = this.state.data.map(function(tile) {
      var width = baseWidth;
      var height = width; // Square tile

      // Size information to pass to child
      var size = {
        width: width,
        height: height
      }
      console.log(tile);
      return (
        <Tile title = {tile.title}
              image = {tile.image}
              size = {size} />
      )
    })
    return (
      <div className="main-grid">
        {tileNodes}
      </div>
    );
  }
})

var Tile = React.createClass({
  render: function() {
    var tileStyle = {
      width: this.props.size.width,
      height: this.props.size.height,
      backgroundImage: 'url(' + this.props.image + ')'
    };
    return (
      <div className="tile" style={tileStyle}>
        {this.props.title}
      </div>
    )
  }
})

React.render(
  React.createElement(GridView, null),
  document.getElementById(gridID)
);
