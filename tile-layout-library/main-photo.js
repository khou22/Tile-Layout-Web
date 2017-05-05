/**************************************************************
* Name: Kevin Hou
* License: MIT
*
* Description: Photo tile layout library (no text)
*
* Usage:
*  <script src="data.js"></script>
*  <div id="grid"></div>
*  <script type="text/jsx;harmoney-true" src="tile-layout-library/main-photo.js"></script>
*
**************************************************************/

const gridID = 'grid'; // Grid id
const mobileCuttoff = 800; // Number of piexels for cuttoff to mobile

var PhotoGridView = React.createClass({

  // Constructor
  getInitialState: function() {
    return {
      data: gridData.data,
      numColumns: gridData.columns, // Number of columns in grid
      textColor: gridData.textColor, // Color of the text
      newWindow: gridData.openNewWindow, // If will open new window
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
    var gridWidth = $("#" + gridID).width() - 1; // Get width of grid

    this.setState({
      gridWidth: gridWidth
    });

    // console.log("Set width to: " + gridWidth);
  },

  // Render the DOM
  render: function() {
    // Establish standards
    var baseWidth = this.state.gridWidth * Math.floor(100 / this.state.numColumns) / 100; // Get percentage width
    if (this.state.gridWidth != 0) {
      baseWidth += -Math.round(baseWidth / this.state.gridWidth) - 4; // Slight amount of wiggle room
    } else {
      baseWidth += -8;
    }

    var textColor = this.state.textColor; // Store text color
    var newWindow = this.state.newWindow;

    var idCount = 0; // Give each tile a unique ID
    var tileNodes = this.state.data.map(function(tile) {
      idCount++; // Increment counter
      var numBlocks = tile.size; // Number of blocks to fill
      var width = baseWidth * numBlocks;
      var height = baseWidth; // Square tile

      // Size information to pass to child
      var size = {
        width: width,
        height: height
      }
      return (
        <Tile id = {"gridTile" + idCount}
              title = {tile.title}
              subtitle = {tile.subtitle}
              description = {tile.description}
              image = {tile.image}
              link = {tile.link}
              category = {tile.category}
              textColor = {textColor}
              openNewWindow = {newWindow}
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
    // console.log("Hovering");
    this.setState({
      hover: true
    })
  },

  // End hover
  onMouseLeave: function() {
    // console.log("Not hovering");
    this.setState({
      hover: false
    })
  },

  // Get its place in the order of tiles (ie. first tile is 1, second is 2)
  getTileRank: function() {
    var idNumber = parseInt(this.props.id.replace(/[^0-9\.]/g, '')); // Get integer out of ID
    return idNumber; // Return
  },

  render: function() {
    var rank = this.getTileRank(); // Get the tile's rank/order
    var delay = (rank * .05) + .05; // Delay in seconds

    // Setup if opening in new window
    var target = "";
    if (this.props.openNewWindow) {
      target = "_blank";
    }

    var tileStyle = {
      width: this.props.size.width,
      height: this.props.size.height,
      animationDelay: delay + "s"
    }

    var tileCategoryStyle = {
      backgroundColor: this.props.category.color
    }

    // Background image
    var backgroundStyle = {
      backgroundImage: 'url(' + this.props.image + ')'
    }

    // Hover classes
    var backgroundClass = "photo-tile-background"; // Background class

    // If hovering
    if (this.state.hover) {
      backgroundClass += " photo-tile-background-hover"
    }
    return (
      <a className="tile tile-entrance"
            href={this.props.link}
            style={tileStyle}
            target={target}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}>

        <div className={backgroundClass} style={backgroundStyle}></div>
      </a>
    )
  }
})

React.render(
  React.createElement(PhotoGridView, null), // React.createElement(type, [props])
  document.getElementById(gridID)
);
