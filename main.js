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
    baseWidth += -2; // Slight amount of wiggle room

    var tileNodes = this.state.data.map(function(tile) {
      var width = baseWidth;
      var height = width; // Square tile

      // Size information to pass to child
      var size = {
        width: width,
        height: height
      }
      return (
        <Tile title = {tile.title}
              subtitle = {tile.subtitle}
              description = {tile.description}
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
  getInitialState: function() {
    return {
      hover: false
    }
  },

  // Start hover
  onMouseEnter: function() {
    console.log("Hovering");
    this.setState({
      hover: true
    })
  },

  // End hover
  onMouseLeave: function() {
    console.log("Not hovering");
    this.setState({
      hover: false
    })
  },

  render: function() {
    var tileStyle = {
      width: this.props.size.width,
      height: this.props.size.height
    }

    // Background styling
    var backgroundStyle = {
      backgroundImage: 'url(' + this.props.image + ')'
    }
    var backgroundClass = "tile-background";
    if (this.state.hover) { backgroundClass += " tile-background-hover" }
    return (
      <div className="tile"
            style={tileStyle}
            onMouseEnter={this.onMouseEnter.bind(this)}
            onMouseLeave={this.onMouseLeave.bind(this)}>

        <div className="tile-content">
          <div className="tile-text">
            <span className="tile-title">{this.props.title}</span><br />
            <span className="tile-subtitle">{this.props.subtitle}</span><br />
            <span className="tile-description">{this.props.description}</span><br />
          </div>
        </div>

        <div className={backgroundClass} style={backgroundStyle}></div>
      </div>
    )
  }
})

React.render(
  React.createElement(GridView, null),
  document.getElementById(gridID)
);
