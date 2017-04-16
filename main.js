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

    var idCount = 0; // Give each tile a unique ID
    var tileNodes = this.state.data.map(function(tile) {
      idCount++; // Increment counter
      var width = baseWidth;
      var height = width; // Square tile

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
      hover: false,
      descriptionHeight: 0
    }
  },

  componentDidMount: function() {
    window.setTimeout(function(){
      // Get height of description text
      var descriptionHeight = document.getElementById(this.props.id).offsetHeight;

      // Save
      this.setState({
        descriptionHeight: descriptionHeight
      })
    }.bind(this), 1) // Wait for it to load before getting the height
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

  render: function() {
    var tileStyle = {
      width: this.props.size.width,
      height: this.props.size.height
    }

    // console.log(this.props.id + ": " + this.state.descriptionHeight);
    var tileTextStyle = {
      bottom: -this.state.descriptionHeight + "px"
    }

    // Inline style for line breaks
    var tileSubtitleBreak = { lineHeight: 32 + "px" }
    var subtitleDescriptionBreak = { lineHeight: 56 + "px" }

    // Background image
    var backgroundStyle = {
      backgroundImage: 'url(' + this.props.image + ')'
    }

    // Hover classes
    var backgroundClass = "tile-background"; // Background class
    var tileTextClass = "tile-text"; // Tile text

    // If hovering
    if (this.state.hover) {
      backgroundClass += " tile-background-hover"
      tileTextClass += " tile-text-hover"
    }
    return (
      <a className="tile"
            href={this.props.link}
            style={tileStyle}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}>

        <div className="tile-content">
          <div className={tileTextClass} style={tileTextStyle}>
            <span className="tile-title">{this.props.title}</span><br style={tileSubtitleBreak}/>
            <span className="tile-subtitle">{this.props.subtitle}</span><br style={subtitleDescriptionBreak}/>
            <span className="tile-description" id={this.props.id}>{this.props.description}</span><br />
          </div>
        </div>

        <div className={backgroundClass} style={backgroundStyle}></div>
      </a>
    )
  }
})

React.render(
  React.createElement(GridView, null),
  document.getElementById(gridID)
);
